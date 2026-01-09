import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './Materi1.css';
import rainSound from '../assets/rain.mp3';

// --- UPDATED DATA WITH EXPLANATIONS ---
// --- UPDATED DATA: 6 COMPLETE TRAPS ---
// --- UPDATED DATA: RANDOMIZED ANSWERS ---
const traps = [
    {
        id: 1,
        icon: "🦜",
        title: "The Parrot",
        label: "Verbatim Trap",
        text: 'The suspect <strong>vehemently denied</strong> the accusations during the interrogation.',
        question: "What was the suspect's reaction?",
        // SWAPPED: Correct answer is now first (Index 0)
        options: ["He strongly rejected the claims.", "He <strong>vehemently denied</strong> to speak."],
        answerIndex: 0,
        posClass: "trap-1",
        explanation: "<strong>The Parrot</strong> lures you with the exact words 'vehemently denied'.<br/><br/>But look closely: the trap option says he denied <em>to speak</em> (grammar error). The correct answer uses a synonym ('rejected the claims')."
    },
    {
        id: 2,
        icon: "⚠️",
        title: "The Extremist",
        label: "Absolute Trap",
        text: 'Forensic evidence <strong>suggests</strong> that the fire was <strong>likely</strong> accidental.',
        question: "What does the evidence show?",
        // KEEP: Correct answer is second (Index 1)
        options: ["The fire was <strong>definitely</strong> an accident.", "The fire was <strong>probably</strong> not intentional."],
        answerIndex: 1,
        posClass: "trap-2",
        explanation: "<strong>The Extremist</strong> turns a soft opinion into a hard fact.<br/><br/>The text uses 'suggests' and 'likely'. The trap uses 'definitely'. In exams, extreme words are almost always wrong."
    },
    {
        id: 3,
        icon: "🎯",
        title: "Wrong Address",
        label: "Causality Trap",
        text: 'The heavy fog disrupted the surveillance camera, <strong>causing</strong> a gap in the footage.',
        question: "What was the <strong>RESULT</strong> of the fog?",
        // SWAPPED: Correct answer is now first (Index 0)
        options: ["There was missing footage.", "The surveillance camera malfunctioned."],
        answerIndex: 0,
        posClass: "trap-3",
        explanation: "<strong>Wrong Address</strong> confuses Cause and Effect.<br/><br/><strong>Cause:</strong> Fog &rarr; <strong>Effect:</strong> Missing Footage.<br/>The trap describes the <em>process</em> (camera disruption), but the question asked for the <em>result</em>."
    },
    {
        id: 4,
        icon: "🍎",
        title: "Rotten Apple",
        label: "False Detail",
        text: 'The victim was found in the library at midnight, holding a sealed letter.',
        question: "Describe the discovery of the victim.",
        // KEEP: Correct answer is second (Index 1)
        options: ["Found in the library at midnight <strong>holding a weapon</strong>.", "Found late at night with a document."],
        answerIndex: 1,
        posClass: "trap-4",
        explanation: "<strong>The Rotten Apple</strong> is 90% true and 10% poison.<br/><br/>Option A is correct about location/time but lies about the object (weapon vs letter). You must read the <em>entire</em> option."
    },
    {
        id: 5,
        icon: "⏳",
        title: "Time Traveler",
        label: "Timeline Trap",
        text: 'Investigators <strong>are currently analyzing</strong> the DNA samples and <strong>will release</strong> the report next week.',
        question: "What is the status of the investigation?",
        // SWAPPED: Correct answer is now first (Index 0)
        options: ["The analysis is ongoing.", "The DNA report <strong>has been</strong> released."],
        answerIndex: 0,
        posClass: "trap-5",
        explanation: "<strong>The Time Traveler</strong> messes up the timeline.<br/><br/>The text says the report is in the <em>Future</em> ('will release'). The trap says it is in the <em>Past</em> ('has been released')."
    },
    {
        id: 6,
        icon: "🐈",
        title: "The Stray Cat",
        label: "Out of Scope",
        text: 'The stolen painting, created in 1890, is valued at over $5 million.',
        question: "Why is the painting significant?",
        // KEEP: Correct answer is second (Index 1)
        options: ["It was painted by <strong>a famous French artist</strong>.", "It has a very high monetary value."],
        answerIndex: 1,
        posClass: "trap-6",
        explanation: "<strong>The Stray Cat</strong> brings in outside information.<br/><br/>Maybe the artist <em>was</em> French, but <strong>the text didn't say that</strong>. You can only answer based <em>strictly</em> on the text."
    }
];

const scribbles = [
    { text: "WHO WROTE THIS??", class: "scr-1" },
    { text: "DON'T TRUST\nTHE DICTIONARY", class: "scr-2" },
    { text: "Subject... Verb... Object...", class: "scr-3" },
    { text: "NO PANIC", class: "scr-4" }
];

// --- HELPER: RANK CALCULATION ---
const getRank = (count) => {
    if (count === 6) return { title: "MASTER AGENT", icon: "🕵️‍♂️" }; // Requires all 6
    if (count >= 3) return { title: "DETECTIVE", icon: "👮‍♂️" };
    return { title: "ROOKIE", icon: "👤" };
};

// --- SOUND ENGINE ---
const playSound = (type) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (type === 'paper') {
        osc.frequency.setValueAtTime(200, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    } else if (type === 'scratch') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    } else if (type === 'ding') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(1200, now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    }
    osc.start(); osc.stop(now + 0.3);
};

// --- UPDATED SUB-COMPONENT: TRAP MODAL ---
const TrapModal = ({ trap, onClose, onSolve }) => {
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [status, setStatus] = useState('idle');
    const [shake, setShake] = useState(false);
    
    // 1. ADD THIS CHECK: Determine if we are on mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

    // Update check on resize (optional but good for testing)
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 800);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleAnswer = (index) => {
        if (status === 'correct') return;
        setSelectedIdx(index);

        if (index === trap.answerIndex) {
            setStatus('correct');
            playSound('ding');
        } else {
            setStatus('wrong');
            playSound('scratch');
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    return (
        <div className="focus-overlay">
            <motion.div
                className="focus-card"
                layout 
                // Remove the forced layoutId if it causes glitching, 
                // or keep it if you want the zoom-in effect from the board.
                // layoutId={`trap-${trap.id}`} 
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            >
                {/* ... (Close Button & Quiz Section remain the same) ... */}
                
                {status !== 'correct' && (
                    <button className="close-btn" onClick={onClose}>×</button>
                )}

                <div className="quiz-section">
                     {/* ... (Keep your existing Quiz Content here) ... */}
                     {/* Just keeping the structure clear for you */}
                     <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                        <span style={{ fontSize: '3rem' }}>{trap.icon}</span>
                        <div>
                            <h2 style={{ margin: 0, fontFamily: 'Special Elite' }}>{trap.title}</h2>
                            <div style={{ fontFamily: 'Patrick Hand', color: '#b91c1c', fontSize: '1.2rem' }}>{trap.label}</div>
                        </div>
                    </div>
                    <div className="source-text" dangerouslySetInnerHTML={{ __html: trap.text }}></div>
                    <p style={{ fontFamily: 'Special Elite', fontWeight: 'bold' }}>Q: {trap.question}</p>
                    <div>
                        {trap.options.map((opt, i) => (
                             <button key={i} className="option-btn" onClick={() => handleAnswer(i)} disabled={status === 'correct'} 
                                style={{
                                    borderColor: status === 'correct' && i === trap.answerIndex ? '#16a34a' : (status === 'wrong' && selectedIdx === i ? '#b91c1c' : '#1e293b'),
                                    backgroundColor: status === 'correct' && i === trap.answerIndex ? '#dcfce7' : (status === 'wrong' && selectedIdx === i ? '#fee2e2' : 'white')
                                }}
                             >
                                 <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{String.fromCharCode(65 + i)}.</span>
                                 <span dangerouslySetInnerHTML={{ __html: opt }}></span>
                             </button>
                        ))}
                    </div>
                </div>


                {/* 2. UPDATE THIS ANIMATION SECTION */}
                <motion.div
                    className="explanation-section"
                    initial={isMobile ? { height: 0, opacity: 0 } : { width: 0, opacity: 0 }}
                    animate={
                        isMobile 
                        ? { height: status === 'correct' ? 'auto' : 0, opacity: status === 'correct' ? 1 : 0 }
                        : { width: status === 'correct' ? 450 : 0, opacity: status === 'correct' ? 1 : 0 }
                    }
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        bounce: 0,
                        opacity: { duration: 0.3, delay: 0.2 }
                    }}
                >
                    <div className="explanation-content">
                        <div className="explanation-header">Investigation Notes</div>
                        <div dangerouslySetInnerHTML={{ __html: trap.explanation }}></div>
                        <button className="continue-btn" onClick={() => onSolve(trap.id)}>CASE CLOSED</button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

// --- MAIN COMPONENT ---
function Materi1() {
    const [focusedTrap, setFocusedTrap] = useState(null);
    const [solvedTraps, setSolvedTraps] = useState([]);

    // ANIMATION STATES
    const [victoryPopup, setVictoryPopup] = useState(false); // The Stamp
    const [showCheatSheet, setShowCheatSheet] = useState(false); // The Final Button

    // VISUAL STATES
    const [flashlight, setFlashlight] = useState(true);
    useEffect(() => {
        // Check if mobile on load, turn off flashlight for better UX
        if (window.innerWidth < 950) {
            setFlashlight(false);
        }
    }, []);
    const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });
    const [hubOpen, setHubOpen] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(false);

    // AUDIO
    const audioRef = useRef(null);

    useEffect(() => {
        try {
            audioRef.current = new Audio(rainSound);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.3;
        } catch (e) {
            console.warn("Audio file missing");
        }
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;
        audioEnabled ? audioRef.current.play().catch(() => { }) : audioRef.current.pause();
    }, [audioEnabled]);

    const handleMove = (e) => {
        let clientX, clientY;
        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        setMousePos({ x: `${clientX}px`, y: `${clientY}px` });
    };

    const center = { x: 600, y: 400 };
    const coords = {
        1: { x: 180, y: 120 },
        2: { x: 1020, y: 160 },
        3: { x: 240, y: 640 },
        4: { x: 960, y: 700 },
        5: { x: 150, y: 350 },
        6: { x: 1050, y: 360 }
    };

    const handleFocus = (trap) => { playSound('paper'); setFocusedTrap(trap); };

    // --- GAME LOGIC ---
    const handleSolve = (id) => {
        setFocusedTrap(null);

        if (!solvedTraps.includes(id)) {
            const newSolvedList = [...solvedTraps, id];
            setSolvedTraps(newSolvedList);

            // IF ALL PUZZLES SOLVED
            if (newSolvedList.length === traps.length) {
                // 1. Trigger Victory Sequence
                setTimeout(() => {
                    playSound('ding');
                    setVictoryPopup(true);
                    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });

                    // 2. Hide Stamp, Show Report + Button after 2.5s
                    setTimeout(() => {
                        setVictoryPopup(false);
                        setShowCheatSheet(true);
                    }, 2500);

                }, 600);
            }
        }
    };

    const rankData = getRank(solvedTraps.length);

    return (
        <div className="detective-room" onMouseMove={handleMove} onTouchMove={handleMove}>

            {/* FLASHLIGHT */}
            {flashlight && (
                <div
                    className="flashlight-layer"
                    style={{ '--x': mousePos.x, '--y': mousePos.y }}
                ></div>
            )}

            {/* CONTROLS */}
            <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 2000, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                    className={`light-switch ${flashlight ? 'on' : 'off'}`}
                    onClick={() => setFlashlight(!flashlight)}
                    style={{ position: 'static' }}
                >
                    🔦
                </button>
                <button
                    className={`audio-switch ${audioEnabled ? 'on' : 'muted'}`}
                    onClick={() => setAudioEnabled(!audioEnabled)}
                >
                    {audioEnabled ? '🔊' : '🔇'}
                </button>
            </div>

            <Link to="/" className="nav-back">← DASHBOARD</Link>

            <div className="wall-board">

                {/* 0. SCRIBBLES */}
                {scribbles.map((s, i) => (
                    <div key={i} className={`scribble ${s.class}`}>{s.text}</div>
                ))}

                {/* 1. STRINGS */}
                <svg className="string-layer" width="1200" height="800">
                    {solvedTraps.map(id => (
                        <line key={id} x1={center.x} y1={center.y} x2={coords[id].x} y2={coords[id].y} className="string-line string-visible" />
                    ))}
                </svg>

                {/* 2. CASE FILE (FOLD-OUT) */}
                <motion.div
                    className="evidence-item hub-file"
                    onClick={() => setHubOpen(!hubOpen)}
                    onHoverStart={() => setHubOpen(true)}
                    onHoverEnd={() => setHubOpen(false)}
                    initial={{ x: "-50%", y: "-50%", rotate: 2 }}
                    animate={{
                        x: "-50%", y: "-50%",
                        scale: hubOpen ? 1.05 : 1,
                        rotate: hubOpen ? 0 : 2
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <div className="pin" style={{ background: '#000' }}></div>

                    <div className="hub-header">
                        <h2 style={{ fontFamily: 'Special Elite', margin: 0, fontSize: '1.5rem' }}>CASE FILE: MINDSET</h2>
                        <p style={{ fontFamily: 'Patrick Hand', fontSize: '1.1rem', lineHeight: 1.2, margin: '10px 0' }}>
                            <strong>Strategy:</strong> Stop translating.<br />
                            <strong>Method:</strong> Structure Profiling.<br />
                            <br />
                            <span style={{ background: '#e2e8f0', padding: '5px', fontSize: '0.9rem', border: '1px dashed #64748b', display: 'inline-block' }}>
                                [Subject] &rarr; [Verb] &rarr; [Object]
                            </span>
                        </p>
                        <motion.div
                            animate={{ opacity: hubOpen ? 0 : 1, height: hubOpen ? 0 : 'auto' }}
                            style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '10px' }}
                        >
                            HOVER TO DECODE &rarr;
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {hubOpen && (
                            <motion.div
                                className="hub-secret"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                            >
                                <div className="reveal-text">
                                    <h3 style={{ margin: '0 0 10px 0', color: '#b91c1c', fontFamily: 'Permanent Marker', fontSize: '1.3rem' }}>DECODED:</h3>
                                    "The <span className="red-marker">Government</span> [S]<br />
                                    has <span className="red-marker">Implemented</span> [V]<br />
                                    new <span className="red-marker">Policies</span> [O]."
                                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '15px', fontStyle: 'italic', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                                        <strong>Tip:</strong> Ignore the fancy words. Find the Actor + Action.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* 3. TRAPS */}
                {traps.map((trap) => (
                    <motion.div
                        key={trap.id}
                        className={`evidence-item ${trap.posClass}`}
                        layoutId={`trap-${trap.id}`}
                        onClick={() => !solvedTraps.includes(trap.id) && handleFocus(trap)}
                        style={{ opacity: solvedTraps.includes(trap.id) ? 0.6 : 1, filter: solvedTraps.includes(trap.id) ? 'grayscale(1)' : 'none' }}
                    >
                        <div className="pin"></div>
                        <div className="polaroid-img">
                            {solvedTraps.includes(trap.id) ? '✅' : trap.icon}
                        </div>
                        <div className="handwritten-label">{trap.title}</div>
                    </motion.div>
                ))}

                {/* 4. ID CARD */}
                <div className="evidence-item id-card">
                    <div className="pin silver"></div>
                    <div className="id-header">UTBK INTEL AGENCY</div>
                    <div className="id-body">
                        <div className="id-photo">{rankData.icon}</div>
                        <div className="id-name">AGENT STATUS</div>
                        <div className="id-rank">{rankData.title}</div>
                        <div className="id-progress">
                            <div className="id-fill" style={{ width: `${(solvedTraps.length / 6) * 100}%` }}></div>
                            <div style={{ fontSize: '0.7rem', marginTop: '5px', color: '#999' }}>
                                PROGRESS: {solvedTraps.length}/6
                            </div>
                        </div>
                        <div style={{ fontSize: '0.7rem', marginTop: '5px', color: '#999' }}>
                            PROGRESS: {solvedTraps.length}/4
                        </div>
                    </div>
                </div>

                {/* 5. STAIN */}
                <div className="coffee-stain"></div>

                {/* 6. VICTORY STAMP */}
                <AnimatePresence>
                    {victoryPopup && (
                        <motion.div
                            className="victory-overlay"
                            initial={{ scale: 2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className="case-closed-stamp">CASE CLOSED</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 7. FINAL REPORT & NEXT BUTTON */}
                <AnimatePresence>
                    {showCheatSheet && (
                        <motion.div
                            className="evidence-item final-report"
                            initial={{ y: 500, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", damping: 20 }}
                        >
                            <div className="pin" style={{ background: 'gold' }}></div>
                            <h3 style={{ textAlign: 'center', margin: 0, fontFamily: 'Special Elite' }}>FINAL REPORT</h3>
                            <ul style={{ textAlign: 'left', fontFamily: 'Patrick Hand', fontSize: '1.1rem', paddingLeft: '20px' }}>
                                <li>Verbatim? &rarr; <strong>Find Synonym</strong></li>
                                <li>Extreme? &rarr; <strong>Find Likely</strong></li>
                                <li>Context? &rarr; <strong>Check Arrow</strong></li>
                                <li>Rotten? &rarr; <strong>Check End</strong></li>
                            </ul>

                            {/* THE NEXT BUTTON */}
                            <Link to="/materi/2" className="next-case-btn">
                                OPEN CASE FILE #02 &rarr;
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            <AnimatePresence>
                {focusedTrap && (
                    <TrapModal trap={focusedTrap} onClose={() => setFocusedTrap(null)} onSolve={handleSolve} />
                )}
            </AnimatePresence>

        </div>
    );
}

export default Materi1;