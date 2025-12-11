let currentLevel = '';
let currentPassageIndex = 0;
const container = document.getElementById('content-container');

// --- DATA STRUCTURE: 5 Passages per Level ---
const comprehensionData = {
    // --- FRUSTRATION LEVEL (0-11) ---
    Frustration: [
        {
            title: "The Big Red Dog",
            passage: "Spot is a big red dog. He likes to run. Spot can jump over a small box. He eats his food fast. Spot is a happy dog.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "What color is Spot?",
                    options: ["Blue", "Red", "Green"],
                    answer: "Red"
                },
                {
                    type: "fill-in-the-blank",
                    question: "Spot is a happy ____.",
                    correct: ["dog", "pup"] 
                }
            ]
        },
        {
            title: "A Trip to the Park",
            passage: "My name is Jen. I went to the park. I saw a big tree and a small flower. My friend, Tom, was there too. We played on the swings for a long time.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "Who did Jen see at the park?",
                    options: ["Mom", "Tom", "Dad"],
                    answer: "Tom"
                },
                {
                    type: "short-answer",
                    question: "What two things did Jen see at the park (not people)?",
                    keywords: ["tree and flower", "flower and tree", "tree", "flower"]
                }
            ]
        },
        {
            title: "The Blue Car",
            passage: "Dad has a new car. It is blue and very clean. It is fast. We drive it to the store. The car has four wheels and bright lights.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "What color is the new car?",
                    options: ["Red", "Yellow", "Blue"],
                    answer: "Blue"
                },
                {
                    type: "fill-in-the-blank",
                    question: "The car has four ____.",
                    correct: ["wheels"]
                }
            ]
        },
        {
            title: "Eating Apples",
            passage: "I like to eat fruit. My favorite fruit is the apple. Apples can be red, green, or yellow. I eat one apple every day after school. It is crunchy and sweet.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "When does the writer eat an apple?",
                    options: ["Before school", "After school", "At lunch"],
                    answer: "After school"
                },
                {
                    type: "short-answer",
                    question: "What is the writer's favorite fruit?",
                    keywords: ["apple", "apples"]
                }
            ]
        },
        {
            title: "Rainy Day Fun",
            passage: "It rained all day. I could not go outside. Mom said we could play inside. I built a big tower with blocks. It was still a good day.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "Why could the child not go outside?",
                    options: ["It was too cold", "It rained", "The sun was too bright"],
                    answer: "It rained"
                },
                {
                    type: "fill-in-the-blank",
                    question: "The child built a big tower with ____.",
                    correct: ["blocks"]
                }
            ]
        }
    ],

    // --- INSTRUCTIONAL LEVEL (12-17) ---
    Instructional: [
        {
            title: "The Busy Ant",
            passage: "Ants are tiny but very strong. A single ant can lift things much heavier than itself. They live in large groups called colonies. Every ant has a specific job, like finding food or caring for the young. Ants work hard all day to prepare for winter.",
            activities: [
                {
                    type: "short-answer",
                    question: "What is a large group of ants called?",
                    keywords: ["colonies", "colony"]
                },
                {
                    type: "multiple-choice",
                    question: "What does every ant in a colony have?",
                    options: ["Wings", "A specific job", "A name tag"],
                    answer: "A specific job"
                }
            ]
        },
        {
            title: "Why Leaves Change Color",
            passage: "In the fall, tree leaves change color from green to red, yellow, and orange. This happens because the trees stop making chlorophyll. Chlorophyll is the green substance that helps the tree make food. When the chlorophyll goes away, the other colors, which were always there, finally show through.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "What green substance helps trees make food?",
                    options: ["Glucose", "Chlorophyll", "Carbon"],
                    answer: "Chlorophyll"
                },
                {
                    type: "short-answer",
                    question: "What season does this change happen in?",
                    keywords: ["fall", "autumn"]
                }
            ]
        },
        {
            title: "The Invention of the Pencil",
            passage: "Before pencils, people wrote with quills dipped in ink, which was often messy. The modern pencil uses graphite, a form of carbon, inside a wooden casing. It was invented after a large deposit of pure graphite was found in England in the 1500s. Since graphite does not stain like ink, it quickly became the cleaner, easier writing tool we use today.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "What material is found inside a modern pencil?",
                    options: ["Ink", "Lead", "Graphite"],
                    answer: "Graphite"
                },
                {
                    type: "short-answer",
                    question: "According to the passage, why was the pencil better than a quill?",
                    keywords: ["cleaner", "easier", "doesn't stain", "not messy"]
                }
            ]
        },
        {
            title: "The Water Cycle",
            passage: "The water cycle describes how water moves around Earth. First, water evaporates from lakes and oceans into the air. Second, it condenses into clouds. Finally, when the clouds get heavy, the water falls back to Earth as rain, which is called precipitation. This process repeats endlessly.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "What is the term for water falling back to Earth as rain?",
                    options: ["Evaporation", "Condensation", "Precipitation"],
                    answer: "Precipitation"
                },
                {
                    type: "fill-in-the-blank",
                    question: "Water that goes into the air from lakes is called ____.",
                    correct: ["evaporation"]
                }
            ]
        },
        {
            title: "Sleep Needs",
            passage: "Getting enough sleep is vital for health. Children need about 10 hours of sleep each night because their bodies are growing and their brains are learning new things. Adults usually need between 7 and 9 hours. If you do not sleep enough, you may have trouble remembering things and feel tired all day.",
            activities: [
                {
                    type: "short-answer",
                    question: "How much sleep do children need each night?",
                    keywords: ["10 hours", "ten hours"]
                },
                {
                    type: "multiple-choice",
                    question: "What is one effect of not sleeping enough?",
                    options: ["Having better memory", "Feeling tired", "Learning new things"],
                    answer: "Feeling tired"
                }
            ]
        }
    ],

    // --- INDEPENDENT LEVEL (18-24) ---
    Independent: [
        {
            title: "The Invention of the Internet",
            passage: "The foundational concept of the Internet, called ARPANET, was developed in the late 1960s by the United States Department of Defense. It was initially designed as a robust network that could continue to function even if some parts failed. The modern World Wide Web, however, was introduced much later in 1991 by Tim Berners-Lee. His invention made the Internet accessible to the public through hyperlinks and web browsers, fundamentally changing global communication and commerce.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "What was the initial goal of ARPANET?",
                    options: ["To create global commerce", "To be a robust, fault-tolerant network", "To invent the web browser"],
                    answer: "To be a robust, fault-tolerant network"
                },
                {
                    type: "short-answer",
                    question: "Who is credited with inventing the World Wide Web and when?",
                    keywords: ["Tim Berners-Lee 1991", "Berners-Lee 1991"]
                }
            ]
        },
        {
            title: "Understanding Climate vs. Weather",
            passage: "While often confused, weather and climate describe different things. Weather refers to the short-term atmospheric conditions—what is happening right now or next week. Climate, conversely, describes the average weather conditions over a long period, typically 30 years or more. A major snowstorm is weather; the typical annual average temperature of a region is climate. Scientists study climate change because it refers to significant, long-term shifts in those averages.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "Which of the following describes climate?",
                    options: ["The temperature tomorrow", "A storm happening now", "The average rainfall over 30 years"],
                    answer: "The average rainfall over 30 years"
                },
                {
                    type: "short-answer",
                    question: "What is the approximate minimum time frame used to define climate?",
                    keywords: ["30 years", "thirty years"]
                }
            ]
        },
        {
            title: "The Power of Solar Energy",
            passage: "Solar energy, derived from the sun’s radiation, offers a clean, renewable alternative to fossil fuels. Photovoltaic (PV) cells convert sunlight directly into electricity. While the initial setup cost of solar panels can be high, the long-term benefit is free energy and a significant reduction in a household’s carbon footprint. Government incentives often help offset the high start-up investment, making it a viable option for mass adoption.",
            activities: [
                {
                    type: "fill-in-the-blank",
                    question: "Solar energy is converted into electricity using ____ cells.",
                    correct: ["photovoltaic", "PV"]
                },
                {
                    type: "short-answer",
                    question: "What is the primary drawback or challenge mentioned regarding solar energy adoption?",
                    keywords: ["high initial cost", "setup cost", "initial cost"]
                }
            ]
        },
        {
            title: "The Great Barrier Reef",
            passage: "The Great Barrier Reef, located off the coast of Australia, is the world's largest coral reef system. It is a vast, living ecosystem visible from space, composed of billions of tiny organisms called coral polyps. Despite its resilience, the reef faces existential threats, primarily from climate change leading to rising sea temperatures. These high temperatures cause coral bleaching, severely stressing the fragile structure and leading to widespread loss of marine biodiversity.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "What is the primary cause of coral bleaching mentioned in the passage?",
                    options: ["Overfishing", "Rising sea temperatures", "Pollution from boats"],
                    answer: "Rising sea temperatures"
                },
                {
                    type: "short-answer",
                    question: "What are the tiny organisms that make up the reef called?",
                    keywords: ["coral polyps", "polyps"]
                }
            ]
        },
        {
            title: "The Concept of Scarcity in Economics",
            passage: "Scarcity is the fundamental economic problem of having seemingly unlimited human wants and needs in a world of limited resources. Because resources are finite, societies must make choices about how to allocate them efficiently. This necessity of choice, driven by scarcity, is what forces individuals, businesses, and governments to study economics. Every economic decision, from buying coffee to setting a national budget, stems from trying to solve the problem of scarcity.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "What drives the necessity of choice in economic study?",
                    options: ["Abundance of resources", "Unlimited wants", "Scarcity"],
                    answer: "Scarcity"
                },
                {
                    type: "short-answer",
                    question: "What does scarcity contrast with?",
                    keywords: ["unlimited wants", "unlimited needs"]
                }
            ]
        }
    ],

    // --- ADVANCED LEVEL (25-30) ---
    Advanced: [
        {
            title: "Analyzing the Paradox of Thrift",
            passage: "The 'paradox of thrift' is an economic concept popularized by John Maynard Keynes. It argues that while saving is beneficial for an individual, a general increase in saving across an entire economy can be detrimental to overall economic growth. When everyone simultaneously increases their savings and reduces spending, aggregate demand falls. This drop in demand can lead to lower business revenues, job cuts, and ultimately, a recession, meaning less total wealth is saved in the end. This highlights a conflict between microeconomic behavior and macroeconomic outcomes.",
            activities: [
                {
                    type: "critical-thinking",
                    question: "If a government wanted to counteract the paradox of thrift, what fiscal policy measure might they implement?",
                    // Requires user to infer the connection to stimulus/demand
                },
                {
                    type: "multiple-choice",
                    question: "The paradox of thrift primarily describes a conflict between which two economic scales?",
                    options: ["Supply and Demand", "Microeconomic and Macroeconomic behavior", "Investment and Capital"],
                    answer: "Microeconomic and Macroeconomic behavior"
                }
            ]
        },
        {
            title: "The Problem of Induction",
            passage: "David Hume’s philosophical problem of induction questions the justification of reasoning from past instances to future ones. We assume, for instance, that the sun will rise tomorrow because it has risen every day until now. However, Hume argues that this belief relies on the principle of the uniformity of nature, which itself is only justified by past experience. This creates a circular argument. While induction is vital for scientific discovery and daily life, the core issue is that there is no *logical* necessity that the future must resemble the past.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "The problem of induction challenges the logical justification of which assumption?",
                    options: ["The existence of God", "The uniformity of nature", "The reality of sensory experience"],
                    answer: "The uniformity of nature"
                },
                {
                    type: "critical-thinking",
                    question: "How might a scientist defend the use of inductive reasoning, despite Hume's challenge?",
                    // Requires user to discuss practicality vs. logical necessity
                }
            ]
        },
        {
            title: "Understanding Literary Allusion",
            passage: "In literature, an allusion is a brief, indirect reference to a person, place, thing, or idea of historical, cultural, literary, or political significance. Authors utilize allusion to enrich their work by providing layers of meaning without explicit explanation. For example, referencing 'Achilles' heel' immediately suggests a point of hidden weakness. However, the effectiveness of an allusion relies heavily on the reader's pre-existing knowledge, which can sometimes limit accessibility for a general audience.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "What is the primary function of an allusion in writing?",
                    options: ["To provide direct exposition", "To offer layers of meaning without explicit explanation", "To criticize historical figures"],
                    answer: "To offer layers of meaning without explicit explanation"
                },
                {
                    type: "short-answer",
                    question: "What is the main risk an author takes when using a sophisticated allusion?",
                    keywords: ["reader's knowledge", "limit accessibility", "audience knowledge", "limiting audience"]
                }
            ]
        },
        {
            title: "Quantum Entanglement",
            passage: "Quantum entanglement is a strange phenomenon where two particles become linked in such a way that they share the same fate, regardless of the distance separating them. If one particle is measured to have a certain property (like spin up), the other particle instantaneously acquires the opposite property (spin down). Einstein famously dismissed this as 'spooky action at a distance' because it seems to violate the cosmic speed limit—the speed of light. However, despite the instantaneous correlation, no information can be transmitted faster than light using this effect alone.",
            activities: [
                {
                    type: "multiple-choice",
                    question: "Why did Einstein label entanglement 'spooky action at a distance'?",
                    options: ["It involves magnetic fields", "The correlation appears instantaneous", "It only happens in a vacuum"],
                    answer: "The correlation appears instantaneous"
                },
                {
                    type: "critical-thinking",
                    question: "Explain why, despite the instantaneous correlation, entanglement does not violate the speed of light for data transfer.",
                    // Requires user to synthesize the final sentence: "no information can be transmitted..."
                }
            ]
        },
        {
            title: "The Sociological Concept of Anomie",
            passage: "Anomie, a concept developed by sociologist Émile Durkheim, describes a state where society experiences a breakdown of established standards and values. This detachment or normlessness often occurs during periods of rapid social, economic, or political change, such as sudden booms or devastating depressions. When individuals feel disconnected from the collective moral compass, they may lack clear guidance on acceptable behavior, potentially leading to increased rates of deviant behavior and suicide. Anomie highlights the need for strong social integration to maintain societal stability.",
            activities: [
                {
                    type: "short-answer",
                    question: "According to Durkheim, what is the primary condition that causes anomie?",
                    keywords: ["breakdown of standards", "breakdown of values", "rapid social change", "normlessness"]
                },
                {
                    type: "multiple-choice",
                    question: "Anomie is associated with a lack of which of the following?",
                    options: ["Financial wealth", "Clear moral guidance", "Individual freedom"],
                    answer: "Clear moral guidance"
                }
            ]
        }
    ]
};

// --- LOGIC FUNCTIONS ---
let scoreHistory = {}; // Store scores per level

function loadLevel(level) {
    currentLevel = level;
    currentPassageIndex = 0;
    // Initialize score history for the level if it doesn't exist
    if (!scoreHistory[level]) {
        scoreHistory[level] = [];
    }
    showPassage(currentPassageIndex);
}

function showPassage(index) {
    const levelData = comprehensionData[currentLevel];
    if (!levelData) return;

    if (index >= levelData.length) {
        container.innerHTML = `<h2>Level Complete! 🏅</h2><p>You have finished all ${levelData.length} passages for the **${currentLevel}** level. Great work!</p><p>Review your average score and try the next level!</p>`;
        return;
    }

    const passage = levelData[index];
    currentPassageIndex = index;
    let html = `
        <h2>${currentLevel} Level: Passage ${index + 1} of ${levelData.length}</h2>
        <h3>${passage.title}</h3>
        <p class="passage-text">${passage.passage}</p>
        <hr>
        <h4>Interactive Activities</h4>
        <form id="activity-form">
    `;

    // Generate HTML for each activity
    passage.activities.forEach((activity, activityIndex) => {
        html += `<div class="activity" data-activity-index="${activityIndex}">`;
        html += `<p class="question-text"><strong>${activityIndex + 1}.</strong> ${activity.question}</p>`;

        if (activity.type === "multiple-choice") {
            activity.options.forEach((option) => {
                html += `
                    <label>
                        <input type="radio" name="q${activityIndex}" value="${option}"> ${option}
                    </label><br>
                `;
            });
        } else if (activity.type === "fill-in-the-blank" || activity.type === "short-answer" || activity.type === "critical-thinking") {
            html += `<input type="text" name="q${activityIndex}" placeholder="Type your answer here..." class="text-input">`;
        }

        html += `<p class="feedback" id="feedback-q${activityIndex}"></p></div>`;
    });

    html += `
        <button type="button" onclick="checkAnswers()">Submit Answers</button>
        <button type="button" onclick="showPassage(${currentPassageIndex + 1})" id="next-button" style="display:none;">Next Passage >></button>
        </form>
    `;
    container.innerHTML = html;
}

function checkAnswers() {
    const passage = comprehensionData[currentLevel][currentPassageIndex];
    let correctCount = 0;
    let totalCount = passage.activities.length;
    let hasStrictCheck = false;

    passage.activities.forEach((activity, index) => {
        const feedbackElement = document.getElementById(`feedback-q${index}`);
        let isCorrect = false;
        let userAnswer = "";

        // Get user answer
        if (activity.type === "multiple-choice") {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            userAnswer = selected ? selected.value : "";
        } else {
            const input = document.querySelector(`input[name="q${index}"]`);
            userAnswer = input ? input.value : "";
        }

        const userText = userAnswer.trim().toLowerCase();

        // 1. Check for Multiple Choice (Strict Check)
        if (activity.type === "multiple-choice") {
            hasStrictCheck = true;
            if (userAnswer === activity.answer) {
                isCorrect = true;
            }
        // 2. Check for Fill-in/Short Answer (Keyword Check)
        } else if (activity.type === "fill-in-the-blank" || activity.type === "short-answer") {
            hasStrictCheck = true;
            const correctTexts = activity.correct || activity.keywords; 
            if (correctTexts && correctTexts.map(k => k.toLowerCase()).includes(userText)) {
                isCorrect = true;
            } else if (activity.keywords) {
                // Check if user answer contains one of the key words for partial credit/acceptance
                isCorrect = correctTexts.some(keyword => userText.includes(keyword.toLowerCase()));
            }
        }
        
        // --- Provide Feedback ---
        if (isCorrect) {
            feedbackElement.style.color = 'green';
            feedbackElement.textContent = "Correct! Well done.";
            correctCount++;
        } else if (activity.type === "critical-thinking") {
             // For critical thinking, guide the user without confirming or denying.
             feedbackElement.style.color = 'orange';
             feedbackElement.innerHTML = `**Self-Check:** Your answer should address the concept of ${currentLevel === 'Advanced' && index === 0 ? 'Fiscal Stimulus or Government Spending' : (currentLevel === 'Advanced' && index === 1 ? 'practicality over logical necessity' : 'synthesis of the text.')}. Review the text and your answer for depth.`;
        } else {
            feedbackElement.style.color = 'red';
            feedbackElement.textContent = "Incorrect. Please review the passage carefully for the specific details requested.";
        }
    });

    // Record and display score
    scoreHistory[currentLevel].push(correctCount / totalCount);

    const completionRate = (correctCount / totalCount) * 100;
    const alertMessage = hasStrictCheck 
        ? `You scored ${correctCount} out of ${totalCount} on the automatically graded questions (${completionRate.toFixed(0)}%). Self-check your critical thinking answers and proceed.`
        : `Check your open-ended answers against the guidelines provided. You are ready for the next passage.`;
        
    document.getElementById('next-button').style.display = 'block'; 
    alert(alertMessage);
}