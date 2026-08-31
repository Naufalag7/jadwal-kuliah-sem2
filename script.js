const CONFIG = {
    quotes: [
        "Algorithm is the poetry of logic.",
        "Make her proud, Naufal.",
        "Building the future.",
        "Eat. Code. Golf. Repeat."
    ],
    schedule: [
        // SENIN
        { d: 'Senin', s: 'Bahasa Indonesia', code: 'UBKXCC2', start: '08:30', end: '10:30', r: '-' },
        { d: 'Senin', s: 'Analisis & Perancangan PL', code: 'CAK2AAB3', start: '10:30', end: '13:30', r: '-' },
        { d: 'Senin', s: 'Teori Peluang', code: 'CAK2GAB3', start: '13:30', end: '16:30', r: '-' },
        
        // SELASA
        { d: 'Selasa', s: 'Sistem Basis Data', code: 'CAK2CAB3', start: '10:30', end: '13:30', r: '-' },
        { d: 'Selasa', s: 'Analisis Kompleksitas Algoritma', code: 'CAK2BAB2', start: '13:30', end: '15:30', r: '-' },
        
        // RABU
        { d: 'Rabu', s: 'Struktur Data', code: 'CAK2EAB4', start: '09:30', end: '12:30', r: '-' },
        
        // KAMIS
        { d: 'Kamis', s: 'Teori Bahasa dan Automata', code: 'CAK2FAB2', start: '11:30', end: '13:30', r: '-' },
        { d: 'Kamis', s: 'Struktur Data', code: 'CAK2EAB4', start: '13:30', end: '16:30', r: '-' },
        
        // JUMAT
        { d: 'Jumat', s: 'Sistem Operasi (Pagi)', code: 'CAK2DAB3', start: '08:30', end: '10:30', r: '-' },
        { d: 'Jumat', s: 'Sistem Operasi (Siang)', code: 'CAK2DAB3', start: '13:30', end: '16:30', r: '-' }
    ]
};

const typeWriter = (text, i = 0) => {
    const el = document.getElementById('quote-display');
    if (el && i < text.length) {
        el.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 35);
    }
};

const render = () => {
    const daysMap = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const today = daysMap[new Date().getDay()];
    const grid = document.getElementById('schedule-grid');
    
    if (grid) {
        const grouped = CONFIG.schedule.reduce((acc, item) => {
            if (!acc[item.d]) acc[item.d] = [];
            acc[item.d].push(item);
            return acc;
        }, {});

        grid.innerHTML = Object.keys(grouped).map((day, dayIdx) => {
            const isToday = day === today;
            return `
            <div class="day-group">
                <div class="day-header animate-in ${isToday ? 'is-today' : ''}">
                    <span class="day-name">${day}</span>
                    ${isToday ? '<span class="today-badge"><span class="pulse-dot"></span>HARI INI</span>' : ''}
                </div>
                <div class="day-group-grid">
                    ${grouped[day].map((item, idx) => `
                        <div class="class-card stagger-in ${isToday ? 'active-day-card' : ''}" 
                             style="animation-delay: ${(dayIdx * 0.08) + (idx * 0.05)}s">
                            
                            <div class="time-block">
                                <span class="time-start">${item.start}</span>
                                <span class="time-divider"></span>
                                <span class="time-end">${item.end}</span>
                            </div>

                            <div class="card-details">
                                <h4 class="subject-title">${item.s}</h4>
                                <div class="meta-row">
                                    <span class="code-pill">${item.code}</span>
                                    ${item.r !== '-' ? `<span class="room-pill">📍 ${item.r}</span>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            `;
        }).join('');
    }

    const randomQuote = CONFIG.quotes[Math.floor(Math.random() * CONFIG.quotes.length)];
    const qDisp = document.getElementById('quote-display');
    if (qDisp) {
        qDisp.innerHTML = "";
        setTimeout(() => typeWriter(randomQuote), 400);
    }
};

window.onload = render;