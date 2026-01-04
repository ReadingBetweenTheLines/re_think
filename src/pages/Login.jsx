import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../utils/firebase';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Data
  const [formData, setFormData] = useState({
    realName: '',
    username: '',
    school: ''
  });

  // Load Scores on Mount & Tab Change
  useEffect(() => {
    const loadScores = async () => {
        setLoading(true);
        const data = await getLeaderboard(activeTab);
        setScores(data.slice(0, 5)); // Top 5 for Lobby
        setLoading(false);
    };
    loadScores();
  }, [activeTab]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Save to LocalStorage
    const profile = {
        ...formData,
        username: formData.username.toUpperCase(),
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('cadetProfile', JSON.stringify(profile));

    // Go to Game
    navigate('/materi/4');
  };

  return (
    <div className="login-wrapper">
        
        {/* LOGIN CARD */}
        <div className="login-card">
            <h1>CADET LOGIN</h1>
            <p>SECURE TERMINAL // AUTHORIZATION REQUIRED</p>

            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label className="login-label">FULL NAME</label>
                    <input 
                        type="text" 
                        id="realName" 
                        className="login-input" 
                        placeholder="e.g. Budi Santoso" 
                        required 
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group">
                    <label className="login-label">CODENAME (Leaderboard Name)</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="login-input" 
                        placeholder="e.g. MAVERICK_01" 
                        maxLength="12" 
                        required 
                        style={{textTransform:'uppercase'}}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group">
                    <label className="login-label">ORIGIN SCHOOL</label>
                    <input 
                        type="text" 
                        id="school" 
                        className="login-input" 
                        placeholder="e.g. SMA N 1 Medan" 
                        required 
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="login-btn">ACCESS SIMULATION &gt;</button>
            </form>
        </div>

        {/* LOBBY LEADERBOARD */}
        <div className="lobby-leaderboard">
            <h3 style={{textAlign:'center', color:'#FFD700', marginTop:0, textShadow:'0 0 10px rgba(255, 215, 0, 0.3)'}}>
                🏆 HALL OF FAME
            </h3>
            
            <div className="tab-container">
                <button className="tab-btn" onClick={() => setActiveTab(1)}>LVL 1</button>
                <button className="tab-btn" onClick={() => setActiveTab(2)}>LVL 2</button>
                <button className="tab-btn" onClick={() => setActiveTab(3)}>BOSS</button>
            </div>

            <table className="lobby-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>CADET</th>
                        <th>SCORE</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan="3" style={{textAlign:'center', color:'#94A3B8'}}>Scanning Database...</td></tr>
                    ) : scores.length === 0 ? (
                        <tr><td colSpan="3" style={{textAlign:'center', color:'#64748B'}}>No Records Found</td></tr>
                    ) : (
                        scores.map((s, index) => (
                            <tr key={index}>
                                <td className={index === 0 ? "top-score" : ""}>
                                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                                </td>
                                <td className={index === 0 ? "top-score" : ""}>
                                    {s.name} <br/>
                                    <span style={{fontSize:'0.6rem', color:'#64748B', fontWeight:'normal'}}>{s.school}</span>
                                </td>
                                <td className={index === 0 ? "top-score" : ""} style={{fontFamily:'monospace'}}>
                                    {s.score}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default Login;