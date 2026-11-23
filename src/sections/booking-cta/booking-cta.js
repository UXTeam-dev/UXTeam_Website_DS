/**
 * Booking form. Checks the work email, then sends the visitor to the
 * Calendly booking page set in data-calendly (name and email prefilled).
 * Until data-calendly is set it only shows a confirmation message.
 */
UXTeam.register('booking-form', function (root) {
  root.querySelectorAll('[data-ux-booking]').forEach(function (form) {
    if (form.dataset.uxReady) return;
    form.dataset.uxReady = '1';
    var status = form.querySelector('.ux-form__status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('[name="email"]');
      var field = email.closest('.ux-field');
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      field.classList.toggle('is-invalid', !ok);
      email.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok) { email.focus(); return; }
      var url = form.dataset.calendly;
      if (url) {
        var name = form.querySelector('[name="name"]').value.trim();
        var q = new URLSearchParams({ name: name, email: email.value.trim() });
        window.location.href = url + (url.indexOf('?') > -1 ? '&' : '?') + q.toString();
      } else if (status) {
        status.textContent = 'Thanks. Taking you to the booking calendar…';
      }
    });
  });
});
