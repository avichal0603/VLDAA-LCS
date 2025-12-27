document.addEventListener('DOMContentLoaded', function() {
    // Quiz data
    const quizData = [
        {
            id: 1,
            question: "What is a <i>subsequence</i> of a string?",
            options: [
                "A contiguous block of characters",
                "Characters chosen in order, not necessarily contiguous",
                "Any permutation of characters",
                "A prefix of the string"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>Understanding Subsequence</h3>
                <p>A <span class="highlight">subsequence</span> is a sequence that can be derived from another sequence by deleting some or no elements <strong>without changing the order</strong> of the remaining elements.</p>
                
                <h3>Example</h3>
                <p>For string <span class="highlight">"ABCD"</span>, some valid subsequences are:</p>
                <ul style="margin-left: 20px; margin-bottom: 15px;">
                    <li>"A", "B", "C", "D"</li>
                    <li>"AB", "AC", "AD", "BC", "BD", "CD"</li>
                    <li>"ABC", "ABD", "ACD", "BCD"</li>
                    <li>"ABCD"</li>
                </ul>
                
                <h3>Key Differences</h3>
                <p><strong>Substring:</strong> Must be contiguous (e.g., "BC" from "ABCD")</p>
                <p><strong>Subsequence:</strong> Does not need to be contiguous (e.g., "AC" from "ABCD")</p>
            `
        },
        {
            id: 2,
            question: "If characters are removed from a string without changing order, the result is a:",
            options: [
                "Substring",
                "Subsequence",
                "Permutation",
                "Prefix"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>Subsequence Definition</h3>
                <p>When you remove characters from a string <strong>without changing the order</strong> of the remaining characters, you get a <span class="highlight">subsequence</span>.</p>
                
                <h3>Example</h3>
                <p>Original string: <span class="highlight">"COMPUTER"</span></p>
                <p>Remove characters: Remove 'M', 'U', 'E'</p>
                <p>Result: <span class="highlight">"COPTR"</span> (This is a subsequence)</p>
                
                <h3>Important Notes</h3>
                <ul style="margin-left: 20px;">
                    <li>You can remove any number of characters (including 0 or all)</li>
                    <li>Order of remaining characters must match original order</li>
                    <li>This is different from substring (which requires contiguity)</li>
                </ul>
            `
        },
        {
            id: 3,
            question: "In the Rod Cutting problem, what is the main objective?",
            options: [
                "Minimize the number of cuts",
                "Maximize the total profit from cuts",
                "Use the longest rod pieces",
                "Minimize rod wastage"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>Rod Cutting Problem</h3>
                <p>The main objective is to <span class="highlight">maximize total profit</span> by cutting the rod into pieces and selling them.</p>
                
                <h3>Problem Setup</h3>
                <p>You have a rod of length <span class="highlight">n</span> with prices for different lengths:</p>
                <ul style="margin-left: 20px;">
                    <li>Length 1: Price 1</li>
                    <li>Length 2: Price 5</li>
                    <li>Length 3: Price 8</li>
                    <li>Length 4: Price 9</li>
                </ul>
                
                <h3>Example</h3>
                <p>For a rod of length 4:</p>
                <ul style="margin-left: 20px;">
                    <li>Sell as is: Profit = 9</li>
                    <li>Cut into 2+2: Profit = 5 + 5 = 10</li>
                    <li>Cut into 1+3: Profit = 1 + 8 = 9</li>
                    <li>Cut into 1+1+1+1: Profit = 1 + 1 + 1 + 1 = 4</li>
                </ul>
                <p><strong>Optimal:</strong> Cut into two pieces of length 2 for profit 10</p>
            `
        },
        {
            id: 4,
            question: "Which property is common to both LCS and Rod Cutting problems?",
            options: [
                "Greedy choice property",
                "Optimal substructure",
                "Divide-and-conquer only",
                "Sorting-based solution"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>Optimal Substructure</h3>
                <p>Both LCS and Rod Cutting exhibit <span class="highlight">optimal substructure</span>, which is essential for Dynamic Programming solutions.</p>
                
                <h3>What is Optimal Substructure?</h3>
                <p>A problem has optimal substructure if an optimal solution can be constructed from optimal solutions of its subproblems.</p>
                
                <h3>In LCS</h3>
                <p>The LCS of two strings can be found from:</p>
                <ul style="margin-left: 20px;">
                    <li>LCS of prefixes (if characters match)</li>
                    <li>Maximum of LCS(string1-1, string2) and LCS(string1, string2-1) (if characters don't match)</li>
                </ul>
                
                <h3>In Rod Cutting</h3>
                <p>The optimal revenue for rod length n can be found from:</p>
                <p style="text-align: center; margin: 10px 0;"><span class="highlight">max(price[i] + revenue[n-i])</span> for all i from 1 to n</p>
                
                <h3>Why This Matters</h3>
                <p>Optimal substructure allows us to break down complex problems into simpler subproblems and combine their solutions.</p>
            `
        },
        {
            id: 5,
            question: "Why even use Dynamic Programming (DP) instead of a Greedy Algorithm (GA)?",
            options: [
                "GA is slow.",
                "DP uses constant auxiliary space to solve the problem.",
                "DP reuses the solved subproblems to solve a bigger problem that includes those subproblems.",
                "DP always solves a problem in linear time."
            ],
            correctAnswer: 2,
            visualization: `
                <h3>DP vs Greedy Algorithms</h3>
                <p>The key advantage of DP is that it <span class="highlight">reuses solved subproblems</span> to avoid redundant computations.</p>
                
                <h3>Why Greedy Algorithms Fail</h3>
                <p>Greedy algorithms make the locally optimal choice at each step, but this doesn't always lead to a globally optimal solution.</p>
                
                <h3>Example: Rod Cutting</h3>
                <p>Prices: [1, 5, 8, 9] for lengths 1-4</p>
                <p><strong>Greedy approach:</strong> Always cut the most profitable piece first</p>
                <p>For length 4: Price per unit = [1, 2.5, 2.67, 2.25]</p>
                <p>Greedy would choose length 3 first (2.67 per unit), then length 1: Total = 8 + 1 = 9</p>
                <p><strong>But optimal is:</strong> Two pieces of length 2: Total = 5 + 5 = 10</p>
                
                <h3>DP Solution</h3>
                <p>DP solves all subproblems (revenue for lengths 1, 2, 3, 4) and reuses them to find the optimal solution.</p>
            `
        },
        {
            id: 6,
            question: "What happens if two strings share no common characters?",
            options: [
                "LCS is undefined",
                "LCS length is −1",
                "LCS length is 0",
                "LCS length equals string length"
            ],
            correctAnswer: 2,
            visualization: `
                <h3>LCS with No Common Characters</h3>
                <p>When two strings share <span class="highlight">no common characters</span>, the Longest Common Subsequence has length <span class="highlight">0</span>.</p>
                
                <h3>Example</h3>
                <p>String 1: <span class="highlight">"ABCD"</span></p>
                <p>String 2: <span class="highlight">"EFGH"</span></p>
                <p>LCS Length: <span class="highlight">0</span></p>
                <p>LCS: <span class="highlight">""</span> (empty string)</p>
                
                <h3>DP Table</h3>
                <p>The DP table would be filled with zeros:</p>
                <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p style="font-family: monospace; margin: 5px 0;">    E F G H</p>
                    <p style="font-family: monospace; margin: 5px 0;">A [0 0 0 0]</p>
                    <p style="font-family: monospace; margin: 5px 0;">B [0 0 0 0]</p>
                    <p style="font-family: monospace; margin: 5px 0;">C [0 0 0 0]</p>
                    <p style="font-family: monospace; margin: 5px 0;">D [0 0 0 0]</p>
                </div>
                
                <h3>Why 0?</h3>
                <p>The empty string is always a subsequence of any string, and when there are no matching characters, it's the only common subsequence.</p>
            `
        },
        {
            id: 7,
            question: "In Rod Cutting, why can selling smaller pieces sometimes give more profit than one large piece?",
            options: [
                "Prices increase with cuts",
                "Prices are arbitrary and non-linear",
                "Cutting reduces cost",
                "Rod length changes"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>Non-linear Pricing</h3>
                <p>In Rod Cutting, prices are <span class="highlight">arbitrary and non-linear</span>, meaning the price per unit length can vary.</p>
                
                <h3>Example Scenario</h3>
                <p>Rod Length: 5 units</p>
                <p>Prices:</p>
                <ul style="margin-left: 20px;">
                    <li>Length 1: $1 ($1/unit)</li>
                    <li>Length 2: $5 ($2.5/unit)</li>
                    <li>Length 3: $8 ($2.67/unit)</li>
                    <li>Length 4: $9 ($2.25/unit)</li>
                    <li>Length 5: $10 ($2/unit)</li>
                </ul>
                
                <h3>Analysis</h3>
                <p><strong>Sell as one piece:</strong> Length 5 → $10</p>
                <p><strong>Sell as smaller pieces:</strong> Length 2 + Length 3 → $5 + $8 = $13</p>
                <p><span class="highlight">Smaller pieces give $3 more profit!</span></p>
                
                <h3>Why This Happens</h3>
                <p>Market prices don't always follow linear patterns. Sometimes:</p>
                <ul style="margin-left: 20px;">
                    <li>Certain lengths are in higher demand</li>
                    <li>Manufacturing costs vary by size</li>
                    <li>Market preferences create price anomalies</li>
                </ul>
            `
        },
        {
            id: 8,
            question: "What makes both problems computationally hard without DP?",
            options: [
                "Large input size only",
                "Overlapping subproblems",
                "Need for sorting",
                "Exponential number of possible solutions"
            ],
            correctAnswer: 3,
            visualization: `
                <h3>Exponential Complexity</h3>
                <p>Both LCS and Rod Cutting have an <span class="highlight">exponential number of possible solutions</span> to consider without DP optimization.</p>
                
                <h3>LCS Complexity</h3>
                <p>For two strings of length n and m:</p>
                <ul style="margin-left: 20px;">
                    <li>Naive recursive solution: O(2<sup>n+m</sup>)</li>
                    <li>Number of subsequences of a string of length n: 2<sup>n</sup></li>
                    <li>For n=20: 1,048,576 possible subsequences</li>
                    <li>For n=30: 1,073,741,824 possible subsequences</li>
                </ul>
                
                <h3>Rod Cutting Complexity</h3>
                <p>For a rod of length n:</p>
                <ul style="margin-left: 20px;">
                    <li>Number of ways to cut: 2<sup>n-1</sup></li>
                    <li>For n=10: 512 possibilities</li>
                    <li>For n=20: 524,288 possibilities</li>
                    <li>For n=30: 536,870,912 possibilities</li>
                </ul>
                
                <h3>DP to the Rescue</h3>
                <p>Dynamic Programming reduces this to polynomial time:</p>
                <ul style="margin-left: 20px;">
                    <li>LCS: O(n*m) time and space</li>
                    <li>Rod Cutting: O(n²) time, O(n) space</li>
                </ul>
            `
        },
        {
            id: 9,
            question: "What is the time complexity of the naive recursive solution for the LCS problem?",
            options: [
                "O(n)",
                "O(n²)",
                "O(2ⁿ)",
                "O(n log n)"
            ],
            correctAnswer: 2,
            visualization: `
                <h3>Exponential Time Complexity</h3>
                <p>The naive recursive solution for LCS has <span class="highlight">exponential time complexity</span>: O(2<sup>n+m</sup>) in the worst case.</p>
                
                <h3>Recursive Tree</h3>
                <p>For strings "ABCD" and "WXYZ":</p>
                <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p>Each call makes 2 recursive calls when characters don't match:</p>
                    <p style="font-family: monospace; margin: 5px 0;">LCS("ABCD", "WXYZ")</p>
                    <p style="font-family: monospace; margin: 5px 0;">├── LCS("ABC", "WXYZ")</p>
                    <p style="font-family: monospace; margin: 5px 0;">│   ├── LCS("AB", "WXYZ")</p>
                    <p style="font-family: monospace; margin: 5px 0;">│   └── LCS("ABC", "WXY")</p>
                    <p style="font-family: monospace; margin: 5px 0;">└── LCS("ABCD", "WXY")</p>
                    <p style="font-family: monospace; margin: 5px 0;">    ├── LCS("ABC", "WXY")</p>
                    <p style="font-family: monospace; margin: 5px 0;">    └── LCS("ABCD", "WX")</p>
                </div>
                
                <h3>Why Exponential?</h3>
                <p>Each character comparison can lead to two recursive calls, creating a binary tree of calls with depth n+m.</p>
                <p>Total calls ≈ 2<sup>n+m</sup></p>
                
                <h3>DP Improvement</h3>
                <p>Dynamic Programming reduces this to O(n*m) by storing results of subproblems.</p>
            `
        },
        {
            id: 10,
            question: "In Rod Cutting, the DP table entry dp[i] represents:",
            options: [
                "Number of cuts made",
                "Maximum revenue for a rod of given length",
                "Price of rod piece i",
                "Length of rod remaining"
            ],
            correctAnswer: 1,
            visualization: `
                <h3>DP Table in Rod Cutting</h3>
                <p>In the Rod Cutting DP solution, <span class="highlight">dp[i]</span> represents the <strong>maximum revenue</strong> obtainable for a rod of length <span class="highlight">i</span>.</p>
                
                <h3>Example DP Table</h3>
                <p>Prices: [1, 5, 8, 9] for lengths 1-4</p>
                <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p style="font-family: monospace; margin: 5px 0;">dp[0] = 0 (no rod, no revenue)</p>
                    <p style="font-family: monospace; margin: 5px 0;">dp[1] = max(price[1]) = 1</p>
                    <p style="font-family: monospace; margin: 5px 0;">dp[2] = max(price[2], price[1]+dp[1]) = max(5, 1+1) = 5</p>
                    <p style="font-family: monospace; margin: 5px 0;">dp[3] = max(price[3], price[1]+dp[2], price[2]+dp[1]) = max(8, 1+5, 5+1) = 8</p>
                    <p style="font-family: monospace; margin: 5px 0;">dp[4] = max(price[4], price[1]+dp[3], price[2]+dp[2], price[3]+dp[1])</p>
                    <p style="font-family: monospace; margin: 5px 0;">      = max(9, 1+8, 5+5, 8+1) = max(9, 9, 10, 9) = 10</p>
                </div>
                
                <h3>Key Insight</h3>
                <p>dp[i] stores the optimal solution for subproblem of size i, which can be used to solve larger problems.</p>
                
                <h3>Recurrence Relation</h3>
                <p style="text-align: center; margin: 15px 0;"><span class="highlight">dp[n] = max(price[i] + dp[n-i])</span> for all i from 1 to n</p>
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
        
        // Show/hide proceed button based on score
        if (score >= 4) {
            proceedBtn.style.display = 'flex';
            completionMessageEl.textContent = "You are now ready to proceed to the Dynamic Programming Lab Simulation.";
        } else {
            proceedBtn.style.display = 'none';
            completionMessageEl.textContent = "You need to score at least 4/10 to proceed to the lab simulation.";
        }
        
        // Set feedback messages
        if (percentage >= 80) {
            scoreMessageEl.textContent = "Excellent! You have a strong foundation in DP concepts.";
            feedbackFinalEl.textContent = "Ready for the lab simulation!";
            feedbackFinalEl.style.color = "#10b981";
        } else if (percentage >= 60) {
            scoreMessageEl.textContent = "Good job! You understand the basics but may need some review.";
            feedbackFinalEl.textContent = score >= 4 ? "Proceed to the lab simulation." : "Review and try again.";
            feedbackFinalEl.style.color = "#f59e0b";
        } else {
            scoreMessageEl.textContent = "You might want to review DP concepts before the lab simulation.";
            feedbackFinalEl.textContent = "Consider reviewing the fundamentals first.";
            feedbackFinalEl.style.color = "#ef4444";
        }
        
        resultsOverlay.classList.add('show');
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