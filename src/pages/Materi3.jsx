import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, BookOpen, Radio, Network, X, Minus, Square, Command, Wifi, Battery, Globe, Layers, Music, Cpu, Upload, Play, Pause, Hash, FileText, Home, ArrowRight} from 'lucide-react';
import confetti from 'canvas-confetti';
import './Materi3.css';

// ==========================================
// 1. EDUCATIONAL DATA
// ==========================================

const ALIEN_CASES = [
    {
        text: <span>Historically, the <span className="alien-word">Grobok</span> was considered <span className="alien-word">frabjous</span>. However, recent studies show that <span className="alien-word">Blamping</span> actually <span className="alien-word">depletes</span> the Grobok's core <span className="alien-word">Quabs</span>.</span>,
        q: "Why is Blamping problematic?",
        opts: [
            { txt: "A. Because the Grobok is frabjous.", correct: false },
            { txt: "B. Because it depletes the Quabs.", correct: true },
            { txt: "C. Because studies are recent.", correct: false }
        ],
        fb: "LOGIC MATCH: Subject (Blamping) -> Verb Negatif (Depletes) -> Object (Quabs)."
    },
    {
        text: <span>While most <span className="alien-word">Plombus</span> requires constant <span className="alien-word">fregment</span>, the <span className="alien-word">North-Grobian Plombus</span> creates its own <span className="alien-word">zork</span> through <span className="alien-word">glupification</span>.</span>,
        q: "How does the North-Grobian Plombus differ?",
        opts: [
            { txt: "A. It requires constant fregment.", correct: false },
            { txt: "B. It creates its own zork.", correct: true },
            { txt: "C. It is eaten by zorks.", correct: false }
        ],
        fb: "LOGIC MATCH: Contrast Pattern (While X, Y does Z)."
    }
];

const SIGNALS = {
    red: [
        { word: "However", mean: "Tetapi", ex: "He studied hard; however, he failed." },
        { word: "Although", mean: "Meskipun", ex: "Although it rained, we played." },
        { word: "Despite", mean: "Kendati", ex: "Despite the pain, he smiled." },
        { word: "Nevertheless", mean: "Namun demikian", ex: "It was risky; nevertheless, we tried." },
        { word: "Conversely", mean: "Sebaliknya", ex: "North is cold; conversely, South is hot." }
    ],
    green: [
        { word: "Moreover", mean: "Lagipula", ex: "Smart; moreover, kind." },
        { word: "Also", mean: "Juga", ex: "She also sings." },
        { word: "In addition", mean: "Tambahan", ex: "Bread; in addition, milk." },
        { word: "Furthermore", mean: "Selanjutnya", ex: "It is cheap; furthermore, it is durable." },
        { word: "Besides", mean: "Disamping itu", ex: "It's too late; besides, I'm tired." }
    ],
    amber: [
        { word: "Therefore", mean: "Oleh itu", ex: "Lazy; therefore, failed." },
        { word: "Thus", mean: "Maka", ex: "Eldest; thus, leader." },
        { word: "Hence", mean: "Karenanya", ex: "I think; hence, I am." },
        { word: "Consequently", mean: "Akibatnya", ex: "He overslept; consequently, he was late." },
        { word: "Accordingly", mean: "Sesuai dgn itu", ex: "Know the rules; act accordingly." }
    ]
};

const RADAR_TARGETS = [
    {
        id: 1,
        text: <span>Many confuse <strong style={{color:'#34D399'}}>Astronomy</strong> with <strong style={{color:'#34D399'}}>Astrology</strong>. While the former is science, <span className="highlight-ref">the latter</span> is pseudoscience.</span>,
        targetName: "THE LATTER",
        opts: [
            { txt: "Astronomy", correct: false },
            { txt: "Astrology", correct: true }
        ]
    },
    {
        id: 2,
        text: <span>The engines of the <strong style={{color:'#34D399'}}>new jet</strong> are more efficient than <span className="highlight-ref">those</span> of the <strong style={{color:'#34D399'}}>old plane</strong>.</span>,
        targetName: "THOSE",
        opts: [
            { txt: "The engines", correct: true },
            { txt: "The plane", correct: false }
        ]
    }
];

// ==========================================
// 2. APP COMPONENTS
// ==========================================

// --- NEW APP: NOTES.TXT ---
const NotesApp = () => {
    const [text, setText] = useState("LOG_ENTRY_01:\n- Target patterns identified.\n- Syntax logic verifying...\n\n[USER NOTES AREA]");
    
    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <textarea 
                style={{
                    flex: 1, background: 'transparent', border: 'none', resize: 'none',
                    color: 'var(--text-main)', fontFamily: 'JetBrains Mono', padding: '15px',
                    fontSize: '0.85rem', outline: 'none', lineHeight: '1.5'
                }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                spellCheck="false"
            />
            <div style={{
                padding: '5px 15px', fontSize: '0.7rem', color: 'var(--text-muted)', 
                borderTop: '1px solid var(--win-border)', background: 'rgba(0,0,0,0.2)'
            }}>
                {text.length} chars | UTF-8
            </div>
        </div>
    );
};

const TerminalApp = ({ onCommand }) => {
    const [history, setHistory] = useState([
        { type: 'output', text: 'LogicOS v4.0.2 [Secure Shell]' },
        { type: 'output', text: 'Type "help" for a list of commands.' }
    ]);
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', text: input }];
            
            let response = "";
            if (cmd === 'help') {
                response = "AVAILABLE COMMANDS:\n- help: Show this list\n- clear: Clear terminal\n- theme [matrix/cyber]: Change OS theme\n- open [decrypto/manual/router/notes]: Launch app\n- whoami: Current user";
            } else if (cmd === 'clear') {
                setHistory([]); setInput(""); return;
            } else if (cmd === 'whoami') {
                response = "User: OPERATOR_01 | Rank: LEVEL 2";
            } else if (cmd.startsWith('theme')) {
                const theme = cmd.split(' ')[1];
                if (theme === 'matrix') { onCommand('theme_matrix'); response = ">> THEME SWITCHED TO: MATRIX PROTOCOL"; }
                else if (theme === 'cyber') { onCommand('theme_cyber'); response = ">> THEME RESTORED TO: CYBER DEFAULT"; }
                else { response = "Error: Unknown theme. Try 'matrix' or 'cyber'."; }
            } else if (cmd.startsWith('open')) {
                const app = cmd.split(' ')[1];
                onCommand(`open_${app}`);
                response = `>> LAUNCHING PROCESS: ${app ? app.toUpperCase() : 'UNKNOWN'}...`;
            } else if (cmd === 'sudo') {
                response = "ACCESS DENIED. NICE TRY.";
            } else {
                response = `Error: Command not found: ${cmd}`;
            }

            setHistory([...newHistory, { type: 'output', text: response }]);
            setInput("");
        }
    };

    return (
        <div style={{
            background: '#0c0c0c', height: '100%', padding: '15px', 
            fontFamily: 'monospace', fontSize: '0.85rem', color: '#33ff00',
            display: 'flex', flexDirection: 'column', overflowY: 'auto'
        }} onClick={() => document.getElementById('term-input')?.focus()}>
            {history.map((line, i) => (
                <div key={i} style={{ marginBottom: '5px', opacity: line.type === 'input' ? 0.7 : 1, whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
                    {line.type === 'input' ? '> ' : ''}{line.text}
                </div>
            ))}
            <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '8px' }}>$</span>
                <input 
                    id="term-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} autoComplete="off"
                    style={{ background: 'transparent', border: 'none', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit', flex: 1, outline: 'none' }}
                    autoFocus
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
};

const DecryptoApp = () => {
    const [caseIdx, setCaseIdx] = useState(0);
    const [logs, setLogs] = useState(["> DECRYPTO_V3 INITIATED...", "> WAITING FOR INPUT PATTERN..."]);
    const addLog = (msg) => setLogs(prev => [...prev.slice(-4), `> ${msg}`]);
    const handleChoice = (isCorrect, fb) => {
        if (isCorrect) {
            addLog("SUCCESS: " + fb); addLog("UPLOADING PACKET...");
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
            setTimeout(() => { setCaseIdx((prev) => (prev + 1) % ALIEN_CASES.length); addLog("LOADING NEXT SEQUENCE..."); }, 1500);
        } else { addLog("ERROR: SYNTAX MISMATCH. RETRY."); }
    };
    const current = ALIEN_CASES[caseIdx];
    return (
        <div style={{display:'flex', flexDirection:'column', height:'100%', overflow:'hidden'}}>
            <div className="terminal-log" style={{flexShrink: 0, maxHeight:'30%'}}>
                {logs.map((l, i) => <div key={i} style={{marginBottom:'4px', opacity: i===logs.length-1?1:0.7}}>{l}</div>)}
                <div className="blink">_</div>
            </div>
            <div className="puzzle-area" style={{flex: 1, overflowY: 'auto'}}>
                <div style={{fontFamily:'JetBrains Mono', fontSize:'0.7rem', color:'#94a3b8', marginBottom:'10px'}}>CASE FILE: 00{caseIdx+1}</div>
                <div className="alien-text">{current.text}</div>
                <div style={{width:'100%'}}>
                    <div style={{marginBottom:'10px', fontSize:'0.9rem', color:'var(--accent-cyan)'}}>{current.q}</div>
                    {current.opts.map((opt, i) => (
                        <button key={i} className="choice-btn" onClick={() => handleChoice(opt.correct, current.fb)}>{opt.txt}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SignalRouterApp = () => {
    const [monitor, setMonitor] = useState(">> SELECT A NODE TO INSPECT TRAFFIC FLOW");
    const SignalBtn = ({ type, data }) => (
        <div className={`signal-node node-${type}`} onClick={() => setMonitor(`[PACKET INSPECTOR] ${data.word.toUpperCase()}\nMeaning: ${data.mean}\nEx: "${data.ex}"`)}>
            <span className="signal-word">{data.word}</span>
            <span className="signal-mean">{data.mean}</span>
        </div>
    );
    return (
        <div style={{display:'flex', flexDirection:'column', height:'100%', overflow:'hidden'}}>
            <div className="router-monitor" style={{flexShrink: 0, height: 'auto', minHeight: '80px', marginBottom: '0', borderBottom: '1px solid var(--win-border)', background: '#09090b', zIndex: 10}}>
                <span style={{color:'var(--accent-green)', display:'block', marginBottom:'5px'}}>{monitor.split('\n')[0]}</span>
                {monitor.split('\n').slice(1).map((line, i) => (<div key={i} style={{opacity:0.8, marginTop:'4px', lineHeight:'1.4', color:'var(--text-main)'}}>{line}</div>))}
            </div>
            <div style={{flex: 1, overflowY: 'auto', padding: '20px'}}>
                <div className="router-grid">
                    <div className="router-col"><span className="col-header" style={{color:'var(--accent-red)'}}>CONTRAST (STOP)</span>{SIGNALS.red.map((s, i) => <SignalBtn key={i} type="red" data={s} />)}</div>
                    <div className="router-col"><span className="col-header" style={{color:'var(--accent-green)'}}>ADDITION (GO)</span>{SIGNALS.green.map((s, i) => <SignalBtn key={i} type="green" data={s} />)}</div>
                    <div className="router-col"><span className="col-header" style={{color:'var(--accent-amber)'}}>RESULT (YIELD)</span>{SIGNALS.amber.map((s, i) => <SignalBtn key={i} type="amber" data={s} />)}</div>
                </div>
            </div>
        </div>
    );
};

const TargetLockApp = () => {
    const [idx, setIdx] = useState(0);
    const [status, setStatus] = useState(null);
    const handleLock = (isCorrect) => {
        if(isCorrect) { setStatus('LOCKED'); confetti({ colors: ['#22d3ee'] }); setTimeout(() => { setStatus(null); setIdx(prev => (prev + 1) % RADAR_TARGETS.length); }, 1500); } 
        else { setStatus('MISSED'); setTimeout(() => setStatus(null), 1000); }
    };
    const current = RADAR_TARGETS[idx];
    return (
        <div className="sonar-screen">
            <div className="sonar-line"></div>
            <div style={{position:'absolute', top:'20px', left:'20px', color:'var(--accent-cyan)', fontFamily:'JetBrains Mono', zIndex: 10}}>TARGETING SYSTEM v9.0<br/>LOCK ON: [{current.targetName}]</div>
            <div className="target-text">{current.text}</div>
            <div style={{zIndex:2}}>{current.opts.map((opt, i) => (<button key={i} className="lock-btn" onClick={() => handleLock(opt.correct)}>{opt.txt}</button>))}</div>
            {status && (<div style={{position:'absolute', bottom:'40px', color: status === 'LOCKED' ? 'var(--accent-cyan)' : 'var(--accent-red)', fontSize: '1.5rem', fontWeight:'bold', background:'rgba(0,0,0,0.8)', padding:'10px 20px', border:'1px solid currentColor'}}>{status === 'LOCKED' ? 'TARGET ACQUIRED' : 'TARGET MISSED'}</div>)}
        </div>
    );
};

const ManualApp = () => (
    <div style={{display:'flex', flexDirection:'column', height:'100%', overflow:'hidden'}}>
        <div style={{padding:'20px', borderBottom:'1px solid var(--win-border)', background:'var(--win-glass)', flexShrink:0}}>
            <h3 style={{fontFamily:'JetBrains Mono', color:'var(--text-main)', margin:0}}>SYNTAX_DB v2.1</h3>
            <p style={{color:'var(--text-muted)', fontSize:'0.8rem', margin:'5px 0 0 0'}}>THE LOGIC FORMULAS.</p>
        </div>
        <div className="manual-content" style={{flex:1, overflowY:'auto'}}>
            <div className="syntax-block" style={{borderColor:'var(--accent-amber)'}}>
                <div style={{fontWeight:'bold', fontSize:'0.8rem', color:'var(--accent-amber)', marginBottom:'8px', fontFamily:'JetBrains Mono'}}>CAUSE & EFFECT (SEBAB - AKIBAT)</div>
                <div style={{display:'flex', flexDirection:'column', gap:'6px'}}><span className="syntax-code">A; therefore, B</span><span className="syntax-code">Because of A, B</span><span className="syntax-code">A leads to B</span></div>
            </div>
            <div className="syntax-block" style={{borderColor:'var(--accent-pink)'}}>
                <div style={{fontWeight:'bold', fontSize:'0.8rem', color:'var(--accent-pink)', marginBottom:'8px', fontFamily:'JetBrains Mono'}}>CONTRAST (KONTRAS / LAVAN)</div>
                <div style={{display:'flex', flexDirection:'column', gap:'6px'}}><span className="syntax-code">Although A, B</span><span className="syntax-code">A, whereas B</span><span className="syntax-code">A; however, B</span></div>
            </div>
            <div className="syntax-block" style={{borderColor:'var(--accent-green)'}}>
                <div style={{fontWeight:'bold', fontSize:'0.8rem', color:'var(--accent-green)', marginBottom:'8px', fontFamily:'JetBrains Mono'}}>COMPLEX LOGIC (LOGIKA KOMPLEKS)</div>
                <div style={{display:'flex', flexDirection:'column', gap:'6px'}}><span className="syntax-code">Unless A, B</span><span className="syntax-code">Not only A, but also B</span><span className="syntax-code">Neither A nor B</span></div>
            </div>
            <div className="alert-box" style={{marginTop:'20px'}}><strong>⚠️ SYSTEM WARNING: THE SEMICOLON TRAP</strong><br/>Correct: "It rained; however, we played."<br/>Wrong: "It rained, however, we played."</div>
        </div>
    </div>
);

const PacketApp = () => {
    const [pool, setPool] = useState(["corrupted;", "verified", "The", "was", "data", "however,", "remained", "it"]);
    const [sequence, setSequence] = useState([]);
    const [status, setStatus] = useState("WAITING FOR SEQUENCE...");
    const moveToSequence = (word, idx) => { const newPool = [...pool]; newPool.splice(idx, 1); setPool(newPool); setSequence([...sequence, word]); setStatus("ASSEMBLING..."); };
    const moveToPool = (word, idx) => { const newSeq = [...sequence]; newSeq.splice(idx, 1); setSequence(newSeq); setPool([...pool, word]); setStatus("MODIFIED."); };
    const checkIntegrity = () => {
        const result = sequence.join(" ");
        const correct = "The data was corrupted; however, it remained verified";
        if (result === correct) { setStatus("SUCCESS: INTEGRITY VERIFIED."); confetti({ colors: ['#fbbf24'] }); } 
        else { setStatus("ERROR: SEQUENCE MISMATCH."); }
    };
    return (
        <div style={{display:'flex', flexDirection:'column', height:'100%', overflow:'hidden'}}>
            <div style={{background:'#000', color: status.includes("ERROR") ? '#ef4444' : (status.includes("SUCCESS") ? '#34d399' : '#fbbf24'), padding:'15px', fontFamily:'JetBrains Mono', fontSize:'0.75rem', borderBottom: '1px solid var(--win-border)', flexShrink: 0}}> -STATUS: {status}</div>
            <div style={{flex: 1, overflowY: 'auto', padding:'20px', display:'flex', flexDirection:'column'}}>
                <div style={{flex: 1, marginBottom:'20px'}}>
                    <div style={{fontSize:'0.7rem', color:'var(--text-muted)', marginBottom:'5px', letterSpacing:'1px'}}>TARGET SEQUENCE</div>
                    <div style={{minHeight:'60px', border:'1px dashed var(--win-border)', borderRadius:'6px', background:'rgba(0,0,0,0.2)', padding:'10px', display:'flex', flexWrap:'wrap', gap:'8px', alignContent: 'flex-start'}}>
                        {sequence.length === 0 && <span style={{opacity:0.3, fontSize:'0.8rem', fontStyle:'italic'}}>Click fragments below to assemble...</span>}
                        <AnimatePresence>{sequence.map((word, i) => (<motion.button layoutId={`word-${word}`} key={`${word}-${i}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => moveToPool(word, i)} style={{background: '#22d3ee', color: '#000', border:'none', padding:'6px 12px', borderRadius:'4px', cursor:'pointer', fontFamily:'JetBrains Mono', fontWeight:'bold', fontSize:'0.85rem'}}>{word}</motion.button>))}</AnimatePresence>
                    </div>
                </div>
                <div style={{marginBottom:'20px'}}>
                    <div style={{fontSize:'0.7rem', color:'var(--text-muted)', marginBottom:'5px', letterSpacing:'1px'}}>MEMORY FRAGMENTS</div>
                    <div style={{display:'flex', flexWrap:'wrap', gap:'8px'}}>
                        <AnimatePresence>{pool.map((word, i) => (<motion.button layoutId={`word-${word}`} key={`${word}-${i}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => moveToSequence(word, i)} style={{background: 'rgba(255,255,255,0.05)', border:'1px solid var(--win-border)', color: 'var(--text-main)', padding:'6px 12px', borderRadius:'4px', cursor:'pointer', fontFamily:'JetBrains Mono', fontSize:'0.85rem'}} whileHover={{ background: 'rgba(255,255,255,0.15)' }}>{word}</motion.button>))}</AnimatePresence>
                    </div>
                </div>
                <button className="choice-btn" onClick={checkIntegrity} style={{marginTop:'auto', textAlign:'center', borderColor:'#fbbf24', color:'#fbbf24'}}>EXECUTE SEQUENCE</button>
            </div>
        </div>
    );
};

const SonicApp = () => {
    const [audioSrc, setAudioSrc] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [fileName, setFileName] = useState("No File Loaded");
    const audioRef = useRef(null); const fileInputRef = useRef(null); const canvasRef = useRef(null); const audioContextRef = useRef(null); const sourceRef = useRef(null); const analyserRef = useRef(null); const animationRef = useRef(null);
    const handleUpload = (e) => { const file = e.target.files[0]; if (file) { const url = URL.createObjectURL(file); setAudioSrc(url); setFileName(file.name); setIsPlaying(false); } };
    const initAudioContext = () => { if (!audioContextRef.current) { const AudioContext = window.AudioContext || window.webkitAudioContext; audioContextRef.current = new AudioContext(); analyserRef.current = audioContextRef.current.createAnalyser(); analyserRef.current.fftSize = 64; sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current); sourceRef.current.connect(analyserRef.current); analyserRef.current.connect(audioContextRef.current.destination); } };
    const drawVisualizer = () => {
        if (!canvasRef.current || !analyserRef.current) return;
        const canvas = canvasRef.current; const ctx = canvas.getContext("2d"); const bufferLength = analyserRef.current.frequencyBinCount; const dataArray = new Uint8Array(bufferLength);
        const renderFrame = () => {
            animationRef.current = requestAnimationFrame(renderFrame); analyserRef.current.getByteFrequencyData(dataArray); ctx.clearRect(0, 0, canvas.width, canvas.height);
            const slotWidth = canvas.width / bufferLength; const barWidth = slotWidth * 0.5; let barHeight; let x = 0;
            for (let i = 0; i < bufferLength; i++) { barHeight = (dataArray[i] / 255) * canvas.height * 0.9; const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height); gradient.addColorStop(0, '#a78bfa'); gradient.addColorStop(1, '#22d3ee'); ctx.fillStyle = gradient; ctx.beginPath(); ctx.roundRect(x, canvas.height - barHeight, barWidth, barHeight, 20); ctx.fill(); x += slotWidth; }
        };
        renderFrame();
    };
    const togglePlay = () => {
        if (!audioRef.current) return; if (!audioContextRef.current) initAudioContext(); if (audioContextRef.current.state === 'suspended') audioContextRef.current.resume();
        if (isPlaying) { audioRef.current.pause(); cancelAnimationFrame(animationRef.current); } else { audioRef.current.play(); drawVisualizer(); }
        setIsPlaying(!isPlaying);
    };
    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%', flexDirection:'column', gap:'20px'}}>
            <input type="file" ref={fileInputRef} style={{display:'none'}} accept="audio/*" onChange={handleUpload} />
            <audio ref={audioRef} src={audioSrc} onEnded={() => { setIsPlaying(false); cancelAnimationFrame(animationRef.current); }} crossOrigin="anonymous" />
            <div style={{height:'60px', width:'100%', display:'flex', alignItems:'flex-end', justifyContent:'center', background: 'rgba(0,0,0,0.2)', borderRadius:'8px', padding:'10px'}}>
                {audioSrc ? <canvas ref={canvasRef} width="200" height="50" style={{width:'100%', height:'100%'}} /> : <div style={{width:'100%', height:'2px', background:'#4b5563'}}></div>}
            </div>
            <div style={{textAlign:'center', maxWidth:'80%'}}>
                <div style={{fontSize:'0.9rem', fontWeight:'bold', color:'var(--text-main)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginBottom: '5px'}}>{fileName}</div>
                <div style={{color:'var(--text-muted)', fontSize:'0.7rem'}}>{audioSrc ? (isPlaying ? "STREAMING FREQUENCY DATA..." : "PAUSED") : "WAITING FOR INPUT..."}</div>
            </div>
            <div style={{display:'flex', gap:'15px'}}>
                <button className="traffic-btn" onClick={() => fileInputRef.current.click()} title="Upload Audio" style={{width:'40px', height:'40px', background:'rgba(255,255,255,0.1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border: '1px solid var(--win-border)'}}><Upload size={16} color="var(--text-main)"/> </button>
                <button className="traffic-btn" onClick={togglePlay} disabled={!audioSrc} style={{width:'40px', height:'40px', background: audioSrc ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor: audioSrc ? 'pointer' : 'not-allowed', opacity: audioSrc ? 1 : 0.5}}>{isPlaying ? <Pause size={16} fill="black" stroke="none" /> : <Play size={16} fill={audioSrc ? "black" : "gray"} stroke="none" />}</button>
            </div>
        </div>
    );
};

const BootScreen = () => (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'#09090b', color:'#34d399', fontFamily:'JetBrains Mono', padding:'40px', zIndex:99999, display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
        <div style={{marginBottom:'20px', lineHeight:'1.5'}}><div>- LOGIC_OS KERNEL v4.0.2</div><div>- CHECKING MEMORY... OK</div><div>- LOADING LANGUAGE MODULES... OK</div><div>- MOUNTING VIRTUAL DRIVES...</div><div>- INITIALIZING USER INTERFACE...</div></div>
        <motion.div initial={{width:0}} animate={{width:'100%'}} transition={{duration: 2.5, ease: "easeInOut"}} style={{height:'4px', background:'#34d399', maxWidth:'300px'}} />
    </motion.div>
);

// ==========================================
// 3. MAIN OS COMPONENT
// ==========================================

function LogicOS() {
    const [booting, setBooting] = useState(true);
    const [windows, setWindows] = useState([
        { id: 'manual', title: 'Manual.pdf', icon: <BookOpen size={14}/>, isOpen: true, x: 50, y: 80, width: 340, height: 500, z: 1, content: <ManualApp/> },
        { id: 'decrypto', title: 'Decrypto.exe', icon: <TerminalIcon size={14}/>, isOpen: true, x: 420, y: 120, width: 450, height: 500, z: 2, content: <DecryptoApp/> },
        { id: 'router', title: 'Signal_Router.app', icon: <Network size={14}/>, isOpen: false, x: 100, y: 150, width: 500, height: 400, z: 3, content: <SignalRouterApp/> },
        { id: 'target', title: 'Target_Lock.exe', icon: <Radio size={14}/>, isOpen: false, x: 450, y: 100, width: 450, height: 400, z: 4, content: <TargetLockApp/> },
        { id: 'packet', title: 'Packet_Reassembler', icon: <Layers size={14}/>, isOpen: false, x: 150, y: 200, width: 400, height: 350, z: 5, content: <PacketApp/> },
        { id: 'sonic', title: 'Sonic_Wave.mp3', icon: <Music size={14}/>, isOpen: false, x: 550, y: 300, width: 300, height: 250, z: 6, content: <SonicApp/> },
        { id: 'term', title: 'Terminal', icon: <Hash size={14}/>, isOpen: false, x: 200, y: 250, width: 500, height: 350, z: 7, content: null },
        { id: 'notes', title: 'Notes.txt', icon: <FileText size={14}/>, isOpen: false, x: 300, y: 300, width: 350, height: 300, z: 8, content: <NotesApp/> }
    ]);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const bootTimer = setTimeout(() => setBooting(false), 3000); 
        const clockTimer = setInterval(() => setTime(new Date()), 1000);
        return () => { clearTimeout(bootTimer); clearInterval(clockTimer); };
    }, []);

    const bringToFront = (id) => {
        setWindows(prev => {
            const maxZ = Math.max(...prev.map(w => w.z));
            return prev.map(w => w.id === id ? { ...w, z: maxZ + 1 } : w);
        });
    };

    const toggleWindow = (id) => {
        setWindows(prev => {
            const win = prev.find(w => w.id === id);
            const maxZ = Math.max(...prev.map(w => w.z));
            if (win.isOpen && win.z === maxZ) return prev.map(w => w.id === id ? { ...w, isOpen: false } : w);
            return prev.map(w => w.id === id ? { ...w, isOpen: true, z: maxZ + 1 } : w);
        });
    };

    const closeWindow = (id) => { setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w)); };

    const handleTerminalCommand = (cmd) => {
        if (cmd === 'theme_matrix') {
            document.documentElement.style.setProperty('--accent-cyan', '#33ff00');
            document.documentElement.style.setProperty('--accent-pink', '#33ff00');
            document.documentElement.style.setProperty('--text-main', '#33ff00');
            document.documentElement.style.setProperty('--bg-dark', '#000000');
        } else if (cmd === 'theme_cyber') {
            document.documentElement.style.setProperty('--accent-cyan', '#22d3ee');
            document.documentElement.style.setProperty('--accent-pink', '#f472b6');
            document.documentElement.style.setProperty('--text-main', '#e2e8f0');
            document.documentElement.style.setProperty('--bg-dark', '#09090b');
        } else if (cmd.startsWith('open_')) {
            const app = cmd.split('_')[1];
            const map = { decrypto: 'decrypto', manual: 'manual', router: 'router', target: 'target', packet: 'packet', sonic: 'sonic', notes: 'notes' };
            if (map[app]) toggleWindow(map[app]);
        }
    };

    if (booting) return <BootScreen />;

    return (
        <div className="desktop-wrapper">
            <div className="crt-overlay"></div>
            <div className="status-bar">
                <div style={{display:'flex', alignItems:'center', gap:'10px'}}><Command size={14} /> <span style={{fontWeight:'bold'}}>LogicOS</span></div>
                <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                    <div style={{color:'#fbbf24', fontSize:'0.7rem', display:'flex', alignItems:'center', gap:'5px'}}><Cpu size={12}/> RANK: OPERATOR (LVL 2) <span style={{opacity:0.5}}>| XP [||||||....]</span></div>
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}><Wifi size={14} /> <Battery size={14} /> <span>{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></div>
                </div>
            </div>
            <AnimatePresence>
                {windows.map((win) => (
                    win.isOpen && (
                        <WindowFrame key={win.id} data={win} onFocus={() => bringToFront(win.id)} onClose={() => closeWindow(win.id)}>
                            {win.id === 'term' ? <TerminalApp onCommand={handleTerminalCommand} /> : win.content}
                        </WindowFrame>
                    )
                ))}
            </AnimatePresence>
            <div className="dock-container">
                <Link to="/" style={{textDecoration:'none'}}>
                    <div className="dock-item" title="Return to Dashboard">
                        <Home size={20} color="#f472b6" /> {/* Pink Globe */}
                    </div>
                </Link>

                <div style={{width:'1px', background:'rgba(255,255,255,0.1)', margin:'0 5px'}}></div>
                <DockIcon icon={<BookOpen size={20}/>} label="Manual" isActive={windows.find(w=>w.id==='manual').isOpen} onClick={() => toggleWindow('manual')} />
                <DockIcon icon={<TerminalIcon size={20}/>} label="Decrypto" isActive={windows.find(w=>w.id==='decrypto').isOpen} onClick={() => toggleWindow('decrypto')} />
                <DockIcon icon={<Network size={20}/>} label="Router" isActive={windows.find(w=>w.id==='router').isOpen} onClick={() => toggleWindow('router')} />
                <DockIcon icon={<Radio size={20}/>} label="Sonar" isActive={windows.find(w=>w.id==='target').isOpen} onClick={() => toggleWindow('target')} />
                <div style={{width:'1px', background:'rgba(255,255,255,0.1)', margin:'0 5px'}}></div>
                <DockIcon icon={<Layers size={20}/>} label="Packet" isActive={windows.find(w=>w.id==='packet').isOpen} onClick={() => toggleWindow('packet')} />
                <DockIcon icon={<Music size={20}/>} label="Music" isActive={windows.find(w=>w.id==='sonic').isOpen} onClick={() => toggleWindow('sonic')} />
                <div style={{width:'1px', background:'rgba(255,255,255,0.1)', margin:'0 5px'}}></div>
                <DockIcon icon={<Hash size={20}/>} label="Terminal" isActive={windows.find(w=>w.id==='term').isOpen} onClick={() => toggleWindow('term')} />
                <DockIcon icon={<FileText size={20}/>} label="Notes" isActive={windows.find(w=>w.id==='notes').isOpen} onClick={() => toggleWindow('notes')} />
                
                <Link to="/materi/4" style={{textDecoration:'none'}}>
                    <div className="dock-item" title="Next Level: Trap Hunter">
                        <ArrowRight size={20} color="#34d399" /> {/* Green Arrrow */}
                        <div className="dock-dot" style={{background:'#34d399'}}></div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

// ==========================================
// 4. HELPER COMPONENTS
// ==========================================

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
};

const WindowFrame = ({ data, onFocus, onClose, children }) => {
    const isMobile = useIsMobile();
    return (
        <motion.div
            className={`os-window ${data.z > 10 ? 'active' : ''}`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            style={{ width: isMobile ? '100%' : data.width, height: isMobile ? '100%' : data.height, left: isMobile ? 0 : data.x, top: isMobile ? 0 : data.y, zIndex: data.z }}
            drag={!isMobile} dragMomentum={false} onDragStart={!isMobile ? onFocus : undefined} onMouseDown={onFocus}
        >
            <div className="win-header">
                <div className="win-title">{data.icon} {data.title}</div>
                <div className="traffic-lights"><button className="traffic-btn min"></button><button className="traffic-btn max"></button><button className="traffic-btn close" onClick={(e) => { e.stopPropagation(); onClose(); }}></button></div>
            </div>
            <div className="win-body">{children}</div>
        </motion.div>
    );
};

const DockIcon = ({ icon, isActive, onClick }) => (
    <div className={`dock-item ${isActive ? 'active' : ''}`} onClick={onClick}>{icon}{isActive && <div className="dock-dot"></div>}</div>
);

export default LogicOS;