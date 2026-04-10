const CONFIG = {
    quotes: ["Algorithm is the poetry of logic.", "Make her proud, Naufal.", "Building the future.", "Informatics '25."],
    schedule: [
        { d: 'Senin', s: 'Kalkulus Lanjut', t: '10:30', r: 'KU3.09.17' },
        { d: 'Senin', s: 'Alpro 2', t: '12:30', r: 'KU3.09.17' },
        { d: 'Selasa', s: 'Alpro 2 (Lab)', t: '06:30', r: 'LAB 0617' },
        { d: 'Selasa', s: 'Arsitektur Komputer', t: '10:30', r: 'TULT-1509' },
        { d: 'Selasa', s: 'Kalkulus Lanjut', t: '14:30', r: 'KU3.09.17' },
        { d: 'Rabu', s: 'Alpro 2', t: '08:30', r: 'TULT-1509' },
        { d: 'Rabu', s: 'Matriks & Ruang Vektor', t: '11:30', r: 'TULT-1510' },
        { d: 'Kamis', s: 'Etika Dalam AI', t: '14:30', r: 'TULT-1509' },
        { d: 'Jumat', s: 'Pemodelan Basis Data', t: '08:30', r: 'TULT-1509' },
        { d: 'Jumat', s: 'Bahasa Inggris', t: '14:30', r: 'TULT-1510' }
    ]
};

const render = () => {
    const today = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][new Date().getDay()];
    const grid = document.getElementById('schedule-grid');
    const qDisp = document.getElementById('quote-display');

    if(qDisp) qDisp.innerText = CONFIG.quotes[Math.floor(Math.random() * CONFIG.quotes.length)];
    
    if(grid) {
        grid.innerHTML = CONFIG.schedule.map(i => `
            <div class="class-card ${i.d === today ? 'today' : ''}">
                <span class="day-text">${i.d}</span>
                <span class="subject-text">${i.s}</span>
                <div class="card-right">
                    <div class="detail-row">🕒 ${i.t}</div>
                    <div class="detail-row">📍 ${i.r}</div>
                </div>
            </div>
        `).join('');
    }
};

window.onload = render;