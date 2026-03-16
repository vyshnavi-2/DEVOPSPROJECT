/* ── dashboard.js — counters and dashboard init ── */

var totalPos = 0;
var totalNeg = 0;
var totalNeu = 0;

/* Called by sentiment.js after every analysis */
function updateCounters(sentiment) {
  if (sentiment === 'positive')      totalPos++;
  else if (sentiment === 'negative') totalNeg++;
  else                               totalNeu++;

  document.getElementById('posCount').textContent = totalPos;
  document.getElementById('negCount').textContent = totalNeg;
  document.getElementById('neuCount').textContent = totalNeu;
}

/* Called by auth.js after successful login/signup */
function initDashboard(name) {
  /* Reset counters */
  totalPos = 0;
  totalNeg = 0;
  totalNeu = 0;

  document.getElementById('posCount').textContent = '0';
  document.getElementById('negCount').textContent = '0';
  document.getElementById('neuCount').textContent = '0';

  /* Clear any previous analysis */
  document.getElementById('wordMap').innerHTML   = '';
  document.getElementById('scorePanel').innerHTML = '';
  document.getElementById('analyzeInput').value  = '';

  /* Ctrl+Enter shortcut — attach only once */
  var input = document.getElementById('analyzeInput');
  if (input && !input.dataset.listenerAdded) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.ctrlKey) runAnalysis();
    });
    input.dataset.listenerAdded = 'true';
  }
}