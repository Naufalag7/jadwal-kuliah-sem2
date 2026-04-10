const CONFIG = {
    quotes: ["Algorithm is the poetry of logic.", "Make her proud.", "Informatics '25.", "Laily's favorite coder."],
    schedule: [
        { day: 'Senin', subject: 'Kalkulus Lanjut', time: '10:30', room: 'KU3.09.17' },
        { day: 'Senin', subject: 'Alpro 2', time: '12:30', room: 'KU3.09.17' },
        { day: 'Selasa', subject: 'Alpro 2 (Lab)', time: '06:30', room: 'LAB 0617' },
        { day: 'Selasa', subject: 'Arsitektur Komputer', time: '10:30', room: 'TULT-1509' },
        { day: 'Selasa', subject: 'Kalkulus Lanjut', time: '14:30', room: 'KU3.09.17' },
        { day: 'Rabu', subject: 'Alpro 2', time: '08:30', room: 'TULT-1509' },
        { day: 'Rabu', subject: 'Matriks & Ruang Vektor', time: '11:30', room: 'TULT-1510' },
        { day: 'Kamis', subject: 'Etika Dalam AI', time: '14:30', room: 'TULT-1509' },
        { day: 'Jumat', subject: 'Pemodelan Basis Data', time: '08:30', room: 'TULT-1509' },
        { day: 'Jumat', subject: 'Bahasa Inggris', time: '14:30', room: 'TULT-1510' }
    ]
};

function render() {
    const today = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][new Date().getDay()];
    const grid = document.getElementById('schedule-grid');
    const quote = document.getElementById('quote-display');

    quote.innerText = `"${CONFIG.quotes[Math.floor(Math.random() * CONFIG.quotes.length)]}"`;

    grid.innerHTML = CONFIG.schedule.map(item => `
        <div class="class-card ${item.day === today ? 'today' : ''}">
            <span class="day-tag">${item.day.toUpperCase()}</span>
            <h4>${item.subject}</h4>
            <div class="info">
                <span>🕒 ${item.time}</span>
                <span>📍 ${item.room}</span>
            </div>
        </div>
    `).join('');
}

window.onload = render;