import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Materi5.css';

const LogicConstellation = () => {
  const navigate = useNavigate();
  const svgRef = useRef(null);
  const searchInputRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // --- AUDIO SYSTEM ---
  // Simple helper to play sounds without external libraries
  const playSound = (type) => {
    let audio = null;

    // You can replace these URLs with local files in your public folder like '/sfx/merge.mp3'
    switch (type) {
      case 'hover':
        // Short, high-tech blip
        audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-interface-robot-click-901.mp3');
        audio.volume = 0.1;
        break;
      case 'click':
        // Mechanical confirm sound
        audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-3124.mp3');
        audio.volume = 0.2;
        break;
      case 'merge':
        // Satisfying "suck in" or "energy" sound
        audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-positive-notification-266.mp3');
        audio.volume = 0.4;
        break;
      case 'mastery':
        // Victory chime
        audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-level-completed-2059.mp3');
        audio.volume = 0.3;
        break;
      case 'portal':
        // Deep bass hum or warp sound
        audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-extra-long-spaceship-hum-2780.mp3');
        audio.volume = 0.5;
        break;
      default:
        return;
    }

    if (audio) {
      audio.play().catch(e => console.log("Audio play failed (user interaction needed first)", e));
    }
  };

  const [activeNode, setActiveNode] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [activeTab, setActiveTab] = useState('concept');
  const [masteredNodes, setMasteredNodes] = useState([]);

  const [mergedNodes, setMergedNodes] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [labText, setLabText] = useState("");
  const [analyzedText, setAnalyzedText] = useState(null);

  // --- HIERARCHY MAP ---
  const HIERARCHY = {
    'vocab': ['inf', 'rest'],
    'trap': ['neg', 'cons'],
    'logic': ['assum', 'weaken'],
    'macro': ['pair', 'org'],
    'hub': ['vocab', 'trap', 'logic', 'macro', 'lab']
  };

  // --- DICTIONARY ---
  const DECODER_DICT = {
    "infer": "Find TRUE statement NOT written directly.",
    "imply": "Find TRUE statement NOT written directly.",
    "attitude": "Check adjectives (Positive/Negative).",
    "except": "⚠️ TRAP: Find the FALSE statement.",
    "assumption": "The invisible bridge. Use Negation Test.",
    "weaken": "Attack the Premise (Table Leg).",
    "primary": "Main Idea (Must cover Start, Middle, End)."
  };

  const runTextAnalysis = () => {
    playSound('click'); // Sound Effect
    if (!labText.trim()) return;
    const words = labText.split(/(\s+|[.,!?;])/);
    const elements = words.map((word, index) => {
      const cleanWord = word.toLowerCase().trim();
      if (DECODER_DICT[cleanWord]) {
        return (
          <span key={index} className="lab-highlight" data-tip={DECODER_DICT[cleanWord]} onMouseEnter={() => playSound('hover')}>
            {word}<span className="lab-tooltip">{DECODER_DICT[cleanWord]}</span>
          </span>
        );
      }
      return <span key={index}>{word}</span>;
    });
    setAnalyzedText(elements);
  };

  // --- INITIAL DATA ---
  const initialNodes = [
    {
      id: 'hub', label: 'THE_CORE', x: window.innerWidth / 2, y: window.innerHeight / 2, r: 60, type: 'hub',
      content: {
        title: "SYSTEM CORE: THE ARCHITECT",
        concept: "Welcome to the Neural Net. This is not a textbook; it is a **Deconstruction Engine**. The UTBK is a game played against a specific opponent (The Test Maker). To win, you must stop thinking like a **'Student'** (who memorizes facts) and start thinking like the **'Architect'** (who builds the traps).",
        reason: "Observe the connections around you: You cannot solve specific 'Inference' puzzles (Green) without first 'Decoding' the hidden question commands (Blue). You cannot 'Weaken' an argument (Green) without understanding the abstract 'Logic' structure (Blue). **This Hub is where all systems converge.**",
        example: "MISSION PROTOCOL:\n1. Master the Leaf Nodes (Green Tactics) to verify your skills.\n2. Watch them merge into Branch Nodes (Blue Strategies).\n3. When the network collapses into this Core, the **FINAL PORTAL** will open.",
        words: ["Meta-Cognition", "Pattern Recognition", "System Integration", "The Architect"],
        practice: {
          question: "PHILOSOPHY CHECK: Why does this system distinguish between 'Student Mode' and 'Architect Mode'?",
          options: [
            "Architects memorize dictionary definitions faster.",
            "Students focus on 'Reading the Story', while Architects focus on 'Seeing the Blueprint' and traps.",
            "Architects ignore the text completely.",
            "It is just a cool name with no meaning."
          ],
          answer: 1,
          explanation: "Correct. A Student gets lost in the details of the passage. An Architect ignores the fluff and looks for the structural beams (Premise, Conclusion) and the landmines (Traps)."
        }
      }
    },
    {
      id: 'lab', label: 'TEXT_LAB', x: window.innerWidth / 2, y: window.innerHeight / 2 + 250, r: 50, type: 'tool',
      content: {
        title: "TEXT ANALYSIS LAB",
        concept: "Paste your own questions to decode them.",
        reason: "Tool",
        example: "Paste: 'Which statement best restates...'",
        words: [],
        practice: { question: "System Check: Is the Lab ready?", options: ["Yes", "No"], answer: 0, explanation: "Lab online." }
      }
    },
    {
      id: 'vocab', label: 'DECODER', x: 200, y: 200, r: 40, type: 'sub',
      content: {
        title: "THE DECODER PROTOCOL",
        concept: "The UTBK is not an English test; it is a **Code-Breaking** test. The test-makers (BP3) use 'Academic Camouflage' to make simple questions look impossible. Your job is to translate their code into simple instructions.",
        reason: "If you answer the question *as written*, you might fail. You must answer what they *actually want*. For example, 'Substantiate' just means 'Find Proof'. 'Manifestation' just means 'Example'.",
        example: "CODE: 'Which option best restates the underlying assumption regarding the phenomenon?'\n\nDECODED: 'Find the unwritten belief about this event.'",
        words: ["Camouflage", "Translation", "Academic Register", "Question Stem"],
        practice: {
          question: "META-SKILL: Decode the command. If a question asks 'Which statement is compatible with the author's view?', what are you actually looking for?",
          options: [
            "A statement that contradicts the author.",
            "A direct quote from the text.",
            "A statement that agrees with (or doesn't violate) the author's logic.",
            "A summary of the entire passage."
          ],
          answer: 2,
          explanation: "'Compatible' doesn't mean it must be written explicitly (Quote). It just means it must 'fit' or 'agree' with the author's stance without contradiction."
        }
      }
    },
    {
      id: 'inf', label: 'Inference', x: 100, y: 150, r: 30, type: 'leaf',
      content: {
        title: "INFERENCE PUZZLE",
        concept: "Inference is not 'guessing'. It means finding a statement that **MUST BE TRUE** based *only* on the provided evidence. Think of it as: **Evidence + Logic = Inference**.",
        reason: "The most common trap is 'Over-interpretation'. If the text says 'Many people like coffee', the inference is NOT 'Coffee is the most popular drink' (Too strong). The safe inference is 'Some people dislike tea' or simply 'Coffee has a consumer base'.",
        example: "TEXT: 'The store sold out of umbrellas by noon during the storm.'\n\nBAD INFERENCE: 'It was the worst storm in history.' (Exaggeration).\nGOOD INFERENCE: 'The demand for umbrellas exceeded the supply that morning.' (Logical certainty).",
        words: ["What can be inferred?", "The passage implies that...", "Suggests that...", "It can be deduced..."],
        practice: {
          question: "Text: 'While looking for a new location, the factory owner rejected Site A due to high taxes and Site B due to lack of rail access. He ultimately chose Site C.' What can be inferred about Site C?",
          options: [
            "Site C has the lowest taxes of all three options.",
            "Site C has rail access.",
            "Site C is the most profitable location.",
            "The owner does not care about local taxes."
          ],
          answer: 1,
          explanation: "If Site B was rejected specifically for LACK of rail access, and Site C was CHOSEN, Site C must reasonably satisfy the rail access requirement. (Option A is a trap: It might not be the 'lowest', just 'acceptable')."
        }
      }
    },
    {
      id: 'rest', label: 'Restatement', x: 150, y: 250, r: 30, type: 'leaf',
      content: {
        title: "RESTATEMENT PROTOCOL",
        concept: "This task requires you to identify the option that preserves the **Original Meaning** using **Different Vocabulary**. It is a test of Synonym Mapping.",
        reason: "You must match three things: \n1. **Subject** (Who?)\n2. **Action** (Did what?)\n3. **Intensity** (How strong?). \n\nIf the text says 'Decimated' (Strong), do not pick an answer that says 'Damaged' (Weak).",
        example: "TEXT: 'The ubiquity of smartphones precipitated a decline in face-to-face interaction.'\n\nANALYSIS:\n- Ubiquity -> Widespread presence\n- Precipitated -> Caused/Accelerated\n- Decline -> Reduction\n\nMATCH: 'Because smartphones are everywhere, personal conversations have decreased.'",
        words: ["Which sentence best restates...", "Closest in meaning to...", "Paraphrase the following..."],
        practice: {
          question: "Text: 'The scientist’s hypothesis was initially met with skepticism by his peers, though it was eventually vindicated by data.' Restatement:",
          options: [
            "The scientist's peers immediately supported his new theory.",
            "Data ultimately proved the scientist's theory correct, despite early doubts from colleagues.",
            "The scientist was skeptical of the data presented by his peers.",
            "The theory remained unproven despite the scientist's best efforts."
          ],
          answer: 1,
          explanation: "Breakdown: Skepticism = Doubts. Vindicated = Proved correct/Justified. Eventually = Ultimately. Option B matches all components perfectly."
        }
      }
    },
    {
      id: 'trap', label: 'TRAPS', x: 600, y: 200, r: 40, type: 'sub',
      content: {
        title: "THREAT INTELLIGENCE",
        concept: "Traps are designed to exploit your **'Fast Thinking' (System 1)**. When you are rushing, your brain hunts for familiar keywords. Test makers know this, so they put the 'familiar keywords' in the **Wrong Answer**.",
        reason: "You cannot avoid traps by 'reading harder'. You avoid them by recognizing their **Archetypes**. Once you name a trap (e.g., 'Oh, that's a Rotten Spot trap'), it loses its power over you.",
        example: "ARCHETYPE 1: The Rotten Spot (Everything is true except one word).\nARCHETYPE 2: The Extremist (Uses 'Always/Never').\nARCHETYPE 3: The Mirror (Uses exact words from the text but flips the meaning).",
        words: ["Distractor", "Cognitive Load", "System 1 vs 2", "Confirmation Bias"],
        practice: {
          question: "PATTERN RECOGNITION: You see an answer choice that uses the words 'Undeniably', 'Always', or 'Must'. What implies this is likely a trap?",
          options: [
            "It is too short.",
            "It uses 'Absolute Language' which is rarely scientifically accurate.",
            "It is grammatically incorrect.",
            "It is too detailed."
          ],
          answer: 1,
          explanation: "In academic texts, things are rarely 'Absolute'. Scientists say 'Evidence suggests' (99%), not 'Undeniably' (100%). Absolute words are a huge Red Flag."
        }
      }
    },
    {
      id: 'neg', label: 'Negative', x: 700, y: 150, r: 30, type: 'leaf',
      content: {
        title: "THE NEGATIVE TWIST",
        concept: "Questions containing **NOT**, **EXCEPT**, or **LEAST** force your brain to perform a 'Reverse Search'. You are looking for the **False Statement** or the **Unmentioned Detail**.",
        reason: "Your brain naturally hunts for matches. In a Negative Question, a match is a TRAP. \n\n**Strategy:** Treat the 4 options as a 'True/False' checklist. Mark 3 options as 'True' (Found in text). The one left over is your answer.",
        example: "QUESTION: 'All are mentioned EXCEPT...'\n\nOption A: Found in line 5. (TRUE - Cross it out)\nOption B: Found in line 12. (TRUE - Cross it out)\nOption C: Not found. (FALSE - **PICK THIS**)\nOption D: Found in line 2. (TRUE - Cross it out)",
        words: ["All of the following are true EXCEPT...", "The author does NOT agree...", "Which is LEAST likely..."],
        practice: {
          question: "Text mentions: Apples (Vit C), Bananas (Potassium), and Oranges (Fiber). Question: 'All benefits are mentioned EXCEPT:'",
          options: [
            "Apples provide Vitamin C.",
            "Bananas are a source of Potassium.",
            "Grapes offer antioxidants.",
            "Oranges contribute to Fiber intake."
          ],
          answer: 2,
          explanation: "Option A, B, and D are explicitly in the text (TRUE). Option C (Grapes) is never mentioned. Therefore, C is the correct answer to the 'EXCEPT' question."
        }
      }
    },
    {
      id: 'cons', label: 'Constraint', x: 650, y: 250, r: 30, type: 'leaf',
      content: {
        title: "THE CONSTRAINT TRAP",
        concept: "These questions limit the **SCOPE** of your search to a specific location (e.g., 'In Paragraph 2' or 'Based on the Table').",
        reason: "The most common wrong answer is **'True but Wrong Place'**. It is a statement that is factually correct according to the passage (e.g., found in Paragraph 1), but it does not answer the specific question asking about Paragraph 2.",
        example: "QUERY: 'According to Paragraph 3, why did the company fail?'\n\nTRAP: 'Poor leadership.' (True, but mentioned in Para 1).\nCORRECT: 'Market saturation.' (Mentioned in Para 3).",
        words: ["According to Paragraph X...", "Based on lines 10-15...", "The chart indicates..."],
        practice: {
          question: "Para 1: 'Bats eat insects.' Para 2: 'Bats are nocturnal.' Question: 'According to Paragraph 2, what is a characteristic of bats?'",
          options: [
            "They eat insects.",
            "They live in caves.",
            "They are active at night.",
            "They are mammals."
          ],
          answer: 2,
          explanation: "Option A is True, but in Para 1. Option B and D might be generally true, but not in the text. Option C ('active at night' = nocturnal) is the only truth found INSIDE Paragraph 2."
        }
      }
    },
    {
      id: 'logic', label: 'HOTS_LOGIC', x: 400, y: 500, r: 45, type: 'sub',
      content: {
        title: "THE LOGIC ENGINE",
        concept: "HOTS (Higher Order Thinking Skills) requires you to stop reading for 'Content' (The Story) and start reading for 'Architecture' (The Argument). Every logical passage has three parts: **The Premise** (Legs), **The Assumption** (Glue), and **The Conclusion** (Tabletop).",
        reason: "Most students attack the Conclusion ('That's not true!'). A Logician attacks the Premise ('Your evidence is weak') or the Assumption ('Your logic doesn't connect'). You must learn to separate these parts.",
        example: "ARGUMENT: 'He is tall, so he will be a great basketball player.'\n\nPREMISE: He is tall.\nCONCLUSION: He will be great.\nASSUMPTION: Height = Skill.",
        words: ["Premise", "Conclusion", "Validity", "Causation"],
        practice: {
          question: "ANATOMY CHECK: In the sentence 'Because the engine overheated, the car stopped', what role does 'the car stopped' play?",
          options: [
            "The Premise (The Cause).",
            "The Conclusion (The Result).",
            "The Assumption (The Link).",
            "The Rebuttal (The Counter)."
          ],
          answer: 1,
          explanation: "'Because the engine overheated' is the Reason/Premise. 'The car stopped' is the Result/Conclusion that happened because of the premise."
        }
      }
    },
    {
      id: 'assum', label: 'Assumption', x: 300, y: 600, r: 35, type: 'leaf',
      content: {
        title: "THE INVISIBLE BRIDGE",
        concept: "An Assumption is an **unstated premise** that MUST be true for the conclusion to hold water. It is the invisible bridge connecting the Evidence (A) to the Conclusion (B).",
        reason: "If the bridge (Assumption) is broken, the Conclusion cannot be reached. To find it, use the **NEGATION TEST**: Mentally insert 'NOT' into the answer choice. If the argument collapses/dies, that is the correct assumption.",
        example: "ARGUMENT: 'The city bought 50 new electric buses. Therefore, air quality will improve.'\n\nGAP: Just buying them isn't enough.\nASSUMPTION: 'The new buses will replace old diesel buses (not just be added to them).'\n\nNEGATION CHECK: 'The new buses will NOT replace diesel buses.' -> If true, air quality won't improve. Argument collapsed. Assumption Verified.",
        words: ["The argument relies on...", "Which is a necessary assumption?", "Presupposes that...", "Dependent upon..."],
        practice: {
          question: "Arg: 'This marketing course teaches advanced psychology. Therefore, graduates will be great salespeople.' Find the Assumption:",
          options: [
            "The course is considered the most expensive in the region.",
            "Psychology knowledge translates directly to sales performance.",
            "Most graduates explicitly want to become salespeople.",
            "The course instructors are all former top-tier salespeople."
          ],
          answer: 1,
          explanation: "Apply the Negation Test to Option B: If psychology knowledge DOES NOT translate to sales performance, the conclusion (they will be great salespeople) fails immediately. (Option D is a Strengthener, but not a necessary Assumption)."
        }
      }
    },
    {
      id: 'weaken', label: 'Weaken', x: 500, y: 600, r: 35, type: 'leaf',
      content: {
        title: "THE TABLE LEG ATTACK",
        concept: "To Weaken an argument, you must identify the **Premise** (Reason) and the **Conclusion** (Result), then **break the link** between them. You are not attacking the Conclusion directly; you are showing why the evidence doesn't support it.",
        reason: "The most effective Weakener often introduces an **Alternative Cause**. If the author thinks A caused B, you weaken it by showing that C actually caused B.",
        example: "ARGUMENT: 'Sales of ice cream increased in June, and shark attacks increased in June. Therefore, ice cream causes shark attacks.'\n\nWEAKENER: 'In June, the weather is hotter, causing more people to swim.' (Alternative Cause: Heat causes both, not ice cream).",
        words: ["Which statement most weakens...", "Cast doubt on...", "Undermine the argument...", "Call into question..."],
        practice: {
          question: "Arg: 'City A has more police officers than City B. Therefore, City A is safer.' Which statement WEAKENS this?",
          options: [
            "City A has a larger population than City B.",
            "City B has very few police officers.",
            "City A has a much higher crime rate per capita than City B.",
            "Police officers in City A are well-trained."
          ],
          answer: 2,
          explanation: "The conclusion is 'City A is safer'. Option C proves that despite having more police (Premise), the crime rate is higher (Result is false). This destroys the link between 'More Police' and 'Safety'."
        }
      }
    },
    {
      id: 'macro', label: 'STRUCTURE', x: 400, y: 100, r: 40, type: 'sub',
      content: {
        title: "TEXT BLUEPRINTS",
        concept: "Writers are lazy. They use standard templates (Blueprints) to organize ideas. If you recognize the Blueprint in the first paragraph, you don't need to read every word; you can **Predict** what comes next.",
        reason: "This is the key to Speed Reading. You are scanning for **'Signposts'** (Transition words) that tell you where the Blueprint is going.",
        example: "SIGNPOST: 'However...' -> PREDICTION: The author is about to disagree or present a contrast.\nSIGNPOST: 'For instance...' -> PREDICTION: Specific examples are coming (skim these).\nSIGNPOST: 'Consequently...' -> PREDICTION: A result/effect is coming.",
        words: ["Signpost", "Transition", "Blueprint", "Predicting"],
        practice: {
          question: "SIGNPOST ID: You are reading a text and see the phrase 'On the other hand...'. What should you expect next?",
          options: [
            "A continuation of the same idea.",
            "A summary of the previous paragraph.",
            "A contrasting point or opposing view.",
            "A specific example or data point."
          ],
          answer: 2,
          explanation: "'On the other hand' is the universal signal for Contrast. The author is pivoting to a new perspective or counter-argument."
        }
      }
    },
    {
      id: 'pair', label: 'Paired_Txt', x: 300, y: 50, r: 30, type: 'leaf',
      content: {
        title: "PAIRED PASSAGES",
        concept: "You are given two texts discussing the same topic. Your job is to act as a **Moderator**. You must identify the **Relationship** between them: Are they debating? Is Text B an example of Text A? Are they solving the same problem differently?",
        reason: "The hardest questions ask for the 'Point of Disagreement'. To solve this, you must find the specific variable where Author A says 'Yes' and Author B says 'No'.",
        example: "TEXT A: 'Space exploration is a waste of money.'\nTEXT B: 'Space exploration yields valuable technology for Earth.'\n\nRELATIONSHIP: Disagreement on the **Utility/Value** of space exploration.",
        words: ["Both passages agree that...", "The authors would likely disagree on...", "Passage B differs from Passage A in that..."],
        practice: {
          question: "Text A: 'Nuclear power is dangerous due to waste.' Text B: 'Nuclear power is essential for zero-carbon energy.' What is the point of disagreement?",
          options: [
            "Whether nuclear power produces energy.",
            "Whether carbon emissions are bad.",
            "The overall benefit-to-risk ratio of nuclear power.",
            "The cost of building nuclear plants."
          ],
          answer: 2,
          explanation: "Text A focuses on Risk (Waste). Text B focuses on Benefit (Zero-carbon). They disagree on the 'Overall Value' (Option C). They likely agree that energy is produced (A) and carbon is bad (B)."
        }
      }
    },
    {
      id: 'org', label: 'Organization', x: 500, y: 50, r: 30, type: 'leaf',
      content: {
        title: "TEXT ARCHITECTURE",
        concept: "This task asks NOT what the text says, but **HOW** it says it. You are looking at the **Function** of the paragraphs. Is it a chronological history? A problem followed by a solution? A theory followed by a rebuttal?",
        reason: "Ignore the details. Look at the transition words and the main idea of each paragraph. \nPara 1: 'However, critics argue...' \nPara 2: 'Furthermore, data shows...'\nStructure: Counter-argument followed by Evidence.",
        example: "PARA 1: Describes the problem of traffic.\nPARA 2: Proposes a new subway system.\nPARA 3: Discusses the cost of the subway.\n\nSTRUCTURE: Problem -> Solution -> Feasibility Analysis.",
        words: ["Which best describes the organization?", "The relationship between Para 1 and Para 2...", "The primary purpose of the passage..."],
        practice: {
          question: "Para 1: 'Many believe the earth is flat.' Para 2: 'Satellite imagery proves the earth is round.' What is the structure?",
          options: [
            "A detailed history of geography.",
            "A widely held belief followed by scientific refutation.",
            "Two opposing theories that are equally valid.",
            "A cause and effect relationship."
          ],
          answer: 1,
          explanation: "Para 1 presents a belief (Flat Earth). Para 2 provides evidence to prove it wrong (Refutation). Option B perfectly describes this 'Claim vs. Counter-Fact' structure."
        }
      }
    }
  ];

  const links = [
    { source: 'hub', target: 'lab' },
    { source: 'hub', target: 'vocab' }, { source: 'vocab', target: 'inf' }, { source: 'vocab', target: 'rest' },
    { source: 'hub', target: 'trap' }, { source: 'trap', target: 'neg' }, { source: 'trap', target: 'cons' },
    { source: 'hub', target: 'logic' }, { source: 'logic', target: 'assum' }, { source: 'logic', target: 'weaken' },
    { source: 'hub', target: 'macro' }, { source: 'macro', target: 'pair' }, { source: 'macro', target: 'org' }
  ];

  const [nodes, setNodes] = useState(initialNodes.map(n => ({ ...n, vx: 0, vy: 0 })));

  const executeWarp = (nodeId) => {
    playSound('click'); // Sound Effect
    // FINAL BOSS NAVIGATION LOGIC
    if (nodeId === 'hub' && gameComplete) {
      playSound('portal'); // Sound Effect
      navigate('/materi/6');
      return;
    }
    setActiveNode(nodeId);
    setShowSearch(false);
    setActiveTab('concept');
  };

  // --- INIT & PROGRESS ---
  useEffect(() => {
    const saved = localStorage.getItem('utbk_mastery_5');
    if (saved) {
      const parsed = JSON.parse(saved);
      setMasteredNodes(parsed);
    }

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        playSound('hover'); // Sound Effect
        setShowSearch(prev => !prev);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
        setActiveNode(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const preventDefault = (e) => {
      if (e.target.closest('.constellation-wrapper')) {
        if (!e.target.closest('.panel-body')) {
          e.preventDefault();
        }
      }
    };
    document.body.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  const handleMastery = (nodeId) => {
    if (!masteredNodes.includes(nodeId)) {
      playSound('mastery'); // Sound Effect
      const newMastery = [...masteredNodes, nodeId];
      setMasteredNodes(newMastery);
      localStorage.setItem('utbk_mastery_5', JSON.stringify(newMastery));
    }
  };

  const resetProgress = () => {
    playSound('click'); // Sound Effect
    setMasteredNodes([]);
    setMergedNodes([]);
    setGameComplete(false);
    localStorage.removeItem('utbk_mastery_5');
    setNodes(initialNodes.map(n => ({ ...n, vx: 0, vy: 0 })));
  };

  // --- THE MERGE ENGINE ---
  useEffect(() => {
    let nodesToMerge = [];
    let newMasteredParents = [];

    Object.keys(HIERARCHY).forEach(parentId => {
      const children = HIERARCHY[parentId];
      const allChildrenMastered = children.every(childId => masteredNodes.includes(childId));
      const childrenVisible = children.some(childId => !mergedNodes.includes(childId));

      if (allChildrenMastered && childrenVisible) {
        nodesToMerge.push(...children);
        if (!masteredNodes.includes(parentId)) {
          newMasteredParents.push(parentId);
        }
      }
    });

    if (nodesToMerge.length > 0) {
      animateMerge(nodesToMerge, newMasteredParents);
    }

    if (masteredNodes.includes('hub') && !gameComplete) {
      setTimeout(() => {
        setGameComplete(true);
        playSound('portal'); // Sound Effect on Boss Unlock
      }, 2500);
    }

  }, [masteredNodes]);

  const animateMerge = (childIds, newParents) => {
    if (newParents.length > 0) {
      const updated = [...masteredNodes, ...newParents];
      setMasteredNodes(updated);
      localStorage.setItem('utbk_mastery_5', JSON.stringify(updated));
    }

    playSound('merge'); // Sound Effect

    setNodes(prev => prev.map(node => {
      if (childIds.includes(node.id)) {
        const parentId = Object.keys(HIERARCHY).find(pid => HIERARCHY[pid].includes(node.id));
        const parentNode = prev.find(n => n.id === parentId);
        if (parentNode) {
          return { ...node, x: parentNode.x, y: parentNode.y, isMerging: true };
        }
      }
      return node;
    }));

    setTimeout(() => {
      setMergedNodes(prev => [...prev, ...childIds]);
    }, 1000);
  };

  // --- PHYSICS ENGINE (BOUNCY PRESETS) ---
  useEffect(() => {
    let animationFrameId;
    const runSimulation = () => {
      setNodes(prevNodes => {
        const newNodes = prevNodes.map(n => ({ ...n }));
        const activeNodes = newNodes.filter(n => !mergedNodes.includes(n.id) && !n.isMerging);

        // BOUNCY PRESETS
        const DAMPING = activeNode ? 0.1 : 0.85;
        const REPULSION = 25000;
        const CENTER_PULL = 0.015;
        const SPRING_STIFFNESS = 0.05;

        const centerTargetX = window.innerWidth / 2;
        const centerTargetY = window.innerHeight / 2;

        activeNodes.forEach(node => {
          if (node.id === draggingId) return;
          let fx = 0, fy = 0;

          activeNodes.forEach(other => {
            if (node.id === other.id) return;
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            let dist = Math.sqrt(dx * dx + dy * dy) || 1;
            if (dist < 50) dist = 50;
            const force = REPULSION / (dist * dist);
            fx += (dx / dist) * force;
            fy += (dy / dist) * force;
          });

          links.forEach(link => {
            const isSource = link.source === node.id;
            const isTarget = link.target === node.id;
            const otherId = isSource ? link.target : link.source;
            if ((isSource || isTarget) && !mergedNodes.includes(otherId)) {
              const other = activeNodes.find(n => n.id === otherId);
              if (other) {
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const isHubConnection = node.type === 'hub' || other.type === 'hub';
                const restLength = isHubConnection ? 220 : 120;
                const force = (dist - restLength) * SPRING_STIFFNESS;
                fx -= (dx / dist) * force;
                fy -= (dy / dist) * force;
              }
            }
          });

          fx += (centerTargetX - node.x) * CENTER_PULL;
          fy += (centerTargetY - node.y) * CENTER_PULL;

          node.vx = (node.vx + fx) * DAMPING;
          node.vy = (node.vy + fy) * DAMPING;

          const MAX_SPEED = 15;
          if (Math.abs(node.vx) > MAX_SPEED) node.vx = Math.sign(node.vx) * MAX_SPEED;
          if (Math.abs(node.vy) > MAX_SPEED) node.vy = Math.sign(node.vy) * MAX_SPEED;

          node.x += node.vx;
          node.y += node.vy;
        });

        return newNodes;
      });
      animationFrameId = requestAnimationFrame(runSimulation);
    };
    runSimulation();
    return () => cancelAnimationFrame(animationFrameId);
  }, [draggingId, activeNode, mergedNodes]);

  const getZoomStyle = () => {
    if (!activeNode) return { transform: 'translate(0,0) scale(1)' };
    const node = nodes.find(n => n.id === activeNode);
    if (!node) return { transform: 'translate(0,0) scale(1)' };
    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? 2.5 : 4;
    const targetX = window.innerWidth / 2;
    const targetY = isMobile ? window.innerHeight / 2 - 150 : window.innerHeight / 2;
    const translateX = targetX - (node.x * scale);
    const translateY = targetY - (node.y * scale);
    return { transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`, transformOrigin: '0 0' };
  };

  const handleMouseDown = (e, id) => { e.stopPropagation(); setDraggingId(id); dragStartPos.current = { x: e.clientX, y: e.clientY }; playSound('hover'); };
  const handleMouseMove = (e) => {
    if (draggingId && svgRef.current && !activeNode) {
      const rect = svgRef.current.getBoundingClientRect();
      setNodes(prev => prev.map(n => n.id === draggingId ? { ...n, x: e.clientX - rect.left, y: e.clientY - rect.top, vx: 0, vy: 0 } : n));
    }
  };
  const handleMouseUp = (e) => {
    if (draggingId) {
      const deltaX = Math.abs(e.clientX - dragStartPos.current.x);
      const deltaY = Math.abs(e.clientY - dragStartPos.current.y);
      if (deltaX < 5 && deltaY < 5) executeWarp(draggingId);
    }
    setDraggingId(null);
  };
  const handleTouchStart = (e, id) => { e.stopPropagation(); setDraggingId(id); dragStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; playSound('hover'); };
  const handleTouchMove = (e) => {
    if (draggingId && !activeNode) {
      const touch = e.touches[0]; const rect = svgRef.current.getBoundingClientRect();
      setNodes(prev => prev.map(n => n.id === draggingId ? { ...n, x: touch.clientX - rect.left, y: touch.clientY - rect.top, vx: 0, vy: 0 } : n));
    }
  };
  const handleTouchEnd = (e) => {
    if (draggingId) {
      const t = e.changedTouches[0];
      const dx = Math.abs(t.clientX - dragStartPos.current.x);
      const dy = Math.abs(t.clientY - dragStartPos.current.y);
      if (dx < 15 && dy < 15) executeWarp(draggingId);
    }
    setDraggingId(null);
  };

  const getNode = (id) => nodes.find(n => n.id === id) || { x: 0, y: 0 };

  const renderPanelContent = () => {
    const node = nodes.find(n => n.id === activeNode);
    if (!node) return null;
    const { content } = node;
    const isMastered = masteredNodes.includes(node.id);

    // --- 1. UNIQUE INTERFACE FOR THE HUB (THE CORE) ---
    // --- 1. UNIQUE INTERFACE FOR THE HUB (THE CORE) ---
    // --- 1. UNIQUE INTERFACE FOR THE HUB (THE CORE) ---
    if (node.id === 'hub') {
      const subNodes = ['vocab', 'trap', 'logic', 'macro', 'lab'];
      const systemsStatus = subNodes.map(id => ({
        id,
        label: initialNodes.find(n => n.id === id)?.label || id,
        isOnline: masteredNodes.includes(id)
      }));

      return (
        <div className="hub-dashboard" style={{
          display: 'flex',
          flexDirection: 'column',
          // CHANGE 1: Use 95vh. (110vh is too big and cuts off the bottom).
          height: '95vh',
          overflow: 'hidden',
          padding: 0 // Ensure no internal padding on the main box
        }}>

          {/* Header Section */}
          <div className="hub-header" style={{
            flexShrink: 0,
            // CHANGE 2: Manually set padding to be very tight at the top
            paddingTop: '15px',
            paddingBottom: '10px',
            paddingLeft: '20px',
            paddingRight: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              {/* CHANGE 3: Remove default margins from the title to push it up */}
              <h2 className="hub-title" style={{ marginTop: 0, marginBottom: '5px', lineHeight: '1.2' }}>
                SYSTEM_CORE
              </h2>
              <span className="hub-subtitle" style={{ display: 'block' }}>ARCHITECT_MODE // V.5.0</span>
            </div>
            {isMastered ? <span className="mastery-badge">ACCESS GRANTED</span> : <span className="sys-status err">LOCKED</span>}
          </div>

          {/* Scrollable Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px', minHeight: 0 }}>

            <div className="hub-manifesto" style={{ marginTop: '10px' }}>
              <strong style={{ color: 'var(--hub-color)', display: 'block', marginBottom: '10px' }}>THE ARCHITECT'S MANIFESTO:</strong>
              "The UTBK is not a test of English; it is a test of <strong>Pattern Recognition</strong>.
              A Student reads for the story. An Architect reads for the structure.
              <br /><br />
              Your mission is not to answer questions, but to <strong>dismantle</strong> them.
              Verify that all Sub-Systems below are ONLINE before attempting the Final Protocol."
            </div>

            <div className="system-grid">
              {systemsStatus.map(sys => (
                <div key={sys.id} className={`sys-card ${sys.isOnline ? 'online' : 'offline'}`}>
                  <span className="sys-name">{sys.label}</span>
                  <span className={`sys-status ${sys.isOnline ? 'ok' : 'err'}`}>
                    {sys.isOnline ? "● ONLINE" : "○ AWAITING INPUT"}
                  </span>
                </div>
              ))}
            </div>

            <div className="security-clearance" style={{ marginBottom: '20px' }}>
              <span className="clearance-title">&gt; SECURITY_CHECK: VERIFY MINDSET</span>
              <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>{content.practice.question}</p>
              {content.practice.options.map((opt, i) => (
                <button key={i} className="clearance-opt" onClick={(e) => {
                  if (i === content.practice.answer) {
                    e.target.style.background = 'var(--hub-color)';
                    e.target.style.color = 'black';
                    e.target.innerText = "ACCESS GRANTED. INITIALIZING MERGE...";
                    playSound('mastery');
                    handleMastery('hub');
                  } else {
                    e.target.style.background = 'red';
                    e.target.innerText = "ACCESS DENIED";
                    playSound('click');
                  }
                }}>
                  [{String.fromCharCode(65 + i)}] {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <button className="close-panel-btn" style={{ flexShrink: 0, margin: '0' }} onClick={() => setActiveNode(null)}>DISCONNECT</button>
        </div>
      );
    }

    // --- 2. UNIQUE INTERFACE FOR THE LAB (TOOL) ---
    if (node.id === 'lab') {
      return (
        <div className="content-stack lab-mode">
          <div className="panel-header-row"><h2 className="panel-title panel-title-lab">TEXT_ANALYSIS_LAB</h2></div>
          <div className="panel-body">
            <p className="instruction">Paste any confusing UTBK Question below:</p>
            <textarea className="lab-input" placeholder="e.g. Which of the following..." value={labText} onChange={(e) => setLabText(e.target.value)} />
            <button className="lab-btn" onClick={runTextAnalysis}>RUN DECRYPTION</button>
            {analyzedText && <div className="lab-result fade-in"><div className="result-label">DECRYPTED OUTPUT:</div><div className="result-text">{analyzedText}</div></div>}

            <div className="practice-module" style={{ marginTop: '20px' }}>
              <p className="practice-q">{content.practice.question}</p>
              <div className="options-grid">
                {content.practice.options.map((opt, i) => (
                  <button key={i} className="opt-btn" onClick={(e) => {
                    if (i === content.practice.answer) {
                      e.target.classList.add('correct');
                      handleMastery(node.id);
                    } else {
                      e.target.classList.add('wrong');
                      playSound('click');
                    }
                  }}>{opt}</button>
                ))}
              </div>
            </div>
          </div>
          <button className="close-panel-btn" onClick={() => { playSound('click'); setActiveNode(null); }}>ZOOM OUT</button>
        </div>
      );
    }

    // --- 3. STANDARD INTERFACE FOR ALL OTHER NODES ---
    return (
      // FIX: Flex column and max-height constraints
      <div className="content-stack" style={{ display: 'flex', flexDirection: 'column', maxHeight: '80vh', overflow: 'hidden' }}>

        {/* Header fixed */}
        <div className="panel-header-row" style={{ flexShrink: 0 }}>
          <h2 className="panel-title">{content.title}</h2>
          {isMastered && <span className="mastery-badge">🏆 MASTERED</span>}
        </div>

        {/* Tabs fixed */}
        <div className="panel-tabs" style={{ flexShrink: 0 }}>
          <button className={activeTab === 'concept' ? 'active' : ''} onClick={() => { playSound('hover'); setActiveTab('concept'); }}>CONCEPT</button>
          <button className={activeTab === 'example' ? 'active' : ''} onClick={() => { playSound('hover'); setActiveTab('example'); }}>ILLUSTRATION</button>
          <button className={activeTab === 'words' ? 'active' : ''} onClick={() => { playSound('hover'); setActiveTab('words'); }}>SIGNALS</button>
          {content.practice && <button className={activeTab === 'practice' ? 'active' : ''} onClick={() => { playSound('hover'); setActiveTab('practice'); }}>SIMULATE</button>}
        </div>

        {/* FIX: Body is scrollable */}
        <div className="panel-body" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {activeTab === 'concept' && <div className="fade-in"><p className="concept-text">{content.concept}</p><div className="reason-box"><strong>THE LOGIC:</strong><p>{content.reason}</p></div></div>}
          {activeTab === 'example' && content.example && <div className="fade-in"><div className="example-box"><strong>REAL WORLD EXAMPLE:</strong><pre>{content.example}</pre></div></div>}
          {activeTab === 'words' && <div className="fade-in"><div className="word-cloud">{content.words.map((w, i) => <span key={i} className="signal-chip" onMouseEnter={() => playSound('hover')}>{w}</span>)}</div></div>}
          {activeTab === 'practice' && content.practice && (
            <div className="fade-in practice-module">
              <p className="practice-q">{content.practice.question}</p>
              <div className="options-grid">{content.practice.options.map((opt, i) => <button key={i} className="opt-btn" onClick={(e) => { if (i === content.practice.answer) { e.target.classList.add('correct'); handleMastery(node.id); } else { e.target.classList.add('wrong'); playSound('click'); } }}>{opt}</button>)}</div>
              <p className="explanation"><small>💡 {content.practice.explanation}</small></p>
            </div>
          )}
        </div>

        {/* Footer fixed */}
        <button className="close-panel-btn" style={{ flexShrink: 0 }} onClick={() => { playSound('click'); setActiveNode(null); }}>ZOOM OUT</button>
      </div>
    );
  };

  const filteredNodes = initialNodes.filter(node =>
    node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.content.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="constellation-wrapper"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Link to="/" className="nav-home-absolute" onClick={() => playSound('click')}>← DASHBOARD</Link>

      <div className="bg-noise"></div>
      <div className="bg-grid"></div>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      {showSearch && (
        <div className="search-overlay" onClick={() => setShowSearch(false)}>
          <div className="search-box" onClick={(e) => e.stopPropagation()}>
            <div className="search-header"><span className="blink">&gt;_</span> SEARCH_DATABASE</div>
            <input ref={searchInputRef} className="search-input" type="text" placeholder="Enter keywords..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
            <div className="search-results">{filteredNodes.length > 0 ? (filteredNodes.map(node => (<div key={node.id} className="search-item" onClick={() => executeWarp(node.id)} onMouseEnter={() => playSound('hover')}><span className={`dot ${node.type}`}></span><div className="search-info"><span className="search-title">{node.label}</span><span className="search-desc">{node.content.title}</span></div><span className="warp-btn">WARP &rarr;</span></div>))) : <div className="no-results">NO_DATA_FOUND</div>}</div>
          </div>
        </div>
      )}

      <div className="hud-layer">
        <div className="hud-top-row"><div className="hud-title">NEURAL_NET: <span className="highlight">ONLINE</span></div><button className="search-trigger-btn" onClick={() => { playSound('click'); setShowSearch(true); }}>🔍 SEARCH</button></div>
        <div className="progress-bar">MERGED: {mergedNodes.length} / {initialNodes.length - 1} NODES <div className="progress-fill" style={{ width: `${(mergedNodes.length / (initialNodes.length - 1)) * 100}%` }}></div></div>
        <button className="reset-btn" onClick={resetProgress}>RESET SYSTEM</button>
      </div>

      <div className={`data-panel ${activeNode ? 'visible' : ''}`}>
        {activeNode && renderPanelContent()}
      </div>

      <svg ref={svgRef} className="network-svg">
        <g className="zoom-layer" style={getZoomStyle()}>

          {links.map((link, i) => {
            if (mergedNodes.includes(link.source) || mergedNodes.includes(link.target)) return null;
            const start = getNode(link.source);
            const end = getNode(link.target);
            return (
              <line key={i} x1={start.x} y1={start.y} x2={end.x} y2={end.y} className="net-link" style={{ stroke: 'rgba(0, 243, 255, 0.4)', strokeWidth: '1.5px', filter: 'drop-shadow(0 0 3px rgba(0, 243, 255, 0.8))' }} />
            );
          })}

          {nodes.map((node) => {
            if (mergedNodes.includes(node.id) && !node.isMerging) return null;
            const isMastered = masteredNodes.includes(node.id);
            const isBoss = node.id === 'hub' && gameComplete;
            const isActive = activeNode === node.id;
            const isBlurred = activeNode && !isActive;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x},${node.y})`}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                onTouchStart={(e) => handleTouchStart(e, node.id)}
                onMouseEnter={() => playSound('hover')}
                className={`net-node-group ${isActive ? 'active' : ''} ${isMastered ? 'mastered' : ''} ${isBlurred ? 'blurred' : ''} ${node.isMerging ? 'merging-node' : ''} ${isBoss ? 'portal-mode' : ''}`}
                style={{ cursor: draggingId === node.id ? 'grabbing' : 'grab' }}
              >
                <circle r={node.r + (isBoss ? 20 : 10)} className={`node-glow ${node.type}`} />
                <circle r={node.r} className={`node-core ${node.type} ${isBoss ? 'portal' : ''}`} />
                <text dy={node.r + 20} className="node-label" style={{ opacity: isBlurred ? 0 : 1 }}>
                  {isBoss ? "ACCESS BOSS LEVEL" : node.label}
                </text>
                {isMastered && !isBoss && <text dy={-node.r - 10} className="mastery-star">⭐</text>}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default LogicConstellation;