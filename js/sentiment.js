/* ── sentiment.js — word dictionaries and runAnalysis() ── */

var POS_WORDS = new Set([
  'amazing','excellent','great','wonderful','fantastic','love','happy','joy',
  'beautiful','perfect','outstanding','superb','brilliant','awesome','impressive',
  'delightful','pleased','good','nice','best','enjoy','positive','helpful','fast',
  'easy','cheerful','thrilled','grateful','hope','kind','lucky','proud','safe',
  'sweet','glad','bright','calm','clean','cute','excited','fabulous','fun',
  'gentle','glorious','incredible','lively','lovely','magnificent','marvelous',
  'pleasant','powerful','reliable','remarkable','smart','splendid','strong',
  'successful','thankful','vibrant','warm','worthy','innovative','charming',
  'polite','honest','fair','efficient','clear','consistent','creative','friendly',
  'generous','graceful','inspired','joyful','peaceful','radiant','refreshing',
  'satisfied','secure','spectacular','talented','uplifting','valuable','vivid'
]);

var NEG_WORDS = new Set([
  'terrible','horrible','awful','hate','disgusting','bad','worst','poor','ugly',
  'failed','broken','useless','slow','disappointed','frustrating','annoying',
  'painful','problem','issue','difficult','wrong','error','unfortunate','sad',
  'angry','boring','corrupt','cruel','dangerous','dull','evil','fake','fearful',
  'gross','harsh','hopeless','hurt','inferior','lazy','lonely','lost','mad',
  'mean','messy','miserable','nasty','negative','nervous','offensive','pathetic',
  'rotten','rough','rude','scary','shocking','sick','sloppy','sorrow','stupid',
  'vile','weak','wicked','worried','worthless','delayed','misleading',
  'unreliable','confusing','outdated','buggy','broken','defective','inadequate',
  'incompetent','inefficient','mediocre','obscure','pointless','regrettable',
  'stressful','toxic','troublesome','unpleasant','unsatisfactory','wasteful'
]);

/* ── Classify a single word ── */
function classifyWord(word) {
  var w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (POS_WORDS.has(w)) return 'pos';
  if (NEG_WORDS.has(w)) return 'neg';
  return 'neu';
}

/* ── Main analysis function called from the Analyze button ── */
function runAnalysis() {
  var text = document.getElementById('analyzeInput').value.trim();
  var wordMapEl  = document.getElementById('wordMap');
  var scorePanelEl = document.getElementById('scorePanel');

  if (!text) {
    toast('Please enter some text to analyze.', 'error');
    return;
  }

  var words = text.split(/\s+/);
  var posCount = 0, negCount = 0, neuCount = 0;

  /* Build word chips */
  wordMapEl.innerHTML = '';
  words.forEach(function (word) {
    var cls = classifyWord(word);
    if (cls === 'pos') posCount++;
    else if (cls === 'neg') negCount++;
    else neuCount++;

    var chip = document.createElement('span');
    chip.className   = 'word-chip ' + cls;
    chip.textContent = word;
    chip.title       = cls === 'pos' ? 'Positive' : cls === 'neg' ? 'Negative' : 'Neutral';
    wordMapEl.appendChild(chip);
  });

  /* Determine overall sentiment */
  var total     = posCount + negCount + neuCount;
  var rawScore  = Math.round(((posCount - negCount) / total) * 100);
  var sentiment, emoji;

  if (posCount > negCount) {
    sentiment = 'positive'; emoji = '😊';
  } else if (negCount > posCount) {
    sentiment = 'negative'; emoji = '😞';
  } else {
    sentiment = 'neutral';  emoji = '😐';
  }

  var colorMap = { positive: 'var(--positive)', negative: 'var(--negative)', neutral: 'var(--neutral)' };

  /* Render score panel */
  scorePanelEl.innerHTML =
    '<div class="score-box">' +
      '<div class="score-emoji">' + emoji + '</div>' +
      '<div class="score-value" style="color:' + colorMap[sentiment] + '">' +
        (rawScore >= 0 ? '+' : '') + rawScore +
      '</div>' +
      '<div class="score-label">' + sentiment + ' sentiment</div>' +
      '<div class="score-counts">' +
        '<div class="count-cell pos-cell"><div class="n">' + posCount + '</div><div class="l">Positive</div></div>' +
        '<div class="count-cell neg-cell"><div class="n">' + negCount + '</div><div class="l">Negative</div></div>' +
        '<div class="count-cell neu-cell"><div class="n">' + neuCount + '</div><div class="l">Neutral</div></div>' +
      '</div>' +
    '</div>';

  /* Update dashboard counters */
  updateCounters(sentiment);
  toast('Analysis complete!', 'success');
}