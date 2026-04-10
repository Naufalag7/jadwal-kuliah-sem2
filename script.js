const CONFIG = {
    quotes: [
        "Semangat terus kodingnya, Naufal! 🪻",
        "Make it happen, make it count. 🔥",
        "One semicolon at a time. ✨",
        "Zero bugs, zero excuses. 🚀",
        "Laily is rooting for you! ❤️"
    ],
    schedule: [
        { day: 'Senin', code: 'CAK1LAB3', subject: 'KALKULUS LANJUT', time: '10:30 - 12:30', room: 'KU3.09.17' },
        { day: 'Senin', code: 'CAK1IAB4', subject: 'ALGORITMA DAN PEMROGRAMAN 2', time: '12:30 - 14:30', room: 'KU3.09.17' },
        { day: 'Selasa', code: 'CAK1IAB4', subject: 'ALGORITMA DAN PEMROGRAMAN 2', time: '06:30 - 09:30', room: 'LAB 0617' },
        { day: 'Selasa', code: 'CAK1NAB3', subject: 'ARSITEKTUR KOMPUTER', time: '10:30 - 13:30', room: 'TULT-1509' },
        { day: 'Selasa', code: 'CAK1LAB3', subject: 'KALKULUS LANJUT', time: '14:30 - 16:30', room: 'KU3.09.17' },
        { day: 'Rabu', code: 'CAK1IAB4', subject: 'ALGORITMA DAN PEMROGRAMAN 2', time: '08:30 - 10:30', room: 'TULT-1509' },
        { day: 'Rabu', code: 'CAK1MAB3', subject: 'MATRIKS DAN RUANG VEKTOR', time: '11:30 - 14:30', room: 'TULT-1510' },
        { day: 'Kamis', code: 'CAK1KAB2', subject: 'ETIKA DALAM AI', time: '14:30 - 16:30', room: 'TULT-1509' },
        { day: 'Jumat', code: 'CAK10AB3', subject: 'PEMODELAN BASIS DATA', time: '08:30 - 11:30', room: 'TULT-1509' },
        { day: 'Jumat', code: 'UCKXADB2', subject: 'BAHASA INGGRIS', time: '14:30 - 16:30', room: 'TULT-1510' }
    ]
};

function init() {
    // Quote random
    const quoteEl = document.getElementById('quote-display');
    if(quoteEl) quoteEl.innerText = `"${CONFIG.quotes[Math.floor(Math.random() * CONFIG.quotes.length)]}"`;

    // Hari ini
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const today = days[new Date().getDay()];
    document.getElementById('today-date').innerText = `HARI INI: ${today}`;

    // Render Grid
    const grid = document.getElementById('schedule-grid');
    grid.innerHTML = CONFIG.schedule.map(item => {
        const isToday = item.day === today;
        return `
            <div class="class-card ${isToday ? 'today' : ''}">
                <span class="day-label">${item.day}</span>
                <h4>${item.subject}</h4>
                <div class="detail-row">🕒 ${item.time}</div>
                <div class="detail-row">📍 ${item.room}</div>
                <div class="detail-row" style="opacity:0.5; font-size:0.7rem;">${item.code}</div>
            </div>
        `;
    }).join('');
}

window.onload = init;