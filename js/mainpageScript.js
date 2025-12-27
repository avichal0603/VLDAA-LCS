(function () {
  const state = {
    a: "",
    b: "",
    n: 0,
    m: 0,
    dp: [],
    dir: [],
    phase: "idle",
    i: 1,
    j: 1,
    lastFillI: null,
    lastFillJ: null,
    traceI: null,
    traceJ: null,
    lastTraceI: null,
    lastTraceJ: null,
    playing: false,
    intervalId: null,
    speed: 500,
    lcsChars: [],
    totalSteps: 0,
    currentStep: 0,
    theme: "dark",
    algorithm: "standard", // "standard", "rolling", "hirschberg"
    backtrackingPath: [],
    rollingDP: null // For rolling array algorithm
  };

  const els = {};

  // Pseudocode for different algorithms
  const pseudocode = {
    standard: [
      { code: "outer", text: "for i ← 1 to n:" },
      { code: "inner", text: "  for j ← 1 to m:" },
      { code: "if", text: "    if A[i] == B[j]:" },
      { code: "match", text: "      dp[i][j] ← dp[i-1][j-1] + 1" },
      { code: "else", text: "    else:" },
      { code: "mismatch", text: "      dp[i][j] ← max(dp[i-1][j], dp[i][j-1])" },
      { code: "trace", text: "# traceback from (n,m) to recover LCS" }
    ],
    rolling: [
      { code: "init", text: "prev ← array[0..m]" },
      { code: "outer", text: "for i ← 1 to n:" },
      { code: "inner", text: "  curr[0] ← 0" },
      { code: "forj", text: "  for j ← 1 to m:" },
      { code: "if", text: "    if A[i] == B[j]:" },
      { code: "match", text: "      curr[j] ← prev[j-1] + 1" },
      { code: "else", text: "    else:" },
      { code: "mismatch", text: "      curr[j] ← max(prev[j], curr[j-1])" },
      { code: "swap", text: "  prev ← curr" },
      { code: "result", text: "# result in prev[m]" }
    ],
    hirschberg: [
      { code: "func", text: "function Hirschberg(A, B):" },
      { code: "base", text: "  if |A| == 0 or |B| == 0:" },
      { code: "return", text: "    return ''" },
      { code: "mid", text: "  mid ← |A| / 2" },
      { code: "l1", text: "  L1 ← LCSLength(A[1..mid], B)" },
      { code: "l2", text: "  L2 ← LCSLength(reverse(A[mid+1..]), reverse(B))" },
      { code: "cut", text: "  cut ← argmax(L1[j] + L2[m-j])" },
      { code: "recurse", text: "  return Hirschberg(A[1..mid], B[1..cut]) +" },
      { code: "recurse2", text: "         Hirschberg(A[mid+1..], B[cut+1..])" }
    ]
  };

  function grab(id) {
    return document.getElementById(id);
  }

  function cacheElements() {
    els.seqA = grab("seqA");
    els.seqB = grab("seqB");
    els.initBtn = grab("initBtn");
    els.stepBtn = grab("stepBtn");
    els.playBtn = grab("playBtn");
    els.pauseBtn = grab("pauseBtn");
    els.resetBtn = grab("resetBtn");
    els.speedSlider = grab("speedSlider");
    els.speedLabel = grab("speedLabel");
    els.themeToggle = grab("themeToggle");
    els.themeIcon = grab("themeIcon");
    els.themeText = grab("themeText");
    els.modeToggle = grab("modeToggle");
    els.modeModal = grab("modeModal");
    els.closeModal = grab("closeModal");
    els.cancelModal = grab("cancelModal");

    els.statsN = grab("stats-n");
    els.statsM = grab("stats-m");
    els.statsSpace = grab("stats-space");
    els.statsStep = grab("stats-step");
    els.statsTotal = grab("stats-total");

    els.explanation = grab("explanation-text");
    els.lcsLength = grab("lcs-length");
    els.lcsString = grab("lcs-string");

    els.visLenA = grab("vis-lenA");
    els.visLenB = grab("vis-lenB");
    els.charsA = grab("charsA");
    els.charsB = grab("charsB");
    els.comparisonArrow = grab("comparisonArrow");

    els.dpTableContainer = grab("dp-table-container");
    els.dpTableTitle = grab("dp-table-title");
    els.codeLines = grab("codeLines");
    els.codeDescription = grab("code-description");
    els.algoInfo = grab("algoInfo");
    
    els.backtrackingVisual = grab("backtrackingVisual");
    els.backtrackingPath = grab("backtrackingPath");
  }

  // Mode selection functionality
  function initModeSelection() {
    els.modeToggle.addEventListener("click", () => {
      els.modeModal.classList.add("active");
    });

    els.closeModal.addEventListener("click", closeModal);
    els.cancelModal.addEventListener("click", closeModal);

    els.modeModal.addEventListener("click", (e) => {
      if (e.target === els.modeModal) {
        closeModal();
      }
    });

    document.querySelectorAll(".mode-option").forEach(option => {
      option.addEventListener("click", () => {
        const mode = option.dataset.mode;
        closeModal();
        
        if (mode === "pretest") {
          window.location.href = "pretest.html";
        } else if (mode === "posttest") {
          window.location.href = "posttest.html";
        }
        // If mode is "main", do nothing (stay on main page)
      });
    });

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && els.modeModal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  function closeModal() {
    els.modeModal.classList.remove("active");
  }

  // Theme toggle functionality
  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    
    // Update toggle button
    if (state.theme === "light") {
      els.themeIcon.textContent = "☀️";
      els.themeText.textContent = "Light";
    } else {
      els.themeIcon.textContent = "🌙";
      els.themeText.textContent = "Dark";
    }
    
    // Save preference
    localStorage.setItem("lcs-visualizer-theme", state.theme);
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem("lcs-visualizer-theme");
    if (savedTheme) {
      state.theme = savedTheme;
    }
    document.documentElement.setAttribute("data-theme", state.theme);
    
    // Update toggle button
    if (state.theme === "light") {
      els.themeIcon.textContent = "☀️";
      els.themeText.textContent = "Light";
    } else {
      els.themeIcon.textContent = "🌙";
      els.themeText.textContent = "Dark";
    }
  }

  // Algorithm selection
  function setAlgorithm(algo) {
    if (state.algorithm === algo) return;
    
    state.algorithm = algo;
    
    // Update UI
    document.querySelectorAll('.algo-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.algo === algo);
    });
    
    // Update algorithm info
    const algoInfo = {
      standard: "<strong><i class='fas fa-info-circle'></i> Standard DP:</strong> Builds full DP table, O(n²) space, allows full backtracking",
      rolling: "<strong><i class='fas fa-info-circle'></i> Rolling Array:</strong> Uses only 2 rows, O(n) space, can reconstruct with extra steps",
      hirschberg: "<strong><i class='fas fa-info-circle'></i> Hirschberg:</strong> Divide & conquer, O(n) space, optimal for large sequences"
    };
    els.algoInfo.innerHTML = algoInfo[algo];
    
    // Update code description
    els.codeDescription.textContent = 
      algo === "standard" ? "Standard DP" : 
      algo === "rolling" ? "Rolling Array" : "Hirschberg's Algorithm";
    
    // Render pseudocode
    renderPseudocode();
    
    // Stop any current playback
    stopAutoPlay();
    
    // If we already have data, reinitialize
    if (state.n > 0 && state.m > 0) {
      initDp();
    }
  }

  function renderPseudocode() {
    const code = pseudocode[state.algorithm];
    let html = '';
    code.forEach(line => {
      html += `<div class="code-line" data-code="${line.code}">${line.text}</div>`;
    });
    els.codeLines.innerHTML = html;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function updateSpeedLabel() {
    const value = state.speed;
    if (value >= 1000) {
      els.speedLabel.textContent = (value / 1000).toFixed(1) + 's';
    } else {
      els.speedLabel.textContent = value + 'ms';
    }
  }

  function updateStats() {
    els.statsN.textContent = state.n;
    els.statsM.textContent = state.m;
    
    const space = state.algorithm === "standard" ? state.n * state.m : 
                 state.algorithm === "rolling" ? 2 * state.m :
                 state.m; // Hirschberg
    els.statsSpace.textContent = space || 0;
    
    els.visLenA.textContent = state.n;
    els.visLenB.textContent = state.m;

    els.statsStep.textContent = state.currentStep;
    els.statsTotal.textContent = state.totalSteps;
  }

  function setExplanation(text) {
    els.explanation.innerHTML = text;
  }

  function setLcsDisplay() {
    const lcs = state.lcsChars.join("");
    els.lcsString.textContent = lcs || "–";
    els.lcsLength.textContent = lcs.length;
  }

  function clearLcsDisplay() {
    state.lcsChars = [];
    setLcsDisplay();
  }

  function highlightCode(which) {
    document.querySelectorAll("#codeLines .code-line").forEach((line) => {
      const codeId = line.getAttribute("data-code");
      if (codeId === which) {
        line.classList.add("code-line-active");
      } else {
        line.classList.remove("code-line-active");
      }
    });
  }

  function renderCharBoxes() {
    const a = state.a;
    const b = state.b;
    
    let htmlA = "";
    for (let i = 0; i < a.length; i++) {
      const idx = i + 1;
      htmlA += `<div class="char-box" data-char-a="${idx}">
        <span class="char-box-index">${idx}</span>
        ${escapeHtml(a[i])}
      </div>`;
    }
    els.charsA.innerHTML = htmlA || '<div style="color: var(--text-muted); font-size: 10px;"><i class="fas fa-exclamation-circle"></i> No characters</div>';

    let htmlB = "";
    for (let j = 0; j < b.length; j++) {
      const idx = j + 1;
      htmlB += `<div class="char-box" data-char-b="${idx}">
        <span class="char-box-index">${idx}</span>
        ${escapeHtml(b[j])}
      </div>`;
    }
    els.charsB.innerHTML = htmlB || '<div style="color: var(--text-muted); font-size: 10px;"><i class="fas fa-exclamation-circle"></i> No characters</div>';
  }

  function updateCharHighlights() {
    document.querySelectorAll('.char-box').forEach(box => {
      box.classList.remove('char-box-current-a', 'char-box-current-b', 'char-box-match', 'char-box-in-lcs');
    });

    if (state.phase === "filling" && state.lastFillI !== null && state.lastFillJ !== null) {
      const i = state.lastFillI;
      const j = state.lastFillJ;
      
      const charBoxA = document.querySelector(`[data-char-a="${i}"]`);
      const charBoxB = document.querySelector(`[data-char-b="${j}"]`);
      
      if (charBoxA) charBoxA.classList.add('char-box-current-a');
      if (charBoxB) charBoxB.classList.add('char-box-current-b');

      if (state.a[i - 1] === state.b[j - 1]) {
        if (charBoxA) charBoxA.classList.add('char-box-match');
        if (charBoxB) charBoxB.classList.add('char-box-match');
      }

      els.comparisonArrow.classList.add('visible');
      els.comparisonArrow.innerHTML = 
        state.a[i - 1] === state.b[j - 1] 
          ? `<i class="fas fa-check-circle"></i> Match! A[${i}] = B[${j}] = '${state.a[i - 1]}'`
          : `<i class="fas fa-times-circle"></i> Different: A[${i}] = '${state.a[i - 1]}', B[${j}] = '${state.b[j - 1]}'`;
    } else {
      els.comparisonArrow.classList.remove('visible');
    }
  }

  function renderBacktrackingPath() {
    if (state.algorithm !== "standard" || state.backtrackingPath.length === 0) {
      els.backtrackingPath.innerHTML = 
        '<div style="color: var(--text-muted); font-size: 9px; padding: 10px; text-align: center;">' +
        (state.algorithm === "standard" 
          ? '<i class="fas fa-info-circle"></i> Backtracking path will appear here after DP table is filled' 
          : '<i class="fas fa-info-circle"></i> Full backtracking only available in Standard DP algorithm') +
        '</div>';
      return;
    }

    let html = '';
    let prevCell = null;
    
    state.backtrackingPath.forEach((cell, idx) => {
      const [i, j, isMatch] = cell;
      const char = isMatch ? state.a[i-1] : '';
      
      if (prevCell) {
        html += `<div class="path-arrow"><i class="fas fa-arrow-right"></i></div>`;
      }
      
      let cellClass = "path-cell";
      if (isMatch) cellClass += " path-match";
      if (idx === 0) cellClass += " path-start";
      else if (idx === state.backtrackingPath.length - 1) cellClass += " path-trace";
      
      html += `<div class="${cellClass}" title="(${i}, ${j})${isMatch ? ` - Match: ${char}` : ''}">
        ${isMatch ? `<i class="fas fa-check"></i> ${char}` : `${i},${j}`}
      </div>`;
      
      prevCell = cell;
    });
    
    els.backtrackingPath.innerHTML = html;
  }

  function initDp() {
    const a = (els.seqA.value || "").trim();
    const b = (els.seqB.value || "").trim();

    state.a = a;
    state.b = b;
    state.n = a.length;
    state.m = b.length;

    if (state.n === 0 || state.m === 0) {
      setExplanation("<i class='fas fa-exclamation-triangle'></i> One sequence is empty. LCS length is 0. Try entering both sequences!");
    } else if (state.n * state.m > 900 && state.algorithm === "standard") {
      setExplanation(
        "<i class='fas fa-exclamation-triangle'></i> Large table! Animation may be slower. Try rolling array or Hirschberg algorithm for better performance."
      );
    } else {
      setExplanation(`<i class='fas fa-check-circle'></i> Table initialized using ${state.algorithm} algorithm! Click 'Step' to see each comparison.`);
    }

    state.totalSteps = state.n * state.m + 1;
    state.currentStep = 0;
    state.backtrackingPath = [];
    updateStats();
    clearLcsDisplay();
    renderCharBoxes();
    updateCharHighlights();
    renderBacktrackingPath();

    // Initialize based on algorithm
    if (state.algorithm === "standard") {
      state.dp = Array.from({ length: state.n + 1 }, () =>
        Array(state.m + 1).fill(0)
      );
      state.dir = Array.from({ length: state.n + 1 }, () =>
        Array(state.m + 1).fill(null)
      );
    } else if (state.algorithm === "rolling") {
      // Initialize with 2 rows: prev and curr
      state.dp = [
        Array(state.m + 1).fill(0), // prev row (row 0)
        Array(state.m + 1).fill(0)  // curr row (row 1)
      ];
      // Still maintain dir for visualization if needed
      state.dir = Array.from({ length: state.n + 1 }, () =>
        Array(state.m + 1).fill(null)
      );
    } else if (state.algorithm === "hirschberg") {
      // Simplified simulation for visualization
      const rowsToShow = Math.min(state.n, 10);
      state.dp = Array.from({ length: rowsToShow + 1 }, () =>
        Array(state.m + 1).fill(0)
      );
      state.dir = Array.from({ length: state.n + 1 }, () =>
        Array(state.m + 1).fill(null)
      );
    }

    state.phase = "filling";
    state.i = 1;
    state.j = 1;
    state.lastFillI = null;
    state.lastFillJ = null;
    state.traceI = null;
    state.traceJ = null;
    state.lastTraceI = null;
    state.lastTraceJ = null;

    renderDpTable();
    highlightCode(state.algorithm === "rolling" ? "init" : "outer");
  }

  function renderDpTable() {
    const n = state.n;
    const m = state.m;
    const a = state.a;
    const b = state.b;
    const dp = state.dp;
    const dir = state.dir;

    // Update table title
    if (state.algorithm === "rolling") {
      els.dpTableTitle.innerHTML = `<i class='fas fa-layer-group'></i> Rolling Array (row ${state.i > 0 ? state.i : 1} of ${n})`;
    } else if (state.algorithm === "hirschberg") {
      els.dpTableTitle.innerHTML = `<i class='fas fa-code-branch'></i> Hirschberg Algorithm (simplified)`;
    } else {
      els.dpTableTitle.innerHTML = `<i class='fas fa-table'></i> DP Table dp[i][j]`;
    }

    let html = '<table class="dp-table"><thead><tr>';
    html += '<th class="corner header-cell">dp</th>';
    html += '<th class="header-cell">∅</th>';
    for (let j = 1; j <= m; j++) {
      html +=
        '<th class="header-cell">' + escapeHtml(b[j - 1] || "") + "<br><small style='font-size:8px;opacity:0.6;'>[" + j + "]</small></th>";
    }
    html += "</tr></thead><tbody>";

    const rowsToShow = state.algorithm === "hirschberg" ? Math.min(n, 10) : 
                      state.algorithm === "rolling" ? Math.min(state.i, 2) : n;
    
    for (let i = 0; i <= rowsToShow; i++) {
      // For rolling array, we only show up to current row
      if (state.algorithm === "rolling" && i > 1) continue;
      
      html += "<tr>";
      if (i === 0) {
        html += '<td class="header-col header-cell">∅</td>';
      } else {
        const rowIndex = state.algorithm === "rolling" ? 
                        (i === 1 ? state.i - 1 : state.i) : i;
        const displayChar = rowIndex <= n ? a[rowIndex - 1] : '';
        html +=
          '<td class="header-col header-cell">' + escapeHtml(displayChar || "") + 
          "<br><small style='font-size:8px;opacity:0.6;'>[" + rowIndex + "]</small></td>";
      }

      for (let j = 0; j <= m; j++) {
        const isBase = i === 0 || j === 0;
        const rowIndex = state.algorithm === "rolling" ? 
                        (i === 1 ? Math.max(0, state.i - 1) : state.i) : i;
        const isMatch = rowIndex > 0 && j > 0 && 
                       rowIndex <= n && j <= m && 
                       a[rowIndex - 1] === b[j - 1];
        const isCurrentFill =
          state.phase === "filling" &&
          ((state.algorithm === "rolling" && state.lastFillI === state.i && state.lastFillJ === j) ||
           (state.algorithm !== "rolling" && state.lastFillI === i && state.lastFillJ === j));
        const isTraceCell =
          (state.phase === "trace" || state.phase === "done") &&
          state.lastTraceI === i &&
          state.lastTraceJ === j;

        const classes = ["dp-cell"];
        if (isBase) classes.push("dp-cell-base");
        if (isMatch) classes.push("dp-cell-match");
        if (isCurrentFill) classes.push("dp-cell-current");
        if (isTraceCell) classes.push("dp-cell-trace");

        let arrow = "";
        if (!isBase && dir[rowIndex] && dir[rowIndex][j]) {
          const d = dir[rowIndex][j];
          if (d === "diag") arrow = "↖";
          else if (d === "up") arrow = "↑";
          else if (d === "left") arrow = "←";
        }

        let val = "";
        if (dp && dp[i]) {
          val = dp[i][j] !== undefined ? dp[i][j] : "";
        }
        const valClass = val === "" ? "dp-empty" : "";

        html += `<td class="${classes.join(" ")}">` +
          '<div class="dp-cell-inner">' +
          `<span class="dp-val ${valClass}">${val}</span>` +
          `<span class="dp-arrow">${arrow}</span>` +
          "</div></td>";
      }

      html += "</tr>";
    }

    if (state.algorithm === "hirschberg" && n > 10) {
      html += `<tr><td colspan="${m+2}" style="text-align: center; color: var(--text-muted); font-size: 9px; padding: 8px;">
        <i class="fas fa-ellipsis-h"></i> showing first 10 rows of ${n} total (Hirschberg uses divide & conquer)
      </td></tr>`;
    } else if (state.algorithm === "rolling" && n > 2) {
      html += `<tr><td colspan="${m+2}" style="text-align: center; color: var(--text-muted); font-size: 9px; padding: 8px;">
        <i class="fas fa-ellipsis-h"></i> rolling array only stores current and previous rows
      </td></tr>`;
    }

    html += "</tbody></table>";
    els.dpTableContainer.innerHTML = html;
  }

  function stepFilling() {
    const n = state.n;
    const m = state.m;
    const a = state.a;
    const b = state.b;

    if (n === 0 || m === 0) {
      state.phase = "trace";
      state.traceI = n;
      state.traceJ = m;
      setExplanation("<i class='fas fa-info-circle'></i> Trivial case: at least one sequence is empty, so LCS length is 0.");
      highlightCode("trace");
      renderDpTable();
      updateCharHighlights();
      return;
    }

    if (state.i > n) {
      state.phase = "trace";
      state.traceI = n;
      state.traceJ = m;
      state.lastFillI = null;
      state.lastFillJ = null;
      
      // Build backtracking path for standard algorithm
      if (state.algorithm === "standard") {
        buildBacktrackingPath();
      } else {
        // For rolling array and Hirschberg, we can't do full backtracking
        state.phase = "done";
        const lcsLength = state.algorithm === "rolling" ? state.dp[1][m] : state.dp[Math.min(n, 10)][m];
        setExplanation(`<i class='fas fa-check-circle'></i> Algorithm complete! LCS length = ${lcsLength}. Rolling array doesn't store full backtracking information.`);
        highlightCode(state.algorithm === "rolling" ? "result" : "recurse");
        renderDpTable();
        updateCharHighlights();
        renderBacktrackingPath();
        return;
      }
      
      setExplanation(`<i class='fas fa-check-circle'></i> DP table filled! LCS length = ${state.dp[n][m]}. Now tracing back from (${n}, ${m}) to find one LCS...`);
      highlightCode("trace");
      renderDpTable();
      updateCharHighlights();
      renderBacktrackingPath();
      return;
    }

    const i = state.i;
    const j = state.j;

    const charA = a[i - 1];
    const charB = b[j - 1];

    state.currentStep++;
    let explain = "";

    if (state.algorithm === "rolling") {
      // Rolling array logic
      highlightCode("if");
      if (charA === charB) {
        const val = (state.dp[0] ? state.dp[0][j - 1] : 0) + 1;
        state.dp[1][j] = val;
        state.dir[i][j] = "diag";
        explain = `<i class="fas fa-check-circle" style="color: var(--match);"></i> <strong>MATCH!</strong> A[${i}]='${charA}', B[${j}]='${charB}'. curr[${j}] = prev[${j-1}] + 1 = ${val}.`;
      } else {
        const top = state.dp[0][j];
        const left = state.dp[1][j - 1];
        if (top >= left) {
          state.dp[1][j] = top;
          state.dir[i][j] = "up";
          explain = `<i class="fas fa-times-circle" style="color: var(--danger);"></i> <strong>Different:</strong> A[${i}]='${charA}', B[${j}]='${charB}'. curr[${j}] = max(prev[${j}]=${top}, curr[${j-1}]=${left}) = ${top}.`;
        } else {
          state.dp[1][j] = left;
          state.dir[i][j] = "left";
          explain = `<i class="fas fa-times-circle" style="color: var(--danger);"></i> <strong>Different:</strong> A[${i}]='${charA}', B[${j}]='${charB}'. curr[${j}] = max(prev[${j}]=${top}, curr[${j-1}]=${left}) = ${left}.`;
        }
      }
      
      // For rolling array, also update the full dp for visualization
      if (state.dp.length <= i) {
        state.dp.push([...state.dp[1]]);
      } else {
        state.dp[i] = [...state.dp[1]];
      }
    } else {
      // Standard DP logic
      if (charA === charB) {
        highlightCode("match");
        const val = state.dp[i - 1][j - 1] + 1;
        state.dp[i][j] = val;
        state.dir[i][j] = "diag";
        explain = `<i class="fas fa-check-circle" style="color: var(--match);"></i> <strong>MATCH!</strong> A[${i}]='${charA}', B[${j}]='${charB}'. dp[${i}][${j}] = dp[${i-1}][${j-1}] + 1 = ${val}.`;
      } else {
        highlightCode("mismatch");
        const top = state.dp[i - 1][j];
        const left = state.dp[i][j - 1];
        if (top >= left) {
          state.dp[i][j] = top;
          state.dir[i][j] = "up";
          explain = `<i class="fas fa-times-circle" style="color: var(--danger);"></i> <strong>Different:</strong> A[${i}]='${charA}', B[${j}]='${charB}'. dp[${i}][${j}] = max(${top}, ${left}) = ${top}.`;
        } else {
          state.dp[i][j] = left;
          state.dir[i][j] = "left";
          explain = `<i class="fas fa-times-circle" style="color: var(--danger);"></i> <strong>Different:</strong> A[${i}]='${charA}', B[${j}]='${charB}'. dp[${i}][${j}] = max(${top}, ${left}) = ${left}.`;
        }
      }
    }

    state.lastFillI = i;
    state.lastFillJ = j;
    setExplanation(explain);
    updateStats();

    state.j++;
    if (state.j > m) {
      // Move to next row
      state.j = 1;
      
      // For rolling array, swap rows
      if (state.algorithm === "rolling") {
        // Move current row to previous row
        state.dp[0] = [...state.dp[1]];
        // Reset current row for next iteration
        state.dp[1] = Array(m + 1).fill(0);
        highlightCode("swap");
      }
      
      state.i++;
      if (state.i <= n) {
        highlightCode(state.algorithm === "rolling" ? "forj" : "inner");
      }
    }

    renderDpTable();
    updateCharHighlights();
  }

  function buildBacktrackingPath() {
    state.backtrackingPath = [];
    let i = state.n;
    let j = state.m;
    
    while (i > 0 && j > 0) {
      const isMatch = state.dir[i][j] === "diag";
      state.backtrackingPath.unshift([i, j, isMatch]);
      
      if (state.dir[i][j] === "diag") {
        i--;
        j--;
      } else if (state.dir[i][j] === "up") {
        i--;
      } else {
        j--;
      }
    }
    
    // Add start position
    if (i === 0 && j === 0) {
      state.backtrackingPath.unshift([0, 0, false]);
    }
  }

  function stepTraceback() {
    const n = state.n;
    const m = state.m;
    const a = state.a;

    if (state.traceI === null || state.traceJ === null) {
      state.traceI = n;
      state.traceJ = m;
    }

    const i = state.traceI;
    const j = state.traceJ;

    if (i <= 0 || j <= 0) {
      state.phase = "done";
      setExplanation(
        `<i class="fas fa-trophy" style="color: var(--trace);"></i> <strong>Traceback finished!</strong> Found LCS: "${state.lcsChars.join("")}" with length ${state.lcsChars.length}. The yellow path shows how we recovered it.`
      );
      highlightCode("trace");
      renderDpTable();
      updateCharHighlights();
      renderBacktrackingPath();
      return;
    }

    const direction = state.dir[i][j];
    const charA = a[i - 1];

    state.lastTraceI = i;
    state.lastTraceJ = j;

    // Update backtracking path visualization
    const pathIndex = state.backtrackingPath.findIndex(cell => 
      cell[0] === i && cell[1] === j
    );
    if (pathIndex >= 0) {
      // Highlight current position in path
      renderBacktrackingPath();
    }

    if (direction === "diag") {
      state.lcsChars.unshift(charA);
      setExplanation(
        `<i class="fas fa-map-marker-alt" style="color: var(--trace);"></i> Cell (${i}, ${j}) has diagonal arrow ↖. This means A[${i}]='${charA}' is part of the LCS! Moving to (${i - 1}, ${j - 1}).`
      );
      state.traceI = i - 1;
      state.traceJ = j - 1;
    } else if (direction === "up") {
      setExplanation(
        `<i class="fas fa-map-marker-alt" style="color: var(--trace);"></i> Cell (${i}, ${j}) has upward arrow ↑. Moving to (${i - 1}, ${j}). We skip A[${i}]='${charA}'.`
      );
      state.traceI = i - 1;
    } else if (direction === "left") {
      setExplanation(
        `<i class="fas fa-map-marker-alt" style="color: var(--trace);"></i> Cell (${i}, ${j}) has left arrow ←. Moving to (${i}, ${j - 1}).`
      );
      state.traceJ = j - 1;
    } else {
      state.traceI = i - 1;
      state.traceJ = j;
    }

    setLcsDisplay();
    highlightCode("trace");
    renderDpTable();
    updateCharHighlights();
  }

  function stepOnce() {
    if (state.phase === "idle") {
      setExplanation("<i class='fas fa-exclamation-triangle'></i> Click 'Initialize' first to start the algorithm!");
      return;
    }

    if (state.phase === "filling") {
      stepFilling();
      return;
    }

    if (state.phase === "trace") {
      stepTraceback();
      return;
    }

    if (state.phase === "done") {
      setExplanation("<i class='fas fa-check-circle'></i> Algorithm complete! Click 'Reset' or change inputs to try again.");
    }
  }

  function startAutoPlay() {
    if (state.playing) return;
    state.playing = true;
    if (state.phase === "idle") {
      initDp();
    }
    if (state.intervalId) clearInterval(state.intervalId);
    state.intervalId = setInterval(() => {
      if (state.phase === "done") {
        stopAutoPlay();
        return;
      }
      stepOnce();
    }, state.speed);
  }

  function stopAutoPlay() {
    state.playing = false;
    if (state.intervalId) {
      clearInterval(state.intervalId);
      state.intervalId = null;
    }
  }

  function resetAll() {
    stopAutoPlay();
    state.a = "";
    state.b = "";
    state.n = 0;
    state.m = 0;
    state.dp = [];
    state.dir = [];
    state.phase = "idle";
    state.i = 1;
    state.j = 1;
    state.lastFillI = null;
    state.lastFillJ = null;
    state.traceI = null;
    state.traceJ = null;
    state.lastTraceI = null;
    state.lastTraceJ = null;
    state.currentStep = 0;
    state.totalSteps = 0;
    state.backtrackingPath = [];
    state.rollingDP = null;
    clearLcsDisplay();
    updateStats();
    els.dpTableContainer.innerHTML = "";
    els.charsA.innerHTML = "";
    els.charsB.innerHTML = "";
    setExplanation("<i class='fas fa-info-circle'></i> Enter two sequences and click 'Initialize' to begin. Watch the characters compare step-by-step!");
    highlightCode(null);
    updateCharHighlights();
    renderBacktrackingPath();
  }

  // Premium Slider Initialization
  function initializePremiumSlider() {
    const slider = els.speedSlider;
    const thumb = document.getElementById('sliderThumb');
    const fill = document.getElementById('sliderFill');
    const marks = document.getElementById('speedMarks');
    
    if (!slider || !thumb || !fill) return;
    
    function updateSliderUI() {
      const value = parseInt(slider.value);
      const min = parseInt(slider.min);
      const max = parseInt(slider.max);
      const percentage = ((value - min) / (max - min)) * 100;
      
      // Update thumb position with smooth transition
      thumb.style.transition = 'left 0.1s ease, transform 0.15s ease';
      thumb.style.left = `${percentage}%`;
      
      // Update fill width
      fill.style.width = `${percentage}%`;
      
      // Update active marks
      if (marks) {
        document.querySelectorAll('.slider-mark').forEach(mark => {
          const markValue = parseInt(mark.dataset.value);
          if (Math.abs(value - markValue) <= 20) { // Snap to nearest mark
            mark.classList.add('active');
          } else {
            mark.classList.remove('active');
          }
        });
      }
      
      // Update state and label
      state.speed = value;
      updateSpeedLabel();
    }
    
    // Initial update
    updateSliderUI();
    
    // Update on input
    slider.addEventListener('input', function(e) {
      updateSliderUI();
      
      // Add pulse effect on value change
      thumb.style.animation = 'none';
      setTimeout(() => {
        thumb.style.animation = 'thumbPulse 0.4s ease';
      }, 10);
      
      // Update playback speed if playing
      if (state.playing) {
        stopAutoPlay();
        startAutoPlay();
      }
    });
    
    // Add clickable marks
    if (marks) {
      marks.querySelectorAll('.slider-mark').forEach(mark => {
        mark.addEventListener('click', () => {
          const value = parseInt(mark.dataset.value);
          slider.value = value;
          updateSliderUI();
          
          // Trigger input event
          slider.dispatchEvent(new Event('input', { bubbles: true }));
          
          // Visual feedback
          mark.style.transform = 'scale(0.95)';
          setTimeout(() => {
            mark.style.transform = 'scale(1)';
          }, 150);
        });
      });
    }
    
    // Add drag functionality for better UX
    let isDragging = false;
    
    thumb.addEventListener('mousedown', startDrag);
    thumb.addEventListener('touchstart', startDrag);
    
    function startDrag(e) {
      e.preventDefault();
      isDragging = true;
      thumb.classList.add('active');
      
      const sliderRect = slider.getBoundingClientRect();
      const sliderWidth = sliderRect.width;
      
      function moveHandler(clientX) {
        if (!isDragging) return;
        
        const x = Math.min(Math.max(clientX - sliderRect.left, 0), sliderWidth);
        const percentage = (x / sliderWidth) * 100;
        const min = parseInt(slider.min);
        const max = parseInt(slider.max);
        const step = parseInt(slider.step);
        
        // Calculate value
        let value = Math.round((percentage / 100) * (max - min)) + min;
        
        // Snap to step
        value = Math.round(value / step) * step;
        
        // Clamp value
        value = Math.max(min, Math.min(max, value));
        
        // Update slider
        slider.value = value;
        updateSliderUI();
        
        // Dispatch input event for any listeners
        slider.dispatchEvent(new Event('input', { bubbles: true }));
      }
      
      function onMouseMove(e) {
        moveHandler(e.clientX);
      }
      
      function onTouchMove(e) {
        if (e.touches.length > 0) {
          moveHandler(e.touches[0].clientX);
        }
      }
      
      function stopDrag() {
        isDragging = false;
        thumb.classList.remove('active');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', stopDrag);
      }
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', stopDrag);
    }
    
    // Add keyboard support
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        thumb.style.animation = 'thumbPulse 0.3s ease';
      }
    });
    
    // Responsive adjustments
    function handleResize() {
      // Force UI update on resize
      updateSliderUI();
    }
    
    window.addEventListener('resize', handleResize);
  }

  function attachEvents() {
    els.initBtn.addEventListener("click", () => {
      stopAutoPlay();
      initDp();
    });

    els.stepBtn.addEventListener("click", () => {
      stopAutoPlay();
      stepOnce();
    });

    els.playBtn.addEventListener("click", () => {
      startAutoPlay();
    });

    els.pauseBtn.addEventListener("click", () => {
      stopAutoPlay();
    });

    els.resetBtn.addEventListener("click", () => {
      resetAll();
    });

    els.themeToggle.addEventListener("click", toggleTheme);

    document.querySelectorAll(".algo-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        setAlgorithm(tab.dataset.algo);
      });
    });

    document.querySelectorAll(".chip[data-preset]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const preset = chip.getAttribute("data-preset");
        if (preset === "classic") {
          els.seqA.value = "AGGTAB";
          els.seqB.value = "GXTXAYB";
        } else if (preset === "match-heavy") {
          els.seqA.value = "ABCDGH";
          els.seqB.value = "AEDFHR";
        } else if (preset === "almost-equal") {
          els.seqA.value = "ABCDEF";
          els.seqB.value = "ABDFEF";
        } else if (preset === "simple") {
          els.seqA.value = "ABC";
          els.seqB.value = "AC";
        }
        stopAutoPlay();
        initDp();
      });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT') return;
      
      switch(e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          stepOnce();
          break;
        case 'r':
        case 'R':
          if (e.ctrlKey) {
            e.preventDefault();
            resetAll();
          }
          break;
        case 'i':
        case 'I':
          if (e.ctrlKey) {
            e.preventDefault();
            els.initBtn.click();
          }
          break;
        case 'p':
        case 'P':
          if (e.ctrlKey) {
            e.preventDefault();
            if (state.playing) {
              stopAutoPlay();
            } else {
              startAutoPlay();
            }
          }
          break;
      }
    });
  }

  function initDefaultValues() {
    els.seqA.value = "AGGTAB";
    els.seqB.value = "GXTXAYB";
    state.speed = Number(els.speedSlider.value);
    updateSpeedLabel();
    renderPseudocode();
    initDp();
  }

  function init() {
    cacheElements();
    loadTheme();
    initModeSelection();
    attachEvents();
    initializePremiumSlider();
    initDefaultValues();
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();