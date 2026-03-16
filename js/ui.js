/* ── ui.js — page navigation, toast notifications, sidebar nav ── */

function showPage(page) {
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('signupPage').classList.add('hidden');
  document.getElementById('dashboard').style.display = 'none';

  if (page === 'login') {
    document.getElementById('loginPage').classList.remove('hidden');
  } else if (page === 'signup') {
    document.getElementById('signupPage').classList.remove('hidden');
  } else if (page === 'dashboard') {
    document.getElementById('dashboard').style.display = 'block';
  }
}

function toast(msg, type) {
  type = type || 'success';
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type + ' show';
  setTimeout(function () {
    t.classList.remove('show');
  }, 3000);
}

function setNav(el) {
  var items = document.querySelectorAll('.nav-item');
  items.forEach(function (item) { item.classList.remove('active'); });
  el.classList.add('active');
}

/* Attach click handlers to nav items after DOM loads */
document.addEventListener('DOMContentLoaded', function () {
  var navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(function (item) {
    item.addEventListener('click', function () { setNav(item); });
  });
});