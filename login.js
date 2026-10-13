// SNDF Staff Portal login. Handles non-JSON responses safely so deployment
// errors are shown clearly instead of "Unexpected end of JSON input".
(() => {
  const roleSelect = document.getElementById('loginRole');
  const loginForm = document.getElementById('loginForm');
  const msg = document.getElementById('loginMsg');
  const staffIdInput = document.getElementById('staff_id');
  const passwordInput = document.getElementById('password');

  if (!roleSelect || !loginForm || !msg || !staffIdInput || !passwordInput) {
    console.error('SNDF login: required form element is missing.');
    return;
  }

  const roleParam = new URLSearchParams(window.location.search).get('role');
  if (['master_admin', 'admin', 'field_officer', 'officer', 'supervisor', 'guard'].includes(roleParam)) {
    roleSelect.value = roleParam;
  }

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = loginForm.querySelector('button[type="submit"], input[type="submit"]');
    const oldButtonText = submitButton ? (submitButton.textContent || submitButton.value) : '';
    msg.textContent = 'Checking login…';
    msg.className = 'login-msg';
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          staff_id: staffIdInput.value.trim(),
          password: passwordInput.value,
          role: roleSelect.value
        })
      });

      const raw = await response.text();
      let data = {};
      if (raw.trim()) {
        try {
          data = JSON.parse(raw);
        } catch (_) {
          throw new Error(response.status === 404
            ? 'Login API nahi mili. Render par Static Site ke bajay Node.js Web Service deploy karein.'
            : 'Server ne valid JSON response nahi diya. Backend deployment/logs check karein.');
        }
      } else {
        throw new Error('Server se khaali response mila. Backend service chalu hai ya nahi, /api/health check karein.');
      }

      if (!response.ok) {
        throw new Error(data.error || `Login failed (HTTP ${response.status})`);
      }
      if (!data.user || !data.redirect) {
        throw new Error('Server response incomplete hai. Backend version/deployment check karein.');
      }

      sessionStorage.setItem('sndfUser', JSON.stringify(data.user));
      window.location.href = data.redirect;
    } catch (error) {
      console.error('SNDF login error:', error);
      msg.textContent = error.message || 'Login nahi ho paya. Internet aur backend check karein.';
      msg.className = 'login-msg error';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        if (oldButtonText) {
          if ('value' in submitButton && submitButton.tagName === 'INPUT') submitButton.value = oldButtonText;
          else submitButton.textContent = oldButtonText;
        }
      }
    }
  });
})();
