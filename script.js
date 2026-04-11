const CONFIG = {
    quotes: [
        "Algorithm is the poetry of logic.",
        "Make her proud, Naufal.",
        "Building the future.",
        "Eat. Code. Golf. Repeat."
    ],
    schedule: [
        { d: 'Senin', s: 'Toefl Esyp', t: '08:00', r: 'KU1.02.10' },
        { d: 'Senin', s: 'Kalkulus Lanjut', t: '10:30', r: 'KU3.09.17' },
        { d: 'Senin', s: 'Alpro 2', t: '12:30', r: 'KU3.09.17' },
        { d: 'Selasa', s: 'Alpro 2 (Lab)', t: '06:30', r: 'LAB 0617' },
        { d: 'Selasa', s: 'Arsitektur Komputer', t: '10:30', r: 'TULT-1509' },
        { d: 'Selasa', s: 'Kalkulus Lanjut', t: '14:30', r: 'KU3.09.17' },
        { d: 'Rabu', s: 'Alpro 2', t: '08:30', r: 'TULT-1509' },
        { d: 'Rabu', s: 'Matriks & Ruang Vektor', t: '11:30', r: 'TULT-1510' },
        { d: 'Kamis', s: 'Toefl Esyp', t: '08:00', r: 'KU1.02.10' },
        { d: 'Kamis', s: 'Etika Dalam AI', t: '14:30', r: 'TULT-1509' },
        { d: 'Jumat', s: 'Pemodelan Basis Data', t: '08:30', r: 'TULT-1509' },
        { d: 'Jumat', s: 'Bahasa Inggris', t: '14:30', r: 'TULT-1510' }
    ]
};

const typeWriter = (text, i = 0) => {
    const el = document.getElementById('quote-display');
    if (el && i < text.length) {
        el.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 40);
    }
};

const render = () => {
    const today = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][new Date().getDay()];
    const grid = document.getElementById('schedule-grid');
    
    if(grid) {
        // Logika pengelompokan berdasarkan hari
        const grouped = CONFIG.schedule.reduce((acc, item) => {
            if (!acc[item.d]) acc[item.d] = [];
            acc[item.d].push(item);
            return acc;
        }, {});

        grid.innerHTML = Object.keys(grouped).map((day, dayIdx) => `
            <div class="day-group">
                <div class="day-title animate-in">
                    ${day} ${day === today ? '<span class="highlight" style="font-size:0.6rem; letter-spacing:1px;">• TODAY</span>' : ''}
                </div>
                <div class="day-group-grid">
                    ${grouped[day].map((item, idx) => `
                        <div class="class-card stagger-in ${item.d === today ? 'today' : ''}" 
                             style="animation-delay: ${(dayIdx * 0.15) + (idx * 0.1)}s">
                            <span class="subject-text">${item.s}</span>
                            <div class="card-right">
                                <div>🕒 ${item.t}</div>
                                <div>📍 ${item.r}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    const randomQuote = CONFIG.quotes[Math.floor(Math.random() * CONFIG.quotes.length)];
    const qDisp = document.getElementById('quote-display');
    if(qDisp) {
        qDisp.innerHTML = "";
        setTimeout(() => typeWriter(randomQuote), 500);
    }
};

window.onload = render;