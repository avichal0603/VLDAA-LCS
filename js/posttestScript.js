document.addEventListener('DOMContentLoaded', function() {
    // Quiz data
    const quizData = [
        {
            id: 1,
            question: "Why do we add <code>+1</code> in LCS DP when characters match?",
            options: [
                "To count both characters",
                "To extend an existing optimal subsequence",
                "To move diagonally",
                "To increase table size"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>Why +1 in LCS DP?</h3>
                <p>We add <span class="highlight">+1</span> when characters match to extend the optimal subsequence found so far.</p>
                
                <h3>DP Table Logic</h3>
                <p>When characters at position (i, j) match:</p>
                <p style="text-align: center; margin: 10px 0;"><span class="highlight">dp[i][j] = dp[i-1][j-1] + 1</span></p>
                
                <h3>Example</h3>
                <p>Strings: "ABCD" and "ACDF"</p>
                <table class="dp-table">
                    <tr>
                        <th></th><th>A</th><th>C</th><th>D</th><th>F</th>
                    </tr>
                    <tr>
                        <th>A</th><td class="match-cell">1</td><td>1</td><td>1</td><td>1</td>
                    </tr>
                    <tr>
                        <th>B</th><td>1</td><td>1</td><td>1</td><td>1</td>
                    </tr>
                    <tr>
                        <th>C</th><td>1</td><td class="match-cell">2</td><td>2</td><td>2</td>
                    </tr>
                    <tr>
                        <th>D</th><td>1</td><td>2</td><td class="match-cell">3</td><td>3</td>
                    </tr>
                </table>
                
                <h3>Key Insight</h3>
                <p>The matching character extends the LCS found for the prefixes (i-1, j-1) by 1, creating a longer common subsequence.</p>
            `
        },
        {
            id: 2,
            question: "When LCS characters don't match, why do we take <code>max(dp[i-1][j], dp[i][j-1])</code>?",
            options: [
                "To skip one character from either string",
                "To ensure lexicographically smallest LCS",
                "To reduce space",
                "To force recursion"
            ],
            correctAnswer: 0,
            visualization: `
                <h3>Handling Non-matching Characters</h3>
                <p>When characters don't match, we take the maximum of two possibilities:</p>
                
                <h3>The Two Cases</h3>
                <p><strong>Case 1:</strong> Skip character from first string → dp[i-1][j]</p>
                <p><strong>Case 2:</strong> Skip character from second string → dp[i][j-1]</p>
                <p style="text-align: center; margin: 15px 0;"><span class="highlight">dp[i][j] = max(dp[i-1][j], dp[i][j-1])</span></p>
                
                <h3>Example</h3>
                <p>Comparing 'A' from "ABCD" with 'B' from "ABCE":</p>
                <ul style="margin-left: 20px;">
                    <li>Option 1: Skip 'A', compare "" with "ABCE" → 0</li>
                    <li>Option 2: Skip 'B', compare "A" with "ACE" → 1</li>
                    <li>Maximum is 1</li>
                </ul>
                
                <h3>Why This Works</h3>
                <p>We're exploring both possibilities of which character to skip, ensuring we don't miss a longer subsequence.</p>
            `
        },
        {
            id: 3,
            question: "What does the DP table entry <code>dp[i]</code> represent in Rod Cutting?",
            options: [
                "Number of cuts",
                "Maximum revenue for a rod of length i",
                "Price of rod piece i",
                "Length of rod remaining"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>Rod Cutting DP Table</h3>
                <p><span class="highlight">dp[i]</span> stores the <strong>maximum revenue</strong> achievable for a rod of length <span class="highlight">i</span>.</p>
                
                <h3>Example</h3>
                <p>Prices: [0, 1, 5, 8, 9] for lengths 0-4</p>
                <table class="dp-table">
                    <tr>
                        <th>Length (i)</th><th>dp[i] (Max Revenue)</th><th>How calculated</th>
                    </tr>
                    <tr>
                        <td>0</td><td>0</td><td>Base case</td>
                    </tr>
                    <tr>
                        <td>1</td><td>1</td><td>max(price[1]) = 1</td>
                    </tr>
                    <tr>
                        <td>2</td><td>5</td><td>max(price[2], price[1]+dp[1]) = max(5, 1+1) = 5</td>
                    </tr>
                    <tr>
                        <td>3</td><td>8</td><td>max(price[3], price[1]+dp[2], price[2]+dp[1]) = max(8, 1+5, 5+1) = 8</td>
                    </tr>
                    <tr>
                        <td>4</td><td>10</td><td>max(price[4], price[1]+dp[3], price[2]+dp[2], price[3]+dp[1]) = max(9, 1+8, 5+5, 8+1) = 10</td>
                    </tr>
                </table>
                
                <h3>Recurrence Relation</h3>
                <p style="text-align: center; margin: 15px 0;"><span class="highlight">dp[n] = max(price[i] + dp[n-i])</span> for all i from 1 to n</p>
            `
        },
        {
            id: 4,
            question: "Can LCS problem be performed in less than O(n²) space and still be in a state from which the actual LCS can be retrieved?",
            options: [
                "Yes, through rolling arrays",
                "Yes, through Hirschberg's algorithm",
                "No, because there are 2 strings and at least a matrix is required to perform DP",
                "No, because backtracking requires a matrix to cover all the possible combinations"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>Space Optimization for LCS</h3>
                <p><span class="highlight">Hirschberg's algorithm</span> can solve LCS in O(n*m) time and O(min(n,m)) space while still recovering the actual LCS.</p>
                
                <h3>How It Works</h3>
                <p>Hirschberg's algorithm uses a divide-and-conquer approach:</p>
                <ol style="margin-left: 20px; margin-bottom: 15px;">
                    <li>Find the midpoint of the first string</li>
                    <li>Compute LCS lengths from both ends</li>
                    <li>Find the optimal split point</li>
                    <li>Recursively solve two subproblems</li>
                </ol>
                
                <h3>Space Comparison</h3>
                <table class="dp-table">
                    <tr>
                        <th>Algorithm</th><th>Time</th><th>Space</th><th>Can recover LCS?</th>
                    </tr>
                    <tr>
                        <td>Standard DP</td><td>O(n*m)</td><td>O(n*m)</td><td>Yes</td>
                    </tr>
                    <tr>
                        <td>Rolling Arrays</td><td>O(n*m)</td><td>O(min(n,m))</td><td>No</td>
                    </tr>
                    <tr>
                        <td><strong>Hirschberg's</strong></td><td>O(n*m)</td><td>O(min(n,m))</td><td><strong>Yes</strong></td>
                    </tr>
                </table>
                
                <h3>Why This Matters</h3>
                <p>For very large strings (millions of characters), O(n*m) space becomes impractical, making Hirschberg's algorithm essential.</p>
            `
        },
        {
            id: 5,
            question: "Can LCS have multiple optimal solutions of the same length?",
            options: [
                "No",
                "Yes",
                "Only for equal strings",
                "Only for small inputs"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>Multiple Optimal LCS Solutions</h3>
                <p><span class="highlight">Yes</span>, LCS can have multiple optimal solutions of the same maximum length.</p>
                
                <h3>Example</h3>
                <p>String 1: <span class="highlight">"ABCBDAB"</span></p>
                <p>String 2: <span class="highlight">"BDCABA"</span></p>
                <p>LCS Length: <span class="highlight">4</span></p>
                <p>Possible LCS of length 4:</p>
                <ul style="margin-left: 20px;">
                    <li>"BCAB"</li>
                    <li>"BCBA"</li>
                    <li>"BDAB"</li>
                </ul>
                
                <h3>DP Table Shows Multiple Paths</h3>
                <p>When there are equal values in dp[i-1][j] and dp[i][j-1], it indicates multiple ways to achieve the same LCS length.</p>
                
                <table class="dp-table" style="max-width: 300px;">
                    <tr>
                        <th></th><th>B</th><th>D</th><th>C</th><th>A</th><th>B</th><th>A</th>
                    </tr>
                    <tr>
                        <th>A</th><td>0</td><td>0</td><td>0</td><td class="match-cell">1</td><td>1</td><td>1</td>
                    </tr>
                    <tr>
                        <th>B</th><td class="match-cell">1</td><td>1</td><td>1</td><td>1</td><td class="match-cell">2</td><td>2</td>
                    </tr>
                    <tr>
                        <th>C</th><td>1</td><td>1</td><td class="match-cell">2</td><td>2</td><td>2</td><td>2</td>
                    </tr>
                </table>
                
                <h3>Backtracking for All Solutions</h3>
                <p>To find all LCS, you need to explore all paths when there are ties in the DP table.</p>
            `
        },
        {
            id: 6,
            question: "Why does Rod Cutting consider all possible first cuts?",
            options: [
                "To reduce memory usage",
                "Because the optimal solution may start with any cut length",
                "To ensure greedy choice",
                "To avoid recursion"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>Considering All First Cuts</h3>
                <p>Rod Cutting must consider all possible first cuts because <span class="highlight">the optimal solution could start with any cut length</span>.</p>
                
                <h3>Why Not Greedy?</h3>
                <p>A greedy approach (always cut the most profitable piece first) doesn't work because:</p>
                <ul style="margin-left: 20px;">
                    <li>Prices are non-linear</li>
                    <li>Optimal combination might use less profitable pieces</li>
                    <li>Interaction between pieces affects total revenue</li>
                </ul>
                
                <h3>Example</h3>
                <p>Rod length: 5, Prices: [1, 5, 8, 9, 10]</p>
                <p>Considering all first cuts:</p>
                <table class="dp-table">
                    <tr>
                        <th>First Cut</th><th>Remaining</th><th>Revenue</th><th>Total</th>
                    </tr>
                    <tr>
                        <td>1</td><td>4</td><td>1 + dp[4] = 1 + 10 = 11</td><td>11</td>
                    </tr>
                    <tr>
                        <td>2</td><td>3</td><td>5 + dp[3] = 5 + 8 = 13</td><td>13</td>
                    </tr>
                    <tr>
                        <td>3</td><td>2</td><td>8 + dp[2] = 8 + 5 = 13</td><td>13</td>
                    </tr>
                    <tr>
                        <td>4</td><td>1</td><td>9 + dp[1] = 9 + 1 = 10</td><td>10</td>
                    </tr>
                    <tr>
                        <td>5</td><td>0</td><td>10 + dp[0] = 10 + 0 = 10</td><td>10</td>
                    </tr>
                </table>
                <p><strong>Optimal:</strong> First cut of 2 or 3 gives revenue 13</p>
            `
        },
        {
            id: 7,
            question: "You are given two strings X = 'ABCBDAB', Y = 'BDCABA'. You are also given a rod of length 7, with prices: Length 1=1, 2=5, 3=8, 4=9, 5=10, 6=17, 7=17. Which statement is correct?",
            options: [
                "The length of the LCS of X and Y is 4, and the optimal rod-cutting solution does not cut the rod at all.",
                "The length of the LCS of X and Y is 3, and the optimal rod-cutting solution makes exactly one cut.",
                "The LCS length is 4, and the optimal rod-cutting solution uses exactly one cut.",
                "The LCS length is 5, and the optimal rod-cutting solution gives a maximum revenue of 17 using one cut."
            ],
            correctAnswer: 2,
            visualization: `
                <h3>Two Problems Analysis</h3>
                
                <h3>Part 1: LCS of X and Y</h3>
                <p>X = "ABCBDAB", Y = "BDCABA"</p>
                <p>Common subsequences include: "BCBA", "BDAB", "BCAB" (all length 4)</p>
                <p><strong>LCS Length = 4</strong></p>
                
                <h3>Part 2: Rod Cutting</h3>
                <p>Length 7, Prices: [1, 5, 8, 9, 10, 17, 17]</p>
                <p>Calculate optimal revenue:</p>
                <ul style="margin-left: 20px;">
                    <li>dp[1] = 1</li>
                    <li>dp[2] = max(5, 1+1) = 5</li>
                    <li>dp[3] = max(8, 1+5, 5+1) = 8</li>
                    <li>dp[4] = max(9, 1+8, 5+5, 8+1) = 10</li>
                    <li>dp[5] = max(10, 1+10, 5+8, 8+5, 9+1) = 13</li>
                    <li>dp[6] = max(17, 1+13, 5+10, 8+8, 9+5, 10+1) = 17</li>
                    <li>dp[7] = max(17, 1+17, 5+13, 8+10, 9+8, 10+5, 17+1) = 18</li>
                </ul>
                <p><strong>Optimal revenue = 18</strong> (cut into 6+1 or 1+6)</p>
                <p>Uses exactly one cut (2 pieces total)</p>
                
                <h3>Conclusion</h3>
                <p>LCS length = 4, Rod cutting uses 1 cut for optimal solution.</p>
            `
        },
        {
            id: 8,
            question: "What happens when two choices give the same optimal DP value?",
            options: [
                "The algorithm fails",
                "Multiple optimal solutions exist",
                "DP table resets",
                "Greedy solution is chosen"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>Multiple Optimal Solutions</h3>
                <p>When two choices give the same optimal DP value, it indicates that <span class="highlight">multiple optimal solutions exist</span>.</p>
                
                <h3>Example in LCS</h3>
                <p>When dp[i-1][j] == dp[i][j-1], there are two equally good ways to proceed:</p>
                <ul style="margin-left: 20px;">
                    <li>Skip character from first string</li>
                    <li>Skip character from second string</li>
                </ul>
                <p>Both lead to LCS of the same length, but potentially different subsequences.</p>
                
                <h3>Example in Rod Cutting</h3>
                <p>For rod length 5 with prices [1, 5, 8, 9, 10]:</p>
                <p>dp[5] = 13 could be achieved by:</p>
                <ul style="margin-left: 20px;">
                    <li>Cut 2 + 3: 5 + 8 = 13</li>
                    <li>Cut 3 + 2: 8 + 5 = 13</li>
                </ul>
                
                <h3>DP Table Shows Ties</h3>
                <p>In the DP table, equal values at decision points indicate branching paths to optimal solutions.</p>
                
                <table class="dp-table" style="max-width: 250px;">
                    <tr>
                        <th></th><th>A</th><th>B</th><th>C</th>
                    </tr>
                    <tr>
                        <th>A</th><td>1</td><td>1</td><td>1</td>
                    </tr>
                    <tr>
                        <th>B</th><td>1</td><td>2</td><td>2</td>
                    </tr>
                    <tr>
                        <th>C</th><td>1</td><td>2</td><td>3</td>
                    </tr>
                </table>
                <p>At dp[2][3], value 2 could come from left or above, indicating multiple paths.</p>
            `
        },
        {
            id: 9,
            question: "Why is recursion alone inefficient for these problems?",
            options: [
                "Stack overflow",
                "Recomputes identical subproblems",
                "Cannot handle strings",
                "Cannot maximize profit"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>The Problem with Pure Recursion</h3>
                <p>Pure recursion is inefficient because it <span class="highlight">recomputes identical subproblems</span> multiple times.</p>
                
                <h3>Recursive Tree for LCS</h3>
                <p>For strings of length n and m, naive recursion has time complexity O(2<sup>n+m</sup>).</p>
                
                <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p>LCS("ABC", "XYZ") calls:</p>
                    <p style="font-family: monospace; margin: 5px 0;">LCS("ABC", "XYZ")</p>
                    <p style="font-family: monospace; margin: 5px 0;">├── LCS("AB", "XYZ")</p>
                    <p style="font-family: monospace; margin: 5px 0;">│   ├── LCS("A", "XYZ") ← Computed multiple times!</p>
                    <p style="font-family: monospace; margin: 5px 0;">│   └── LCS("AB", "XY")</p>
                    <p style="font-family: monospace; margin: 5px 0;">└── LCS("ABC", "XY")</p>
                    <p style="font-family: monospace; margin: 5px 0;">    ├── LCS("AB", "XY") ← Duplicate computation!</p>
                    <p style="font-family: monospace; margin: 5px 0;">    └── LCS("ABC", "X")</p>
                </div>
                
                <h3>DP Solution</h3>
                <p>Dynamic Programming stores results in a table:</p>
                <table class="dp-table" style="max-width: 200px;">
                    <tr>
                        <th></th><th>X</th><th>Y</th><th>Z</th>
                    </tr>
                    <tr>
                        <th>A</th><td>0</td><td>0</td><td>0</td>
                    </tr>
                    <tr>
                        <th>B</th><td>0</td><td>0</td><td>0</td>
                    </tr>
                    <tr>
                        <th>C</th><td>0</td><td>0</td><td>0</td>
                    </tr>
                </table>
                <p>Each subproblem computed once → O(n*m) time</p>
            `
        },
        {
            id: 10,
            question: "For very large inputs, what becomes the biggest limitation in standard DP?",
            options: [
                "Syntax",
                "CPU speed",
                "Memory usage",
                "Input reading"
            ],
            correctAnswer: 2,
            visualization: `
                <h3>Memory Limitation in DP</h3>
                <p>For very large inputs, <span class="highlight">memory usage</span> becomes the primary limitation in standard DP implementations.</p>
                
                <h3>Space Complexity Examples</h3>
                <table class="dp-table">
                    <tr>
                        <th>Problem</th><th>Space Complexity</th><th>Memory for n=10,000</th>
                    </tr>
                    <tr>
                        <td>LCS Standard DP</td><td>O(n*m)</td><td>100M cells × 4 bytes = 400MB</td>
                    </tr>
                    <tr>
                        <td>Rod Cutting DP</td><td>O(n)</td><td>10K cells × 4 bytes = 40KB</td>
                    </tr>
                    <tr>
                        <td>Matrix Chain Multiplication</td><td>O(n²)</td><td>100M cells × 4 bytes = 400MB</td>
                    </tr>
                </table>
                
                <h3>Why Memory Matters</h3>
                <ul style="margin-left: 20px;">
                    <li>DP tables grow quadratically with input size</li>
                    <li>Cache misses increase with large tables</li>
                    <li>Memory bandwidth becomes bottleneck</li>
                    <li>Can exceed available RAM for large problems</li>
                </ul>
                
                <h3>Solutions</h3>
                <p>To handle large inputs:</p>
                <ol style="margin-left: 20px;">
                    <li>Use space-optimized versions (rolling arrays)</li>
                    <li>Implement memory-efficient algorithms (Hirschberg's for LCS)</li>
                    <li>Use disk-based storage for massive tables</li>
                    <li>Apply approximation algorithms</li>
                </ol>
            `
        }
    ];
    
    // Quiz state
    const state = {
        currentQuestion: 0,
        userAnswers: new Array(quizData.length).fill(null),
        scores: {
            correct: 0,
            incorrect: 0
        },
        submitted: false
    };
    
    // DOM elements
    const questionNumberEl = document.getElementById('question-number');
    const questionTextEl = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackText = document.getElementById('feedback-text');
    const feedbackExplanation = document.getElementById('feedback-explanation');
    const visualSubtitle = document.getElementById('visual-subtitle');
    const visualContent = document.getElementById('visual-content');
    const currentQuestionEl = document.getElementById('current-question');
    const correctCountEl = document.getElementById('correct-count');
    const progressFillEl = document.getElementById('progress-fill');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const resultsOverlay = document.getElementById('results-overlay');
    const finalScoreEl = document.getElementById('final-score');
    const scoreMessageEl = document.getElementById('score-message');
    const feedbackFinalEl = document.getElementById('final-feedback');
    const completionMessageEl = document.getElementById('completion-message');
    const retakeBtn = document.getElementById('retake-btn');
    const reviewBtn = document.getElementById('review-btn');
    const proceedBtn = document.getElementById('proceed-btn');
    const totalQuestionsEl = document.getElementById('total-questions');
    
    // Initialize
    totalQuestionsEl.textContent = quizData.length;
    loadQuestion(state.currentQuestion);
    updateProgress();
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        if (state.currentQuestion > 0) {
            state.currentQuestion--;
            loadQuestion(state.currentQuestion);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        // Check if current question is answered before proceeding
        if (state.userAnswers[state.currentQuestion] === null) {
            alert("Please select an answer before proceeding to the next question.");
            return;
        }
        
        if (state.currentQuestion < quizData.length - 1) {
            state.currentQuestion++;
            loadQuestion(state.currentQuestion);
        } else {
            showResults();
        }
    });
    
    retakeBtn.addEventListener('click', resetQuiz);
    reviewBtn.addEventListener('click', () => {
        showPerformanceReview();
    });
    proceedBtn.addEventListener('click', () => {
        // Redirect to main page
        window.location.href = "../main/mainpage.html";
    });
    
    // Functions
    function loadQuestion(index) {
        const question = quizData[index];
        
        // Update question info
        questionNumberEl.textContent = `Question ${index + 1}`;
        questionTextEl.innerHTML = question.question;
        currentQuestionEl.textContent = index + 1;
        
        // Update progress bar
        updateProgress();
        
        // Clear previous selections
        optionsContainer.innerHTML = '';
        feedbackArea.className = 'feedback-area';
        feedbackArea.style.display = 'none';
        
        // Update visualization panel
        visualSubtitle.textContent = 'Select an option to see detailed explanation';
        visualContent.innerHTML = `
            <div class="default-visualization">
                <i class="fas fa-mouse-pointer"></i>
                <h3>Select an Answer</h3>
                <p>Choose one of the options to see detailed explanation and visualization here.</p>
            </div>
        `;
        
        // Create options
        const optionLetters = ['A', 'B', 'C', 'D'];
        question.options.forEach((optionText, i) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.dataset.index = i;
            
            const optionLetter = document.createElement('span');
            optionLetter.className = 'option-letter';
            optionLetter.textContent = optionLetters[i];
            
            const optionTextSpan = document.createElement('span');
            optionTextSpan.className = 'option-text';
            optionTextSpan.textContent = optionText;
            
            optionDiv.appendChild(optionLetter);
            optionDiv.appendChild(optionTextSpan);
            
            // Check if already answered
            if (state.userAnswers[index] === i) {
                optionDiv.classList.add('selected');
                if (state.userAnswers[index] === question.correctAnswer) {
                    optionDiv.classList.add('correct');
                } else {
                    optionDiv.classList.add('incorrect');
                }
            }
            
            optionDiv.addEventListener('click', () => selectOption(index, i));
            optionsContainer.appendChild(optionDiv);
        });
        
        // Update navigation buttons
        prevBtn.disabled = index === 0;
        
        // Enable/disable next button based on whether current question is answered
        nextBtn.disabled = state.userAnswers[index] === null;
        
        if (index === quizData.length - 1) {
            nextBtn.innerHTML = 'Submit Test <i class="fas fa-paper-plane"></i>';
        } else {
            nextBtn.innerHTML = 'Next Question <i class="fas fa-arrow-right"></i>';
        }
        
        // Show feedback if already answered
        if (state.userAnswers[index] !== null) {
            showFeedback(index);
        }
    }
    
    function selectOption(questionIndex, optionIndex) {
        if (state.submitted) return;
        
        const question = quizData[questionIndex];
        state.userAnswers[questionIndex] = optionIndex;
        
        // Update score
        updateScore();
        
        // Enable next button since question is now answered
        nextBtn.disabled = false;
        
        // Show visual feedback on options
        const options = document.querySelectorAll('.option');
        options.forEach((opt, i) => {
            opt.classList.remove('selected', 'correct', 'incorrect');
            if (i === optionIndex) {
                opt.classList.add('selected');
                if (i === question.correctAnswer) {
                    opt.classList.add('correct');
                } else {
                    opt.classList.add('incorrect');
                }
            } else if (i === question.correctAnswer) {
                opt.classList.add('correct');
            }
        });
        
        // Show feedback area
        showFeedback(questionIndex);
        
        // Update visualization
        updateVisualization(questionIndex, optionIndex);
    }
    
    function showFeedback(questionIndex) {
        const question = quizData[questionIndex];
        const userAnswer = state.userAnswers[questionIndex];
        
        if (userAnswer === null) return;
        
        const isCorrect = userAnswer === question.correctAnswer;
        
        feedbackArea.className = `feedback-area show ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackText.className = `feedback-text ${isCorrect ? 'correct' : 'incorrect'}`;
        
        if (isCorrect) {
            feedbackText.innerHTML = '<i class="fas fa-check-circle"></i> Correct!';
            feedbackExplanation.textContent = 'You selected the right answer.';
        } else {
            feedbackText.innerHTML = '<i class="fas fa-times-circle"></i> Incorrect';
            feedbackExplanation.textContent = `The correct answer is: ${String.fromCharCode(65 + question.correctAnswer)}. ${question.options[question.correctAnswer]}`;
        }
    }
    
    function updateVisualization(questionIndex, optionIndex) {
        const question = quizData[questionIndex];
        const isCorrect = optionIndex === question.correctAnswer;
        
        visualSubtitle.innerHTML = isCorrect 
            ? '<span style="color: #10b981;"><i class="fas fa-check-circle"></i> Correct Answer Selected</span>'
            : '<span style="color: #ef4444;"><i class="fas fa-times-circle"></i> Incorrect Answer Selected</span>';
        
        visualContent.innerHTML = question.visualization;
    }
    
    function updateProgress() {
        const progress = ((state.currentQuestion + 1) / quizData.length) * 100;
        progressFillEl.style.width = `${progress}%`;
        correctCountEl.textContent = state.scores.correct;
    }
    
    function updateScore() {
        state.scores.correct = 0;
        state.scores.incorrect = 0;
        
        state.userAnswers.forEach((answer, index) => {
            if (answer !== null) {
                if (answer === quizData[index].correctAnswer) {
                    state.scores.correct++;
                } else {
                    state.scores.incorrect++;
                }
            }
        });
        
        correctCountEl.textContent = state.scores.correct;
    }
    
    function showResults() {
        state.submitted = true;
        updateScore();
        
        const score = state.scores.correct;
        const percentage = (score / quizData.length) * 100;
        
        finalScoreEl.textContent = `${score}/${quizData.length}`;
        
        // Show/hide buttons based on score (posttest rules might be different)
        // For posttest, we can show both review and proceed options
        if (score >= 4) {
            reviewBtn.style.display = 'flex';
            proceedBtn.style.display = 'flex';
            completionMessageEl.textContent = "Great job! You have successfully completed the post-test.";
        } else {
            reviewBtn.style.display = 'flex';
            proceedBtn.style.display = 'none';
            completionMessageEl.textContent = "Consider reviewing the lab material and retaking the test.";
        }
        
        // Set feedback messages
        if (percentage >= 80) {
            scoreMessageEl.textContent = "Excellent! You have mastered the DP concepts.";
            feedbackFinalEl.textContent = "Outstanding performance!";
            feedbackFinalEl.style.color = "#10b981";
        } else if (percentage >= 60) {
            scoreMessageEl.textContent = "Good job! You have a solid understanding.";
            feedbackFinalEl.textContent = "Well done!";
            feedbackFinalEl.style.color = "#f59e0b";
        } else {
            scoreMessageEl.textContent = "You may want to review the lab simulation again.";
            feedbackFinalEl.textContent = "Keep practicing to improve.";
            feedbackFinalEl.style.color = "#ef4444";
        }
        
        resultsOverlay.classList.add('show');
    }
    
    function showPerformanceReview() {
        let reviewMessage = "Performance Review:\n\n";
        reviewMessage += `Total Questions: ${quizData.length}\n`;
        reviewMessage += `Correct Answers: ${state.scores.correct}\n`;
        reviewMessage += `Incorrect Answers: ${state.scores.incorrect}\n`;
        reviewMessage += `Score: ${state.scores.correct}/${quizData.length}\n\n`;
        
        reviewMessage += "Question Breakdown:\n";
        quizData.forEach((question, index) => {
            const userAnswer = state.userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const status = isCorrect ? "✓ Correct" : "✗ Incorrect";
            reviewMessage += `Q${index + 1}: ${status}\n`;
        });
        
        alert(reviewMessage);
    }
    
    function resetQuiz() {
        state.currentQuestion = 0;
        state.userAnswers.fill(null);
        state.scores = { correct: 0, incorrect: 0 };
        state.submitted = false;
        
        resultsOverlay.classList.remove('show');
        loadQuestion(0);
        updateScore();
    }
});