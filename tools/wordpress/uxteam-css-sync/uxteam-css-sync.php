<?php
/**
 * Plugin Name: UXTeam CSS Sync
 * Description: When the site CSS (Salient > Custom CSS) is saved, sends it to the UXTeam design system repo on GitHub and opens a pull request, so the repo always has the CSS the live site runs.
 * Version: 1.0.0
 * Author: UXTeam
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * License: Proprietary
 *
 * How it works
 *  1. Salient saves its options (including Custom CSS) in one WordPress
 *     option, "salient_redux". When that option changes and the CSS inside
 *     it is different, this plugin sends the CSS to GitHub at once.
 *  2. On GitHub it writes the file src/css/uxteam-site.css on the branch
 *     "wordpress-live" (made fresh from main when no pull request is open)
 *     and opens a pull request into main. The repo's GitHub Action then
 *     updates the fingerprint and registry and re-checks every page.
 *  3. Settings > UXTeam CSS Sync: GitHub key, test button, "send now"
 *     button and the result of the last send.
 *
 * The GitHub key can be stored on the settings page, or (safer) in
 * wp-config.php:  define( 'UXT_CSS_SYNC_TOKEN', 'github_pat_...' );
 * Guide: docs/WORDPRESS-CSS-SYNC.md in the repo.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class UXT_CSS_Sync {

	const OPT      = 'uxt_css_sync_settings';
	const STATUS   = 'uxt_css_sync_status';
	const API      = 'https://api.github.com';
	const SLUG     = 'uxt-css-sync';

	/** Defaults. Every value can be changed on the settings page. */
	public static function defaults() {
		return array(
			'token'      => '',
			'repo'       => 'UXTeam-dev/UXTeam_Website_DS',
			'base'       => 'main',
			'branch'     => 'wordpress-live',
			'path'       => 'src/css/uxteam-site.css',
			'source'     => 'salient',      // salient | wordpress (Appearance > Customize > Additional CSS)
			'option'     => 'salient_redux', // where Salient keeps its options
			'key'        => 'custom-css',    // the Custom CSS field inside it
			'auto'       => '1',
		);
	}

	public static function settings() {
		$s = get_option( self::OPT, array() );
		return wp_parse_args( is_array( $s ) ? $s : array(), self::defaults() );
	}

	public static function token() {
		if ( defined( 'UXT_CSS_SYNC_TOKEN' ) && UXT_CSS_SYNC_TOKEN ) {
			return (string) UXT_CSS_SYNC_TOKEN;
		}
		return (string) self::settings()['token'];
	}

	/* ------------------------------------------------------------------ */
	/* Hooks                                                               */
	/* ------------------------------------------------------------------ */

	public static function init() {
		$s = self::settings();
		if ( '1' === $s['auto'] ) {
			if ( 'wordpress' === $s['source'] ) {
				add_action( 'customize_save_after', array( __CLASS__, 'on_customizer_save' ) );
			} else {
				add_action( 'update_option_' . $s['option'], array( __CLASS__, 'on_option_update' ), 20, 2 );
				add_action( 'add_option_' . $s['option'], array( __CLASS__, 'on_option_add' ), 20, 2 );
			}
		}
		add_action( 'admin_menu', array( __CLASS__, 'menu' ) );
		add_action( 'admin_post_uxt_css_sync_save', array( __CLASS__, 'handle_save' ) );
		add_action( 'admin_post_uxt_css_sync_test', array( __CLASS__, 'handle_test' ) );
		add_action( 'admin_post_uxt_css_sync_now', array( __CLASS__, 'handle_now' ) );
		add_action( 'admin_notices', array( __CLASS__, 'notice' ) );
	}

	public static function on_option_update( $old, $new ) {
		$key  = self::settings()['key'];
		$prev = is_array( $old ) && isset( $old[ $key ] ) ? (string) $old[ $key ] : '';
		$next = is_array( $new ) && isset( $new[ $key ] ) ? (string) $new[ $key ] : '';
		if ( self::normalize( $prev ) !== self::normalize( $next ) && '' !== trim( $next ) ) {
			self::sync( $next, 'saved in Salient' );
		}
	}

	public static function on_option_add( $name, $value ) {
		self::on_option_update( array(), $value );
	}

	public static function on_customizer_save() {
		self::sync( (string) wp_get_custom_css(), 'saved in Additional CSS' );
	}

	/** The CSS the site uses right now, from the chosen source. */
	public static function current_css() {
		$s = self::settings();
		if ( 'wordpress' === $s['source'] ) {
			return (string) wp_get_custom_css();
		}
		$opt = get_option( $s['option'] );
		return is_array( $opt ) && isset( $opt[ $s['key'] ] ) ? (string) $opt[ $s['key'] ] : '';
	}

	public static function normalize( $css ) {
		$css = str_replace( array( "\r\n", "\r" ), "\n", (string) $css );
		return rtrim( $css ) . "\n";
	}

	/* ------------------------------------------------------------------ */
	/* GitHub                                                              */
	/* ------------------------------------------------------------------ */

	private static function gh( $method, $endpoint, $body = null ) {
		$args = array(
			'method'  => $method,
			'timeout' => 20,
			'headers' => array(
				'Authorization'        => 'Bearer ' . self::token(),
				'Accept'               => 'application/vnd.github+json',
				'X-GitHub-Api-Version' => '2022-11-28',
				'User-Agent'           => 'UXTeam-CSS-Sync',
			),
		);
		if ( null !== $body ) {
			$args['headers']['Content-Type'] = 'application/json';
			$args['body']                    = wp_json_encode( $body );
		}
		$res = wp_remote_request( self::API . $endpoint, $args );
		if ( is_wp_error( $res ) ) {
			return array( 0, array( 'message' => $res->get_error_message() ) );
		}
		$data = json_decode( wp_remote_retrieve_body( $res ), true );
		return array( (int) wp_remote_retrieve_response_code( $res ), is_array( $data ) ? $data : array() );
	}

	private static function fail( $msg, $code = 0, $data = array() ) {
		$detail = isset( $data['message'] ) ? ' GitHub said: ' . rtrim( $data['message'], '.' ) . '.' : '';
		$hint   = '';
		if ( 401 === $code ) {
			$hint = ' The GitHub key is wrong or has expired: make a new one (guide, step 1).';
		} elseif ( 403 === $code || 404 === $code ) {
			$hint = ' Check that the key has access to this repository with Contents and Pull requests set to "Read and write", and that the organisation approved it (guide, step 1).';
		}
		return array( 'ok' => false, 'message' => $msg . ( $code ? ' (HTTP ' . $code . ').' : '.' ) . $detail . $hint );
	}

	/**
	 * Check the key and the repository without changing anything.
	 */
	public static function test() {
		$s = self::settings();
		if ( '' === self::token() ) {
			return array( 'ok' => false, 'message' => 'No GitHub key yet. Paste it in the GitHub key box and click Save settings.' );
		}
		list( $code, $data ) = self::gh( 'GET', '/repos/' . $s['repo'] );
		if ( 200 !== $code ) {
			return self::fail( 'Could not open the repository ' . $s['repo'], $code, $data );
		}
		$can_push = ! empty( $data['permissions']['push'] );
		list( $c2, $d2 ) = self::gh( 'GET', '/repos/' . $s['repo'] . '/contents/' . self::path_url( $s['path'] ) . '?ref=' . rawurlencode( $s['base'] ) );
		if ( 200 !== $c2 ) {
			return self::fail( 'Opened the repository, but could not find ' . $s['path'] . ' on ' . $s['base'], $c2, $d2 );
		}
		$css = self::current_css();
		$msg = 'Connected to ' . $s['repo'] . '. ';
		$msg .= $can_push ? 'The key can write to it. ' : 'Warning: GitHub does not report write access for this key. ';
		$msg .= '' === trim( $css )
			? 'But no CSS was found in this site (' . ( 'wordpress' === $s['source'] ? 'Additional CSS' : $s['option'] . ' > ' . $s['key'] ) . '). See the guide, "Troubleshooting".'
			: 'Found ' . number_format_i18n( strlen( $css ) ) . ' characters of CSS on this site. Ready.';
		return array( 'ok' => true, 'message' => $msg );
	}

	/**
	 * Send $css to GitHub and make sure a pull request is open.
	 */
	public static function sync( $css, $why = 'sent by hand' ) {
		$s   = self::settings();
		$r   = '/repos/' . $s['repo'];
		$css = self::normalize( $css );

		if ( '' === self::token() ) {
			return self::save_status( array( 'ok' => false, 'message' => 'Not sent: no GitHub key on Settings > UXTeam CSS Sync.' ) );
		}
		if ( '' === trim( $css ) ) {
			return self::save_status( array( 'ok' => false, 'message' => 'Not sent: the CSS is empty.' ) );
		}

		// 1. Is a pull request from the sync branch already open?
		list( $owner ) = explode( '/', $s['repo'] );
		list( $code, $pulls ) = self::gh( 'GET', $r . '/pulls?state=open&head=' . rawurlencode( $owner . ':' . $s['branch'] ) );
		if ( 200 !== $code ) {
			return self::save_status( self::fail( 'Could not read pull requests', $code, $pulls ) );
		}
		$open_pr = ! empty( $pulls ) && isset( $pulls[0]['html_url'] ) ? $pulls[0] : null;

		// 2. No open pull request: start the branch fresh from the base branch.
		if ( ! $open_pr ) {
			list( $code, $base ) = self::gh( 'GET', $r . '/git/ref/heads/' . rawurlencode( $s['base'] ) );
			if ( 200 !== $code ) {
				return self::save_status( self::fail( 'Could not read the ' . $s['base'] . ' branch', $code, $base ) );
			}
			$sha = $base['object']['sha'];
			list( $code ) = self::gh( 'GET', $r . '/git/ref/heads/' . rawurlencode( $s['branch'] ) );
			if ( 200 === $code ) {
				list( $code, $d ) = self::gh( 'PATCH', $r . '/git/refs/heads/' . rawurlencode( $s['branch'] ), array( 'sha' => $sha, 'force' => true ) );
			} else {
				list( $code, $d ) = self::gh( 'POST', $r . '/git/refs', array( 'ref' => 'refs/heads/' . $s['branch'], 'sha' => $sha ) );
			}
			if ( $code < 200 || $code > 299 ) {
				return self::save_status( self::fail( 'Could not prepare the ' . $s['branch'] . ' branch', $code, $d ) );
			}
		}

		// 3. The file on the branch: skip if it is already the same.
		list( $code, $file ) = self::gh( 'GET', $r . '/contents/' . self::path_url( $s['path'] ) . '?ref=' . rawurlencode( $s['branch'] ) );
		$file_sha = ( 200 === $code && isset( $file['sha'] ) ) ? $file['sha'] : null;
		if ( 200 !== $code && 404 !== $code ) {
			return self::save_status( self::fail( 'Could not read ' . $s['path'], $code, $file ) );
		}
		if ( $file_sha && isset( $file['content'] ) && self::normalize( base64_decode( str_replace( "\n", '', $file['content'] ) ) ) === $css ) {
			return self::save_status( array( 'ok' => true, 'message' => 'No change: GitHub already has exactly this CSS.', 'url' => $open_pr ? $open_pr['html_url'] : '' ) );
		}

		// 4. Write the file.
		$user = wp_get_current_user();
		$who  = ( $user && $user->exists() ) ? $user->display_name : 'WordPress';
		$when = wp_date( 'j M Y H:i T' );
		$body = array(
			'message' => sprintf( 'CSS changed in WordPress (%s) by %s, %s', $why, $who, $when ),
			'content' => base64_encode( $css ),
			'branch'  => $s['branch'],
		);
		if ( $file_sha ) {
			$body['sha'] = $file_sha;
		}
		list( $code, $put ) = self::gh( 'PUT', $r . '/contents/' . self::path_url( $s['path'] ), $body );
		if ( 200 !== $code && 201 !== $code ) {
			return self::save_status( self::fail( 'Could not save the CSS to GitHub', $code, $put ) );
		}

		// 5. Open the pull request if there is none.
		$url = $open_pr ? $open_pr['html_url'] : '';
		if ( ! $open_pr ) {
			list( $code, $pr ) = self::gh(
				'POST',
				$r . '/pulls',
				array(
					'title' => 'CSS changed in WordPress',
					'head'  => $s['branch'],
					'base'  => $s['base'],
					'body'  => "The live site's CSS (Salient > Custom CSS) was saved in WordPress and sent here by the UXTeam CSS Sync plugin.\n\nFirst change: {$who}, {$when}. Later saves are added to this pull request until it is merged.\n\nThe GitHub Action on this branch updates the fingerprint and class registry and runs `npm run check` on every page. Merge when the check is green.",
				)
			);
			if ( 201 === $code && isset( $pr['html_url'] ) ) {
				$url = $pr['html_url'];
			} elseif ( 422 !== $code ) {
				return self::save_status( self::fail( 'The CSS is on GitHub, but the pull request could not be opened', $code, $pr ) );
			}
		}

		return self::save_status(
			array(
				'ok'      => true,
				'message' => 'Sent to GitHub (' . $why . ', by ' . $who . ').',
				'url'     => $url ? $url : ( isset( $put['commit']['html_url'] ) ? $put['commit']['html_url'] : '' ),
			)
		);
	}

	private static function path_url( $path ) {
		return implode( '/', array_map( 'rawurlencode', explode( '/', $path ) ) );
	}

	private static function save_status( $st ) {
		$st['time'] = time();
		update_option( self::STATUS, $st, false );
		return $st;
	}

	/* ------------------------------------------------------------------ */
	/* Admin                                                               */
	/* ------------------------------------------------------------------ */

	public static function menu() {
		add_options_page( 'UXTeam CSS Sync', 'UXTeam CSS Sync', 'manage_options', self::SLUG, array( __CLASS__, 'page' ) );
	}

	private static function back( $msg = null ) {
		if ( $msg ) {
			set_transient( 'uxt_css_sync_flash_' . get_current_user_id(), $msg, 60 );
		}
		wp_safe_redirect( admin_url( 'options-general.php?page=' . self::SLUG ) );
		exit;
	}

	public static function handle_save() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Not allowed.' );
		}
		check_admin_referer( 'uxt_css_sync_save' );
		$s = self::settings();
		foreach ( array( 'repo', 'base', 'branch', 'path', 'option', 'key' ) as $f ) {
			if ( isset( $_POST[ $f ] ) ) {
				$s[ $f ] = sanitize_text_field( wp_unslash( $_POST[ $f ] ) );
			}
		}
		$s['source'] = ( isset( $_POST['source'] ) && 'wordpress' === $_POST['source'] ) ? 'wordpress' : 'salient';
		$s['auto']   = isset( $_POST['auto'] ) ? '1' : '0';
		if ( ! empty( $_POST['token'] ) ) {
			$s['token'] = trim( sanitize_text_field( wp_unslash( $_POST['token'] ) ) );
		}
		if ( ! empty( $_POST['forget_token'] ) ) {
			$s['token'] = '';
		}
		update_option( self::OPT, $s, false );
		self::back( array( 'ok' => true, 'message' => 'Settings saved.' ) );
	}

	public static function handle_test() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Not allowed.' );
		}
		check_admin_referer( 'uxt_css_sync_test' );
		self::back( self::test() );
	}

	public static function handle_now() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Not allowed.' );
		}
		check_admin_referer( 'uxt_css_sync_now' );
		self::back( self::sync( self::current_css(), 'sent by hand' ) );
	}

	/** After a save in Salient, show the result of the send at the top of the admin. */
	public static function notice() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$st = get_option( self::STATUS );
		if ( ! is_array( $st ) || empty( $st['time'] ) || time() - (int) $st['time'] > 120 ) {
			return;
		}
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		if ( $screen && 'settings_page_' . self::SLUG === $screen->id ) {
			return;
		}
		printf(
			'<div class="notice notice-%s is-dismissible"><p><strong>UXTeam CSS Sync:</strong> %s %s</p></div>',
			$st['ok'] ? 'success' : 'error',
			esc_html( $st['message'] ),
			! empty( $st['url'] ) ? '<a href="' . esc_url( $st['url'] ) . '" target="_blank" rel="noopener">Open on GitHub</a>' : ''
		);
	}

	public static function page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$s     = self::settings();
		$st    = get_option( self::STATUS );
		$flash = get_transient( 'uxt_css_sync_flash_' . get_current_user_id() );
		delete_transient( 'uxt_css_sync_flash_' . get_current_user_id() );
		$tok   = self::token();
		$in_cfg = defined( 'UXT_CSS_SYNC_TOKEN' ) && UXT_CSS_SYNC_TOKEN;
		$post  = esc_url( admin_url( 'admin-post.php' ) );
		?>
		<div class="wrap">
			<h1>UXTeam CSS Sync</h1>
			<p>Every time the site CSS is saved, it is sent to GitHub (<code><?php echo esc_html( $s['repo'] ); ?></code>) and a pull request is opened, so the design system repo always has the CSS the live site runs.</p>

			<?php if ( is_array( $flash ) ) : ?>
				<div class="notice notice-<?php echo $flash['ok'] ? 'success' : 'error'; ?>"><p><?php echo esc_html( $flash['message'] ); ?>
				<?php if ( ! empty( $flash['url'] ) ) : ?> <a href="<?php echo esc_url( $flash['url'] ); ?>" target="_blank" rel="noopener">Open on GitHub</a><?php endif; ?></p></div>
			<?php endif; ?>

			<h2>1. Check and send</h2>
			<p>
				<form method="post" action="<?php echo $post; ?>" style="display:inline">
					<?php wp_nonce_field( 'uxt_css_sync_test' ); ?><input type="hidden" name="action" value="uxt_css_sync_test">
					<?php submit_button( 'Test connection', 'secondary', 'submit', false ); ?>
				</form>
				&nbsp;
				<form method="post" action="<?php echo $post; ?>" style="display:inline">
					<?php wp_nonce_field( 'uxt_css_sync_now' ); ?><input type="hidden" name="action" value="uxt_css_sync_now">
					<?php submit_button( 'Send current CSS to GitHub now', 'primary', 'submit', false ); ?>
				</form>
			</p>
			<p><strong>Last send:</strong>
			<?php
			if ( is_array( $st ) && ! empty( $st['time'] ) ) {
				echo esc_html( wp_date( 'j M Y H:i', (int) $st['time'] ) . ' · ' . ( $st['ok'] ? 'OK' : 'Failed' ) . ' · ' . $st['message'] );
				if ( ! empty( $st['url'] ) ) {
					echo ' <a href="' . esc_url( $st['url'] ) . '" target="_blank" rel="noopener">Open on GitHub</a>';
				}
			} else {
				echo 'nothing sent yet.';
			}
			?>
			</p>

			<h2>2. Settings</h2>
			<form method="post" action="<?php echo $post; ?>">
				<?php wp_nonce_field( 'uxt_css_sync_save' ); ?><input type="hidden" name="action" value="uxt_css_sync_save">
				<table class="form-table" role="presentation">
					<tr><th scope="row"><label for="uxt-token">GitHub key</label></th><td>
						<?php if ( $in_cfg ) : ?>
							<p>Set in wp-config.php (ends in <code><?php echo esc_html( substr( $tok, -4 ) ); ?></code>).</p>
						<?php else : ?>
							<input type="password" id="uxt-token" name="token" class="regular-text" autocomplete="off" placeholder="<?php echo $tok ? esc_attr( 'Saved, ends in ' . substr( $tok, -4 ) . '. Paste a new key to replace it.' ) : 'github_pat_...'; ?>">
							<?php if ( $tok ) : ?><label><input type="checkbox" name="forget_token" value="1"> Remove the saved key</label><?php endif; ?>
							<p class="description">A fine-grained GitHub key with access to this one repository only (guide, step 1).</p>
						<?php endif; ?>
					</td></tr>
					<tr><th scope="row">Send automatically</th><td><label><input type="checkbox" name="auto" value="1" <?php checked( '1', $s['auto'] ); ?>> Send to GitHub every time the CSS is saved</label></td></tr>
					<tr><th scope="row">Where the CSS is kept</th><td>
						<label><input type="radio" name="source" value="salient" <?php checked( 'salient', $s['source'] ); ?>> Salient &gt; Custom CSS (recommended)</label><br>
						<label><input type="radio" name="source" value="wordpress" <?php checked( 'wordpress', $s['source'] ); ?>> Appearance &gt; Customize &gt; Additional CSS</label>
					</td></tr>
				</table>
				<details><summary>Advanced (change only if the guide says so)</summary>
				<table class="form-table" role="presentation">
					<tr><th scope="row">Repository</th><td><input name="repo" class="regular-text" value="<?php echo esc_attr( $s['repo'] ); ?>"></td></tr>
					<tr><th scope="row">Main branch</th><td><input name="base" class="regular-text" value="<?php echo esc_attr( $s['base'] ); ?>"></td></tr>
					<tr><th scope="row">Sync branch</th><td><input name="branch" class="regular-text" value="<?php echo esc_attr( $s['branch'] ); ?>"></td></tr>
					<tr><th scope="row">File in the repo</th><td><input name="path" class="regular-text" value="<?php echo esc_attr( $s['path'] ); ?>"></td></tr>
					<tr><th scope="row">Salient option name</th><td><input name="option" class="regular-text" value="<?php echo esc_attr( $s['option'] ); ?>"></td></tr>
					<tr><th scope="row">Custom CSS field</th><td><input name="key" class="regular-text" value="<?php echo esc_attr( $s['key'] ); ?>"></td></tr>
				</table>
				</details>
				<?php submit_button( 'Save settings' ); ?>
			</form>
		</div>
		<?php
	}
}

UXT_CSS_Sync::init();
