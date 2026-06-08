/* ForLocals.AI marketing — minimal progressive enhancement.
   1) Mobile nav toggle.
   2) No-backend lead form: AJAX-posts to the form's action (Formspree/Tally),
      then swaps in an inline "thanks" state. Until the placeholder endpoint is
      replaced, submitting just shows the thanks message locally. */
(function () {
  // --- mobile nav ---
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // --- lead form ---
  var form = document.querySelector('.lead-form');
  if (!form) return;
  var thanks = document.querySelector('.form-thanks');
  var action = form.getAttribute('action') || '';
  var isPlaceholder = /REPLACE_WITH|your-form-id|example\.com/i.test(action);

  function showThanks() {
    form.style.display = 'none';
    if (thanks) thanks.style.display = 'block';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (isPlaceholder) { showThanks(); return; } // no endpoint wired yet
    var data = new FormData(form);
    fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (r) { showThanks(); })
      .catch(function () { showThanks(); });
  });
})();
