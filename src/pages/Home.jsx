// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {

  // --- Flashlight Logic for Card 1 ---
  const handleFlashlightMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within the element
    const y = e.clientY - rect.top;  // Y position within the element

    // Set CSS variables dynamically
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  return (
    <div className="bento-container">
      <div className="bento-grid">

        {/* ... [HERO, GAP, DIAGNOSTICS SECTIONS KEEP SAME] ... */}

        {/* 1. HERO */}
        <div className="bento-card area-hero">
          {/* ... hero content ... */}
          <div style={{ borderBottom: '3px solid black', paddingBottom: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span>v2.1_chaos</span>
            <span>📍 JAKARTA</span>
          </div>
          <h1 className="hero-title">UTBK<br />SURVIVAL KIT</h1>
          <div className="hero-desc">
            Forget grammar. This is a strategy guide for the desperate.
          </div>
          <div style={{ marginTop: '30px' }}>
            <a href="#modules" style={{ background: 'black', color: 'white', padding: '15px 30px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
              START READING &darr;
            </a>
          </div>
        </div>

        {/* 2. THE GAP */}
        <div className="bento-card area-gap">
          {/* ... gap content ... */}
          <div className="gap-sticker">THE PROBLEM:</div>
          <h2 style={{ fontFamily: 'Work Sans', fontSize: '2rem', margin: '10px 0' }}>Why You Fail</h2>
          <div className="gap-box">
            <strong>School English:</strong><br /> "Cats are cute animals." <br /> <span style={{ background: '#bbf7d0' }}>Easy. Direct. Boring.</span>
          </div>
          <div style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>VS</div>
          <div className="gap-box gb-utbk">
            <strong>UTBK English:</strong><br /> "Feline domestication paradox..." <br /> <span style={{ background: '#fecaca' }}>Wait, what?</span>
          </div>
          <p style={{ fontSize: '0.9rem' }}>*You need a new brain, not a dictionary.</p>
        </div>

        {/* 3. DIAGNOSTICS */}
        <div className="bento-card area-diag">
          {/* ... diag content ... */}
          <h3 style={{ fontFamily: 'Work Sans', fontSize: '1.5rem', textTransform: 'uppercase', borderBottom: '4px solid black', display: 'inline-block' }}>Are you doomed?</h3>
          <ul className="diag-list">
            <li><span>Panic reading text?</span> <span>[YES]</span></li>
            <li><span>Running out of time?</span> <span>[YES]</span></li>
            <li><span>Picking wrong option?</span> <span>[ALWAYS]</span></li>
          </ul>
        </div>

        {/* --- MODULES AREA --- */}
        <div className="area-mods" id="modules">

          {/* MODULE 1: FLASHLIGHT CARD */}
          <Link
            to="/materi/1"
            className="mod-card mc-1"
            onMouseMove={handleFlashlightMove} // <--- THE FLASHLIGHT TRIGGER
          >
            <span className="mod-num">#001</span>

            <div style={{ zIndex: 2, position: 'relative' }}>
              <h3>CASE FILE: MINDSET</h3>
              <p>
                Subject is hiding the truth. Don't read everything.
                <br /><strong>Mission: Spot the traps.</strong>
              </p>

              <div style={{ marginTop: '15px', display: 'flex', gap: '5px' }}>
                <span className="evidence-tag" style={{
                  background: '#1c1917', color: '#f0e6d2',
                  padding: '2px 6px', fontSize: '0.7rem',
                  fontFamily: 'monospace', fontWeight: 'bold'
                }}>
                  CLASSIFIED
                </span>
                <span className="evidence-tag" style={{
                  border: '1px solid #ef4444', color: '#ef4444',
                  padding: '2px 6px', fontSize: '0.7rem',
                  fontFamily: 'monospace', fontWeight: 'bold',
                  transform: 'rotate(-2deg)'
                }}>
                  EVIDENCE
                </span>
              </div>
            </div>
          </Link>

          {/* --- MODULE 2: ZINE THEME --- */}
          <Link to="/materi/2" className="mod-card mc-2">
            <span className="mod-num">02</span>

            <div style={{ zIndex: 2, position: 'relative', marginTop: '15px' }}>
              <h3>
                VISUAL<br />HACKING
              </h3>
              <p>
                Ransom note tactics for<br />decoding hard vocabulary.
              </p>

              {/* The "Stickers" */}
              <div style={{ marginTop: '20px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                <span style={{
                  background: 'black', color: 'white',
                  padding: '4px 8px', fontSize: '0.8rem',
                  fontFamily: 'Permanent Marker', transform: 'rotate(-3deg)'
                }}>
                  NO_GRAMMAR
                </span>
                <span style={{
                  background: '#00ffff', color: 'black', border: '2px solid black',
                  padding: '4px 8px', fontSize: '0.8rem', fontWeight: 'bold',
                  fontFamily: 'monospace', transform: 'rotate(2deg)'
                }}>
                  GLITCH_MODE
                </span>
              </div>
            </div>
          </Link>

          {/* --- MODULE 3: PHONE UI THEME --- */}
          <Link to="/materi/3" className="mod-card mc-3">
            {/* Background Layer */}
            <div className="mc-3-bg"></div>

            <div className="mc-3-content">
              {/* Screen Top */}
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <h3>LOGIC<br />OS 2.0</h3>
                <p>System Ready.<br />Drill Fallacies.</p>
              </div>

              {/* The Dock */}
              <div className="mc-3-dock">
                <div className="app-icon" title="Logic Gates">P</div>
                <div className="app-icon red" title="False">F</div>
                <div className="app-icon green" title="True">T</div>
              </div>
            </div>
            <span className="mod-num">03</span>
          </Link>

          {/* --- MODULE 4: MESSY/ADHD THEME --- */}

          <Link to="/materi/4" className="mod-card mc-4">
            <span className="mod-num">04</span>

            {/* Floating Post-it */}
            <div className="sticky-note">DONT PANIC!!</div>

            <div style={{ zIndex: 2, position: 'relative', marginTop: '20px' }}>
              <h3>
                <span>TRAP</span><br />
                HUNTER
              </h3>

              <p>
                Wait, is this right?<br />
                Maybe? NO! Focus!
              </p>

              {/* Chaotic Stickers/Doodles */}
              <div style={{ marginTop: '25px', position: 'relative', height: '30px' }}>
                <span style={{
                  position: 'absolute', left: 0,
                  border: '2px solid black', borderRadius: '50%',
                  padding: '5px', fontSize: '1.2rem',
                  transform: 'rotate(-10deg)'
                }}>
                  👀
                </span>
                <span style={{
                  position: 'absolute', right: 0, top: -5,
                  fontFamily: 'Permanent Marker', color: 'red',
                  fontSize: '1.2rem', transform: 'rotate(15deg)'
                }}>
                  X_X
                </span>
                <span style={{
                  position: 'absolute', left: '40%', bottom: 0,
                  fontSize: '0.7rem', fontWeight: 'bold',
                  textDecoration: 'underline'
                }}>
                  (chaos_mode)
                </span>
              </div>
            </div>
          </Link>

          <Link to="/materi/5" className="mod-card mc-5">
            <span className="mod-num">05</span>
            <div style={{ zIndex: 2, position: 'relative' }}>
              <h3>NEURAL DECODER</h3>
              <p>Visualizing logic connections.</p>
              <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                <span style={{ fontSize: '0.6rem', border: '1px solid #3b82f6', color: '#3b82f6', padding: '2px 5px' }}>NET_ANALYSIS</span>
              </div>
            </div>
          </Link>

          <Link to="/materi/6" className="mod-card mc-6">
            <span className="mod-num">06</span>
            <h3>BOSS</h3>
            <p>Final Exam Simulation.</p>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Home;