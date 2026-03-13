const CONFIG = {
    csvJadwal: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQdhAvsQgUWG1YYhN-GqpaW-Q1g6JOaavEiLsqIczwdivAzs06ta-JPZ-6hkN5A10jF9qW6vPwL1McU/pub?gid=2078715774&single=true&output=csv",
    csvTugas: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQdhAvsQgUWG1YYhN-GqpaW-Q1g6JOaavEiLsqIczwdivAzs06ta-JPZ-6hkN5A10jF9qW6vPwL1McU/pub?gid=1637434427&single=true&output=csv",
    isRainy: true,
    quotes: [
        "Semangat terus kodingnya, Naufal! 🌸",
        "Minggu ke-3, gas terus jangan kasih kendor! 🔥",
        "Jangan lupa istirahat, kesehatanmu berharga. ✨",
        "Algoritma mungkin rumit, tapi kamu pasti bisa! 💻",
        "Udah minum air putih belum hari ini? 💧"
    ]
};

let focusMode = false;

// --- AUDIO PLAYER SETUP ---
const playlist = [
    "1Song.mp3", 
    "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3",
    "https://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3"
];
let currentTrackIndex = 0;
const lofiAudio = new Audio(playlist[currentTrackIndex]);
lofiAudio.loop = true;
lofiAudio.volume = 0.2;

const musicBtn = document.getElementById('toggle-music');
const nextBtn = document.getElementById('next-track');
const progressBar = document.getElementById('progress-bar');
const volSlider = document.getElementById('volume-slider');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('total-duration');
const gachaSpace = document.getElementById('gacha-space');

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// --- MUSIC LOGIC ---
if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (lofiAudio.paused) {
            lofiAudio.play();
            musicBtn.innerText = "Pause Music 🎵";
            musicBtn.classList.add('playing');
        } else {
            lofiAudio.pause();
            musicBtn.innerText = "Play Lo-Fi 🎧";
            musicBtn.classList.remove('playing');
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        const wasPlaying = !lofiAudio.paused;
        lofiAudio.src = playlist[currentTrackIndex];
        if (wasPlaying) lofiAudio.play();
        gachaSpace.innerText = "Switching tracks... ✨";
    });
}

lofiAudio.addEventListener('timeupdate', () => {
    if (lofiAudio.duration && progressBar) {
        const percent = (lofiAudio.currentTime / lofiAudio.duration) * 100;
        progressBar.value = percent;
        if (currentTimeEl) currentTimeEl.innerText = formatTime(lofiAudio.currentTime);
        if (durationEl) durationEl.innerText = formatTime(lofiAudio.duration);
    }
});

if (progressBar) {
    progressBar.addEventListener('input', (e) => {
        const seekTime = (e.target.value / 100) * lofiAudio.duration;
        lofiAudio.currentTime = seekTime;
    });
}

if (volSlider) {
    volSlider.addEventListener('input', (e) => {
        lofiAudio.volume = e.target.value;
    });
}

// --- CORE FUNCTIONS ---
function getMinutes(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

async function fetchHW() {
    try {
        const response = await fetch(CONFIG.csvTugas);
        const text = await response.text();
        
        // Memastikan baris tidak kosong
        const rows = text.split('\n')
                         .map(r => r.split(','))
                         .filter(cols => cols.length >= 2 && cols[0].trim() !== "");
        
        const listContainer = document.getElementById('deadline-list');
        if (!listContainer) return;
        
        listContainer.innerHTML = '';
        const now = new Date();
        
        // Lewati header (slice 1)
        rows.slice(1).forEach(cols => {
            const nama = cols[0]?.trim();
            const tanggal = cols[1]?.trim();
            const waktu = cols[2]?.trim() || '23:59';
            
            if (nama && tanggal) {
                const taskDate = new Date(`${tanggal} ${waktu}`);
                // Jika tugas belum lewat atau tugas hari ini
                if (taskDate >= now || isSameDay(taskDate, now)) {
                    const isUrgent = (taskDate - now) <= 86400000 ? 'urgent-task' : '';
                    listContainer.innerHTML += `
                        <div class="deadline-item ${isUrgent}">
                            <div class="deadline-info">
                                <b>${nama}</b><br>
                                <span class="deadline-date">⌛ ${tanggal}</span>
                            </div>
                        </div>`;
                }
            }
        });

        // Jika benar-benar kosong setelah difilter
        if (listContainer.innerHTML === '') {
            listContainer.innerHTML = '<div style="font-size:0.7rem; opacity:0.6;">Belum ada tugas baru! ✨</div>';
        }

    } catch (e) { 
        console.error("Gagal ambil data tugas:", e);
        document.getElementById('deadline-list').innerHTML = "Gagal memuat tugas 😭";
    }
}

// Fungsi pembantu untuk cek hari yang sama
function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
}

async function fetchPrayerTimes() {
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Bandung&country=Indonesia&method=20`);
        const data = await response.json();
        const t = data.data.timings;
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        const mainPrayers = [
            { name: "Subuh", time: t.Fajr }, { name: "Dzuhur", time: t.Dhuhr },
            { name: "Ashar", time: t.Asr }, { name: "Maghrib", time: t.Maghrib },
            { name: "Isya", time: t.Isha }
        ];

        document.getElementById('prayer-list').innerHTML = mainPrayers.map((p, index) => {
            const pMin = getMinutes(p.time);
            let isActive = false;
            const nextP = mainPrayers[index+1];
            if (nextP ? (currentTime >= pMin && currentTime < getMinutes(nextP.time)) : (currentTime >= pMin)) isActive = true;
            return `<div class="prayer-item ${isActive ? 'active-prayer' : ''}"><b>${p.name}</b><span>${p.time}</span></div>`;
        }).join('');

        let next = mainPrayers.find(p => getMinutes(p.time) > currentTime) || mainPrayers[0];
        let diff = getMinutes(next.time) - currentTime;
        if (diff < 0) diff += 1440;
        document.getElementById('prayer-countdown').innerText = `Menuju ${next.name}: ${Math.floor(diff/60)}j ${diff%60}m lagi`;
    } catch (e) { console.error("Prayer load failed"); }
}

async function fetchSchedule() {
    await fetchHW();
    await fetchPrayerTimes();
    try {
        const response = await fetch(CONFIG.csvJadwal);
        const text = await response.text();
        const rows = text.split('\n').map(r => r.split(',')).slice(1);
        const container = document.getElementById('schedule-container');
        const todayName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][new Date().getDay()];
        const nowMin = new Date().getHours() * 60 + new Date().getMinutes();

        container.innerHTML = '';
        let nextClass = null;
        let minDiff = Infinity;

        rows.forEach(cols => {
            const [hari, kode, matkul, waktu, ruang] = cols.map(c => c.trim());
            if (!hari || (focusMode && hari !== todayName)) return;

            const [start, end] = waktu.split('-').map(t => t.trim());
            const startMin = getMinutes(start);
            
            // Perbaikan Logika Highlight (Case & Trim Insensitive)
            const isToday = (hari.toLowerCase().trim() === todayName.toLowerCase().trim());
            const isOngoing = (isToday && nowMin >= startMin && nowMin <= getMinutes(end));
            
            const dayClass = `card-${hari.toLowerCase().trim()}`;
            const highlightClass = isToday ? 'today-highlight' : '';

            if (isToday && startMin > nowMin) {
                const diff = startMin - nowMin;
                if (diff < minDiff) {
                    minDiff = diff;
                    nextClass = { matkul, start };
                }
            }

            container.innerHTML += `
                <div class="class-card ${dayClass} ${highlightClass} ${isOngoing ? 'on-going' : ''}">
                    <div class="emoji-decor ${getRandomPos()}">${getRandomEmoji()}</div>
                    ${isOngoing ? '<span class="label-msg">🎀 LAGI KULIAH</span>' : ''}
                    <div class="day-tag">☁️ ${hari}</div>
                    <div class="course-header">
                        <h3>${kode}</h3>
                        <p>${matkul}</p>
                    </div>
                    <div class="detail"><span class="label">Jam</span><span class="value">${waktu}</span></div>
                    <div class="detail">
                        <span class="label">Ruang</span>
                        <span class="value">${ruang} ${ruang.toUpperCase().includes('TULT') ? '🏃‍♂️' : ''}</span>
                    </div>
                </div>`;
        });

        const countdownContainer = document.getElementById('class-countdown');
        if (nextClass) {
            const h = Math.floor(minDiff / 60);
            const m = minDiff % 60;
            countdownContainer.innerText = `Next Class: ${nextClass.matkul} (${nextClass.start}) - ${h}j ${m}m lagi ✨`;
        } else {
            countdownContainer.innerText = "Tidak ada kuliah lagi hari ini! 🥳";
        }

        // Jalankan animasi setelah render selesai
        setTimeout(initScrollAnimation, 100);

    } catch (e) { console.error("Schedule load failed"); }
}

function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.class-card').forEach(card => observer.observe(card));
}

async function checkBandungWeather() {
    try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-6.9175&longitude=107.6191&current_weather=true");
        const data = await response.json();
        const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 85, 86, 95, 96, 99];
        const isRaining = rainCodes.includes(data.current_weather.weathercode);
        
        const label = document.getElementById('weather-label');
        const body = document.body;

        body.classList.remove('rainy-mood', 'sunny-mood');
        const existingSun = document.querySelector('.sunny-glow');
        if (existingSun) existingSun.remove();

        if (isRaining) {
            label.innerText = "Bandung: Rainy 🌧️";
            CONFIG.isRainy = true;
            body.classList.add('rainy-mood');
            createRain(); 
        } else {
            label.innerText = "Bandung: Clear ☀️";
            CONFIG.isRainy = false;
            body.classList.add('sunny-mood');
            const rainContainer = document.getElementById('rain-container');
            if (rainContainer) rainContainer.innerHTML = '';
            
            const sun = document.createElement('div');
            sun.className = 'sunny-glow';
            document.body.appendChild(sun);
        }
    } catch (e) { console.error("Gagal sinkronisasi cuaca Bandung"); }
}

(async function init() {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 5) {
        document.body.classList.add('night-mode');
    } else {
        document.body.classList.remove('night-mode');
    }

    await checkBandungWeather(); 
    await fetchSchedule();

    const fortunes = [
        "Logic is Flawless! 💎", 
        "No Semicolon Errors! ⚡", 
        "Geisha cheers for you! ❤️",
        "Semangat Alpro & Kalkulusnya! ✨"
    ];
    const gachaSpace = document.getElementById('gacha-space');
    if (gachaSpace) {
        gachaSpace.innerText = fortunes[Math.floor(Math.random() * fortunes.length)];
    }

    const focusBtn = document.getElementById('toggle-focus');
    if (focusBtn) {
        focusBtn.addEventListener('click', (e) => {
            focusMode = !focusMode;
            e.target.innerText = focusMode ? "🎯" : "✨";
            fetchSchedule();
        });
    }

    setInterval(fetchSchedule, 60000);
    setInterval(checkBandungWeather, 900000);
})();

// --- HELPERS ---
function createRain() {
    const container = document.getElementById('rain-container');
    if (!container || container.children.length > 0) return;
    for (let i = 0; i < 30; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 0.4 + 0.6) + 's';
        container.appendChild(drop);
    }
}

function getRandomEmoji() { 
    return ["🌸", "✨", "🎀", "🧸", "🍭", "🍀", "🌟", "🐱", "🐰", "🍮"][Math.floor(Math.random() * 10)]; 
}

function getRandomPos() { 
    return ["pos-tl", "pos-tr"][Math.floor(Math.random() * 2)]; 
}

// --- PWA & NOTIFICATION LOGIC ---

// 1. Manual Update (Clears Cache and Reloads)
document.getElementById('update-app')?.addEventListener('click', () => {
    if ('serviceWorker' in navigator) {
        caches.keys().then((names) => {
            for (let name of names) caches.delete(name);
        }).then(() => {
            alert("Updating... Application will restart. ✨");
            location.reload(true);
        });
    }
});

// 2. Enable Notifications for Android
document.getElementById('enable-notifications')?.addEventListener('click', async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        new Notification("Jadwal Naufal", {
            body: "Notifikasi aktif! Geisha cheers for you! ❤️",
            icon: "logo.png"
        });
    }
});

// 3. The Countdown Timer Function
function startCountdown(deadlineDate) {
    const timerEl = document.getElementById('next-deadline-timer');
    if (!timerEl || !deadlineDate) return;

    const updateTimer = () => {
        const now = new Date();
        const diff = deadlineDate - now;

        if (diff <= 0) {
            timerEl.innerText = "(Deadline Lewat!)";
            return;
        }

        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        
        timerEl.innerText = `(${h}j ${m}m ${s}s lagi!)`;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
}