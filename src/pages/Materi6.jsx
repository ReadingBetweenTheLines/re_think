import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

// Import Data & Styles
import { round1Data, round2Data, round3Data } from '../data/bossData';
import { saveScore, getLeaderboard } from '../utils/firebase';
import './Materi6.css'; 

// --- SOUND ASSETS ---
const sfxWin = new Audio('/sounds/sfx_win.mp3');
const sfxLose = new Audio('/sounds/sfx_lose.mp3');
const sfxSlash = new Audio('/sounds/sfx_ability_slash.mp3');
const sfxScan = new Audio('/sounds/sfx_ability_chain.mp3');
const sfxSniper = new Audio('/sounds/sfx_ability_sniper.mp3');
const sfxGun = new Audio('/sounds/sfx_gunshot.mp3');
const sfxBossCast = new Audio('/sounds/sfx_boss_curse.mp3');
const sfxAlarm = new Audio('/sounds/sfx_boss_lock.mp3');

function FinalBoss() {
  const navigate = useNavigate();

  // --- 1. GAME STATE ---
  const [gameState, setGameState] = useState('intro'); 
  const [roundLevel, setRoundLevel] = useState(1);
  const [currentData, setCurrentData] = useState(round1Data);
  const [userProfile, setUserProfile] = useState(null); 

  // Stats
  const [qIndex, setQIndex] = useState(0);
  const [hp, setHp] = useState(1000);
  const [maxHp] = useState(1000);
  const [mana, setMana] = useState(0); 
  const [focus, setFocus] = useState(0); 
  const [timer, setTimer] = useState(1200); 
  const [score, setScore] = useState(0);
  
  // Leaderboard Display
  const [finalTotalScore, setFinalTotalScore] = useState(0);
  const [highScores, setHighScores] = useState([]);

  // Mechanics
  const [combo, setCombo] = useState(0);
  const [chargeProgress, setChargeProgress] = useState(0);
  const [isSniperMode, setIsSniperMode] = useState(false);
  const [lockedOptions, setLockedOptions] = useState([]);
  const [hiddenOptions, setHiddenOptions] = useState([]);

  // Visuals
  const [bossState, setBossState] = useState('idle');
  const [bossMessage, setBossMessage] = useState("");
  const [damageOverlay, setDamageOverlay] = useState(false);
  const [shake, setShake] = useState(false);
  
  // Tools
  const [tools, setTools] = useState({ suffix: false, xray: false, logic: false });
  const [activeLogicMap, setActiveLogicMap] = useState(null);

  // Refs
  const timerRef = useRef(null);
  const manaRef = useRef(null);

  // --- 2. AUTH CHECK ---
  useEffect(() => {
    const rawProfile = localStorage.getItem('cadetProfile');
    if (!rawProfile) {
        navigate('/login');
    } else {
        setUserProfile(JSON.parse(rawProfile));
    }
  }, [navigate]);

  // --- 3. INITIALIZATION ---
  useEffect(() => {
    if (roundLevel === 1) setCurrentData(round1Data);
    if (roundLevel === 2) setCurrentData(round2Data);
    if (roundLevel === 3) setCurrentData(round3Data);
    
    setQIndex(0);
    setMana(0);
    setLockedOptions([]);
    setHiddenOptions([]);
  }, [roundLevel]);

  // --- 4. GAME LOOP ---
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimer(t => {
            if(t <= 1) { handleFail(); return 0; }
            return t - 1;
        });
      }, 1000);

      manaRef.current = setInterval(() => {
        setMana(prev => {
            if (prev >= 100) {
                triggerBossSkill();
                return 0;
            }
            return prev + 0.2; 
        });
      }, 100);
    }

    return () => {
      clearInterval(timerRef.current);
      clearInterval(manaRef.current);
    };
  }, [gameState]);

  // --- 5. BOSS AI ---
  const triggerBossSkill = () => {
    setBossState('attack');
    sfxBossCast.play();
    const skillRoll = Math.random();
    if (skillRoll < 0.4) {
        setBossMessage("SILENCE!");
        sfxAlarm.play();
        const locks = [0, 1, 2, 3, 4].sort(() => 0.5 - Math.random()).slice(0, 2);
        setLockedOptions(locks);
    } else if (skillRoll < 0.7) {
        setBossMessage("SYSTEM ERROR!");
        setShake(true);
        setTimeout(() => setShake(false), 1000);
    } else {
        setBossMessage("DRAIN!");
        setFocus(f => Math.max(0, f - 2));
        setDamageOverlay(true);
    }
    setTimeout(() => {
        setBossState('idle');
        setBossMessage("");
        setDamageOverlay(false);
    }, 2000);
  };

  // --- 6. HERO SKILLS ---
  const castDoubleSlash = () => {
    if (focus < 2) return;
    sfxSlash.play();
    setFocus(f => f - 2);
    const currentQ = currentData.questions[qIndex];
    const wrongIndices = currentQ.opts.map((_, i) => i).filter(i => i !== currentQ.ans); 
    const toHide = wrongIndices.sort(() => 0.5 - Math.random()).slice(0, 2);
    setHiddenOptions(prev => [...prev, ...toHide]);
  };

  const castLogicView = () => {
    if (focus < 3) return;
    sfxScan.play();
    setFocus(f => f - 3);
    const map = currentData.logicMaps[qIndex + 1]; 
    if (map) setActiveLogicMap(map);
    else setBossMessage("NO LOGIC FOUND");
  };

  const castSniper = () => {
    if (focus < 4) return;
    sfxSniper.play();
    setFocus(f => f - 4);
    setIsSniperMode(true);
  };

  // --- 7. ANSWER HANDLING ---
  const handleAnswer = (selectedIndex) => {
    if (isSniperMode) {
        const currentQ = currentData.questions[qIndex];
        if (selectedIndex !== currentQ.ans) {
            sfxGun.play();
            setHiddenOptions(prev => [...prev, selectedIndex]);
            return;
        } else setIsSniperMode(false);
    }

    if (lockedOptions.includes(selectedIndex)) return;

    const currentQ = currentData.questions[qIndex];
    const isCorrect = selectedIndex === currentQ.ans;

    if (isCorrect) {
        sfxWin.play();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });

        const dmg = 50 + (combo * 10);
        setHp(prev => Math.max(0, prev - dmg));
        setCombo(prev => prev + 1);
        setScore(prev => prev + 100 + (combo * 20));

        setChargeProgress(prev => {
            if (prev + 1 >= 2) {
                setFocus(f => Math.min(f + 1, 5));
                return 0;
            }
            return prev + 1;
        });

        setBossState('damaged');
        setTimeout(() => setBossState('idle'), 500);

        // Always delay next question slightly for effect
        setTimeout(nextQuestion, 1000);

    } else {
        sfxLose.play();
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setCombo(0);
        setChargeProgress(0);
        setMana(prev => Math.min(prev + 25, 100));
        setHp(prev => Math.min(prev + 20, maxHp));
        setTimeout(nextQuestion, 1000);
    }
  };

  const nextQuestion = () => {
      setLockedOptions([]);
      setHiddenOptions([]);
      setActiveLogicMap(null);

      if (qIndex + 1 < currentData.questions.length) {
          setQIndex(prev => prev + 1);
      } else {
          // Check Win Condition: Must defeat boss HP
          if (hp <= 0) {
              handleRoundWin();
          } else {
              handleFail();
          }
      }
  };

  const handleRoundWin = () => {
      if (roundLevel < 3) {
          alert(`SECTOR ${roundLevel} CLEARED. INITIALIZING NEXT PHASE.`);
          setRoundLevel(prev => prev + 1);
          setHp(1000); 
          setQIndex(0);
      } else {
          handleGameWin();
      }
  };

  const handleGameWin = async () => {
      setGameState('win');
      const total = score + hp + (timer * 10);
      setFinalTotalScore(total);
      
      if (userProfile) {
          saveScore(userProfile.username, userProfile.school, total, 3);
          // Optimistic Update
          const dbData = await getLeaderboard(3);
          const myEntry = { name: userProfile.username, school: userProfile.school, score: total, level: 3 };
          const combined = [...dbData, myEntry].sort((a, b) => b.score - a.score).slice(0, 10);
          setHighScores(combined);
      }
  };

  const handleFail = () => setGameState('fail');

  const fetchLeaderboard = async () => {
      const data = await getLeaderboard(3);
      setHighScores(data);
      setGameState('leaderboard');
  };

  // --- 8. DEV CHEAT FUNCTION ---
  const devSkipRound = () => {
      console.log("⚡ CHEAT: Skipping Round...");
      if (roundLevel < 3) {
          handleRoundWin();
      } else {
          // Instantly kill boss and win
          setHp(0);
          setScore(prev => prev + 5000); // Give fake bonus
          // We need to call handleGameWin, but it relies on current state values.
          // Since setState is async, we manually trigger the win flow logic here:
          
          setGameState('win');
          const total = (score + 5000) + 0 + (timer * 10);
          setFinalTotalScore(total);
          
          if (userProfile) {
              saveScore(userProfile.username, userProfile.school, total, 3);
              getLeaderboard(3).then(data => {
                  const myEntry = { name: userProfile.username, school: userProfile.school, score: total, level: 3 };
                  const combined = [...data, myEntry].sort((a, b) => b.score - a.score).slice(0, 10);
                  setHighScores(combined);
              });
          }
      }
  };

  const currentQ = currentData.questions[qIndex];
  const currentPassage = currentData.passages.find(p => p.id === currentQ?.tId);

  const renderPassage = () => {
      if (!currentPassage) return <div>Loading Data...</div>;
      let classes = "passage";
      if (tools.suffix) classes += " mode-suffix";
      if (tools.xray) classes += " mode-xray";
      return <div className={classes} dangerouslySetInnerHTML={{ __html: currentPassage.content }} />;
  };

  // --- RENDER ---
  return (
    <div className={`final-boss-wrapper ${shake ? 'shake-screen' : ''} ${isSniperMode ? 'sniper-active' : ''}`}>
        
        {damageOverlay && <div className="fx-overlay" id="damageOverlay" style={{opacity:1}}></div>}

        {/* DEV CHEAT BUTTON */}
        <button 
            onClick={devSkipRound} 
            style={{position:'fixed', bottom:'20px', left:'20px', zIndex:9999, background:'#7C3AED', color:'white', border:'2px solid #C4B5FD', padding:'10px 20px', borderRadius:'8px', fontWeight:'bold', cursor:'pointer'}}
        >
            ⚡ SKIP
        </button>

        {/* 1. INTRO SCREEN */}
        {gameState === 'intro' && (
            <div className="screen-overlay">
                <div style={{textAlign:'center', marginBottom:'20px'}}>
                    <div style={{fontFamily:'var(--font-tech)', color:'var(--gold)', border:'1px solid var(--gold)', padding:'5px 15px', borderRadius:'4px', display:'inline-block', letterSpacing:'2px'}}>SECURE TERMINAL</div>
                    <h1 className="intro-title" style={{fontSize:'4rem', margin:'0', background:'linear-gradient(to bottom, #FFF, #94A3B8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>SELECT MISSION</h1>
                    <p style={{color:'#64748B'}}>Choose your engagement level.</p>
                </div>

                <div className="mission-grid" style={{display:'flex', gap:'20px', flexWrap:'wrap', justifyContent:'center'}}>
                    <div className="mission-card" onClick={() => { setRoundLevel(1); setGameState('playing'); }}>
                        <div style={{display:'inline-block', padding:'2px 8px', borderRadius:'4px', fontSize:'0.6rem', fontWeight:'bold', color:'black', background:'#10B981'}}>EASY</div>
                        <h3 style={{color:'white', fontFamily:'var(--font-tech)', margin:'10px 0 5px 0'}}>SECTOR B2</h3>
                        <p style={{color:'#94A3B8', fontSize:'0.8rem', lineHeight:'1.4'}}>Intermediate English.</p>
                    </div>
                    <div className="mission-card" onClick={() => { setRoundLevel(2); setGameState('playing'); }}>
                        <div style={{display:'inline-block', padding:'2px 8px', borderRadius:'4px', fontSize:'0.6rem', fontWeight:'bold', color:'black', background:'#F59E0B'}}>HARD</div>
                        <h3 style={{color:'white', fontFamily:'var(--font-tech)', margin:'10px 0 5px 0'}}>SECTOR C1</h3>
                        <p style={{color:'#94A3B8', fontSize:'0.8rem', lineHeight:'1.4'}}>Advanced Logic.</p>
                    </div>
                    <div className="mission-card" onClick={() => { setRoundLevel(3); setGameState('playing'); }}>
                        <div style={{display:'inline-block', padding:'2px 8px', borderRadius:'4px', fontSize:'0.6rem', fontWeight:'bold', color:'black', background:'#EF4444'}}>BOSS</div>
                        <h3 style={{color:'white', fontFamily:'var(--font-tech)', margin:'10px 0 5px 0'}}>SCHOLASTIC</h3>
                        <p style={{color:'#94A3B8', fontSize:'0.8rem', lineHeight:'1.4'}}>Academic Torture.</p>
                    </div>
                </div>

                <button onClick={fetchLeaderboard} style={{marginTop:'20px', background:'none', border:'1px solid #475569', color:'#94A3B8', padding:'10px 20px', cursor:'pointer'}}>VIEW ARCHIVES</button>
            </div>
        )}

        {/* 2. LEADERBOARD SCREEN */}
        {gameState === 'leaderboard' && (
            <div className="screen-overlay" style={{background:'#bbb3b3'}}>
                <div className="leaderboard-card">
                    <h2 style={{color:'#38BDF8', textAlign:'center', marginBottom:'20px'}}>HALL OF FAME</h2>
                    <div className="table-container">
                        <table className="lb-table">
                            <thead>
                                <tr><th>RANK</th><th>CADET</th><th style={{textAlign:'right'}}>SCORE</th></tr>
                            </thead>
                            <tbody>
                                {highScores.map((s, i) => (
                                    <tr key={i}>
                                        <td className={i===0?'rank-1':''}>#{i+1}</td>
                                        <td>{s.name}<br/><span style={{fontSize:'0.6rem', color:'#64748B'}}>{s.school}</span></td>
                                        <td className="score-val">{s.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="return-btn" onClick={() => setGameState('intro')}>&lt; RETURN TO BASE</button>
                </div>
            </div>
        )}

        {/* 3. PLAYING SCREEN */}
        {gameState === 'playing' && (
            <div className="screen-battle" style={{opacity:1}}>
                <div className="hud-top">
                    <div style={{display:'flex', flexDirection:'column', width:'50%'}}>
                        <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'var(--gold)', marginBottom:'5px'}}>
                            <span>BOSS INTEGRITY</span><span>ABILITY CHARGE</span>
                        </div>
                        <div style={{display:'flex', gap:'10px', height:'10px'}}>
                            <div className="boss-hp-container"><div className="boss-hp-bar" style={{width: `${(hp/maxHp)*100}%`}}></div></div>
                            <div className="boss-mana-container"><div className="boss-mana-bar" style={{width: `${mana}%`}}></div></div>
                        </div>
                    </div>
                    <div className="timer">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</div>
                </div>

                <div className="battle-arena">
                    <div className="boss-sidebar">
                        <div className={`boss-bubble ${bossMessage ? 'show' : ''}`}>{bossMessage}</div>
                        <div className="boss-frame"><div className="boss-scaler"><div className={`boss-entity ${bossState}`} style={{backgroundImage: 'url(/images/boss_idle.png)'}}></div></div></div>
                    </div>
                    <div className="text-panel">
                        {activeLogicMap ? (
                            <div className="chain-container">
                                <h3 style={{color:'#F59E0B'}}>LOGIC DECRYPTED</h3>
                                {activeLogicMap.map((node, i) => (
                                    <div key={i} className={`chain-node ${node.type}`}>
                                        {node.type === 'arrow' && <span className="chain-arrow">⬇ {node.text} ⬇</span>}
                                        {node.type !== 'arrow' && node.text}
                                    </div>
                                ))}
                                <button className="lab-btn" onClick={() => setActiveLogicMap(null)} style={{marginTop:'20px'}}>CLOSE LOGIC VIEW</button>
                            </div>
                        ) : (<><h3>{currentPassage?.title}</h3>{renderPassage()}</>)}
                    </div>
                    <div className="control-panel">
                        <div className="hero-interface">
                            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px'}}>
                                <span style={{fontSize:'0.7rem', color:'#38BDF8'}}>NEURAL CHARGE</span>
                                <div className="focus-meter">
                                    {[1,2,3,4,5].map(i => <div key={i} className={`focus-pip ${focus >= i ? 'active' : ''}`}></div>)}
                                </div>
                            </div>
                            <div style={{display:'flex', gap:'5px'}}>
                                <button className={`skill-btn ${focus>=2?'ready':''}`} onClick={castDoubleSlash}>⚔️ II</button>
                                <button className={`skill-btn ${focus>=3?'ready':''}`} onClick={castLogicView}>🧬 III</button>
                                <button className={`skill-btn ${focus>=4?'ready':''}`} onClick={castSniper}>🎯 IV</button>
                            </div>
                        </div>
                        <div className="q-card">
                            <div style={{color:'#F59E0B', fontSize:'0.8rem', marginBottom:'10px'}}>QUESTION {qIndex + 1} / {currentData.questions.length}</div>
                            <div className={`q-text ${bossState === 'attack' ? 'text-glitched' : ''}`}>{currentQ?.q}</div>
                            {currentQ?.opts.map((opt, i) => {
                                const isLocked = lockedOptions.includes(i);
                                const isHidden = hiddenOptions.includes(i);
                                if (isHidden) return null;
                                return <button key={i} className={`opt-btn ${isLocked ? 'opt-locked' : ''}`} onClick={() => handleAnswer(i)}>{opt}</button>;
                            })}
                        </div>
                    </div>
                </div>

                <div className="hud-bottom">
                    <button className={`tool-btn ${tools.suffix ? 'active' : ''}`} onClick={() => setTools(p => ({...p, suffix: !p.suffix}))}>✂️ SUFFIX</button>
                    <button className={`tool-btn ${tools.xray ? 'active' : ''}`} onClick={() => setTools(p => ({...p, xray: !p.xray}))}>🔦 X-RAY</button>
                </div>

            </div>
        )}

        {/* 4. WIN SCREEN */}
        {gameState === 'win' && (
            <div className="screen-overlay" style={{background:'rgba(15, 23, 42, 0.95)'}}>
                <div className="leaderboard-card">
                    <h2 style={{color:'#38BDF8', textAlign:'center', textShadow:'0 0 10px #38BDF8', fontSize:'2rem'}}>MISSION ACCOMPLISHED</h2>
                    <div style={{fontSize:'1.5rem', fontFamily:'monospace', color:'white', margin:'10px 0'}}>
                        FINAL SCORE: <span style={{color:'#F59E0B'}}>{finalTotalScore}</span>
                    </div>

                    <div className="table-container">
                        <table className="lb-table">
                            <thead>
                                <tr><th>RANK</th><th>CADET</th><th style={{textAlign:'right'}}>SCORE</th></tr>
                            </thead>
                            <tbody>
                                {highScores.length > 0 ? (
                                    highScores.map((s, i) => (
                                        <tr key={i}>
                                            <td className={i===0?'rank-1':''}>#{i+1}</td>
                                            <td>{s.name}<br/><span style={{fontSize:'0.6rem', color:'#64748B'}}>{s.school}</span></td>
                                            <td className="score-val">{s.score}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="3" style={{textAlign:'center', padding:'20px'}}>Syncing Database...</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <button className="return-btn" onClick={() => navigate('/')}>RETURN TO BASE</button>
                </div>
            </div>
        )}

        {/* 5. FAIL SCREEN */}
        {gameState === 'fail' && (
            <div className="screen-overlay" style={{background:'rgba(50,0,0,0.95)'}}>
                <h1 className="fail-title">MISSION FAILED</h1>
                <p className="fail-desc">Target remains active. Logic sync failed.</p>
                <button className="return-btn" style={{borderColor:'#EF4444', color:'#EF4444'}} onClick={() => window.location.reload()}>RETRY SIMULATION</button>
            </div>
        )}

    </div>
  );
}

export default FinalBoss;