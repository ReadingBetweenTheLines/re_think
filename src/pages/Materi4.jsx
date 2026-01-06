import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import './Materi4.css'; // Make sure your CSS file is named this

// --- PART 1: DATA CONSTANTS ---

const academyData = {
    'impostor': {
        title: "THE IMPOSTOR TRAP",
        content: `
            <div class="theory-block">
                <h3>1. The Psychology</h3>
                <p class="theory-text">
                    Otakmu suka mencocokkan pola. Kalau lihat kalimat yang <span class="highlight-term">SAMA PERSIS</span> di teks dan jawaban, otakmu teriak "INI DIA!". Pembuat soal tahu ini. Mereka kasih fakta yang benar, tapi untuk pertanyaan yang salah.
                </p>
            </div>

            <div class="rationale-box">
                <span class="rationale-title">THE SNBT RATIONALE (KENAPA DIUJIKAN?)</span>
                <p class="theory-text" style="color:black;">
                    <strong>Ujian: PRECISION (Ketelitian).</strong><br>
                    Di dunia kuliah, Anda harus bisa membedakan antara "Penyebab Masalah" dan "Dampak Masalah". Siswa yang hanya "Scanning" tanpa "Comprehending" akan gagal di sini.
                </p>
            </div>

            <div class="theory-block" style="margin-top:30px;">
                <h3>2. Case Study: Bedah Kasus</h3>
                <div class="example-container">
                    <span class="example-label">TEXT FRAGMENT</span>
                    <div class="example-text">"High inflation reduces purchasing power (Effect). To combat this, the central bank raised interest rates (Action)."</div>
                    <div class="example-question">Question: What was the central bank's <span class="q-focus">ACTION</span>?</div>
                </div>
                <div class="comp-grid">
                    <div class="comp-box comp-bad">
                        <span class="comp-header" style="color:var(--neon-red)">❌ TRAP (IMPOSTOR)</span>
                        "Inflation reduced purchasing power."<br><br>
                        <em>Why:</em> Fakta benar, tapi ini EFEK, bukan AKSI.
                    </div>
                    <div class="comp-box comp-good">
                        <span class="comp-header" style="color:var(--neon-green)">✅ CORRECT</span>
                        "They increased interest rates."<br><br>
                        <em>Why:</em> Menjawab kategori 'Action'.
                    </div>
                </div>
            </div>
        `
    },
    'scope': {
        title: "THE OVERSHOOT (COMPARISON TRAP)",
        content: `
            <div class="theory-block">
                <h3>1. The Logic: Pedestals vs. Podium</h3>
                <p class="theory-text">
                    Otak manusia suka membuat "Ranking". Tapi di UTBK, ini berbahaya.
                    <br><br>
                    <strong>Konsep:</strong> Bayangkan Teks menaruh Subjek A dan Subjek B di atas <strong>Dua Pedestal Terpisah</strong> (berdiri sendiri-sendiri).
                    <br>
                    <strong>Jebakan:</strong> Opsi jawaban memaksamu membangun <strong>Podium Juara</strong> (Siapa Juara 1, Siapa Juara 2).
                    <br><br>
                    <span class="highlight-term">RULE:</span> Jangan bangun podium kalau penulis cuma bangun pedestal.
                </p>
            </div>

            <div class="theory-block" style="margin-top:30px;">
                <h3>2. The 3 Variations</h3>
                <div style="font-family:'JetBrains Mono'; font-size:0.9rem; background:#111; padding:15px; border:1px solid #333;">
                    <div style="margin-bottom:10px;">
                        <span style="color:var(--pop-pink)">1. THE GHOST (Hantu)</span><br>
                        Teks: "A cepat. B juga cepat."<br>
                        Trap: "A lebih cepat dari B." (No bridge = False).
                    </div>
                    <div style="margin-bottom:10px;">
                        <span style="color:var(--pop-pink)">2. THE TIME (Waktu)</span><br>
                        Teks: "A terjadi, lalu B terjadi."<br>
                        Trap: "B lebih penting dari A." (Later ≠ Better).
                    </div>
                    <div>
                        <span style="color:var(--pop-pink)">3. THE QUANTITY (Jumlah)</span><br>
                        Teks: "500 remaja disurvei. Dewasa juga disurvei."<br>
                        Trap: "Lebih banyak remaja daripada dewasa." (You cannot compare Number to Null).
                    </div>
                </div>
            </div>

            <div class="rationale-box">
                <span class="rationale-title">THE DEFENSE STRATEGY</span>
                <p class="theory-text" style="color:black;">
                    <strong>Cari "Jembatan" (The Bridge).</strong><br>
                    Waspada kata: <span class="highlight-bad">MORE, LESS, SURPASS, PREFER</span>.
                    <br><br>
                    Cek teksnya: Apakah ada kata penghubung seperti <em>"Unlike", "Whereas", "Outperform"</em>?
                    <br>
                    Jika Subjek A dan B dipisah titik (.) atau titik koma (;) tanpa kata pembanding, maka perbandingan itu <strong>HALUSINASI</strong>.
                </p>
            </div>
        `
    },
    'logic': {
        title: "THE FALSE LINK (Logic)",
        content: `
            <div class="theory-block">
                <h3>1. The Logic: Neighbors vs. Family</h3>
                <p class="theory-text">
                    Otak manusia adalah "Mesin Pembuat Cerita". Jika kita melihat dua hal terjadi berurutan, otak kita otomatis ingin menghubungkannya.
                    <br><br>
                    <strong>Konsep Utama:</strong> <span class="highlight-term">Correlation ≠ Causation</span>.
                    <br>
                    Hanya karena B terjadi <em>setelah</em> A (Chronology), bukan berarti A <em>menyebabkan</em> B (Causality). Mereka mungkin hanya "tetangga" yang muncul bersamaan, bukan "keluarga" yang saling mempengaruhi.
                </p>
            </div>

            <div class="rationale-box">
                <span class="rationale-title">THE SNBT RATIONALE</span>
                <p class="theory-text" style="color:black;">
                    <strong>Ujian: LOGICAL RIGOR (Ketajaman Logika).</strong><br>
                    Salah satu kesalahan terbesar dalam berpikir kritis adalah <em>Hasty Generalization</em> (Menyimpulkan terlalu cepat). 
                    <br><br>
                    Di dunia akademik, menghubungkan dua data tanpa bukti nyata adalah fatal. Pembuat soal menguji: Apakah kamu membaca apa yang <em>tertulis</em> (Data), atau kamu sedang <em>berhalusinasi</em> mengarang hubungan sebab-akibat sendiri?
                </p>
            </div>

            <div class="theory-block" style="margin-top:30px;">
                <h3>2. Case Study: Bedah Kasus</h3>
                <div class="example-container">
                    <span class="example-label">TEXT FRAGMENT</span>
                    <div class="example-text">"The library introduced longer opening hours in September. By December, student stress levels were reported to be at an all-time high."</div>
                    <div class="example-question">Question: What does the text indicate about the library hours?</div>
                </div>
                <div class="comp-grid">
                    <div class="comp-box comp-bad">
                        <span class="comp-header" style="color:var(--neon-red)">❌ TRAP (FALSE CAUSE)</span>
                        "Longer library hours <strong>led to</strong> higher stress."<br><br>
                        <em>Why:</em> Salah! Teks tidak pernah bilang jam buka <em>menyebabkan</em> stres. Mungkin Desember stres karena musim ujian akhir, bukan karena perpustakaan!
                    </div>
                    <div class="comp-box comp-good">
                        <span class="comp-header" style="color:var(--neon-green)">✅ CORRECT</span>
                        "Stress levels peaked <strong>during the period</strong> of extended hours."<br><br>
                        <em>Why:</em> Aman. Ini fakta 100%. Stress terjadi <em>bersamaan</em> (Timeline/Korelasi) tanpa menuduh siapa penyebabnya.
                    </div>
                </div>
            </div>

            <div class="rationale-box" style="background:black; color:white; border-color:var(--neon-green);">
                <span class="rationale-title" style="color:var(--neon-green); border-color:var(--neon-green);">THE DEFENSE STRATEGY</span>
                <p class="theory-text">
                    <strong>Golden Rule:</strong> Jangan pilih kata kerja aktif seperti <em>"Caused", "Resulted in", "Triggered"</em> KECUALI teksnya secara eksplisit menggunakan kata hubung sebab-akibat (<em>Because, Due to, Consequently</em>).
                    <br><br>
                    Jika tidak ada kata hubung itu, pilih jawaban yang "pasif" atau hanya menjelaskan waktu: <span class="highlight-term">Followed by</span>, <span class="highlight-term">Occurred after</span>, <span class="highlight-term">Associated with</span>.
                </p>
            </div>
        `
    },
    'nuance': {
        title: "THE NUANCE TRAP",
        content: `
            <div class="theory-block">
                <h3>1. The Invisible Error</h3>
                <p class="theory-text">
                    Ini adalah jebakan paling halus. Kalimatnya terlihat benar secara fakta, tapi salah secara <span class="highlight-term">RASA</span> atau <span class="highlight-term">URUTAN</span>.
                    <br><br>
                    Musuh utamamu adalah:
                    <br>• <strong>Tone:</strong> "Kecewa" (Moderate) vs "Gagal Total" (Extreme).
                    <br>• <strong>Comparison:</strong> "A & B Populer" vs "A lebih populer dari B".
                </p>
            </div>

            <div class="rationale-box">
                <span class="rationale-title">THE SNBT RATIONALE</span>
                <p class="theory-text" style="color:black;">
                    <strong>Ujian: PRECISION & BIAS DETECTION.</strong><br>
                    Di dunia akademik, Anda tidak boleh melebih-lebihkan data. Mengatakan "Penelitian ini gagal" padahal hasilnya hanya "kurang memuaskan" adalah kesalahan fatal dalam penulisan ilmiah.
                </p>
            </div>

            <div class="theory-block" style="margin-top:30px;">
                <h3>2. Case Study: Bedah Kasus</h3>
                <div class="example-container">
                    <span class="example-label">TEXT FRAGMENT</span>
                    <div class="example-text">"Coffee is widely consumed for energy. Tea is also popular for its calming effects."</div>
                    <div class="example-question">Question: What does the text imply?</div>
                </div>
                <div class="comp-grid">
                    <div class="comp-box comp-bad">
                        <span class="comp-header" style="color:var(--neon-red)">❌ TRAP (COMPARATOR)</span>
                        "Coffee is <strong>more popular</strong> than tea."<br><br>
                        <em>Why:</em> Teks menyebut keduanya populer, tapi TIDAK PERNAH membandingkan siapa yang lebih unggul.
                    </div>
                    <div class="comp-box comp-good">
                        <span class="comp-header" style="color:var(--neon-green)">✅ CORRECT</span>
                        "Both beverages are consumed for different reasons."<br><br>
                        <em>Why:</em> Aman. Merangkum fakta tanpa menambah asumsi perbandingan.
                    </div>
                </div>
            </div>
        `
    },
    'mirage': {
        title: "THE MIRAGE (WORD SALAD)",
        content: `
            <div class="theory-block">
                <h3>1. The Trap: Length ≠ Truth</h3>
                <p class="theory-text">
                    Siswa sering diajarkan: <em>"Kalau bingung, pilih jawaban paling panjang."</em>
                    <br><br>
                    Pembuat soal (BP3) tahu ini. Mereka menggunakan taktik balasan bernama <span class="highlight-term">WORD SALAD</span>: Opsi yang sangat panjang, terdengar canggih dan ilmiah, tapi sebenarnya <strong>omong kosong</strong> atau tidak relevan dengan teks.
                </p>
            </div>

            <div class="rationale-box">
                <span class="rationale-title">THE DEFENSE STRATEGY</span>
                <p class="theory-text" style="color:black;">
                    <strong>Jangan cari Panjangnya, cari "Qualifiers"-nya.</strong><br>
                    Jawaban panjang yang BENAR biasanya panjang karena penuh dengan kata "pengaman" (hedging). Jawaban panjang yang SALAH biasanya panjang karena penuh istilah teknis (jargon) yang dipaksakan.
                </p>
            </div>

            <div class="theory-block" style="margin-top:30px;">
                <h3>2. Visualizer: Red vs Green Light</h3>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-family:'JetBrains Mono'; font-size:0.9rem;">
                    <div style="background:#450a0a; padding:15px; border:1px dashed var(--neon-red);">
                        <div style="color:var(--neon-red); font-weight:bold; margin-bottom:10px;">🔴 RED LIGHT (TRAP)</div>
                        • Absolutes: <span class="rl-danger">Always, Never, Must</span><br>
                        • Superlatives: <span class="rl-danger">Undeniably, Irrefutable</span><br>
                        • Fake Jargon: <span class="rl-danger">Paradigm, Quantifiable Metric</span>
                    </div>
                    <div style="background:#064e3b; padding:15px; border:1px dashed var(--neon-green);">
                        <div style="color:var(--neon-green); font-weight:bold; margin-bottom:10px;">🟢 GREEN LIGHT (SAFE)</div>
                        • Hedging: <span class="rl-safe">Likely, May, Can</span><br>
                        • Quantity: <span class="rl-safe">Some, Many, Often</span><br>
                        • Softeners: <span class="rl-safe">Evidence suggests, Tends to</span>
                    </div>
                </div>
            </div>
        `
    },
    'distortion': {
        title: "THE EXTREMIST (ABSOLUTES)",
        content: `
            <div class="theory-block">
                <h3>1. The Absolutes</h3>
                <p class="theory-text">
                    Dunia akademis jarang menggunakan kata "Selalu" (Always) atau "Tidak Pernah" (Never). 
                    Jika opsi jawaban menggunakan kata-kata ekstrim ini, 90% kemungkinan itu <span class="highlight-bad">SALAH</span>.
                    <br><br>
                    Musuh utamamu adalah kata-kata yang <strong>menutup kemungkinan lain</strong> (Totalitas).
                </p>
            </div>

            <div class="rationale-box">
                <span class="rationale-title">THE SNBT RATIONALE</span>
                <p class="theory-text" style="color:black;">
                    <strong>Ujian: SCIENTIFIC ACCURACY (Akurasi Ilmiah).</strong><br>
                    Di dunia kuliah, mengklaim "Semua" (All) padahal data hanya menunjukkan "Sebagian Besar" (Most) dianggap sebagai <strong>kebohongan data</strong>.
                    <br><br>
                    Penguji ingin melihat apakah kamu cukup jeli untuk membedakan antara <em>Fakta</em> dan <em>Generalisasi Berlebihan</em>.
                </p>
            </div>

            <div class="theory-block" style="margin-top:30px;">
                <h3>2. Case Study: Bedah Kasus</h3>
                <div class="example-container">
                    <span class="example-label">TEXT FRAGMENT</span>
                    <div class="example-text">"Preliminary studies <span class="highlight-term">suggest</span> that the new vaccine is effective in <span class="highlight-term">most</span> test subjects."</div>
                    <div class="example-question">Question: What does the text indicate about the vaccine?</div>
                </div>
                <div class="comp-grid">
                    <div class="comp-box comp-bad">
                        <span class="comp-header" style="color:var(--neon-red)">❌ TRAP (EXTREMIST)</span>
                        "It is effective for <strong>everyone</strong>."<br><br>
                        <em>Why:</em> Kata 'Most' (Sebagian besar) ≠ 'Everyone' (Semua). Ini mengubah makna teks secara fatal.
                    </div>
                    <div class="comp-box comp-good">
                        <span class="comp-header" style="color:var(--neon-green)">✅ CORRECT</span>
                        "It shows <strong>positive results</strong> in many cases."<br><br>
                        <em>Why:</em> Aman. Menggunakan bahasa yang "sopan" (positive results) yang selaras dengan 'suggest' dan 'most'.
                    </div>
                </div>
            </div>

            <div class="rationale-box" style="background:black; color:white; border-color:var(--neon-green);">
                <span class="rationale-title" style="color:var(--neon-green); border-color:var(--neon-green);">THE DEFENSE STRATEGY</span>
                <p class="theory-text">
                    <strong>Beware of (RED FLAGS):</strong><br> 
                    <span class="highlight-bad">Always</span>, <span class="highlight-bad">Never</span>, <span class="highlight-bad">Must</span>, <span class="highlight-bad">Undeniably</span>, <span class="highlight-bad">All</span>, <span class="highlight-bad">Solely</span>.
                    <br><br>
                    <strong>Look for (GREEN FLAGS):</strong><br> 
                    Often, Rarely, Can, Suggests, Likely, Many, Primarily.
                </p>
            </div>
        `
    },
};

const lexiconData = {
    'scope': [
        { word: "All / Every", type: "TRAP (Red)", class: "lex-bad", impact: "Absolute quantity. In academic texts, 100% statements are rare and usually false." },
        { word: "Some / Several", type: "SAFE (Green)", class: "lex-good", impact: "Hedged quantity. 'Some' means >0%. It is very hard to prove wrong." },
        { word: "The Majority", type: "TRAP (Yellow)", class: "lex-warn", impact: "Means >50%. If the text says 'Many', choosing 'Majority' is a Ladder Climbing error." },
        { word: "Only", type: "TRAP (Red)", class: "lex-bad", impact: "Exclusionary. Trap unless the text explicitly says 'solely' or 'exclusively'." }
    ],
    'logic': [
        { word: "Caused / Led to", type: "TRAP (Red)", class: "lex-bad", impact: "Causality. Trap if the text only shows Correlation (timeline/sequence)." },
        { word: "Associated with", type: "SAFE (Green)", class: "lex-good", impact: "Correlation. A safe, scientific way to describe two things happening together." },
        { word: "After / Following", type: "SAFE (Green)", class: "lex-good", impact: "Chronology. It states the timeline without assuming a cause-and-effect relationship." }
    ],
    'distortion': [
        { word: "Undeniably / Must", type: "TRAP (Red)", class: "lex-bad", impact: "Extreme tone. Valid scientific texts rarely deal in absolutes." },
        { word: "Suggests / Indicates", type: "SAFE (Green)", class: "lex-good", impact: "Academic hedging. The author is being careful not to overclaim." },
        { word: "Prove", type: "TRAP (Yellow)", class: "lex-warn", impact: "Too strong. Studies usually 'suggest' or 'show', they rarely 'prove' definitively." }
    ],
    'nuance': [
        { word: "Better / Worse", type: "TRAP (Red)", class: "lex-bad", impact: "Value judgment. Trap if the text only lists items side-by-side (Pedestals)." },
        { word: "Whereas / While", type: "SAFE (Green)", class: "lex-good", impact: "Bridge words. These validate a comparison between two subjects." },
        { word: "Primarily", type: "SAFE (Green)", class: "lex-good", impact: "Focus. Allows for other minor reasons to exist, unlike 'Solely'." }
    ]
};

const drills = {
    'impostor': [
        {
            text: "In the last decade, the global automotive industry has <span class='vocab' data-def='Beralih arah (secara tajam)'>pivoted</span> aggressively toward <span class='vocab' data-def='Keberlanjutan (Kelestarian)'>sustainability</span>, with electric vehicles (EVs) leading the charge. While these vehicles are frequently <span class='vocab' data-def='Dipuji'>praised</span> by environmentalists for their zero tailpipe emissions, a more <span class='vocab' data-def='Bernuansa (Mendalam/Detail)'>nuanced</span> analysis reveals a complex picture. Their production process—specifically the mining of lithium and cobalt for batteries—creates <span class='vocab' data-def='Signifikan (Besar/Penting)'>significant</span> environmental waste and water pollution in developing nations. Despite these manufacturing <span class='vocab' data-def='Kekurangan/Sisi negatif'>drawbacks</span>, the primary reason governments continue to heavily <span class='vocab' data-def='Memberikan subsidi'>subsidize</span> the EV industry is not merely ecological, but <span class='vocab' data-def='Geopolitik (Hubungan politik antar negara)'>geopolitical</span>: to reduce long-term <span class='vocab' data-def='Ketergantungan'>dependence</span> on imported fossil fuels, which are often subject to <span class='vocab' data-def='Tidak stabil/Mudah berubah'>volatile</span> market prices.",
            question: "What is the primary <span class='q-focus'>REASON</span> for government subsidies?",
            options: [
                { text: "Production creates environmental waste.", type: "trap", hint: "TRAP (Impostor): True fact mentioned in the text, but this is a NEGATIVE side effect, not the reason for the subsidy." },
                {
                    text: "To reduce dependence on fossil fuels.",
                    type: "correct",
                    evidence: "primary reason... is... to reduce long-term dependence",
                    hint: "CORRECT: Matches the specific motivation mentioned in the final sentence.",
                    map: [["primary reason... is", "REASON (Question)"], ["reduce... dependence", "reduce dependence (Answer)"]]
                },
                { text: "They have zero tailpipe emissions.", type: "trap", hint: "TRAP (Partial): True, but the text frames this as why they are 'praised', not the specific reason for government funding." },
                { text: "Lithium mining is profitable.", type: "trap", hint: "TRAP (Not Mentioned): The text discusses the *pollution* from mining, not the profit." }
            ]
        },
        {
            text: "Since the discovery of penicillin in 1928, antibiotics have <span class='vocab' data-def='Merevolusi (Mengubah total)'>revolutionized</span> modern medicine, turning once-fatal illnesses into manageable conditions. These powerful drugs work by killing bacteria or <span class='vocab' data-def='Menghambat/Mencegah'>inhibiting</span> their growth <span class='vocab' data-def='Mekanisme/Cara kerja'>mechanisms</span>. However, the World Health Organization has declared a global crisis due to <span class='vocab' data-def='Penyalahgunaan'>misuse</span>. While life-saving for conditions like pneumonia, overuse and incorrect dosage can lead to antibiotic <span class='vocab' data-def='Resistensi/Kekebalan'>resistance</span>, creating 'superbugs' that are harder to kill. Consequently, responsible physicians now <span class='vocab' data-def='Meresepkan (Obat)'>prescribe</span> them specifically to treat <span class='vocab' data-def='Terkonfirmasi'>confirmed</span> bacterial infections, strictly avoiding their use for <span class='vocab' data-def='Disebabkan oleh virus'>viral</span> illnesses like the common cold or flu.",
            question: "What is a negative <span class='q-focus'>CONSEQUENCE</span> of using antibiotics?",
            options: [
                { text: "They kill bacteria or inhibit growth.", type: "trap", hint: "TRAP (Impostor): This is the *Mechanism* (How it works), not a negative consequence." },
                {
                    text: "They lead to antibiotic resistance.",
                    type: "correct",
                    evidence: "overuse... can lead to antibiotic resistance",
                    hint: "CORRECT: This is the specific negative outcome of misuse mentioned.",
                    map: [["can lead to", "CONSEQUENCE (Result)"], ["antibiotic resistance", "antibiotic resistance"]]
                },
                { text: "They are prescribed for viral infections.", type: "trap", hint: "TRAP (False Info): The text explicitly says physicians 'strictly avoid' using them for viral illnesses." },
                { text: "They cure pneumonia.", type: "trap", hint: "TRAP (Impostor): This is a benefit, not a negative consequence." }
            ]
        },
        {
            text: "The Great Barrier Reef, visible from outer space, is the world's largest coral reef system and a <span class='vocab' data-def='Kritis/Sangat Penting'>critical</span> <span class='vocab' data-def='Indikator/Penanda'>indicator</span> of ocean health. In recent years, scientists have sounded the alarm as rising ocean temperatures have caused mass coral <span class='vocab' data-def='Pemutihan'>bleaching</span> events, a stress response where corals <span class='vocab' data-def='Mengeluarkan/Membuang'>expel</span> the algae living in their tissues, turning them ghastly white. Despite this <span class='vocab' data-def='Degradasi/Penurunan kualitas'>degradation</span>, the reef remains a massive economic engine. Local tourism operators tend to focus their marketing on the reef's remaining <span class='vocab' data-def='Keanekaragaman hayati'>biodiversity</span> to attract visitors, frequently highlighting the thousands of <span class='vocab' data-def='Tangguh/Kuat'>resilient</span> fish species that still <span class='vocab' data-def='Tumbuh subur'>thrive</span> in the <span class='vocab' data-def='Ekosistem'>ecosystem</span>.",
            question: "What does the text identify as the <span class='q-focus'>CAUSE</span> of coral bleaching?",
            options: [
                { text: "The focus on biodiversity.", type: "trap", hint: "TRAP (Impostor): This is the focus of *marketing*, not the cause of bleaching." },
                {
                    text: "Rising ocean temperatures.",
                    type: "correct",
                    evidence: "rising ocean temperatures have caused mass coral bleaching",
                    hint: "CORRECT: Direct cause-and-effect stated in the text.",
                    map: [["have caused", "CAUSE (Question)"], ["Rising ocean temperatures", "Rising ocean temperatures"]]
                },
                { text: "Tourism operators attracting visitors.", type: "trap", hint: "TRAP (Association): Tourism happens *at* the reef, but the text doesn't say it causes the bleaching." },
                { text: "The loss of fish species.", type: "trap", hint: "TRAP (False Effect): The text actually claims fish species 'still thrive'." }
            ]
        },
        {
            text: "In the digital attention economy, user data is the most valuable <span class='vocab' data-def='Komoditas (Barang dagang)'>commodity</span>. Social media platforms utilize <span class='vocab' data-def='Canggih/Rumit'>sophisticated</span> <span class='vocab' data-def='Algoritma'>algorithms</span> that are specifically designed to maximize user <span class='vocab' data-def='Keterlibatan'>engagement</span> by <span class='vocab' data-def='Mengurasi (Memilih konten)'>curating</span> feeds that keep eyes on the screen for as long as possible. This is often achieved by <span class='vocab' data-def='Memprioritaskan'>prioritizing</span> content that triggers strong emotional reactions, such as outrage or shock. While this strategy successfully increases advertising revenue for tech giants, <span class='vocab' data-def='Sosiolog (Ahli masyarakat)'>sociologists</span> and psychologists warn that it has a dangerous side effect: it results in increased <span class='vocab' data-def='Kemasyarakatan'>societal</span> <span class='vocab' data-def='Polarisasi (Perpecahan kubu)'>polarization</span> and heightened anxiety levels among younger users.",
            question: "What is the <span class='q-focus'>GOAL</span> of the algorithms?",
            options: [
                { text: "To increase polarization and anxiety.", type: "trap", hint: "TRAP (Impostor): This is the negative RESULT (Side Effect), not the designed GOAL." },
                {
                    text: "To maximize user engagement.",
                    type: "correct",
                    evidence: "algorithms... designed to maximize user engagement",
                    hint: "CORRECT: Matches the 'Goal/Design' asked in the question.",
                    map: [["designed to", "GOAL (Purpose)"], ["maximize user engagement", "maximize user engagement"]]
                },
                { text: "To warn psychologists.", type: "trap", hint: "TRAP (Word Match): Psychologists give the warning, they are not the target of the algorithm." },
                { text: "To trigger strong emotions.", type: "trap", hint: "TRAP (Mechanism): Triggering emotions is the *method* used, but the ultimate *goal* is engagement/revenue." }
            ]
        },
        {
            text: "Following the global pandemic, the structure of the corporate workplace changed correctly. Remote work has shifted from a rare perk to a standard expectation in many tech companies. For employees, this shift offers <span class='vocab' data-def='Tak tertandingi'>unparalleled</span> flexibility and completely eliminates the daily <span class='vocab' data-def='Perjalanan kerja (PP)'>commute</span>, saving both time and money. However, the <span class='vocab' data-def='Transisi/Peralihan'>transition</span> has not been <span class='vocab' data-def='Mulus/Tanpa hambatan'>seamless</span> for leadership. Senior managers frequently report that the main challenge of this new model is maintaining team <span class='vocab' data-def='Kekompakan'>cohesion</span> and corporate culture when staff members rarely <span class='vocab' data-def='Berinteraksi'>interact</span> physically.",
            question: "What is the primary <span class='q-focus'>CHALLENGE</span> mentioned?",
            options: [
                { text: "Eliminating commute time.", type: "trap", hint: "TRAP (Impostor): This is a BENEFIT for employees, not a challenge." },
                {
                    text: "Maintaining team cohesion.",
                    type: "correct",
                    evidence: "main challenge... is maintaining team cohesion",
                    hint: "CORRECT: Explicitly labeled as 'main challenge'.",
                    map: [["main challenge... is", "CHALLENGE (Question)"], ["maintaining team cohesion", "maintaining team cohesion"]]
                },
                { text: "Offering flexibility.", type: "trap", hint: "TRAP (Impostor): This is a positive aspect mentioned earlier." },
                { text: "Low internet speeds.", type: "trap", hint: "TRAP (Real World): A common real-life problem, but NOT mentioned in this specific text." }
            ]
        }
    ],
    'nuance': [
        {
            text: "The rivalry between Nikola Tesla and Thomas Edison is legendary. Tesla, a <span class='vocab' data-def='Visioner (Punya pandangan masa depan)'>visionary</span> idealist, championed Alternating Current (AC) for its efficiency over long distances. Edison, a <span class='vocab' data-def='Pragmatis (Praktis/Realistis)'>pragmatic</span> businessman, fiercely defended his Direct Current (DC) system. While history notes that AC eventually became the global standard for power transmission, Edison's <span class='vocab' data-def='Ketajaman bisnis'>commercial acumen</span> allowed him to build a financial empire that Tesla never achieved.",
            question: "What does the text imply about the <span class='q-focus'>INVENTORS</span>?",
            options: [
                { 
                    text: "Tesla was a better inventor than Edison.", 
                    type: "trap", 
                    hint: "TRAP (The Comparator): The text says Tesla was 'visionary' and Edison was 'pragmatic'. It lists their strengths side-by-side but never states who was 'better' overall." 
                },
                { 
                    text: "Edison failed because AC became the standard.", 
                    type: "trap", 
                    hint: "TRAP (The Extremist): The text says Edison built a 'financial empire'. Losing one battle (AC vs DC) does not mean he 'failed' entirely." 
                },
                { 
                    text: "They approached innovation with different priorities.", 
                    type: "correct", 
                    evidence: "Tesla, a visionary idealist... Edison, a pragmatic businessman", 
                    hint: "CORRECT: Summarizes the contrast (Idealist vs. Businessman) without declaring a winner.", 
                    map: [["idealist... businessman", "different priorities"], ["championed... defended", "approached innovation"]]
                },
                { 
                    text: "Tesla lacked the intelligence to build a company.", 
                    type: "trap", 
                    hint: "TRAP (The Insult): The text says he didn't achieve a 'financial empire', but it doesn't say he lacked 'intelligence'." 
                }
            ]
        },
        {
            text: "Critics gave the new sci-fi blockbuster <span class='vocab' data-def='Beragam (Ada bagus, ada buruk)'>mixed</span> reviews. The visual effects were universally <span class='vocab' data-def='Disambut/Dipuji'>hailed</span> as groundbreaking, creating an immersive world never seen before. However, the narrative was frequently criticized as <span class='vocab' data-def='Dangkal (Tidak mendalam)'>shallow</span> and <span class='vocab' data-def='Tiruan (Tidak orisinal)'>derivative</span>, relying heavily on tired <span class='vocab' data-def='Klise (Ide pasaran)'>clichés</span> rather than character development.",
            question: "What is the author's <span class='q-focus'>EVALUATION</span> of the film?",
            options: [
                { 
                    text: "It was a cinematic masterpiece.", 
                    type: "trap", 
                    hint: "TRAP (The Amplifier): Too positive. This ignores the criticism about the 'shallow' narrative." 
                },
                { 
                    text: "It had aesthetic strengths but storytelling weaknesses.", 
                    type: "correct", 
                    evidence: "visual effects were... groundbreaking... However, the narrative was... shallow", 
                    hint: "CORRECT: Perfectly captures the 'mixed' nature of the review (Good Visuals + Bad Story).", 
                    map: [["visual effects... groundbreaking", "aesthetic strengths"], ["narrative... shallow", "storytelling weaknesses"]]
                },
                { 
                    text: "The movie was a complete failure.", 
                    type: "trap", 
                    hint: "TRAP (The Amplifier): Too negative. It ignores the praise for the 'visual effects'." 
                },
                { 
                    text: "The visuals were worse than the story.", 
                    type: "trap", 
                    hint: "TRAP (Reverse Comparison): The text says visuals were 'groundbreaking' (Good) and story was 'shallow' (Bad). This option flips them." 
                }
            ]
        },
        {
            text: "In the 19th century, the Industrial Revolution shifted production from hand tools to steam-powered machinery. <span class='vocab' data-def='Selanjutnya/Berikutnya'>Subsequent</span> advancements in the 20th century introduced assembly lines and automation. Today, we are <span class='vocab' data-def='Menyaksikan'>witnessing</span> the dawn of 'Industry 4.0', <span class='vocab' data-def='Ditandai dengan'>characterized by</span> smart technology and artificial intelligence.",
            question: "Which statement accurately reflects the <span class='q-focus'>TIMELINE</span>?",
            options: [
                { 
                    text: "Artificial intelligence triggered the Industrial Revolution.", 
                    type: "trap", 
                    hint: "TRAP (The Time Traveler): AI is 'Industry 4.0' (Today), whereas the Industrial Revolution was 19th Century. The timeline is reversed." 
                },
                { 
                    text: "Automation was introduced before steam power.", 
                    type: "trap", 
                    hint: "TRAP (The Time Traveler): Steam was 19th century; Automation was 20th century. Steam came first." 
                },
                { 
                    text: "Technological shifts occurred in distinct phases.", 
                    type: "correct", 
                    evidence: "19th century... Subsequent advancements... Today", 
                    hint: "CORRECT: Acknowledges the chronological progression (19th -> 20th -> Today).", 
                    map: [["19th... 20th... Today", "distinct phases"], ["shifted... introduced... witnessing", "Technological shifts"]]
                },
                { 
                    text: "Industry 4.0 is less important than the Industrial Revolution.", 
                    type: "trap", 
                    hint: "TRAP (The Comparator): The text lists them in order. It never ranks them by 'importance'." 
                }
            ]
        },
        {
            text: "Solar energy is highly <span class='vocab' data-def='Berlimpah'>abundant</span> and renewable, yet its efficiency drops significantly at night or during cloudy weather. Nuclear energy, <span class='vocab' data-def='Demikian pula/Sama halnya'>likewise</span>, produces minimal greenhouse gases and provides consistent baseload power, though it faces public <span class='vocab' data-def='Pengawasan ketat/Kritik'>scrutiny</span> regarding radioactive waste disposal.",
            question: "What is the text's <span class='q-focus'>STANCE</span> on energy sources?",
            options: [
                { 
                    text: "Nuclear energy is superior to solar energy.", 
                    type: "trap", 
                    hint: "TRAP (The Comparator): The text puts Solar and Nuclear on separate pedestals (Side-by-side). It lists pros/cons for both, but doesn't say one is the 'winner'." 
                },
                { 
                    text: "Both sources have distinct advantages and limitations.", 
                    type: "correct", 
                    evidence: "Solar... abundant... yet efficiency drops... Nuclear... consistent... though it faces scrutiny", 
                    hint: "CORRECT: Captures the nuance of 'Pros and Cons' for both subjects.", 
                    map: [["abundant / consistent", "advantages"], ["efficiency drops / waste disposal", "limitations"]]
                },
                { 
                    text: "Solar energy is useless because of clouds.", 
                    type: "trap", 
                    hint: "TRAP (The Extremist): 'Useless' is too strong. The text only says efficiency 'drops'." 
                },
                { 
                    text: "Radioactive waste is the biggest problem in the world.", 
                    type: "trap", 
                    hint: "TRAP (The Scope): The text says it faces 'scrutiny', not that it is the 'biggest problem in the world'." 
                }
            ]
        },
        {
            text: "The CEO's resignation letter was polite, <span class='vocab' data-def='Menyebutkan (sebagai alasan)'>citing</span> 'personal reasons' for his departure. However, industry insiders noted that the announcement <span class='vocab' data-def='Bertepatan waktu'>coincided</span> with the release of a quarterly report showing a massive drop in profits, leading many to <span class='vocab' data-def='Berspekulasi/Menduga'>speculate</span> that the exit was not entirely <span class='vocab' data-def='Sukarela/Atas kemauan sendiri'>voluntary</span>.",
            question: "What does the text suggest about the <span class='q-focus'>RESIGNATION</span>?",
            options: [
                { 
                    text: "The CEO was definitely fired.", 
                    type: "trap", 
                    hint: "TRAP (The Extremist): The text says people 'speculate'. It does not confirm he was fired as a fact." 
                },
                { 
                    text: "There may be a link between the exit and financial performance.", 
                    type: "correct", 
                    evidence: "coincided with... massive drop in profits, leading many to speculate", 
                    hint: "CORRECT: 'May be a link' is safe language for 'speculate' and 'coincided'.", 
                    map: [["speculate", "may be"], ["coincided with", "link between"]]
                },
                { 
                    text: "The quarterly report was fake.", 
                    type: "trap", 
                    hint: "TRAP (Not Mentioned): Nothing in the text suggests the report was falsified." 
                },
                { 
                    text: "The CEO retired due to old age.", 
                    type: "trap", 
                    hint: "TRAP (False Cause): The letter cited 'personal reasons', but didn't specify age." 
                }
            ]
        }
    ],
    'scope': [
        {
            text: "The Cheetah is <span class='vocab' data-def='Terkenal'>renowned</span> for its explosive acceleration, capable of reaching highway speeds in seconds. Similarly, the Peregrine Falcon is celebrated for its ability to <span class='vocab' data-def='Mencapai'>attain</span> incredible velocity during its hunting dive, known as the stoop, which strikes prey with <span class='vocab' data-def='Mematikan'>lethal</span> precision.",
            question: "Which statement is <span class='q-focus'>SUPPORTED</span> by the text?",
            options: [
                { text: "The Peregrine Falcon is faster than the Cheetah.", type: "trap", hint: "TRAP (The Ghost): The text puts them on separate pedestals (Both are fast). It never built a podium to say who is #1." },
                {
                    text: "Both animals possess high speed attributes.",
                    type: "correct",
                    evidence: "Cheetah is renowned for... acceleration... Similarly, the Peregrine Falcon is celebrated for... velocity",
                    hint: "CORRECT: Safe summary. 'Both' connects the pedestals without ranking them.",
                    map: [["renowned for... acceleration", "possess high speed"], ["celebrated for... velocity", "attributes"]]
                },
                { text: "Cheetahs are more dangerous than Falcons.", type: "trap", hint: "TRAP (Comparison): 'More dangerous' is a ranking not found in the text." },
                { text: "Falcons hunt cheetahs.", type: "trap", hint: "TRAP (False Relation): Completely illogical connection." }
            ]
        },
        {
            text: "In a <span class='vocab' data-def='Komprehensif/Menyeluruh'>comprehensive</span> educational study, <span class='vocab' data-def='75%'>75%</span> of the high school student body indicated a preference for digital media over textbooks. Teachers and administrative staff were also <span class='vocab' data-def='Diwawancarai'>interviewed</span> regarding their instructional <span class='vocab' data-def='Metodologi'>methodologies</span> to provide a broader perspective.",
            question: "What does the study imply about <span class='q-focus'>PARTICIPATION</span>?",
            options: [
                { text: "Students were more involved than teachers.", type: "trap", hint: "TRAP (The Quantity): You have a number for Students (75%) but ZERO number for Teachers. You cannot compare 75% to 'Unknown'." },
                {
                    text: "The study included perspectives from both groups.",
                    type: "correct",
                    evidence: "student body... Teachers... were also interviewed",
                    hint: "CORRECT: 'Interviewed' means they participated. No ranking needed.",
                    map: [["surveyed... interviewed", "included perspectives"], ["student... Teachers", "both groups"]]
                },
                { text: "Teachers cared less about the issue.", type: "trap", hint: "TRAP (Attitude): 'Cared less' is an assumption about feelings." },
                { text: "Only students were surveyed.", type: "trap", hint: "TRAP (False Fact): Text says teachers were 'also interviewed'." }
            ]
        },
        {
            text: "The renowned architect Zaha Hadid <span class='vocab' data-def='Pada awalnya'>initially</span> gained recognition for her bold, angular designs inspired by Suprematism. <span class='vocab' data-def='Kemudian'>Subsequently</span>, her style evolved into fluid, parametric geometries often described as Neo-Futurism, which <span class='vocab' data-def='Mendominasi'>dominated</span> her later career.",
            question: "What is true about her <span class='q-focus'>CAREER</span>?",
            options: [
                { text: "Her Neo-Futurist works were superior to her earlier designs.", type: "trap", hint: "TRAP (The Time): Text says she shifted styles 'Subsequently' (Time), not that the new style was 'Superior' (Quality). Later ≠ Better." },
                {
                    text: "Her architectural style evolved over time.",
                    type: "correct",
                    evidence: "initially gained recognition... Subsequently, her style evolved",
                    hint: "CORRECT: Accurately tracks the timeline without judging quality.",
                    map: [["initially... Subsequently", "over time"], ["style evolved", "style evolved"]]
                },
                { text: "She abandoned architecture for painting.", type: "trap", hint: "TRAP (False Info): Not mentioned." },
                { text: "Suprematism is the best architectural style.", type: "trap", hint: "TRAP (Opinion): The author does not state which style is 'best'." }
            ]
        },
        {
            text: "Fourth-generation (4G) networks provide <span class='vocab' data-def='Memadai'>adequate</span> speeds for standard streaming and browsing. However, 5G technology explicitly <span class='vocab' data-def='Mengungguli'>outperforms</span> its predecessor by offering significantly lower latency and higher connection <span class='vocab' data-def='Kepadatan'>density</span> for smart devices.",
            question: "What is the relationship between <span class='q-focus'>4G AND 5G</span>?",
            options: [
                {
                    text: "5G is superior to 4G regarding latency.",
                    type: "correct",
                    evidence: "5G technology explicitly outperforms... in latency",
                    hint: "CORRECT: The text built a Bridge ('outperforms'). You are allowed to walk on it.",
                    map: [["outperforms", "is superior to"], ["lower latency", "regarding latency"]]
                },
                { text: "4G is obsolete.", type: "trap", hint: "TRAP (Extreme): Text says 4G offers 'adequate speeds', not that it is useless/obsolete." },
                { text: "5G is the perfect technology.", type: "trap", hint: "TRAP (Superlative): 'Perfect' is too strong." },
                { text: "They have the same latency.", type: "trap", hint: "TRAP (False Fact): Text says 5G has 'lower' latency." }
            ]
        },
        {
            text: "In global culinary culture, coffee is <span class='vocab' data-def='Tersebar luas'>widespread</span> for its utility as a stimulant to boost productivity. Tea, conversely, is deeply <span class='vocab' data-def='Dihargai'>prized</span> in many societies for its ritualistic nature and the sense of <span class='vocab' data-def='Ketenangan'>tranquility</span> it promotes.",
            question: "What does the passage imply about <span class='q-focus'>BEVERAGES</span>?",
            options: [
                { text: "Coffee is more popular than tea.", type: "trap", hint: "TRAP (The Ghost): Text says Coffee is 'widespread' and Tea is 'prized'. It never ranks them by popularity number." },
                {
                    text: "Both beverages are valued for different reasons.",
                    type: "correct",
                    evidence: "coffee is widespread for utility... Tea... is prized... for tranquility",
                    hint: "CORRECT: Summarizes the two separate pedestals (Utility vs Tranquility).",
                    map: [["widespread... prized", "valued"], ["utility... tranquility", "different reasons"]]
                },
                { text: "Tea is healthier than coffee.", type: "trap", hint: "TRAP (Assumption): Health is not mentioned." },
                { text: "Productivity is more important than tranquility.", type: "trap", hint: "TRAP (Value Judgment): The author presents both without choosing a winner." }
            ]
        }
    ],
    'distortion': [
        {
            text: "Urban flooding is a complex issue. While climate change leads to more frequent heavy rainfall, the lack of adequate drainage is often a primary <span class='vocab' data-def='Penyumbang/Faktor penyebab'>contributor</span>. Engineers suggest that improving infrastructure can significantly <span class='vocab' data-def='Mengurangi dampak buruk'>mitigate</span> these risks.",
            question: "Which statement is <span class='q-focus'>SUPPORTED</span> by the text?",
            options: [
                { text: "Better drainage will completely eliminate flooding.", type: "trap", hint: "TRAP (Extreme): 'Completely eliminate' is too strong. Text says 'mitigate' (reduce)." },
                {
                    text: "Improving infrastructure can help reduce flood risks.",
                    type: "correct",
                    evidence: "improving infrastructure can significantly mitigate these risks",
                    hint: "CORRECT: Uses safe language ('help reduce').",
                    map: [["mitigate", "help reduce"], ["significantly", "help"]]
                },
                { text: "Climate change is the only cause.", type: "trap", hint: "TRAP (Extreme): The text mentions 'multiple factors'." },
                { text: "Flooding never happens in modern cities.", type: "trap", hint: "TRAP (Extreme): Uses 'Never'." }
            ]
        },
        {
            text: "Green tea contains <span class='vocab' data-def='Antioksidan (Zat pelindung sel)'>antioxidants</span> called catechins. Studies <span class='vocab' data-def='Mengindikasikan/Menunjukkan'>indicate</span> that consuming green tea may lower the risk of heart disease and improve brain function in some adults.",
            question: "What can be <span class='q-focus'>INFERRED</span>?",
            options: [
                { text: "Drinking green tea prevents all heart attacks.", type: "trap", hint: "TRAP (Extreme): 'Prevents all' is impossible. Text says 'lower the risk'." },
                {
                    text: "Green tea consumption is linked to health benefits.",
                    type: "correct",
                    evidence: "may lower the risk of heart disease",
                    hint: "CORRECT: 'Linked to' is safe academic language.",
                    map: [["may lower the risk", "is linked to"], ["heart disease/brain function", "health benefits"]]
                },
                { text: "You must drink green tea to be healthy.", type: "trap", hint: "TRAP (Extreme): 'Must' implies obligation." },
                { text: "Coffee is bad for the heart.", type: "trap", hint: "TRAP (Opposite): Text doesn't mention coffee." }
            ]
        },
        {
            text: "While electric vehicles (EVs) are generally cleaner than gas cars, they are not entirely pollution-free. The manufacturing process <span class='vocab' data-def='Menyiratkan/Berarti'>implies</span> that EVs still have a carbon <span class='vocab' data-def='Jejak Karbon (Dampak lingkungan)'>footprint</span>, although it is typically lower over the vehicle's lifetime.",
            question: "What is true about <span class='q-focus'>EVs</span>?",
            options: [
                { text: "They cause zero pollution ever.", type: "trap", hint: "TRAP (Extreme): Text explicitly says 'not entirely pollution-free'." },
                {
                    text: "They usually have a lower lifetime carbon footprint.",
                    type: "correct",
                    evidence: "typically lower over the vehicle's lifetime",
                    hint: "CORRECT: 'Typically' matches 'Generally' and 'Lower'.",
                    map: [["typically", "usually"], ["lower... lifetime", "lower lifetime... footprint"]]
                },
                { text: "They are worse than gas cars.", type: "trap", hint: "TRAP (Opposite): Text says 'Cleaner than gas cars'." },
                { text: "Gas cars will be banned.", type: "trap", hint: "TRAP (Not Mentioned): Prediction not in text." }
            ]
        },
        {
            text: "Most spiders are <span class='vocab' data-def='Berbisa'>venomous</span>, using venom to <span class='vocab' data-def='Menaklukkan'>subdue</span> prey. However, the vast majority have fangs too small to pierce human skin, and their venom is usually harmless to people.",
            question: "What is implied about <span class='q-focus'>SPIDERS</span>?",
            options: [
                { text: "All spiders are dangerous to humans.", type: "trap", hint: "TRAP (Extreme): Text says 'majority... harmless'." },
                {
                    text: "Many spiders pose little threat to humans.",
                    type: "correct",
                    evidence: "vast majority... usually harmless to people",
                    hint: "CORRECT: 'Little threat' matches 'harmless'.",
                    map: [["vast majority", "Many"], ["usually harmless", "pose little threat"]]
                },
                { text: "No spiders can hurt humans.", type: "trap", hint: "TRAP (Extreme): 'No' is too strong. 'Usually harmless' implies some ARE harmful." },
                { text: "Spiders attack humans for food.", type: "trap", hint: "TRAP (False Reason): They use venom for 'prey', humans are not prey." }
            ]
        },
        {
            text: "Genetic modification (GM) of crops has potential benefits, such as drought resistance. Critics argue it might have <span class='vocab' data-def='Tak terduga'>unforeseen</span> <span class='vocab' data-def='Ekologis/Lingkungan'>ecological</span> effects. Current <span class='vocab' data-def='Konsensus (Kesepakatan umum)'>consensus</span> suggests that while promising, GM crops require careful monitoring.",
            question: "What is the author's <span class='q-focus'>STANCE</span>?",
            options: [
                { text: "GM crops are the perfect solution.", type: "trap", hint: "TRAP (Extreme Positive): Ignores the 'critics' and 'monitoring' part." },
                {
                    text: "GM crops show promise but need caution.",
                    type: "correct",
                    evidence: "while promising... require careful monitoring",
                    hint: "CORRECT: Balanced view.",
                    map: [["promising", "show promise"], ["require careful monitoring", "need caution"]]
                },
                { text: "GM crops are a disaster for the earth.", type: "trap", hint: "TRAP (Extreme Negative): Ignores 'potential benefits'." },
                { text: "Farmers must stop using GM crops.", type: "trap", hint: "TRAP (Extreme Command): Author suggests monitoring, not stopping." }
            ]
        }
    ],
    'logic': [
        {
            text: "In an <span class='vocab' data-def='Upaya/Usaha'>effort</span> to improve academic performance, the library extended hours in September. By December, average student GPA had increased by 0.3 points.",
            question: "Which statement is <span class='q-focus'>SUPPORTED</span> by the text?",
            options: [
                { text: "Library hours caused the GPA increase.", type: "trap", hint: "TRAP (False Cause): The text only shows a timeline, not a cause." },
                {
                    text: "The GPA increase occurred after the library extended hours.",
                    type: "correct",
                    evidence: "extended hours... in September. By December... GPA had increased",
                    hint: "CORRECT: 'After' indicates a timeline, which is factually true.",
                    map: [["By December", "after"], ["extended hours", "library extended hours"]]
                },
                { text: "Students studied harder because of the library.", type: "trap", hint: "TRAP (Assumption): We don't know why they studied." },
                { text: "Libraries are key to success.", type: "trap", hint: "TRAP (Opinion): Too general." }
            ]
        },
        {
            text: "Sales of ice cream <span class='vocab' data-def='Melonjak tinggi'>soar</span> in July. Statistics also show that cases of sunburn increase <span class='vocab' data-def='Secara drastis'>dramatically</span> in July.",
            question: "What is the relationship between <span class='q-focus'>ICE CREAM</span> and <span class='q-focus'>SUNBURN</span>?",
            options: [
                { text: "Eating ice cream causes sunburn.", type: "trap", hint: "TRAP (False Cause): Illogical causation." },
                {
                    text: "Both increase during the same time period.",
                    type: "correct",
                    evidence: "Sales... in July. cases... increase... in July",
                    hint: "CORRECT: Correlation (Timeline match).",
                    map: [["in July", "same time period"], ["soar / increase", "Both increase"]]
                },
                { text: "Sunburn makes people buy ice cream.", type: "trap", hint: "TRAP (False Cause): Unlikely causation." },
                { text: "July is a dangerous month.", type: "trap", hint: "TRAP (Opinion): Not a logical deduction." }
            ]
        },
        {
            text: "The company hired a new marketing director in January. In February, the company's server crashed, causing a loss of data.",
            question: "What can be <span class='vocab' data-def='Disimpulkan'>concluded</span>?",
            options: [
                { text: "The marketing director broke the server.", type: "trap", hint: "TRAP (False Cause): Hiring a marketer doesn't cause server crashes." },
                {
                    text: "The server crash happened after the hiring.",
                    type: "correct",
                    evidence: "hired... in January. In February... server crashed",
                    hint: "CORRECT: Timeline fact.",
                    map: [["January... February", "after"], ["server crashed", "server crash happened"]]
                },
                { text: "The company needs a new IT director.", type: "trap", hint: "TRAP (Opinion): Not in text." },
                { text: "Marketing directors are bad for business.", type: "trap", hint: "TRAP (Generalization): Too broad." }
            ]
        },
        {
            text: "People who own dogs tend to live longer than those who don't. Studies also show dog owners walk more frequently. This suggests dog ownership is <span class='vocab' data-def='Berkaitan/Berhubungan'>associated</span> with <span class='vocab' data-def='Umur panjang'>longevity</span>.",
            question: "What is a valid <span class='q-focus'>CONCLUSION</span>?",
            options: [
                { text: "Buying a dog guarantees a long life.", type: "trap", hint: "TRAP (Extreme/Cause): 'Guarantee' is wrong. 'Tend to' is correlation." },
                {
                    text: "Dog ownership is associated with longevity.",
                    type: "correct",
                    evidence: "People who own dogs tend to live longer",
                    hint: "CORRECT: 'Associated' = 'Tend to'.",
                    map: [["tend to live longer", "associated with longevity"], ["own dogs", "Dog ownership"]]
                },
                { text: "Walking causes you to buy a dog.", type: "trap", hint: "TRAP (Reverse Cause): Illogical." },
                { text: "Cats are bad for health.", type: "trap", hint: "TRAP (Irrelevant): Cats not mentioned." }
            ]
        },
        {
            text: "The heavy rainstorm lasted for three days. <span class='vocab' data-def='Akibatnya (Konsekuensinya)'>Consequently</span>, the river <span class='vocab' data-def='Meluap'>overflowed</span> its banks and flooded the nearby town.",
            question: "What <span class='q-focus'>CAUSED</span> the flooding?",
            options: [
                { text: "The river banks were too low.", type: "trap", hint: "TRAP (Assumption): Maybe true, but not stated as the cause." },
                {
                    text: "The heavy rainstorm.",
                    type: "correct",
                    evidence: "rainstorm... Consequently... flooded",
                    hint: "CORRECT: 'Consequently' is a strong Logic Connector meaning 'Because of this'.",
                    map: [["Consequently", "CAUSED (Question)"], ["rainstorm", "heavy rainstorm"]]
                },
                { text: "Poor town planning.", type: "trap", hint: "TRAP (Assumption): Not in text." },
                { text: "The flood happened before the rain.", type: "trap", hint: "TRAP (False Timeline): Contradicts 'Consequently'." }
            ]
        }
    ],
    'mirage': [
        {
            text: "Generative AI allows users to create images by prompting algorithms trained on vast datasets. While this <span class='vocab' data-def='Mendemokratisasi (Membuat bisa diakses semua orang)'>democratizes</span> art creation, legal scholars argue it creates <span class='vocab' data-def='Ketidakjelasan'>ambiguity</span> regarding <span class='vocab' data-def='Hak cipta'>copyright</span> ownership. Currently, existing laws struggle to define whether a machine—or the human prompter—can be considered the legal 'author' of a generated work.",
            question: "What is the primary <span class='q-focus'>LEGAL CHALLENGE</span> discussed?",
            options: [
                { 
                    text: "The integration of digital frameworks requires complex algorithmic regulation to facilitate global compliance.", 
                    type: "trap", 
                    hint: "TRAP (The Mirage): Uses high-level vocabulary (integration, frameworks, compliance) to sound sophisticated, but fails to address the specific issue of 'authorship'." 
                },
                { 
                    text: "It creates uncertainty regarding who owns the copyright.", 
                    type: "correct", 
                    evidence: "creates ambiguity regarding copyright ownership", 
                    hint: "CORRECT: Simple, direct, and matches the text's specific concern about authorship.", 
                    map: [["creates ambiguity", "creates uncertainty"], ["copyright ownership", "who owns the copyright"]]
                },
                { 
                    text: "AI will undeniably replace all human artists shortly.", 
                    type: "trap", 
                    hint: "TRAP (The Extremist): The text discusses legal issues, not a future prediction of replacing all artists." 
                },
                { 
                    text: "Machine learning is illegal in most countries.", 
                    type: "trap", 
                    hint: "TRAP (False Fact): The text says laws 'struggle to define' it, not that it is illegal." 
                }
            ]
        },
        {
            text: "Vitamin supplements are popular for general health maintenance. Clinical trials <span class='vocab' data-def='Mengindikasikan/Menunjukkan'>indicate</span> that while they can correct specific <span class='vocab' data-def='Kekurangan (Zat gizi)'>deficiencies</span> (like Scurvy or Rickets), their <span class='vocab' data-def='Keampuhan/Efektivitas'>efficacy</span> in preventing chronic diseases in already healthy adults is inconclusive. Furthermore, overconsumption of fat-soluble vitamins can actually result in <span class='vocab' data-def='Keracunan'>toxicity</span>.",
            question: "What does the text suggest about <span class='q-focus'>SUPPLEMENTS</span>?",
            options: [
                { 
                    text: "A substantial correlation exists between metabolic optimization and the daily intake of high-dosage vitamins.", 
                    type: "trap", 
                    hint: "TRAP (The Mirage): Uses scientific jargon (correlation, metabolic optimization) to sound like a correct medical statement, but contradicts the text which calls efficacy 'inconclusive'." 
                },
                { 
                    text: "They may offer benefits in specific cases of deficiency.", 
                    type: "correct", 
                    evidence: "can correct specific deficiencies", 
                    hint: "CORRECT: Accurate and uses safe hedging words ('May', 'Specific cases').", 
                    map: [["can correct", "may offer benefits"], ["specific deficiencies", "specific cases"]]
                },
                { 
                    text: "They are toxic for everyone who takes them.", 
                    type: "trap", 
                    hint: "TRAP (Scope Error): Text says 'Overconsumption' is toxic, not the vitamin itself." 
                },
                { 
                    text: "They cure all chronic diseases effectively.", 
                    type: "trap", 
                    hint: "TRAP (False Info): Text explicitly says efficacy is 'inconclusive'." 
                }
            ]
        },
        {
            text: "Fiscal policy involves the government using spending and taxation to influence the economy. When an economy <span class='vocab' data-def='Macet/Berhenti tumbuh'>stalls</span>, governments often increase spending to <span class='vocab' data-def='Mendorong/Memacu'>stimulate</span> growth. However, economists warn that if spending increases too fast without adequate tax revenue, it can lead to <span class='vocab' data-def='Inflasi (Kenaikan harga)'>inflation</span> and currency devaluation.",
            question: "How does fiscal policy affect the <span class='q-focus'>ECONOMY</span>?",
            options: [
                { 
                    text: "Systematic macroeconomic stability relies primarily on the suppression of monetary fluctuations through austerity.", 
                    type: "trap", 
                    hint: "TRAP (The Mirage): Sounds like an economics textbook definition, but completely ignores the text's actual topic of 'spending to stimulate growth'." 
                },
                { 
                    text: "Adjustments in spending tend to influence economic growth.", 
                    type: "correct", 
                    evidence: "using spending... to influence the economy... stimulate growth", 
                    hint: "CORRECT: Simple, supported summary using the safe verb 'tend to'.", 
                    map: [["using spending", "Adjustments in spending"], ["influence the economy", "influence economic growth"]]
                },
                { 
                    text: "Government spending always causes inflation.", 
                    type: "trap", 
                    hint: "TRAP (The Extremist): Text says 'if spending increases too fast', not always." 
                },
                { 
                    text: "Taxation is the only tool governments have.", 
                    type: "trap", 
                    hint: "TRAP (The Extremist): Text mentions 'spending AND taxation'." 
                }
            ]
        }
    ],
};

// --- PART 2: COMPONENT LOGIC ---

export default function TrapHunter() {
    // 1. STATE MANAGEMENT
    const [screen, setScreen] = useState('menu'); // 'menu', 'academy', 'game'
    const [currentModule, setCurrentModule] = useState(null);
    const [stage, setStage] = useState(0);
    const [xp, setXp] = useState(0);

    // Game State
    const [currentOptions, setCurrentOptions] = useState([]);
    const [feedback, setFeedback] = useState(null); // stores result of clicked option
    const [decryptorActive, setDecryptorActive] = useState(false);
    const [shake, setShake] = useState(false);

    // UI State
    const [lexiconOpen, setLexiconOpen] = useState(false);
    const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

    // 2. EFFECTS & HELPERS

    // Shuffle Array Helper
    const shuffleArray = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    // Initialize Stage Options
    useEffect(() => {
        if (screen === 'game' && currentModule) {
            const currentDrill = drills[currentModule][stage];
            if (currentDrill) {
                setCurrentOptions(shuffleArray(currentDrill.options));
                setFeedback(null); // Reset feedback on new stage
                setDecryptorActive(false); // Reset decryptor
            }
        }
    }, [screen, currentModule, stage]);

    // 3. HANDLERS

    const handleOpenAcademy = (moduleKey) => {
        setCurrentModule(moduleKey);
        setScreen('academy');
        window.scrollTo(0, 0);
    };

    const handleStartSimulation = () => {
        setStage(0);
        setScreen('game');
        window.scrollTo(0, 0);
    };

    const handleGoHome = () => {
        setScreen('menu');
        setCurrentModule(null);
        setFeedback(null);
    };

    const handleCheckAnswer = (selectedOpt) => {
        // Prevent clicking if already answered correctly
        if (feedback && feedback.type === 'correct') return;

        const isCorrect = selectedOpt.type === 'correct';

        // Set Feedback State
        setFeedback({
            type: selectedOpt.type, // 'correct' or 'trap'
            hint: selectedOpt.hint,
            map: selectedOpt.map || null,
            evidence: selectedOpt.evidence || null,
            clickedText: selectedOpt.text // Track which button was clicked
        });

        if (isCorrect) {
            setXp(prev => prev + 100);
            setShake(true);
            setTimeout(() => setShake(false), 500); // Reset shake after 0.5s
        }
    };

    const handleNextStage = () => {
        const totalStages = drills[currentModule].length;
        if (stage + 1 < totalStages) {
            setStage(prev => prev + 1);
        } else {
            alert(`MISSION ACCOMPLISHED!\nFinal XP: ${xp}`);
            handleGoHome();
        }
    };

    // 4. TOOLTIP & DECRYPTOR LOGIC
    // Since text is rendered via dangerouslySetInnerHTML, we use event delegation

    const handleMouseOver = (e) => {
        if (decryptorActive && e.target.classList.contains('vocab')) {
            const def = e.target.getAttribute('data-def');
            setTooltip({
                show: true,
                text: def,
                x: e.clientX,
                y: e.clientY
            });
        } else if (e.target.classList.contains('rl-danger') || e.target.classList.contains('rl-safe')) {
            // For Red/Green Light highlights in Theory
            // (Optional: can add specific tooltip logic here if needed)
        }
    };

    const handleMouseOut = () => {
        setTooltip({ ...tooltip, show: false });
    };

    const handleMouseMove = (e) => {
        if (tooltip.show) {
            setTooltip(prev => ({
                ...prev,
                x: e.clientX + 15,
                y: e.clientY + 15
            }));
        }
    };

    // Helper to render the text with highlighting if answer is correct
    const renderPassage = () => {
        if (!currentModule) return "";
        let text = drills[currentModule][stage].text;

        // If user found the evidence, highlight it permanently
        if (feedback && feedback.type === 'correct' && feedback.evidence) {
            text = text.replace(
                feedback.evidence,
                `<span class="reveal-highlight">${feedback.evidence}</span>`
            );
        }
        return { __html: text };
    };

    // --- PART 3: THE VIEW (RETURN STATEMENT) ---

    return (
        <div
            className="trap-hunter-app"
            onMouseMove={handleMouseMove}
            style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--text-main)', fontFamily: "'Inter', sans-serif" }}>

            <Link to="/" className="nav-chaos-home">
                ← DASHBOARD
            </Link>

            {/* 1. TOOLTIP */}
            {tooltip.show && (
                <div
                    className="vocab-tooltip"
                    style={{
                        display: 'block',
                        left: tooltip.x,
                        top: tooltip.y,
                        position: 'fixed'
                    }}
                >
                    {tooltip.text}
                </div>
            )}

            {/* 2. HUD (HEADS UP DISPLAY) */}
            <div className="hud">
                <div className="brand">UTBK <span>TRAP HUNTER</span></div>
                <div style={{ position: 'relative'}}>
                    <button
                        className={`decrypt-btn ${lexiconOpen ? 'active' : ''}`}
                        onClick={() => setLexiconOpen(!lexiconOpen)}
                    >
                        📖 LEXICON
                    </button>
                    {/* The decorative arrow only shows on Menu screen for visual balance */}
                    {screen === 'menu' && (
                        <div className="chaos-arrow" style={{ position: 'absolute', top: '-5px', left: '115%', width: '150px', textAlign: 'left' }}>
                            <span className="marker-font" style={{ color: 'var(--chaos-yellow)', fontSize: '0.9rem', display: 'block', transform: 'rotate(-5deg)', lineHeight: '1.1', marginBottom: '0px' }}>
                                HERE'S THE<br />LIBRARY
                            </span>
                            <svg width="70" height="40" viewBox="0 0 100 60" fill="none" stroke="var(--pop-pink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', transform: 'rotate(-20deg) scaleX(-1)' }}>
                                <path d="M 10,40 Q 50,50 90,20" />
                                <path d="M 90,20 L 70,25" />
                                <path d="M 90,20 L 75,40" />
                            </svg>
                        </div>
                    )}
                </div>
                <div className="stats">
                    <div className="stat-item">XP: <span className="stat-val">{xp}</span></div>
                </div>
            </div>

            {/* 3. MENU SCREEN */}
            {screen === 'menu' && (
                <div className="container" id="menu-screen">
                    <h1 className="menu-title">SELECT YOUR CHAOS</h1>
                    <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginBottom: '40px', fontSize: '1.2rem', fontFamily: "'Permanent Marker'" }}>
                        Master the traps. Break the test.
                    </p>

                    <div className="level-grid">
                        <div className="level-card" onClick={() => handleOpenAcademy('impostor')}>
                            <span className="status-badge">TRICKY</span>
                            <span className="level-icon">🎭</span>
                            <div className="level-title">The Impostor</div>
                            <div style={{ color: '#888' }}>Fakta Benar vs Konteks Salah.</div>
                        </div>
                        <div className="level-card" onClick={() => handleOpenAcademy('scope')}>
                            <span className="status-badge">MEDIUM</span>
                            <span className="level-icon">🔭</span>
                            <div className="level-title">The Overshoot</div>
                            <div style={{ color: '#888' }}>Terlalu Luas vs Terlalu Sempit.</div>
                        </div>
                        <div className="level-card" onClick={() => handleOpenAcademy('distortion')}>
                            <span className="status-badge">HARD</span>
                            <span className="level-icon">⚠️</span>
                            <div className="level-title">The Extremist</div>
                            <div style={{ color: '#888' }}>Kata Absolut (Always, Never).</div>
                        </div>
                        <div className="level-card" onClick={() => handleOpenAcademy('logic')}>
                            <span className="status-badge">NIGHTMARE</span>
                            <span className="level-icon">🧩</span>
                            <div className="level-title">The False Link</div>
                            <div style={{ color: '#888' }}>Korelasi vs Kausalitas.</div>
                        </div>
                        <div className="level-card" onClick={() => handleOpenAcademy('nuance')}>
                            <span className="status-badge">MODERATE</span>
                            <div className="level-icon">⚖️</div>
                            <div className="level-title">THE NUANCE</div>
                            <div style={{ color: '#888' }}>Tone, Comparison & Chronology</div>
                        </div>
                        <div className="level-card" onClick={() => handleOpenAcademy('mirage')}>
                            <span className="status-badge" style={{ background: '#a855f7', color: 'white' }}>SNEAKY</span>
                            <span className="level-icon">🥗</span>
                            <div className="level-title">THE MIRAGE</div>
                            <div style={{ color: '#888' }}>Word Salad & Long Options</div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', paddingBottom: '50px' }}>
                        <Link to="/materi/5" className="nav-chaos-next">
                            ACCESS NEURAL DECODER (NEXT) &rarr;
                        </Link>
                    </div>
                </div>
            )}

            {/* 4. ACADEMY SCREEN (THEORY) */}
            {screen === 'academy' && currentModule && (
                <div className="container academy-screen" style={{ display: 'block' }}>
                    <button className="back-btn" onClick={handleGoHome}>← BACK TO MENU</button>
                    <div className="dossier-card">
                        <div className="dossier-header">
                            <h2 className="dossier-title">{academyData[currentModule].title}</h2>
                        </div>
                        {/* Render HTML Content Safely */}
                        <div
                            dangerouslySetInnerHTML={{ __html: academyData[currentModule].content }}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        />
                        <button className="start-sim-btn" onClick={handleStartSimulation}>ENTER SIMULATION &rarr;</button>
                    </div>
                </div>
            )}

            {/* 5. GAME SCREEN */}
            {screen === 'game' && currentModule && (
                <div className={`container game-interface ${shake ? 'shake-screen' : ''}`} style={{ display: 'block' }}>
                    <button className="back-btn" onClick={handleGoHome}>← ABORT</button>

                    {/* Progress Bar */}
                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ transform: `scaleX(${(stage) / drills[currentModule].length})` }}
                        ></div>
                    </div>

                    <div className="terminal">
                        <div className="terminal-header">
                            <span style={{ color: 'var(--cyan)', fontFamily: "'JetBrains Mono'", fontWeight: 'bold' }}>
                                // SIMULATION ACTIVE
                            </span>
                            <button
                                className={`decrypt-btn ${decryptorActive ? 'active' : ''}`}
                                onClick={() => setDecryptorActive(!decryptorActive)}
                            >
                                {decryptorActive ? "[ DECRYPTOR: ACTIVE ]" : "[ DECRYPTOR: OFF ]"}
                            </button>
                        </div>

                        {/* Text Passage (With Dynamic Highlights) */}
                        <div
                            className={`passage ${decryptorActive ? 'decrypt-active' : ''}`}
                            id="sim-text"
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                            dangerouslySetInnerHTML={renderPassage()}
                        />

                        {/* Question */}
                        <div
                            className="question"
                            dangerouslySetInnerHTML={{ __html: drills[currentModule][stage].question }}
                        />
                    </div>

                    {/* Options Grid */}
                    <div id="sim-options">
                        {currentOptions.map((opt, idx) => {
                            // Determine class based on feedback state
                            let itemClass = "option-item";
                            if (feedback) {
                                // If this specific option was clicked, mark it
                                if (feedback.clickedText === opt.text) {
                                    itemClass += (feedback.type === 'correct' ? ' correct' : ' wrong');
                                }
                                // Optional: You could also highlight the correct answer if they got it wrong
                                // else if (opt.type === 'correct' && feedback.type === 'wrong') { itemClass += ' correct'; } 
                            }

                            return (
                                <div key={idx} className={itemClass} onClick={() => handleCheckAnswer(opt)}>
                                    <button className="option-btn">{opt.text}</button>

                                    {/* Feedback Box - Only show if this specific option was clicked */}
                                    {feedback && feedback.clickedText === opt.text && (
                                        <div className="feedback-box" style={{ display: 'block', animation: 'fadeIn 0.2s ease-out' }}>
                                            {feedback.hint}
                                            {/* Render Paraphrase Map if exists */}
                                            {feedback.map && (
                                                <div className="para-map">
                                                    <div className="para-header" style={{ fontFamily: "'Permanent Marker'", color: 'var(--cyan)', fontSize: '0.9rem', marginBottom: '8px', borderBottom: '1px solid #333', paddingBottom: '5px' }}>
                                                        // DECRYPTING SYNONYMS...
                                                    </div>
                                                    {feedback.map.map((row, rIdx) => (
                                                        <div key={rIdx} className="para-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 20px 1fr', gap: '10px', fontFamily: "'JetBrains Mono'", fontSize: '0.85rem', alignItems: 'center' }}>
                                                            <div className="para-item" style={{ color: '#888' }}>"{row[0]}"</div>
                                                            <div className="para-arrow" style={{ color: 'var(--pop-pink)', fontWeight: 'bold', textAlign: 'center' }}>→</div>
                                                            <div className="para-match" style={{ color: 'var(--neon-green)', fontWeight: 'bold' }}>"{row[1]}"</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    {feedback && feedback.type === 'correct' && (
                        <button className="next-btn" onClick={handleNextStage} style={{ display: 'block' }}>
                            NEXT TARGET
                        </button>
                    )}
                </div>
            )}

            {/* 6. LEXICON MODAL */}
            {lexiconOpen && (
                <div className="lexicon-overlay" style={{ display: 'block' }}>
                    <div className="lexicon-container">
                        <div className="lexicon-header">
                            <h2 className="menu-title" style={{ fontSize: '2rem', margin: '0' }}>STRATEGY LEXICON</h2>
                            <button className="close-lex-btn" onClick={() => setLexiconOpen(false)}>✖ CLOSE DATABASE</button>
                        </div>
                        <div className="lexicon-grid">
                            {Object.entries(lexiconData).map(([category, items]) => (
                                <React.Fragment key={category}>
                                    <div className="lex-cat-title" style={{ gridColumn: '1 / -1', fontFamily: "'Permanent Marker'", fontSize: '1.5rem', color: 'var(--chaos-yellow)', marginTop: '20px', marginBottom: '10px', borderLeft: '5px solid var(--pop-pink)', paddingLeft: '15px' }}>
                                        {category.toUpperCase()} SIGNALS
                                    </div>
                                    {items.map((item, i) => (
                                        <div key={i} className={`lex-card ${item.class}`}>
                                            <span className="lex-word" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', marginBottom: '5px', display: 'block' }}>
                                                {item.word}
                                            </span>
                                            <div className="lex-type" style={{ fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 6px', display: 'inline-block', marginBottom: '10px', backgroundColor: item.type.includes('TRAP') ? 'var(--neon-red)' : (item.type.includes('SAFE') ? 'var(--neon-green)' : '#f59e0b'), color: 'black' }}>
                                                {item.type}
                                            </div>
                                            <div className="lex-desc" style={{ fontSize: '0.9rem', color: '#aaa', lineHeight: '1.4' }}>
                                                {item.impact}
                                            </div>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}