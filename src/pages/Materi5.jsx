import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ADDED useNavigate
import './Materi5.css';

const LogicConstellation = () => {
  const navigate = useNavigate(); // ADDED for the final portal jump
  const svgRef = useRef(null);
  const searchInputRef = useRef(null);
  
  const dragStartPos = useRef({ x: 0, y: 0 }); 
  
  const [activeNode, setActiveNode] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [activeTab, setActiveTab] = useState('concept'); 
  const [masteredNodes, setMasteredNodes] = useState([]);
  
  // --- ADDED: MERGE STATE ---
  const [mergedNodes, setMergedNodes] = useState([]); 
  const [gameComplete, setGameComplete] = useState(false);
  
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [labText, setLabText] = useState("");
  const [analyzedText, setAnalyzedText] = useState(null);

  // --- ADDED: HIERARCHY MAP ---
  const HIERARCHY = {
    'vocab': ['inf', 'rest'],      // Decoder eats Inference & Restatement
    'trap': ['neg', 'cons'],       // Trap eats Negative & Constraint
    'logic': ['assum', 'weaken'],  // Logic eats Assumption & Weaken
    'macro': ['pair', 'org'],      // Structure eats Paired & Organization
    'hub': ['vocab', 'trap', 'logic', 'macro', 'lab'] // Hub eats everything
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
    if (!labText.trim()) return;
    const words = labText.split(/(\s+|[.,!?;])/);
    const elements = words.map((word, index) => {
      const cleanWord = word.toLowerCase().trim();
      if (DECODER_DICT[cleanWord]) {
        return (
          <span key={index} className="lab-highlight" data-tip={DECODER_DICT[cleanWord]}>
            {word}<span className="lab-tooltip">{DECODER_DICT[cleanWord]}</span>
          </span>
        );
      }
      return <span key={index}>{word}</span>;
    });
    setAnalyzedText(elements);
  };

  // --- INITIAL DATA (PRESERVED ALL YOUR TEXT) ---
  const initialNodes = [
    { 
      id: 'hub', label: 'UTBK_CORE', x: window.innerWidth/2, y: window.innerHeight/2, r: 60, type: 'hub', 
      content: { 
        title: "THE UTBK SYSTEM", 
        concept: "The UTBK test is designed with a 'double layer' of complexity. 1. The Text is hard to read. 2. The Question is hard to understand.",
        reason: "The test makers (BP3) wrap simple tasks (like 'Find the main idea') in complex academic language to intimidate you. If you misunderstand the question, you will hunt for the wrong info.",
        example: "Instead of asking 'What does the author think?', they ask 'What is the author's attitude regarding the phenomenon?'",
        words: ["BP3 System", "Literacy", "Cognitive Potential"], 
        practice: null 
      } 
    },
    { 
        id: 'lab', label: 'TEXT_LAB', x: window.innerWidth/2, y: window.innerHeight/2 + 250, r: 50, type: 'tool', 
        content: { 
            title: "TEXT ANALYSIS LAB", 
            concept: "Paste your own questions to decode them.", 
            reason: "Tool", 
            example: "Paste: 'Which statement best restates...'", 
            words: [], 
            // ADDED: Simple check so Lab can be 'Mastered' and merge
            practice: { question: "System Check: Is the Lab ready?", options: ["Yes", "No"], answer: 0, explanation: "Lab online." } 
        } 
    },

    // --- BRANCH 1: DECODING ---
    { 
      id: 'vocab', label: 'DECODER', x: 200, y: 200, r: 40, type: 'sub', 
      content: { 
        title: "THE TRANSLATION LAYER", 
        concept: "The biggest barrier in UTBK is not the text, but the Question Stem itself. BP3 uses 'Fancy Vocabulary Camouflage' to hide simple tasks.", 
        reason: "If you don't know what 'Inferred', 'Implied', or 'Restates' means, you are answering blindly. You must translate the Academic English into Simple English before reading the passage.", 
        example: "CAMOUFLAGE: 'Which statement best restates the sentence?'\nTRANSLATION: 'Find a synonym sentence (Same meaning, different words).'", 
        words: ["Imply", "Infer", "Suggests", "Restates"], 
        practice: null 
      } 
    },
    { 
      id: 'inf', label: 'Inference', x: 100, y: 150, r: 30, type: 'leaf', 
      content: { 
        title: "INFERENCE PUZZLE", 
        concept: "Inference means finding a statement that is TRUE but NOT written directly in the text. You must 'read between the lines'.", 
        reason: "It tests your ability to connect facts. If the text says 'The ground is wet', you must infer 'It rained' or 'Sprinklers were on'.", 
        example: "TEXT: 'John walked in shaking his umbrella.' \nQUESTION: 'What can be inferred?' \nANSWER: 'It is raining outside.' (True, but not written).",
        words: ["What can be inferred?", "Implies that...", "Suggests that..."], 
        practice: { question: "Text: 'The crowd cheered as the player lifted the trophy.' Infer:", options: ["The player is rich", "The player won the match", "It is a football game"], answer: 1, explanation: "Lifting a trophy logically implies winning, even if the word 'win' isn't used." } 
      } 
    },
    { 
      id: 'rest', label: 'Restatement', x: 150, y: 250, r: 30, type: 'leaf', 
      content: { 
        title: "RESTATEMENT TASK", 
        concept: "Find the option that has the SAME meaning as the sentence in the text, but uses DIFFERENT words (Synonyms).", 
        reason: "This tests your vocabulary range. You must match Subject, Verb, and Object.", 
        example: "TEXT: 'The ubiquity of smartphones precipitated a decline in conversation.' \nANSWER: 'Because smartphones are everywhere, people talk less.'",
        words: ["Best restates", "Closest in meaning", "Paraphrase"], 
        practice: { question: "Text: 'The rigorous training exhausted the athletes.' Restatement:", options: ["The athletes were tired of training", "The hard training made them very tired", "The training was too easy"], answer: 1, explanation: "Rigorous = Hard. Exhausted = Very tired." } 
      } 
    },

    // --- BRANCH 2: TRAPS ---
    { 
      id: 'trap', label: 'TRAPS', x: 600, y: 200, r: 40, type: 'sub', 
      content: { 
        title: "THREAT DETECTION", 
        concept: "The test makers insert specific 'distractors' designed to trick your brain's fast-thinking mode (System 1). Being smart isn't enough; you must be vigilant.", 
        reason: "Common traps rely on 'Cognitive Load'. They overwhelm you with details so you miss small words like 'NOT' or 'EXCEPT', or they trick you with answers that are true but in the wrong paragraph.", 
        example: "TRAP: A question asks about Paragraph 3. Option A is a perfect, true sentence from Paragraph 1. \nRESULT: Careless students pick A because it looks familiar.", 
        words: ["EXCEPT", "NOT", "Paragraph X", "Lines 10-15"], 
        practice: null
      } 
    },
    { 
      id: 'neg', label: 'Negative', x: 700, y: 150, r: 30, type: 'leaf', 
      content: { 
        title: "THE NEGATIVE TWIST", 
        concept: "Questions using NOT, EXCEPT, or LEAST force your brain to reverse its logic. This causes 'Cognitive Load' failure.", 
        reason: "Students often miss the 'NOT', see the first true statement, get excited, and pick it (which is the wrong answer).", 
        example: "QUESTION: 'All of the following are true EXCEPT...' \nSTRATEGY: Mentally rewrite it to 'Find the FALSE statement'.",
        words: ["All true EXCEPT...", "LEAST likely...", "The author does NOT agree"], 
        practice: { question: "Strategy: How to handle 'All true EXCEPT'?", options: ["Find the TRUE statement", "Find the FALSE statement", "Skip it"], answer: 1, explanation: "Rewrite it mentally to 'Find the False statement' to avoid confusion." } 
      } 
    },
    { 
      id: 'cons', label: 'Constraint', x: 650, y: 250, r: 30, type: 'leaf', 
      content: { 
        title: "THE CONSTRAINT TRAP", 
        concept: "The question limits the scope (e.g., 'In Paragraph 3'). The Trap Answer is a true fact found in Paragraph 1.", 
        reason: "The trap answer is TRUE according to the text, but FALSE according to the question's constraint.", 
        example: "QUESTION: 'According to Paragraph 3, what is the benefit?' \nFIX: Circle 'Para 3'. Ignore Para 1 and 2.",
        words: ["According to Paragraph X", "Based on lines 10-15"], 
        practice: { question: "If the question says 'In Paragraph 2', where do you look?", options: ["The whole text", "Only Paragraph 2", "Paragraph 1 and 2"], answer: 1, explanation: "Ignore all other paragraphs. The answer MUST be in Para 2." } 
      } 
    },

    // --- BRANCH 3: LOGIC ---
    { 
      id: 'logic', label: 'HOTS_LOGIC', x: 400, y: 500, r: 45, type: 'sub', 
      content: { 
        title: "ABSTRACT REASONING", 
        concept: "HOTS (Higher Order Thinking Skills) moves beyond reading comprehension into 'Argument Architecture'. You are acting as a logician, not just a reader.", 
        reason: "These questions don't ask 'What happened?'. They ask 'How does this argument work?'. You must identify the Premise (Reasons), Conclusion (Result), and the invisible glue holding them together.", 
        example: "ARGUMENT: 'It is cloudy, so it will rain.' \nANALYSIS: The premise (Cloudy) only leads to the conclusion (Rain) if we assume clouds always equal rain.", 
        words: ["Assumption", "Weaken", "Strengthen", "Analogy"], 
        practice: null
      } 
    },
    { 
      id: 'assum', label: 'Assumption', x: 300, y: 600, r: 35, type: 'leaf', 
      content: { 
        title: "THE INVISIBLE BRIDGE", 
        concept: "An Assumption is an unstated premise. It is the invisible bridge connecting the Premise (Bank A) to the Conclusion (Bank B).", 
        reason: "It is the foundation. If you remove the assumption, the argument collapses. Use the 'Negation Test' to find it.", 
        example: "ARGUMENT: 'I have a ticket, so I will see the concert.' \nASSUMPTION: 'The concert will not be cancelled.' (If it IS cancelled, the ticket is useless).",
        words: ["Underlying assumption", "Presupposes", "Based on"], 
        practice: { question: "Premise: 'He runs.' Conclusion: 'He is fit.' Assumption:", options: ["He runs often", "Running causes fitness", "He eats well"], answer: 1, explanation: "If running DOESN'T cause fitness (Negation), the argument dies." } 
      } 
    },
    { 
      id: 'weaken', label: 'Weaken', x: 500, y: 600, r: 35, type: 'leaf', 
      content: { 
        title: "THE TABLE LEG ATTACK", 
        concept: "To Weaken an argument, do not attack the Conclusion (The Tabletop). You must kick out the Legs (The Premise).", 
        reason: "You must prove that the 'Reason' does not necessarily lead to the 'Result'. You break the link between them.", 
        example: "ARGUMENT: 'Ban phones to improve focus.' \nWEAKENER: 'Students will just doodle if phones are gone.' (Attacks the premise that no phones = focus).",
        words: ["Weaken the argument", "Cast doubt on", "Undermine"], 
        practice: { question: "Arg: 'He studies hard, so he will pass.' How to weaken?", options: ["He is smart", "The exam is tomorrow", "The exam material is not what he studied"], answer: 2, explanation: "This attacks the link. Studying hard doesn't matter if he studied the wrong thing." } 
      } 
    },

    // --- BRANCH 4: MACRO STRUCTURE ---
    { 
      id: 'macro', label: 'STRUCTURE', x: 400, y: 100, r: 40, type: 'sub', 
      content: { 
        title: "TEXT ARCHITECTURE", 
        concept: "This mode requires you to 'Zoom Out'. Instead of reading every word, you are looking at the blueprint of the essay.", 
        reason: "Authors follow specific patterns (Problem-Solution, Chronological, Comparative). Identifying the pattern in the first paragraph lets you predict the rest of the text.", 
        example: "PATTERN: Paragraph 1 describes a disaster. Paragraph 2 describes a new technology. \nSTRUCTURE: Problem -> Solution.", 
        words: ["Organization", "Relation", "Primary Purpose"], 
        practice: null
      } 
    },
    { 
      id: 'pair', label: 'Paired_Txt', x: 300, y: 50, r: 30, type: 'leaf', 
      content: { 
        title: "PAIRED PASSAGES", 
        concept: "Two texts discussing the same topic. Usually a Debate (Pro vs Anti) or Agreement (Theory vs Example).", 
        reason: "You must hold two arguments in your head. Treat it like a debate. Tag Text A as 'Pro-Nuclear' and Text B as 'Anti-Nuclear'.", 
        example: "TEXT A: 'AI is dangerous.' \nTEXT B: 'AI will save lives.' \nQUESTION: 'What would both authors agree on?' (Likely that AI is powerful).",
        words: ["Both passages agree...", "Mentioned in A but not B"], 
        practice: { question: "Strategy: What is the first step for Paired Passages?", options: ["Read both fully", "Label the stance (Pro/Anti)", "Compare details immediately"], answer: 1, explanation: "Labeling the stance helps you filter answers quickly without rereading." } 
      } 
    },
    { 
      id: 'org', label: 'Organization', x: 500, y: 50, r: 30, type: 'leaf', 
      content: { 
        title: "TEXT ORGANIZATION", 
        concept: "How does the author arrange ideas? Not what they say, but the blueprint of the essay.", 
        reason: "Look at the first sentence of each paragraph. Common patterns: Problem -> Solution, or Chronological History.", 
        example: "PARA 1: 'Plastic is a crisis.' \nPARA 2: 'New bacteria eats plastic.' \nSTRUCTURE: 'Presenting a problem and offering a solution'.",
        words: ["How is the text organized?", "Best describes the structure"], 
        practice: { question: "Para 1: 'Plastic is bad.' Para 2: 'New bacteria eats plastic.' Structure?", options: ["Cause and Effect", "Problem and Solution", "Chronological History"], answer: 1, explanation: "It presents a crisis (Plastic) and then offers a fix (Bacteria)." } 
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
    // UPDATED: FINAL BOSS NAVIGATION LOGIC
    if (nodeId === 'hub' && gameComplete) {
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
        setShowSearch(prev => !prev);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
        setActiveNode(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // MOBILE FIX
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
      const newMastery = [...masteredNodes, nodeId];
      setMasteredNodes(newMastery);
      localStorage.setItem('utbk_mastery_5', JSON.stringify(newMastery));
    }
  };

  const resetProgress = () => {
    setMasteredNodes([]);
    setMergedNodes([]); // UPDATED: Reset merged nodes
    setGameComplete(false); // UPDATED: Reset game complete
    localStorage.removeItem('utbk_mastery_5');
    setNodes(initialNodes.map(n => ({ ...n, vx: 0, vy: 0 })));
  };

  // --- ADDED: THE MERGE ENGINE (useEffect) ---
  useEffect(() => {
    let nodesToMerge = [];
    let newMasteredParents = [];

    Object.keys(HIERARCHY).forEach(parentId => {
      const children = HIERARCHY[parentId];
      
      // 1. Are all children mastered?
      const allChildrenMastered = children.every(childId => masteredNodes.includes(childId));
      
      // 2. Are children visible (not yet merged)?
      const childrenVisible = children.some(childId => !mergedNodes.includes(childId));

      if (allChildrenMastered && childrenVisible) {
        nodesToMerge.push(...children);
        
        // Master the parent automatically if children are done
        if (!masteredNodes.includes(parentId)) {
            newMasteredParents.push(parentId);
        }
      }
    });

    if (nodesToMerge.length > 0) {
      animateMerge(nodesToMerge, newMasteredParents);
    }

    // CHECK WIN CONDITION
    if (masteredNodes.includes('hub') && !gameComplete) {
        setTimeout(() => setGameComplete(true), 2500); 
    }

  }, [masteredNodes]);

  const animateMerge = (childIds, newParents) => {
    if (newParents.length > 0) {
        const updated = [...masteredNodes, ...newParents];
        setMasteredNodes(updated);
        localStorage.setItem('utbk_mastery_5', JSON.stringify(updated));
    }

    setNodes(prev => prev.map(node => {
        if (childIds.includes(node.id)) {
            // Find parent ID
            const parentId = Object.keys(HIERARCHY).find(pid => HIERARCHY[pid].includes(node.id));
            const parentNode = prev.find(n => n.id === parentId);
            if (parentNode) {
                // Snap to parent
                return { ...node, x: parentNode.x, y: parentNode.y, isMerging: true };
            }
        }
        return node;
    }));

    setTimeout(() => {
        setMergedNodes(prev => [...prev, ...childIds]);
    }, 1000);
  };

  // --- PHYSICS ENGINE (UPDATED TO IGNORE MERGED NODES) ---
  useEffect(() => {
    let animationFrameId;
    const runSimulation = () => {
      setNodes(prevNodes => {
        const newNodes = prevNodes.map(n => ({ ...n }));
        // Ignore merged nodes in calculation
        const activeNodes = newNodes.filter(n => !mergedNodes.includes(n.id) && !n.isMerging);
        
        const damping = activeNode ? 0.1 : 0.90; 
        const centerStrength = activeNode ? 0 : 0.012; 
        const centerTargetX = window.innerWidth / 2;
        const centerTargetY = window.innerHeight / 2;

        activeNodes.forEach(node => {
          if (node.id === draggingId) return;
          let fx = 0, fy = 0;
          
          activeNodes.forEach(other => {
            if (node.id === other.id) return;
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx*dx + dy*dy) || 1;
            const force = 15000 / (dist * dist); 
            fx += (dx / dist) * force;
            fy += (dy / dist) * force;
          });
          
          links.forEach(link => {
            const isSource = link.source === node.id;
            const isTarget = link.target === node.id;
            
            // Only pull if connected node is NOT merged
            const otherId = isSource ? link.target : link.source;
            if ((isSource || isTarget) && !mergedNodes.includes(otherId)) {
                const other = activeNodes.find(n => n.id === otherId);
                if (other) {
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx*dx + dy*dy) || 1;
                    const force = (dist - 250) * 0.02; 
                    fx -= (dx / dist) * force;
                    fy -= (dy / dist) * force;
                }
            }
          });
          
          fx += (centerTargetX - node.x) * centerStrength;
          fy += (centerTargetY - node.y) * centerStrength;
          
          node.vx = (node.vx + fx) * damping;
          node.vy = (node.vy + fy) * damping;
          node.x += node.vx;
          node.y += node.vy;
        });
        
        return newNodes;
      });
      animationFrameId = requestAnimationFrame(runSimulation);
    };
    runSimulation();
    return () => cancelAnimationFrame(animationFrameId);
  }, [draggingId, activeNode, mergedNodes]); // UPDATED dependency

  // --- ZOOM ---
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

    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      transformOrigin: '0 0'
    };
  };

  const handleMouseDown = (e, id) => { e.stopPropagation(); setDraggingId(id); dragStartPos.current = { x: e.clientX, y: e.clientY }; };
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
  const handleTouchStart = (e, id) => { e.stopPropagation(); setDraggingId(id); dragStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
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
    
    if (node.id === 'lab') {
       return (
        <div className="content-stack lab-mode">
          <div className="panel-header-row"><h2 className="panel-title panel-title-lab">TEXT_ANALYSIS_LAB</h2></div>
          <div className="panel-body">
            <p className="instruction">Paste any confusing UTBK Question below:</p>
            <textarea className="lab-input" placeholder="e.g. Which of the following..." value={labText} onChange={(e) => setLabText(e.target.value)} />
            <button className="lab-btn" onClick={runTextAnalysis}>RUN DECRYPTION</button>
            {analyzedText && <div className="lab-result fade-in"><div className="result-label">DECRYPTED OUTPUT:</div><div className="result-text">{analyzedText}</div></div>}
            
            {/* UPDATED: PRACTICE TO ALLOW MASTERY */}
            <div className="practice-module" style={{marginTop:'20px'}}>
                <p className="practice-q">{content.practice.question}</p>
                <div className="options-grid">
                    {content.practice.options.map((opt, i) => (
                        <button key={i} className="opt-btn" onClick={(e) => { 
                            if (i === content.practice.answer) {
                                e.target.classList.add('correct');
                                handleMastery(node.id);
                            } else {
                                e.target.classList.add('wrong');
                            }
                        }}>{opt}</button>
                    ))}
                </div>
            </div>
          </div>
          <button className="close-panel-btn" onClick={() => setActiveNode(null)}>ZOOM OUT</button>
        </div>
      );
    }

    return (
      <div className="content-stack">
        <div className="panel-header-row">
          <h2 className="panel-title">{content.title}</h2>
          {isMastered && <span className="mastery-badge">🏆 MASTERED</span>}
        </div>
        
        <div className="panel-tabs">
          <button className={activeTab === 'concept' ? 'active' : ''} onClick={() => setActiveTab('concept')}>CONCEPT</button>
          <button className={activeTab === 'example' ? 'active' : ''} onClick={() => setActiveTab('example')}>ILLUSTRATION</button>
          <button className={activeTab === 'words' ? 'active' : ''} onClick={() => setActiveTab('words')}>SIGNALS</button>
          {content.practice && <button className={activeTab === 'practice' ? 'active' : ''} onClick={() => setActiveTab('practice')}>SIMULATE</button>}
        </div>

        <div className="panel-body">
          {activeTab === 'concept' && <div className="fade-in"><p className="concept-text">{content.concept}</p><div className="reason-box"><strong>THE LOGIC:</strong><p>{content.reason}</p></div></div>}
          {activeTab === 'example' && content.example && <div className="fade-in"><div className="example-box"><strong>REAL WORLD EXAMPLE:</strong><pre>{content.example}</pre></div></div>}
          {activeTab === 'words' && <div className="fade-in"><div className="word-cloud">{content.words.map((w, i) => <span key={i} className="signal-chip">{w}</span>)}</div></div>}
          {activeTab === 'practice' && content.practice && (
            <div className="fade-in practice-module">
              <p className="practice-q">{content.practice.question}</p>
              <div className="options-grid">{content.practice.options.map((opt, i) => <button key={i} className="opt-btn" onClick={(e) => { if (i === content.practice.answer) { e.target.classList.add('correct'); handleMastery(node.id); } else { e.target.classList.add('wrong'); } }}>{opt}</button>)}</div>
              <p className="explanation"><small>💡 {content.practice.explanation}</small></p>
            </div>
          )}
        </div>
        <button className="close-panel-btn" onClick={() => setActiveNode(null)}>ZOOM OUT</button>
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
      {/* 1. UPDATED: HOME BUTTON */}
      <Link to="/" className="nav-home-absolute">← DASHBOARD</Link>

      <div className="bg-noise"></div>
      <div className="bg-grid"></div>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      {showSearch && (
        <div className="search-overlay" onClick={() => setShowSearch(false)}>
          <div className="search-box" onClick={(e) => e.stopPropagation()}>
            <div className="search-header"><span className="blink">&gt;_</span> SEARCH_DATABASE</div>
            <input ref={searchInputRef} className="search-input" type="text" placeholder="Enter keywords..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
            <div className="search-results">{filteredNodes.length > 0 ? (filteredNodes.map(node => (<div key={node.id} className="search-item" onClick={() => executeWarp(node.id)}><span className={`dot ${node.type}`}></span><div className="search-info"><span className="search-title">{node.label}</span><span className="search-desc">{node.content.title}</span></div><span className="warp-btn">WARP &rarr;</span></div>))) : <div className="no-results">NO_DATA_FOUND</div>}</div>
          </div>
        </div>
      )}

      <div className="hud-layer">
        <div className="hud-top-row"><div className="hud-title">NEURAL_NET: <span className="highlight">ONLINE</span></div><button className="search-trigger-btn" onClick={() => setShowSearch(true)}>🔍 SEARCH</button></div>
        {/* UPDATED PROGRESS BAR */}
        <div className="progress-bar">MERGED: {mergedNodes.length} / {initialNodes.length - 1} NODES <div className="progress-fill" style={{width: `${(mergedNodes.length / (initialNodes.length - 1)) * 100}%`}}></div></div>
        <button className="reset-btn" onClick={resetProgress}>RESET SYSTEM</button>
      </div>
      
      <div className={`data-panel ${activeNode ? 'visible' : ''}`}>
        {activeNode && renderPanelContent()}
      </div>

      <svg ref={svgRef} className="network-svg">
        <g className="zoom-layer" style={getZoomStyle()}>
          
          {links.map((link, i) => {
            // HIDE LINKS IF NODES MERGED
            if (mergedNodes.includes(link.source) || mergedNodes.includes(link.target)) return null;

            const start = getNode(link.source);
            const end = getNode(link.target);
            return (
              <line 
                key={i} 
                x1={start.x} y1={start.y} 
                x2={end.x} y2={end.y} 
                className="net-link"
                style={{
                  stroke: 'rgba(0, 243, 255, 0.4)',
                  strokeWidth: '1.5px',
                  filter: 'drop-shadow(0 0 3px rgba(0, 243, 255, 0.8))'
                }}
              />
            );
          })}
          
          {nodes.map((node) => {
            // HIDE NODE IF MERGED (unless currently animating)
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
                className={`net-node-group ${isActive ? 'active' : ''} ${isMastered ? 'mastered' : ''} ${isBlurred ? 'blurred' : ''} ${node.isMerging ? 'merging-node' : ''} ${isBoss ? 'portal-mode' : ''}`}
                style={{ cursor: draggingId === node.id ? 'grabbing' : 'grab' }}
              >
                <circle r={node.r + (isBoss ? 20 : 10)} className={`node-glow ${node.type}`} />
                <circle r={node.r} className={`node-core ${node.type} ${isBoss ? 'portal' : ''}`} />
                <text dy={node.r + 20} className="node-label" style={{opacity: isBlurred ? 0 : 1}}>
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