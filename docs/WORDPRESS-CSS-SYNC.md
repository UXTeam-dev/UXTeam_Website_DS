# Keeping the CSS in WordPress and GitHub the same (step by step)

**What this sets up:** every time someone saves the site CSS in WordPress (Salient > Custom CSS), the CSS is sent to this GitHub repo within seconds. GitHub then opens a "pull request" (a proposed change you approve), checks every page against the new CSS, and shows a green tick when nothing breaks. You click **Merge**, and the repo has exactly the CSS the live site runs before any new page is built.

**Time:** about 20 minutes, once. No coding.

**You need:**
- A GitHub login that is an owner or admin of `UXTeam-dev/UXTeam_Website_DS`.
- A WordPress login with the **Administrator** role on the live site.
- The file `uxteam-css-sync.zip` (in this repo: `tools/wordpress/uxteam-css-sync.zip`).

There are four parts: (1) make a GitHub key, (2) allow GitHub to run the check, (3) install the plugin in WordPress, (4) test it. Then (5) is what you do from then on.

---

## Step 1. Make a GitHub key (about 5 minutes)

The key lets WordPress save the CSS into this one repository and nothing else.

1. Go to **github.com** and sign in.
2. Click your **profile photo** (top right) > **Settings**.
3. In the left menu, scroll to the bottom and click **Developer settings**.
4. Click **Personal access tokens** > **Fine-grained tokens** > **Generate new token**.
5. Fill in:
   - **Token name:** `WordPress CSS sync`
   - **Expiration:** 1 year (put a reminder in your calendar to make a new one before it ends).
   - **Resource owner:** `UXTeam-dev` (the organization, not your own name).
   - **Repository access:** **Only select repositories** > choose **UXTeam_Website_DS**.
   - **Permissions** > **Repository permissions**:
     - **Contents:** Read and write
     - **Pull requests:** Read and write
     - (Metadata: Read-only is added by itself.)
6. Click **Generate token**.
7. **Copy the key now** (it starts with `github_pat_`). GitHub shows it only once. Keep it somewhere safe until step 3; do not send it in email or chat.

**If GitHub says the token needs approval:** the organization asks an owner to approve keys. An owner goes to **github.com/UXTeam-dev** > **Settings** > **Personal access tokens** > **Pending requests** and approves it.

**If "Resource owner" does not list UXTeam-dev:** the organization does not allow these keys yet. An owner goes to **github.com/UXTeam-dev** > **Settings** > **Personal access tokens** > **Settings** and allows fine-grained tokens.

## Step 2. Let GitHub run the automatic check (about 2 minutes)

1. Open **github.com/UXTeam-dev/UXTeam_Website_DS**.
2. Click **Settings** (the tab at the top of the repo) > **Actions** > **General** (left menu).
3. Under **Actions permissions**, choose **Allow all actions and reusable workflows**.
4. Under **Workflow permissions**, choose **Read and write permissions**. Click **Save**.

(The check itself is already in the repo: `.github/workflows/wordpress-css-sync.yml`. It only becomes active once this work is merged into `main`.)

## Step 3. Install the plugin in WordPress (about 5 minutes)

1. Sign in to WordPress (your site address followed by `/wp-admin`).
2. In the left menu: **Plugins** > **Add New Plugin** (in some versions just **Add New**).
3. Click **Upload Plugin** at the top.
4. Click **Choose File**, pick `uxteam-css-sync.zip`, then **Install Now**.
5. When it finishes, click **Activate Plugin**.
6. In the left menu: **Settings** > **UXTeam CSS Sync**.
7. Paste the key from step 1 into **GitHub key**.
8. Leave **Send automatically** ticked and **Where the CSS is kept** on **Salient > Custom CSS**.
9. Click **Save settings**.

(Optional, safer, for the developer: instead of pasting the key on this page, they can add this line to the site's `wp-config.php` file: `define( 'UXT_CSS_SYNC_TOKEN', 'github_pat_...' );`. The settings page then shows "Set in wp-config.php".)

## Step 4. Test it (about 3 minutes)

1. On **Settings** > **UXTeam CSS Sync**, click **Test connection**.
   - Green message "Connected … Ready." means it works. Go on.
   - Red message: see **Troubleshooting** below.
2. Click **Send current CSS to GitHub now**.
   - The message says "Sent to GitHub" with an **Open on GitHub** link. Click it.
   - You land on a pull request called **CSS changed in WordPress**. It shows every line where the live CSS differs from the repo. (The first time, this also shows anything the developers changed in WordPress that the repo did not have yet. That is the point.)
3. Wait a minute or two. Near the bottom of the pull request, the check **WordPress CSS sync** turns green (all pages fine) or red (something would break).
4. If green, click **Merge pull request** > **Confirm merge**. If red, do not merge: ask Claude in a session to look at the pull request.

## Step 5. From now on

**The developers:** change CSS only in **Salient > Custom CSS** (in the Salient options panel; the tab is called Custom CSS or CSS/Script Related depending on the version) and click **Save**. A message at the top of WordPress confirms "UXTeam CSS Sync: Sent to GitHub". Nothing else to do.

**You:**
1. GitHub emails you when the pull request opens (or check the repo's **Pull requests** tab).
2. More saves before you merge are added to the same pull request.
3. When the check is green, **Merge**. Then start the next page.

**Claude, in a session:** before building a page, checks for an open "CSS changed in WordPress" pull request and asks you to merge it first.

**The other way round** (a new page made here adds CSS): you still give the developers the updated `uxteam-site.css`; they paste the whole file into Salient > Custom CSS and save. The plugin sends it back, GitHub sees it is the same as the repo, and nothing needs merging.

---

## Troubleshooting

| Message | What to do |
|---|---|
| "No GitHub key yet" | Paste the key in step 3.7 and click Save settings. |
| "…(HTTP 401)… wrong or has expired" | Make a new key (step 1) and paste it in. |
| "…(HTTP 403)" or "(HTTP 404)" | The key has no access: check step 1.5 (UXTeam-dev, only UXTeam_Website_DS, Contents and Pull requests "Read and write") and whether an owner must approve it. |
| "No CSS was found in this site" | Salient keeps the CSS under another name on this site. Ask the developer to open Settings > UXTeam CSS Sync > Advanced and set the Salient option name and Custom CSS field (defaults `salient_redux` and `custom-css`), or to switch "Where the CSS is kept" if the site uses Appearance > Customize > Additional CSS. |
| Pull request opens but the check is red | Something in the new CSS breaks a page in the repo. Do not merge; ask Claude to review the pull request. |
| No pull request after a save | Look at "Last send" on the settings page for the reason. Click "Send current CSS to GitHub now" to try again. |

## Good to know

- Only **Salient > Custom CSS** is watched. CSS typed into a single page (WPBakery page settings), the theme's `style.css`, or files changed by FTP are not sent. Keep all CSS in Salient > Custom CSS.
- The key can only touch this one repository. Remove it any time: GitHub > Settings > Developer settings > Fine-grained tokens > delete; or untick / remove it on the plugin page.
- If GitHub is down at the moment of saving, that send fails and "Last send" says so. Click "Send current CSS to GitHub now" later.
- The plugin code is in `tools/wordpress/uxteam-css-sync/` for the developers to read before installing.
