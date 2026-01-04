import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Materi2.css';

// --- DATA ---
const LAB_DATA = [
  { 
    id: 1, 
    chunks: [
      { text: "The", type: "normal" }, { text: "rapid", type: "tail" }, { text: "advancement", type: "normal" },
      { text: ", which has surprised many experts,", type: "noise" },
      { text: "has", type: "signal" }, { text: "catalyzed", type: "verb" },
      { text: "the", type: "normal" }, { text: "widespread", type: "tail" }, { text: "emergence.", type: "normal" }
    ]
  },
  {
    id: 2, 
    chunks: [
      { text: "Despite", type: "noise" }, { text: "skepticism,", type: "noise" },
      { text: "the", type: "normal" }, { text: "algorithm", type: "normal" },
      { text: "is", type: "signal" }, { text: "now", type: "tail" }, { text: "outperforming", type: "verb" },
      { text: "human", type: "normal" }, { text: "analysts.", type: "normal" }
    ]
  },
  {
    id: 3, 
    chunks: [
      { text: "Urban", type: "normal" }, { text: "planning,", type: "normal" },
      { text: "often", type: "noise" }, { text: "ignored,", type: "noise" },
      { text: "remains", type: "signal" }, { text: "a", type: "normal" }, { text: "crucial", type: "tail" },
      { text: "determinant.", type: "normal" }
    ]
  },
  {
    id: 4, 
    chunks: [
      { text: "The", type: "normal" }, { text: "ancient", type: "tail" }, { text: "manuscript,", type: "normal" },
      { text: "found", type: "noise" }, { text: "in", type: "noise" }, { text: "a", type: "noise" }, { text: "cave,", type: "noise" },
      { text: "has", type: "signal" }, { text: "revealed", type: "verb" },
      { text: "facts.", type: "normal" }
    ]
  },
  {
    id: 5, 
    chunks: [
      { text: "Renewable", type: "normal" }, { text: "energy,", type: "normal" },
      { text: "such", type: "noise" }, { text: "as", type: "noise" }, { text: "solar,", type: "noise" },
      { text: "is", type: "signal" }, { text: "becoming", type: "verb" },
      { text: "economically", type: "tail" }, { text: "viable.", type: "normal" }
    ]
  }
];

const CIRCUIT_DATA = [
  { id: 1, premise: "Government implemented tariffs.", conclusion: "Import prices surged 40%.", correct: "Consequently", options: ["However", "Consequently", "Furthermore", "In contrast"] },
  { id: 2, premise: "AI offers immense efficiency.", conclusion: "It raises privacy concerns.", correct: "However", options: ["Therefore", "However", "Additionally", "Similarly"] },
  { id: 3, premise: "She studied every night.", conclusion: "She scored highest in district.", correct: "As a result", options: ["Nevertheless", "As a result", "In spite of this", "Conversely"] }
];

const SPECTRUM_DATA = [
  { 
    id: 1, 
    text: "The decision to ignore the safety protocols was catastrophic. This reckless negligence has doomed the entire project to failure.", 
    keywords: ["catastrophic", "reckless", "negligence", "doomed", "failure"], 
    tone: "CRITICAL / NEGATIVE", 
    explanation: "The author is attacking the subject with high-intensity blame words.",
    wordMeanings: {
      "catastrophic": "Involving sudden and great damage.",
      "reckless": "Acting without thinking of consequences.",
      "negligence": "Failure to take proper care.",
      "doomed": "Certain to fail or be destroyed."
    }
  },
  { 
    id: 2, 
    text: "While challenges remain, the innovative approach shows promising potential to revolutionize the industry for the better.", 
    keywords: ["innovative", "promising", "potential", "revolutionize", "better"], 
    tone: "OPTIMISTIC / POSITIVE", 
    explanation: "The vocabulary focuses on future success and improvement.",
    wordMeanings: {
      "innovative": "Featuring new methods; advanced.",
      "promising": "Showing signs of future success.",
      "revolutionize": "Change something radically.",
      "potential": "Latent qualities that may be developed."
    }
  },
  { 
    id: 3, 
    text: "The report merely lists the data without offering any insight. It is a dull, repetitive summary that adds no value.", 
    keywords: ["merely", "dull", "repetitive", "no value"], 
    tone: "DISMISSIVE / BORED", 
    explanation: "The author minimizes the value of the work.",
    wordMeanings: {
      "merely": "Just; only (minimizing significance).",
      "dull": "Lacking interest or excitement.",
      "repetitive": "Repeating things unnecessarily.",
      "no value": "Worthless."
    }
  },
  {
    id: 4,
    text: "The experiment yielded a 15% increase in efficiency. Data collected over six months indicates a stable trend.",
    keywords: ["yielded", "data", "indicates", "stable"],
    tone: "OBJECTIVE / NEUTRAL",
    explanation: "Facts and statistics are presented without emotional coloring.",
    wordMeanings: {
      "yielded": "Produced or provided (a result).",
      "data": "Facts and statistics.",
      "indicates": "Point out; show.",
      "stable": "Not likely to change or fail."
    }
  },
  {
    id: 5,
    text: "They claim this solution is a silver bullet, but the alleged benefits remain unproven. We suspect these figures are inflated.",
    keywords: ["claim", "alleged", "unproven", "suspect", "inflated"],
    tone: "SKEPTICAL / DOUBTFUL",
    explanation: "The author questions the truthfulness of the subject.",
    wordMeanings: {
      "claim": "State something without proof.",
      "alleged": "Said to be true but not proven.",
      "suspect": "Have an idea that something is false.",
      "inflated": "Exaggerated."
    }
  },
  {
    id: 6,
    text: "The old dusty photographs evoked a bittersweet memory of simpler times, long before the city changed.",
    keywords: ["old", "dusty", "bittersweet", "memory", "simpler"],
    tone: "NOSTALGIC / SENTIMENTAL",
    explanation: "The author is longing for the past with mixed emotions.",
    wordMeanings: {
      "evoked": "Bring or recall to the conscious mind.",
      "bittersweet": "Pleasure mixed with pain.",
      "simpler": "Less complex; easier to understand (often referring to the past).",
      "dusty": "Covered with dust (implies age/neglect)."
    }
  }
];

const XRAY_CASES = [
  { 
    id: 1, 
    chunks: [
      { text: "The", isJunk: false }, { text: "unprecedented", isJunk: true }, { text: "surge", isJunk: false },
      { text: "globally", isJunk: true }, { text: "indicates", isJunk: false }, { text: "shift.", isJunk: false }
    ],
    original: "The unprecedented surge globally indicates shift."
  },
  { 
    id: 2, 
    chunks: [
      { text: "Photosynthesis,", isJunk: false }, { text: "which", isJunk: true }, { text: "is", isJunk: true }, { text: "process,", isJunk: true },
      { text: "requires", isJunk: false }, { text: "light.", isJunk: false }
    ],
    original: "Photosynthesis, which is process, requires light."
  },
  { 
    id: 3, 
    chunks: [
      { text: "Complex", isJunk: true }, { text: "algorithm", isJunk: false },
      { text: "successfully", isJunk: true }, { text: "predicted", isJunk: false }, { text: "outcome.", isJunk: false }
    ],
    original: "Complex algorithm successfully predicted outcome."
  }
];


// --- ANIMATION VARIANTS (DIRECTION LOGIC) ---
// This handles the "Slide from Left" vs "Slide from Right"
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    rotate: direction > 0 ? 5 : -5 // Add a little tilt for zine feel
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    rotate: 0
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    rotate: direction < 0 ? 5 : -5
  })
};

// --- COMPONENTS ---

const RansomNote = ({ data, activeFilters }) => {
  return (
    <div className="ripped-paper ransom-box">
      <div className="tape-strip" style={{top:-15, left:'30%'}}></div>
      <div className="tape-strip" style={{bottom:-15, right:'20%', transform:'rotate(10deg)'}}></div>
      {data.chunks.map((chunk, i) => {
        let chunkClass = "word-scrap";
        if (activeFilters.noise && chunk.type === 'noise') chunkClass += " is-noise";
        else if (activeFilters.tails && chunk.type === 'tail') chunkClass += " is-tail";
        else if (activeFilters.signal && (chunk.type === 'signal' || chunk.type === 'verb')) chunkClass += " is-signal";
        
        const rot = (i % 5 - 2) * 2; 
        
        return <span key={i} className={chunkClass} style={{'--r': `${rot}deg`}}>{chunk.text}</span>;
      })}
    </div>
  );
};

const TapeCircuit = ({ data, onNext }) => {
  const [selected, setSelected] = useState(null);
  const isSolved = selected === data.correct;

  return (
    <div className="circuit-zine">
      <div className="cardboard-node" style={{transform:'rotate(-1deg)'}}>
        <span>[INPUT]</span>
        <p>{data.premise}</p>
      </div>

      <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', zIndex:10}}>
        <div className={`sticker-slot ${isSolved ? 'solved' : ''}`}>
          {selected || "MISSING LINK"}
        </div>
        <div className="sticker-grid">
          {data.options.map(opt => (
            <button key={opt} className="sticker-btn" onClick={() => setSelected(opt)} disabled={isSolved}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="cardboard-node" style={{transform:'rotate(1deg)'}}>
        <span>[OUTPUT]</span>
        <p>{data.conclusion}</p>
      </div>

      <div className={`tape-wire ${isSolved ? 'charged' : ''}`}></div>

      {isSolved && <button className="turn-page-btn" style={{position:'absolute', bottom:-100, left:'50%', transform:'translateX(-50%)'}} onClick={onNext}>NEXT WIRE &gt;&gt;</button>}
    </div>
  );
};

const HighlighterManifesto = ({ data, onNext }) => {
  const [hits, setHits] = useState([]);
  const isComplete = hits.length >= 3;

  const toggleWord = (word) => {
    const cleanWord = word.replace(/[.,]/g, '').toLowerCase();
    const isKeyword = data.keywords.some(k => k.includes(cleanWord));
    if (isKeyword && !hits.includes(cleanWord)) {
      setHits([...hits, cleanWord]);
    }
  };

  return (
    <div className="typewriter-page ripped-paper">
      <div className="tape-strip" style={{top:-10, right:-10, transform:'rotate(10deg)'}}></div>
      <h3 style={{fontFamily:'Permanent Marker', transform:'rotate(-2deg)'}}>MARK THE EVIDENCE (3)</h3>
      
      <div className="manifesto-text">
        {data.text.split(" ").map((word, i) => (
          <span 
            key={i} 
            className={`highlighter-mark ${hits.includes(word.replace(/[.,]/g, '').toLowerCase()) ? 'selected' : ''}`}
            onClick={() => !isComplete && toggleWord(word)}
          >
            {word}{" "}
          </span>
        ))}
      </div>

      <div className="vu-meter">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`vu-bar ${i < hits.length * 6.5 ? 'active' : ''}`} style={{height: `${Math.random() * 50 + 50}%`}}/>
        ))}
      </div>

      {isComplete && (
        <div className="result-area">
          <div className="stamped-result">VERDICT: {data.tone}</div>
          
          <div style={{fontFamily:'Courier Prime', marginTop:'15px', fontWeight:'bold'}}>
            REASONING: {data.explanation}
          </div>

          <div className="tone-dictionary">
             <div style={{fontFamily:'Permanent Marker', marginBottom:'10px'}}>EVIDENCE LOG:</div>
             {hits.map(word => (
                 <div key={word} className="dict-item">
                     <span className="dict-word">{word.toUpperCase()}</span>
                     {data.wordMeanings[word] || "Selected evidence."}
                 </div>
             ))}
          </div>

          <button className="turn-page-btn" onClick={onNext}>NEXT CASE</button>
        </div>
      )}
    </div>
  );
};

const EvidenceFile = ({ data }) => {
    const [revealed, setRevealed] = useState(false);

    return (
      <div 
        className={`evidence-file ${revealed ? 'revealed' : ''}`}
        onClick={() => setRevealed(!revealed)}
      >
        <div className="file-header">
            <div style={{fontFamily:'Permanent Marker'}}>CASE #{data.id}</div>
            <div className="classified-stamp">TOP SECRET</div>
        </div>

        <div className="xray-text-content">
            {data.chunks.map((chunk, i) => (
               <span 
                 key={i} 
                 className={`redaction-word ${chunk.isJunk ? "is-junk" : "is-core"}`}
               >
                 {chunk.text} 
               </span>
            ))}
        </div>

        <div className="click-hint">
            {revealed ? "[ TAP TO REDACT ]" : "[ TAP TO DECLASSIFY ]"}
        </div>
      </div>
    );
};

// --- MAIN PAGE ---
export default function BrutalZine() {
  const STAGES = ['intro', 'lab', 'circuit', 'spectrum', 'xray'];
  
  const [[page, direction], setPage] = useState([0, 0]);
  
  const [labIdx, setLabIdx] = useState(0); 
  const [circuitIdx, setCircuitIdx] = useState(0);
  const [spectrumIdx, setSpectrumIdx] = useState(0);
  const [filters, setFilters] = useState({ noise: false, tails: false, signal: false });

  const navigateTo = (targetStage) => {
    const targetIndex = STAGES.indexOf(targetStage);
    const newDirection = targetIndex > page ? 1 : -1;
    setPage([targetIndex, newDirection]);
  };

  const currentStage = STAGES[page];

  return (
    <div className="zine-wrapper">
      <nav className="zine-nav">
        {/* ADDED: Link to Home */}
        <Link to="/" className="nav-scrap nav-exit">
           &lt; EXIT
        </Link>
        
        <div className="masthead-title">GLITCH // GRAMMAR ZINE Issue #4</div>
        
        <div className="nav-links">
           {STAGES.map((s, i) => (
             <button 
                key={s} 
                onClick={() => navigateTo(s)} 
                className={`nav-scrap ${currentStage === s ? 'active' : ''}`}
             >
               {s.toUpperCase()}
             </button>
           ))}
        </div>
      </nav>

      <AnimatePresence mode="wait" custom={direction}>
        
        <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.4
            }}
            className="zine-stage"
        >
            {currentStage === 'intro' && (
                <div className="intro-cover">
                    <h1 className="headline-cutout">BREAK<br/>THE<br/>RULES.</h1>
                    <p style={{background:'var(--bz-black)', color:'var(--bz-paper)', padding:'5px', fontFamily:'Permanent Marker', transform:'rotate(-2deg)'}}>The anti-textbook for linguistic anarchy.</p>
                    <button className="start-stomp" onClick={() => navigateTo('lab')}>OPEN ZINE</button>
                </div>
            )}

            {currentStage === 'lab' && (
                <>
                    <h2 style={{fontFamily:'Archivo Black', fontSize:'3rem', textTransform:'uppercase', color:'var(--bz-neon-pink)', textShadow:'3px 3px 0 black'}}>Ransom Note Lab</h2>
                    <div className="control-row">
                    <button className={`spray-btn tails ${filters.tails?'active':''}`} onClick={()=>setFilters(p=>({...p, tails:!p.tails}))}>STRIP TAILS</button>
                    <button className={`spray-btn noise ${filters.noise?'active':''}`} onClick={()=>setFilters(p=>({...p, noise:!p.noise}))}>CENSOR NOISE</button>
                    <button className={`spray-btn signal ${filters.signal?'active':''}`} onClick={()=>setFilters(p=>({...p, signal:!p.signal}))}>MARK SIGNAL</button>
                    </div>
                    <RansomNote data={LAB_DATA[labIdx]} activeFilters={filters} />
                    <div style={{marginTop:'20px', fontFamily:'Permanent Marker'}}>FILE: {labIdx+1} / {LAB_DATA.length}</div>
                    <button className="turn-page-btn" onClick={() => {
                        setLabIdx(p => (p + 1) % LAB_DATA.length);
                        setFilters({noise:false, tails:false, signal:false});
                    }}>TURN PAGE</button>
                </>
            )}

            {currentStage === 'circuit' && (
                <>
                    <h2 style={{fontFamily:'Archivo Black', fontSize:'3rem', textTransform:'uppercase', background:'var(--bz-neon-yellow)', padding:'0 10px', border:'3px solid black', transform:'rotate(1deg)'}}>HOTWIRE LOGIC</h2>
                    <TapeCircuit data={CIRCUIT_DATA[circuitIdx]} onNext={()=>setCircuitIdx(p=>(p+1)%CIRCUIT_DATA.length)}/>
                </>
            )}

            {currentStage === 'spectrum' && (
                <HighlighterManifesto 
                    key={spectrumIdx} 
                    data={SPECTRUM_DATA[spectrumIdx]} 
                    onNext={()=>setSpectrumIdx(p=>(p+1)%SPECTRUM_DATA.length)}
                />
            )}

            {currentStage === 'xray' && (
                <>
                    <h2 style={{fontFamily:'Archivo Black', fontSize:'3rem', color:'var(--bz-paper)', WebkitTextStroke:'2px black'}}>DECLASSIFY FILES</h2>
                    
                    <div className="evidence-grid" style={{marginTop:'30px'}}>
                        {XRAY_CASES.map(kase => <EvidenceFile key={kase.id} data={kase} />)}
                    </div>

                    {/* ADDED: Next Materi Button */}
                    <div style={{width: '100%', paddingBottom: '40px'}}>
                        <Link to="/materi/3" className="next-materi-cta">
                            GRAB ISSUE #3 <br/>
                            <span style={{fontSize: '0.9rem', fontFamily: 'Courier Prime'}}>LOGIC GATES & FALLACIES</span>
                        </Link>
                    </div>
                </>
            )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}