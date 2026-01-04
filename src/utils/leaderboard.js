// ============================================
// FIREBASE LEADERBOARD SYSTEM (REAL-TIME)
// ============================================

// 1. FIREBASE CONFIGURATION & IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyApN_x2Kh3S-iCFR7d1oOhq6sRuSL2TSoE",
  authDomain: "english-raid-db.firebaseapp.com",
  projectId: "english-raid-db",
  storageBucket: "english-raid-db.firebasestorage.app",
  messagingSenderId: "260238909700",
  appId: "1:260238909700:web:e21f62684fbf2d1f33f051",
  measurementId: "G-09T6NKG8HV"
};

// Initialize Connection
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Global Variables
let currentPlayerName = "UNKNOWN";
let currentSchool = "Unknown";
let activeLevel = 1;
let playerScore = 0;

// 2. AUTO-LOGIN
(function initSystem() {
    if (!window.location.pathname.includes("login.html")) {
        const rawData = localStorage.getItem('cadetProfile');
        if (!rawData) {
            window.location.href = 'login.html';
        } else {
            const profile = JSON.parse(rawData);
            currentPlayerName = profile.username;
            currentSchool = profile.school;
            if (profile.selectedDifficulty) {
                console.log(">> AUTO-STARTING LEVEL: ", profile.selectedDifficulty);
                setTimeout(() => {
                    if(typeof selectLevel === 'function') {
                        selectLevel(profile.selectedDifficulty);
                    }
                }, 500);
            }
            
            // Load High Scores immediately
            fetchFirebaseScores();
        }
    }
})();

// 3. FETCH SCORES FROM CLOUD
async function fetchFirebaseScores() {
    console.log(">> CONNECTING TO FIREBASE...");
    
    // Set UI to loading
    [1, 2, 3].forEach(lvl => {
        const el = document.getElementById(`hs-${lvl}`);
        if(el) el.innerText = "...";
    });

    try {
        // We fetch ALL scores and filter locally (Simpler for this setup)
        // Or you can make separate queries per level. Let's do a simple grab.
        const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(50));
        const querySnapshot = await getDocs(q);
        
        const allScores = [];
        querySnapshot.forEach((doc) => {
            allScores.push(doc.data());
        });

        // Store globally
        window.cachedScores = allScores;
        updateLobbyScores();
        console.log(">> FIREBASE SYNCED.");

    } catch (e) {
        console.error("Error connecting:", e);
    }
}

function updateLobbyScores() {
    if(!window.cachedScores) return;
    
    [1, 2, 3].forEach(lvl => {
        const levelScores = window.cachedScores.filter(s => s.level == lvl);
        const best = levelScores.length > 0 ? levelScores[0].score : "---";
        const el = document.getElementById(`hs-${lvl}`);
        if(el) el.innerText = best;
    });
}

// 4. GAME FUNCTIONS
window.selectLevel = function(lvlIndex) {
    activeLevel = lvlIndex;
    document.getElementById('introScreen').style.display = 'none';
    if(typeof startBattle === 'function') startBattle(lvlIndex);
}

window.addScore = function(amount) {
    playerScore += amount;
}

// 5. UPLOAD SCORE
window.finishGameAndSave = async function(remainingHP, maxHP) {
    let hpBonus = maxHP > 0 ? Math.floor((remainingHP / maxHP) * 1000) : 0;
    playerScore += hpBonus;

    // Show Uploading UI
    const lbScreen = document.getElementById('leaderboardScreen');
    const gameScreen = document.getElementById('battleScreen');
    if (gameScreen) gameScreen.style.display = 'none';
    if (lbScreen) lbScreen.style.display = 'flex';
    document.getElementById('finalScoreDisplay').innerText = "SAVING TO DATABASE...";

    try {
        // WRITE TO FIREBASE
        await addDoc(collection(db, "scores"), {
            name: currentPlayerName,
            school: currentSchool,
            score: playerScore,
            level: activeLevel,
            date: new Date().toISOString()
        });

        console.log(">> SCORE SAVED.");
        
        // Refresh the board
        await fetchFirebaseScores();
        showLeaderboard(activeLevel, playerScore);

    } catch (e) {
        console.error("Error adding document: ", e);
        document.getElementById('finalScoreDisplay').innerText = "ERROR SAVING SCORE";
    }
}

// 6. RENDER BOARD
window.showLeaderboard = function(filterLevel, finalScore) {
    let rankLabel = "UNKNOWN";
    if(filterLevel == 1) rankLabel = "B2(Medium)";
    if(filterLevel == 2) rankLabel = "C1 (hard)";
    if(filterLevel == 3) rankLabel = "C2 (Boss)";
    document.getElementById('finalScoreDisplay').innerText = `LEVEL ${filterLevel} SCORE: ${finalScore || playerScore}`;
    
    // Filter cached scores
    const scores = window.cachedScores || [];
    let levelScores = scores.filter(s => s.level == filterLevel);
    
    // Sort
    levelScores.sort((a, b) => b.score - a.score);
    levelScores = levelScores.slice(0, 10);

    const list = document.getElementById('highScoreList');
    list.innerHTML = ""; 

    levelScores.forEach((s, index) => {
        let badge = "B2";
        if(s.level == 2) badge = "C1";
        if(s.level == 3) badge = "C2";

        list.innerHTML += `
        <tr>
            <td>#${index + 1}</td>
            <td>
                <div style="font-weight:bold; color:white;">${s.name}</div>
                <div style="font-size:0.7rem; color:#64748B;">${s.school}</div>
            </td>
            <td style="font-family:'Courier New'; color:var(--gold);">${s.score}</td>
        </tr>`;
    });
}

window.viewGlobalLeaderboard = function() {
    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('leaderboardScreen').style.display = 'flex';
    if(!window.cachedScores) fetchFirebaseScores();
    showLeaderboard(1, "---");
}

// ============================================
// 7. NAVIGATION LOGIC (Back to Menu)
// ============================================

window.returnToMenu = function() {
    console.log(">> RETURNING TO BASE...");

    // 1. Hide Leaderboard
    document.getElementById('leaderboardScreen').style.display = 'none';

    // 2. Show Intro/Menu Screen
    // (Ensure your menu div ID matches this. Usually it is 'introScreen')
    const menu = document.getElementById('introScreen');
    if(menu) {
        menu.style.display = 'flex'; // or 'block' depending on your CSS
    }

    // 3. RESET PLAYER STATS
    // We must reset these so the next run starts fresh
    playerScore = 0; 
    
    // Optional: If you want to force them to select difficulty again, 
    // you don't need to do anything else. The buttons on introScreen do the work.
}