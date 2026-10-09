// ========== EXPANDED DUMMY DATA ==========
const tournamentsData = [
    {
        id: 1,
        name: "BGMI Pro League Season 5",
        game: "BGMI",
        organizer: "Squadlink Official",
        description: "The most prestigious BGMI tournament of the season. Elite squads battle it out in classic mode across multiple maps. Only the best will survive!",
        rules: "• No emulator allowed\n• Anti-cheat mandatory\n• Squad of 4 members\n• No stream sniping\n• Admin decisions are final",
        teamSize: 4,
        mode: "Squad - Classic",
        map: "Erangel + Miramar",
        prize: 50000,
        prizeDistribution: [
            { rank: "🥇 1st Place", amount: 30000 },
            { rank: "🥈 2nd Place", amount: 15000 },
            { rank: "🥉 3rd Place", amount: 5000 }
        ],
        entry: 500,
        slots: 100,
        joined: 98,
        status: "upcoming",
        startTime: Date.now() + 10 * 60 * 1000,
        isFeatured: true,
        hostName: "SL_Admin_Rohan"
    },
    {
        id: 2,
        name: "Valorant Radiant Clash",
        game: "Valorant",
        organizer: "Valorant Pro Arena",
        description: "Top Valorant teams collide in the ultimate tactical shooter showdown. Prove your coordination and mechanical skill.",
        rules: "• 5v5 Competitive format\n• Single elimination\n• No hacks or cheats\n• Discord mandatory for comms\n• Coaches not allowed in game",
        teamSize: 5,
        mode: "5v5 Competitive",
        map: "Ascent, Bind, Haven",
        prize: 25000,
        prizeDistribution: [
            { rank: "🥇 1st Place", amount: 15000 },
            { rank: "🥈 2nd Place", amount: 7000 },
            { rank: "🥉 3rd Place", amount: 3000 }
        ],
        entry: 0,
        slots: 32,
        joined: 32,
        status: "live",
        startTime: Date.now() - 10000,
        isFeatured: false,
        hostName: "SL_Admin_Priya",
        roomId: "VAL-48291",
        roomPassword: "radiant@99",
        matchStatus: "Quarter Finals Underway"
    },
    {
        id: 3,
        name: "Free Fire Survival Series",
        game: "Free Fire",
        organizer: "FireStorm Esports",
        description: "Battle Royale at its finest. 50 players, one island, survival is everything. Loot, strategize, and be the last team standing.",
        rules: "• Squad of 4\n• No pre-formed alliances allowed\n• Emulator players in separate lobby\n• Screenshot proof required for kills\n• Results submitted within 10 mins",
        teamSize: 4,
        mode: "Squad - BR",
        map: "Bermuda",
        prize: 15000,
        prizeDistribution: [
            { rank: "🥇 1st Place", amount: 8000 },
            { rank: "🥈 2nd Place", amount: 4000 },
            { rank: "🥉 3rd Place", amount: 3000 }
        ],
        entry: 100,
        slots: 50,
        joined: 20,
        status: "upcoming",
        startTime: Date.now() + 5 * 60 * 60 * 1000,
        isFeatured: false,
        hostName: "SL_Admin_Dev"
    },
    {
        id: 4,
        name: "CODM Championship Qualifiers",
        game: "Call of Duty Mobile",
        organizer: "CODM India League",
        description: "The legendary CODM championship qualifier. This was a showcase of the best mobile shooter talent in the country!",
        rules: "• 5v5 Hardpoint\n• No glitch spots\n• Packet loss screenshots required\n• Coach allowed as observer only\n• Double elimination bracket",
        teamSize: 5,
        mode: "5v5 Hardpoint",
        map: "Standoff, Raid",
        prize: 100000,
        prizeDistribution: [
            { rank: "🥇 1st Place", amount: 60000 },
            { rank: "🥈 2nd Place", amount: 25000 },
            { rank: "🥉 3rd Place", amount: 15000 }
        ],
        entry: 1000,
        slots: 64,
        joined: 64,
        status: "completed",
        startTime: Date.now() - 50 * 60 * 60 * 1000,
        isFeatured: false,
        hostName: "SL_Admin_Karan",
        winner: "TeamPhoenix",
        bracket: {
            quarterfinals: [
                { team1: "TeamPhoenix", team2: "NightOwls", winner: "TeamPhoenix" },
                { team1: "ShadowGang", team2: "StormRiders", winner: "ShadowGang" },
                { team1: "BladeX", team2: "CyberWolves", winner: "BladeX" },
                { team1: "IceStrike", team2: "RedFang", winner: "IceStrike" }
            ],
            semifinals: [
                { team1: "TeamPhoenix", team2: "ShadowGang", winner: "TeamPhoenix" },
                { team1: "BladeX", team2: "IceStrike", winner: "BladeX" }
            ],
            final: { team1: "TeamPhoenix", team2: "BladeX", winner: "TeamPhoenix" }
        }
    },
    {
        id: 5,
        name: "BGMI Weekend Showdown",
        game: "BGMI",
        organizer: "Weekend Warriors Club",
        description: "A chill but competitive weekend BGMI event. All skill levels welcome. Just bring your A-game and have fun!",
        rules: "• Open to all ranks\n• Squad of 4\n• Classic mode only\n• No emulators\n• Friendly sportsmanship enforced",
        teamSize: 4,
        mode: "Squad - Classic",
        map: "Sanhok",
        prize: 10000,
        prizeDistribution: [
            { rank: "🥇 1st Place", amount: 6000 },
            { rank: "🥈 2nd Place", amount: 3000 },
            { rank: "🥉 3rd Place", amount: 1000 }
        ],
        entry: 0,
        slots: 100,
        joined: 45,
        status: "upcoming",
        startTime: Date.now() + 24 * 60 * 60 * 1000,
        isFeatured: false,
        hostName: "SL_Admin_Mia"
    },
    {
        id: 6,
        name: "Valorant Swiftplay Tournament",
        game: "Valorant",
        organizer: "Swift Esports League",
        description: "Fast-paced Valorant swiftplay format — no rounds wasted, pure action from minute one. Show your instincts!",
        rules: "• Swiftplay format\n• Best of 3 maps\n• No pause requests after warmup\n• DM result to admin immediately\n• Sportsmanship required",
        teamSize: 5,
        mode: "5v5 Swiftplay",
        map: "Split, Lotus",
        prize: 5000,
        prizeDistribution: [
            { rank: "🥇 1st Place", amount: 3000 },
            { rank: "🥈 2nd Place", amount: 1500 },
            { rank: "🥉 3rd Place", amount: 500 }
        ],
        entry: 0,
        slots: 16,
        joined: 14,
        status: "live",
        startTime: Date.now() - 60 * 60 * 1000,
        isFeatured: false,
        hostName: "SL_Admin_Zara",
        roomId: "SWIFT-77302",
        roomPassword: "swift!422",
        matchStatus: "Semi Finals in Progress"
    },
    {
        id: 7,
        name: "CODM Sniper Only",
        game: "Call of Duty Mobile",
        organizer: "Sniper Brotherhood",
        description: "Pure sniper showdown — only sniper rifles allowed. Patience, precision, and patience again. A niche event for true marksmen.",
        rules: "• Snipers ONLY (no pistol sidearm)\n• 5v5 Team Deathmatch\n• Screenshot proof for weapon class\n• Default loadout skins only\n• 3 maps series",
        teamSize: 5,
        mode: "5v5 Sniper TDM",
        map: "Crossfire",
        prize: 2000,
        prizeDistribution: [
            { rank: "🥇 1st Place", amount: 1200 },
            { rank: "🥈 2nd Place", amount: 500 },
            { rank: "🥉 3rd Place", amount: 300 }
        ],
        entry: 50,
        slots: 20,
        joined: 20,
        status: "completed",
        startTime: Date.now() - 100 * 60 * 60 * 1000,
        isFeatured: false,
        hostName: "SL_Admin_Yash",
        winner: "ShadowSnipe",
        bracket: {
            quarterfinals: [
                { team1: "ShadowSnipe", team2: "OneShot", winner: "ShadowSnipe" },
                { team1: "Ghost_422", team2: "NightVision", winner: "Ghost_422" },
                { team1: "Crosshair_X", team2: "SilentKill", winner: "Crosshair_X" },
                { team1: "PrecisionCrew", team2: "TargetDown", winner: "PrecisionCrew" }
            ],
            semifinals: [
                { team1: "ShadowSnipe", team2: "Ghost_422", winner: "ShadowSnipe" },
                { team1: "Crosshair_X", team2: "PrecisionCrew", winner: "Crosshair_X" }
            ],
            final: { team1: "ShadowSnipe", team2: "Crosshair_X", winner: "ShadowSnipe" }
        }
    },
    {
        id: 8,
        name: "Free Fire Rush Hour",
        game: "Free Fire",
        organizer: "Inferno Cup Series",
        description: "Limited slots, max chaos. Rush Hour is the fastest-paced Free Fire tourney on the platform — 6 matches, full aggression.",
        rules: "• Squad of 4\n• Rush and aggressive play encouraged\n• Camp penalty: 50 point deduction\n• No cheats/mods\n• Results auto-verified via screenshot",
        teamSize: 4,
        mode: "Squad - Rush BR",
        map: "Kalahari",
        prize: 8000,
        prizeDistribution: [
            { rank: "🥇 1st Place", amount: 5000 },
            { rank: "🥈 2nd Place", amount: 2000 },
            { rank: "🥉 3rd Place", amount: 1000 }
        ],
        entry: 200,
        slots: 40,
        joined: 15,
        status: "upcoming",
        startTime: Date.now() + 48 * 60 * 60 * 1000,
        isFeatured: false,
        hostName: "SL_Admin_Neel"
    }
];

// ========== USER TOURNAMENT HISTORY ==========
const userHistory = [
    {
        id: 101,
        name: "BGMI Pro League Season 4",
        game: "BGMI",
        placement: 1,
        earnings: 30000,
        result: "won",
        date: "2026-03-10"
    },
    {
        id: 102,
        name: "Valorant Iron Cup",
        game: "Valorant",
        placement: 3,
        earnings: 3000,
        result: "top3",
        date: "2026-03-05"
    },
    {
        id: 103,
        name: "CODM Elimination Round",
        game: "Call of Duty Mobile",
        placement: 12,
        earnings: 0,
        result: "lost",
        date: "2026-02-20"
    },
    {
        id: 104,
        name: "Free Fire Blitz Cup",
        game: "Free Fire",
        placement: 2,
        earnings: 2000,
        result: "top3",
        date: "2026-02-14"
    }
];

// Track join state
const userJoinedTournaments = new Set();

// ========== DOM ELEMENTS ==========
const featuredContainer = document.getElementById('featured-container');
const tourneyGrid = document.getElementById('tourney-grid');
const searchInput = document.getElementById('search-input');
const gameFilter = document.getElementById('game-filter');
const statusFilter = document.getElementById('status-filter');
const entryFilter = document.getElementById('entry-filter');
const tabBtns = document.querySelectorAll('.tab-btn');

let currentTab = 'all';
let countdownIntervals = [];
let modalCountdownInterval = null;

// ========== ICONS ==========
const icons = {
    'BGMI': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round">
                <path d="M10.5 15.5 C11 16.5 11.2 17.5 11.2 19 C11.2 20 10 21 10 22.5 C10 24 14 24 14 22.5 C14 21 12.8 20 12.8 19 C12.8 17.5 13 16.5 13.5 15.5 A 6.5 6.5 0 0 0 18.5 9.5 L 20.5 9 L 18.5 8.5 A 6.5 6.5 0 0 0 13.5 2.7 L 13.5 1.5 Q 12 0.2 10.5 1.5 L 10.5 2.7 A 6.5 6.5 0 0 0 5.5 8.5 L 3.5 9 L 5.5 9.5 A 6.5 6.5 0 0 0 10.5 15.5 Z" />
                <circle cx="12" cy="9" r="5.2" fill="currentColor" fill-opacity="0.2" />
                <ellipse cx="12" cy="22" rx="0.6" ry="1.2" />
                <path d="M11 2 H13" stroke-linecap="round" />
            </svg>`,
    'Free Fire': `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5" stroke-linejoin="round">
                    <g transform="translate(12, 12) scale(0.85) skewX(-20) translate(-12, -12)">
                        <path d="M 8 2 L 2 2 L 2 8 L 5 8 L 5 14 L 7 14 L 7 19 L 8 19 Z" />
                        <path d="M 9 20 L 13 20 L 13 14 L 20 14 L 20 10 L 15 10 Q 13 10 13 8 L 13 6 L 22 6 L 22 2 L 9 2 Z" />
                    </g>
                </svg>`,
    'Call of Duty Mobile': `<svg viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="2,7 7,4 7,20 2,17" />
                                <polygon points="8.5,5 12,7 15.5,5 15.5,15 12,17 8.5,15" />
                                <polygon points="17,4 22,7 22,17 17,20" />
                            </svg>`,
    'Valorant': `<svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.792 2.152a.252.252 0 0 0-.098.083c-3.384 4.23-6.769 8.46-10.15 12.69-.107.093-.025.288.119.265 2.439.003 4.877 0 7.316.001a.66.66 0 0 0 .552-.25c.774-.967 1.55-1.934 2.324-2.903a.72.72 0 0 0 .144-.49c-.002-3.077 0-6.153-.003-9.23.016-.11-.1-.206-.204-.167zM.077 2.166c-.077.038-.074.132-.076.205.002 3.074.001 6.15.001 9.225a.679.679 0 0 0 .158.463l7.64 9.55c.12.152.308.25.505.247 2.455 0 4.91.003 7.365 0 .142.02.222-.174.116-.265C10.661 15.176 5.526 8.766.4 2.35c-.08-.094-.174-.272-.322-.184z"/>
                </svg>`
};

// ========== UTILITIES ==========
function formatTime(ms) {
    if (ms <= 0) return "00:00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function formatMinutes(ms) {
    if (ms <= 0) return null;
    const minutes = Math.floor(ms / 60000);
    if (minutes < 60) return `${minutes} min${minutes !== 1 ? 's' : ''}`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hr${hours !== 1 ? 's' : ''}`;
}

function getStatusBadge(status) {
    if (status === 'live') return `<span class="status-badge status-live"><span class="live-dot"></span> LIVE</span>`;
    if (status === 'upcoming') return `<span class="status-badge status-upcoming">🟡 UPCOMING</span>`;
    return `<span class="status-badge status-completed">⚫ COMPLETED</span>`;
}

function getJoinButtonHtml(tourney, large = false) {
    const cls = large ? 'btn-large' : '';
    if (tourney.status === 'completed') {
        return `<button class="cta-btn primary-btn ${cls} btn-disabled" disabled>Ended</button>`;
    }
    if (userJoinedTournaments.has(tourney.id)) {
        return `<button class="cta-btn primary-btn ${cls} btn-joined" disabled>✔ Joined</button>`;
    }
    if (tourney.joined >= tourney.slots) {
        return `<button class="cta-btn primary-btn ${cls} btn-disabled" disabled>Full</button>`;
    }
    return `<button class="cta-btn primary-btn ${cls}" onclick="openModal(${tourney.id})">Join Now</button>`;
}

function startCountdown(elementId, targetTime) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const update = () => {
        const remaining = targetTime - Date.now();
        if (remaining <= 0) {
            el.innerHTML = "Starting soon...";
        } else {
            el.innerHTML = "Starts in: " + formatTime(remaining);
        }
    };
    update();
    const interval = setInterval(update, 1000);
    countdownIntervals.push(interval);
}

function clearCountdowns() {
    countdownIntervals.forEach(clearInterval);
    countdownIntervals = [];
}

// ========== URGENCY HELPERS ==========
function getUrgencyInfo(tourney) {
    const slotsLeft = tourney.slots - tourney.joined;
    const fillPct = (tourney.joined / tourney.slots) * 100;
    const msLeft = tourney.startTime - Date.now();
    const minutesLeft = Math.floor(msLeft / 60000);

    let urgencyTag = '';
    let pulseGlow = false;

    if (tourney.status === 'upcoming') {
        if (slotsLeft <= 3 && slotsLeft > 0) {
            urgencyTag = `<span class="urgency-tag urgency-slots">🔥 Only ${slotsLeft} slot${slotsLeft > 1 ? 's' : ''} left!</span>`;
            pulseGlow = true;
        } else if (minutesLeft > 0 && minutesLeft <= 30) {
            urgencyTag = `<span class="urgency-tag urgency-time">⚡ Starting in ${minutesLeft} min${minutesLeft > 1 ? 's' : ''}!</span>`;
            pulseGlow = minutesLeft <= 10;
        }
    }
    return { urgencyTag, pulseGlow, fillPct };
}

// ========== FEATURED RENDER ==========
function renderFeatured(tourney) {
    if (!tourney) { featuredContainer.innerHTML = ''; return; }
    const { urgencyTag, pulseGlow, fillPct } = getUrgencyInfo(tourney);
    let timerHtml = '';
    if (tourney.status === 'upcoming') {
        timerHtml = `<div class="timer-container" id="timer-feat"></div>`;
    }
    featuredContainer.innerHTML = `
        <div class="featured-card${pulseGlow ? ' pulse-glow' : ''}" onclick="openModal(${tourney.id})" >
            <div class="feat-info">
                <span class="feat-game">${tourney.game}</span>
                <h2 class="feat-title">${tourney.name}</h2>
                ${urgencyTag}
                <div class="feat-details">
                    <div class="detail-item">
                        <span class="detail-label">Prize Pool</span>
                        <span class="detail-value" style="color: var(--color-secondary);">₹${tourney.prize.toLocaleString()}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Entry Fee</span>
                        <span class="detail-value">${tourney.entry === 0 ? 'Free' : '₹' + tourney.entry}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Team Size</span>
                        <span class="detail-value">${tourney.teamSize}v${tourney.teamSize}</span>
                    </div>
                </div>
            </div>
            <div class="feat-action">
                <div class="progress-container">
                    <div class="progress-header">
                        <span>Slots Filled</span>
                        <span><span id="feat-joined">${tourney.joined}</span>/${tourney.slots}</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill${fillPct >= 90 ? ' progress-danger' : ''}" id="feat-fill" style="width: ${fillPct}%"></div>
                    </div>
                </div>
                ${timerHtml}
                <div id="feat-btn-wrapper" style="width: 100%;">
                    ${getJoinButtonHtml(tourney, true)}
                </div>
            </div>
        </div>
    `;
    if (tourney.status === 'upcoming') startCountdown('timer-feat', tourney.startTime);
}

// ========== GRID RENDER ==========
function renderGrid(tournaments) {
    tourneyGrid.innerHTML = '';
    if (tournaments.length === 0) {
        tourneyGrid.innerHTML = `<div class="no-results">No tournaments found matching your filters.</div>`;
        return;
    }
    tournaments.forEach(t => {
        const { urgencyTag, pulseGlow, fillPct } = getUrgencyInfo(t);
        const card = document.createElement('div');
        card.className = `tourney-card${pulseGlow ? ' pulse-glow' : ''}`;
        

        let extraBottom = '';
        if (t.status === 'completed' && t.bracket) {
            extraBottom = `<button class="mini-bracket-btn" onclick="event.stopPropagation(); openBracket(${t.id})">🏆 View Bracket</button>`;
        }
        if (t.status === 'live') {
            extraBottom = `<div class="room-teaser">🔴 LIVE — <span onclick="event.stopPropagation(); openModal(${t.id})" style="color:var(--color-primary);cursor:pointer;">View Room Info</span></div>`;
        }

        card.innerHTML = `
            <div class="card-header">
                <div class="game-icon">${icons[t.game] || ''}</div>
                ${getStatusBadge(t.status)}
            </div>
            <h3 class="card-title">${t.name}</h3>
            <p class="card-game">${t.game} • ${t.teamSize}v${t.teamSize} • ${t.mode}</p>
            ${urgencyTag}
            <div class="card-details">
                <div class="card-detail-item">
                    <span class="cd-label">Prize Pool</span>
                    <span class="cd-value">₹${t.prize.toLocaleString()}</span>
                </div>
                <div class="card-detail-item">
                    <span class="cd-label">Entry Fee</span>
                    <span class="cd-value" style="color: var(--text-primary);">${t.entry === 0 ? 'Free' : '₹' + t.entry}</span>
                </div>
            </div>
            <div class="progress-container">
                <div class="progress-header">
                    <span>Slots</span>
                    <span><span id="grid-joined-${t.id}">${t.joined}</span>/${t.slots}</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill${fillPct >= 90 ? ' progress-danger' : ''}" id="grid-fill-${t.id}" style="width: ${fillPct}%"></div>
                </div>
            </div>
            <div class="card-footer">
                <div class="card-timer" id="timer-grid-${t.id}">
                    ${t.status === 'live' ? 'Match is LIVE!' : (t.status === 'completed' ? 'Match Ended' : '')}
                </div>
                ${extraBottom}
                <div id="grid-btn-wrapper-${t.id}">
                    ${getJoinButtonHtml(t)}
                </div>
            </div>
        `;
        card.addEventListener('click', () => openModal(t.id));
        tourneyGrid.appendChild(card);
        if (t.status === 'upcoming') startCountdown(`timer-grid-${t.id}`, t.startTime);
    });
}

// ========== HISTORY SECTION ==========
function renderHistory() {
    const section = document.getElementById('history-section');
    if (!section) return;

    const badgeMap = {
        won: { label: '🥇 Winner', cls: 'badge-won' },
        top3: { label: '🥉 Top 3', cls: 'badge-top3' },
        lost: { label: '💀 Eliminated', cls: 'badge-lost' }
    };

    const rows = userHistory.map(h => {
        const badge = badgeMap[h.result] || { label: h.result, cls: '' };
        return `
        <div class="history-row">
            <div class="history-cell history-name">
                <span>${icons[h.game] ? `<span class="history-icon">${icons[h.game]}</span>` : ''}</span>
                <div>
                    <div class="history-tourney-name">${h.name}</div>
                    <div class="history-game">${h.game}</div>
                </div>
            </div>
            <div class="history-cell history-placement">#${h.placement}</div>
            <div class="history-cell history-earnings">${h.earnings > 0 ? '₹' + h.earnings.toLocaleString() : '—'}</div>
            <div class="history-cell"><span class="result-badge ${badge.cls}">${badge.label}</span></div>
            <div class="history-cell history-date">${h.date}</div>
        </div>
        `;
    }).join('');

    section.innerHTML = `
        <div class="history-header-bar">
            <h2 class="history-title">📋 My Tournament History</h2>
        </div>
        <div class="history-table">
            <div class="history-row history-row-header">
                <div class="history-cell">Tournament</div>
                <div class="history-cell">Place</div>
                <div class="history-cell">Earnings</div>
                <div class="history-cell">Result</div>
                <div class="history-cell">Date</div>
            </div>
            ${rows}
        </div>
    `;
}

// ========== MODAL LOGIC ==========
window.openModal = function (id) {
    const t = tournamentsData.find(x => x.id === id);
    if (!t) return;

    const modal = document.getElementById('tourney-modal');
    const body = document.getElementById('modal-body');

    // Prize distribution HTML
    const prizeHtml = t.prizeDistribution.map(p =>
        `<div class="prize-row">
            <span class="prize-rank">${p.rank}</span>
            <span class="prize-amount">₹${p.amount.toLocaleString()}</span>
        </div>`
    ).join('');

    // Room info for live
    let roomHtml = '';
    if (t.status === 'live' && t.roomId) {
        roomHtml = `
        <div class="room-card">
            <div class="room-card-title">🔴 LIVE ROOM DETAILS</div>
            <div class="room-fields">
                <div class="room-field">
                    <span class="room-label">Room ID</span>
                    <span class="room-val" id="room-id-val">${t.roomId}</span>
                    <button class="copy-btn" onclick="copyText('${t.roomId}', 'room-id-val')">Copy</button>
                </div>
                <div class="room-field">
                    <span class="room-label">Password</span>
                    <span class="room-val" id="room-pwd-val">${t.roomPassword}</span>
                    <button class="copy-btn" onclick="copyText('${t.roomPassword}', 'room-pwd-val')">Copy</button>
                </div>
                <div class="room-field">
                    <span class="room-label">Host</span>
                    <span class="room-val">${t.hostName}</span>
                </div>
                <div class="room-field">
                    <span class="room-label">Status</span>
                    <span class="room-val" style="color:var(--color-error);">${t.matchStatus}</span>
                </div>
            </div>
        </div>`;
    }

    // Countdown for upcoming
    let countdownHtml = '';
    if (t.status === 'upcoming') {
        countdownHtml = `<div class="modal-countdown" id="modal-countdown">Loading...</div>`;
    }

    // Join controls
    let joinHtml = '';
    if (t.status !== 'completed') {
        if (userJoinedTournaments.has(t.id)) {
            joinHtml = `<div class="join-success-msg">✔ You have joined this tournament!</div>`;
        } else if (t.joined >= t.slots) {
            joinHtml = `<button class="cta-btn primary-btn btn-large btn-disabled" disabled>Tournament Full</button>`;
        } else {
            joinHtml = `
            <div class="join-system">
                <div class="join-tabs">
                    <button class="join-tab-btn active" id="solo-tab" onclick="switchJoinTab('solo')">👤 Join Solo</button>
                    <button class="join-tab-btn" id="team-tab" onclick="switchJoinTab('team')">👥 Join as Team</button>
                </div>
                <div id="solo-panel" class="join-panel">
                    <button class="cta-btn primary-btn btn-large" onclick="confirmJoin(${t.id})">Confirm Solo Join</button>
                </div>
                <div id="team-panel" class="join-panel" style="display:none;">
                    <input type="text" class="team-name-input" id="team-name-input" placeholder="Enter your team name..." />
                    <button class="cta-btn primary-btn btn-large" onclick="joinAsTeam(${t.id})">Join as Team</button>
                    <div class="invite-section">
                        <div class="invite-code-display" id="invite-code-display" style="display:none;">
                            <span class="invite-label">Invite Code:</span>
                            <span class="invite-code" id="invite-code-val">—</span>
                            <button class="copy-btn" onclick="copyInviteCode()">Copy Link</button>
                        </div>
                        <button class="invite-gen-btn" id="gen-invite-btn" onclick="generateInviteCode(${t.id})">⚡ Generate Invite Code</button>
                    </div>
                </div>
            </div>`;
        }
    } else {
        joinHtml = `<button class="cta-btn primary-btn btn-large btn-disabled" disabled>Tournament Ended</button>`;
    }

    // Share button
    const shareHtml = `<button class="share-btn" onclick="shareTournament(${t.id})">🔗 Share Tournament</button>`;

    body.innerHTML = `
        <div class="modal-top">
            <div class="modal-game-tag">${icons[t.game] ? `<span class="modal-icon">${icons[t.game]}</span>` : ''} ${t.game}</div>
            <div class="modal-status">${getStatusBadge(t.status)}</div>
        </div>
        <h2 class="modal-tourney-name">${t.name}</h2>
        <p class="modal-organizer">Organized by <strong>${t.organizer}</strong></p>
        ${countdownHtml}
        ${roomHtml}
        <div class="modal-desc">${t.description.replace(/\n/g, '<br>')}</div>
        <div class="modal-meta-grid">
            <div class="modal-meta-item"><span class="meta-label">Team Size</span><span class="meta-val">${t.teamSize}v${t.teamSize}</span></div>
            <div class="modal-meta-item"><span class="meta-label">Mode</span><span class="meta-val">${t.mode}</span></div>
            <div class="modal-meta-item"><span class="meta-label">Map</span><span class="meta-val">${t.map}</span></div>
            <div class="modal-meta-item"><span class="meta-label">Entry Fee</span><span class="meta-val">${t.entry === 0 ? 'Free' : '₹' + t.entry}</span></div>
            <div class="modal-meta-item"><span class="meta-label">Slots Left</span><span class="meta-val" style="color:${t.slots - t.joined <= 3 ? 'var(--color-error)' : 'var(--color-primary)'};">${t.slots - t.joined}</span></div>
            <div class="modal-meta-item"><span class="meta-label">Host</span><span class="meta-val">${t.hostName}</span></div>
        </div>
        <div class="modal-rules">
            <h4>📜 Rules</h4>
            <p>${t.rules.replace(/\n/g, '<br>')}</p>
        </div>
        <div class="prize-section">
            <h4>🏆 Prize Pool — <span style="color:var(--color-secondary)">₹${t.prize.toLocaleString()}</span></h4>
            <div class="prize-list">${prizeHtml}</div>
        </div>
        ${joinHtml}
        ${shareHtml}
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Start modal countdown
    if (t.status === 'upcoming') {
        if (modalCountdownInterval) clearInterval(modalCountdownInterval);
        const el = document.getElementById('modal-countdown');
        const update = () => {
            const rem = t.startTime - Date.now();
            if (el) el.textContent = rem <= 0 ? '⚡ Starting soon!' : '⏱ Starts in: ' + formatTime(rem);
        };
        update();
        modalCountdownInterval = setInterval(update, 1000);
    }
};

window.closeModal = function () {
    const modal = document.getElementById('tourney-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (modalCountdownInterval) { clearInterval(modalCountdownInterval); modalCountdownInterval = null; }
};

window.switchJoinTab = function (tab) {
    const soloPanel = document.getElementById('solo-panel');
    const teamPanel = document.getElementById('team-panel');
    const soloBtn = document.getElementById('solo-tab');
    const teamBtn = document.getElementById('team-tab');
    if (tab === 'solo') {
        soloPanel.style.display = '';
        teamPanel.style.display = 'none';
        soloBtn.classList.add('active');
        teamBtn.classList.remove('active');
    } else {
        soloPanel.style.display = 'none';
        teamPanel.style.display = '';
        teamBtn.classList.add('active');
        soloBtn.classList.remove('active');
    }
};

window.confirmJoin = function (id) {
    const t = tournamentsData.find(x => x.id === id);
    if (!t || t.joined >= t.slots) return;
    t.joined++;
    userJoinedTournaments.add(id);
    filterAndRender();
    closeModal();
    showToast(`✔ You joined "${t.name}" solo!`);
};

window.joinAsTeam = function (id) {
    const t = tournamentsData.find(x => x.id === id);
    if (!t || t.joined >= t.slots) return;
    const nameInput = document.getElementById('team-name-input');
    const teamName = nameInput ? nameInput.value.trim() : 'My Team';
    if (!teamName) { showToast('⚠ Please enter a team name!'); return; }
    t.joined++;
    userJoinedTournaments.add(id);
    filterAndRender();
    closeModal();
    showToast(`✔ Team "${teamName}" joined "${t.name}"!`);
};

window.generateInviteCode = function (id) {
    const code = `SL-${id}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const display = document.getElementById('invite-code-display');
    const val = document.getElementById('invite-code-val');
    const btn = document.getElementById('gen-invite-btn');
    if (display) display.style.display = 'flex';
    if (val) val.textContent = code;
    if (btn) btn.textContent = '🔄 Regenerate';
    window._lastInviteCode = code;
};

window.copyInviteCode = function () {
    const code = window._lastInviteCode || '';
    const link = `https://squadlink.gg/join?code=${code}`;
    navigator.clipboard.writeText(link).then(() => showToast('✔ Invite link copied!')).catch(() => {
        showToast(`Link: ${link}`);
    });
};

window.copyText = function (text, elId) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('✔ Copied: ' + text);
        const el = document.getElementById(elId);
        if (el) { el.style.color = 'var(--color-primary)'; setTimeout(() => { el.style.color = ''; }, 1500); }
    }).catch(() => showToast('Copied: ' + text));
};

window.shareTournament = function (id) {
    const t = tournamentsData.find(x => x.id === id);
    const url = `https://squadlink.gg/tournaments/${id}`;
    navigator.clipboard.writeText(url).then(() => showToast(`🔗 Link copied: ${t.name}`)).catch(() => showToast('🔗 Share: ' + url));
};

// ========== BRACKET MODAL ==========
window.openBracket = function (id) {
    const t = tournamentsData.find(x => x.id === id);
    if (!t || !t.bracket) return;
    const b = t.bracket;

    const qfHtml = b.quarterfinals.map(m => `
        <div class="bracket-match">
            <div class="bracket-team ${m.winner === m.team1 ? 'bracket-winner' : 'bracket-loser'}">${m.team1}</div>
            <div class="bracket-vs">vs</div>
            <div class="bracket-team ${m.winner === m.team2 ? 'bracket-winner' : 'bracket-loser'}">${m.team2}</div>
        </div>
    `).join('');

    const sfHtml = b.semifinals.map(m => `
        <div class="bracket-match">
            <div class="bracket-team ${m.winner === m.team1 ? 'bracket-winner' : 'bracket-loser'}">${m.team1}</div>
            <div class="bracket-vs">vs</div>
            <div class="bracket-team ${m.winner === m.team2 ? 'bracket-winner' : 'bracket-loser'}">${m.team2}</div>
        </div>
    `).join('');

    const f = b.final;

    const modal = document.getElementById('bracket-modal');
    document.getElementById('bracket-modal-body').innerHTML = `
        <h2 class="bracket-title">🏆 ${t.name}</h2>
        <p class="bracket-subtitle">Tournament Bracket</p>
        <div class="bracket-flow">
            <div class="bracket-round">
                <div class="bracket-round-label">Quarter Finals</div>
                ${qfHtml}
            </div>
            <div class="bracket-arrow">→</div>
            <div class="bracket-round">
                <div class="bracket-round-label">Semi Finals</div>
                ${sfHtml}
            </div>
            <div class="bracket-arrow">→</div>
            <div class="bracket-round">
                <div class="bracket-round-label">Final</div>
                <div class="bracket-match">
                    <div class="bracket-team ${f.winner === f.team1 ? 'bracket-winner' : 'bracket-loser'}">${f.team1}</div>
                    <div class="bracket-vs">vs</div>
                    <div class="bracket-team ${f.winner === f.team2 ? 'bracket-winner' : 'bracket-loser'}">${f.team2}</div>
                </div>
            </div>
            <div class="bracket-arrow">→</div>
            <div class="bracket-winner-section">
                <div class="bracket-round-label">Winner</div>
                <div class="bracket-champion">🏆 ${b.final.winner}</div>
            </div>
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeBracket = function () {
    document.getElementById('bracket-modal').classList.remove('active');
    document.body.style.overflow = '';
};

// ========== TOAST ==========
function showToast(message) {
    const existing = document.getElementById('sl-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'sl-toast';
    toast.className = 'sl-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('sl-toast-show'));
    setTimeout(() => {
        toast.classList.remove('sl-toast-show');
        setTimeout(() => toast.remove(), 400);
    }, 2800);
}

// ========== JOIN LOGIC (OLD) ==========
window.joinTournament = function (id, event) {
    if (event) event.preventDefault();
    openModal(id);
};

// ========== FILTER LOGIC ==========
function filterAndRender() {
    clearCountdowns();
    const searchTerm = searchInput.value.toLowerCase();
    const gameVal = gameFilter.value;
    const statusVal = statusFilter.value;
    const entryVal = entryFilter.value;

    let filtered = tournamentsData.filter(t => {
        if (searchTerm && !t.name.toLowerCase().includes(searchTerm)) return false;
        if (gameVal !== 'all' && t.game !== gameVal) return false;
        if (statusVal !== 'all' && t.status !== statusVal) return false;
        if (currentTab !== 'all' && t.status !== currentTab) return false;
        if (entryVal === 'free' && t.entry > 0) return false;
        if (entryVal === 'paid' && t.entry === 0) return false;
        return true;
    });

    let featured = filtered.find(t => t.isFeatured);
    if (!featured && filtered.length > 0) {
        featured = [...filtered].sort((a, b) => b.prize - a.prize)[0];
    }

    renderFeatured(featured);
    renderGrid(filtered);
    renderHistory();
}

// ========== EVENT LISTENERS ==========
searchInput.addEventListener('input', filterAndRender);
gameFilter.addEventListener('change', filterAndRender);
statusFilter.addEventListener('change', filterAndRender);
entryFilter.addEventListener('change', filterAndRender);

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.getAttribute('data-tab');
        filterAndRender();
    });
});

// Close modals on backdrop click
document.getElementById('tourney-modal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
});
document.getElementById('bracket-modal').addEventListener('click', function (e) {
    if (e.target === this) closeBracket();
});

// ESC key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeBracket(); }
});

// INITIAL RENDER
document.addEventListener('DOMContentLoaded', () => {
    filterAndRender();
});
