const CONFIG = {
    quotes: [
        "Algorithm is the poetry of logic.",
        "Make her proud, Naufal.",
        "Building the future, one line at a time.",
        "Laily's favorite informatics student.",
        "Stay hungry, stay foolish."
    ],
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

    // Set Random Quote
    if(quote) {
        quote.innerText = CONFIG.quotes[Math.floor(Math.random() * CONFIG.quotes.length)];
    }

    // Render Grid with 3-Column Structure for CSS Grid
    if(grid) {
        grid.innerHTML = CONFIG.schedule.map(item => {
            const isToday = item.day === today;
            return `
                <div class="class-card ${isToday ? 'today' : ''}">
                    <span class="day-text">${item.day}</span>
                    <span class="subject-text">${item.subject}</span>
                    <div class="card-right">
                        <div class="detail-row">🕒 <span>${item.time}</span></div>
                        <div class="detail-row">📍 <span>${item.room}</span></div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

window.onload = render;