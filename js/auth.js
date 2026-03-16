/* ── auth.js — credentials stored in localStorage ── */

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function showFieldErr(id, show) {
  document.getElementById(id).style.display = show ? 'block' : 'none';
}

function clearAuthError(id) {
  var el = document.getElementById(id);
  el.textContent = '';
  el.classList.add('hidden');
}

function showAuthError(id, msg) {
  var el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hidden');
}

/* ── LOGIN ── */
function handleLogin() {
  clearAuthError('loginError');

  var email = document.getElementById('loginEmail').value.trim();
  var pass  = document.getElementById('loginPass').value;
  var ok    = true;

  showFieldErr('loginEmailErr', !isValidEmail(email));
  showFieldErr('loginPassErr',  !pass);
  if (!isValidEmail(email) || !pass) ok = false;
  if (!ok) return;

  var users = JSON.parse(localStorage.getItem('lexisense_users') || '[]');
  var user  = users.find(function (u) {
    return u.email === email && u.password === pass;
  });

  if (!user) {
    showAuthError('loginError', 'Incorrect email or password.');
    return;
  }

  localStorage.setItem('lexisense_session', JSON.stringify({ name: user.name, email: user.email }));
  toast('Welcome back, ' + user.name + '!', 'success');
  launchDashboard(user.name, user.email);
}

/* ── SIGNUP ── */
function handleSignup() {
  clearAuthError('signupError');

  var name    = document.getElementById('signupName').value.trim();
  var email   = document.getElementById('signupEmail').value.trim();
  var pass    = document.getElementById('signupPass').value;
  var confirm = document.getElementById('signupConfirm').value;
  var ok      = true;

  showFieldErr('signupNameErr',    !name);
  showFieldErr('signupEmailErr',   !isValidEmail(email));
  showFieldErr('signupPassErr',    pass.length < 6);
  showFieldErr('signupConfirmErr', pass !== confirm);

  if (!name || !isValidEmail(email) || pass.length < 6 || pass !== confirm) ok = false;
  if (!ok) return;

  var users  = JSON.parse(localStorage.getItem('lexisense_users') || '[]');
  var exists = users.find(function (u) { return u.email === email; });

  if (exists) {
    showAuthError('signupError', 'An account with this email already exists.');
    return;
  }

  users.push({ name: name, email: email, password: pass });
  localStorage.setItem('lexisense_users', JSON.stringify(users));
  localStorage.setItem('lexisense_session', JSON.stringify({ name: name, email: email }));

  toast('Account created! Welcome, ' + name + '!', 'success');
  setTimeout(function () { launchDashboard(name, email); }, 600);
}

/* ── LAUNCH DASHBOARD ── */
function launchDashboard(name, email) {
  showPage('dashboard');
  initDashboard(name, email);
}

/* ── LOGOUT ── */
function handleLogout() {
  localStorage.removeItem('lexisense_session');
  showPage('login');
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPass').value  = '';
  toast('Logged out successfully.', 'success');
}

/* ── AUTO-LOGIN if session exists ── */
document.addEventListener('DOMContentLoaded', function () {
  var session = JSON.parse(localStorage.getItem('lexisense_session') || 'null');
  if (session && session.name) {
    launchDashboard(session.name, session.email);
  }
});