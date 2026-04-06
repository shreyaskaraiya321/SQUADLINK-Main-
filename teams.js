
// ========== DATA STORE ==========
const STORE = {
  get teams() { return JSON.parse(localStorage.getItem('squadlink_teams') || '[]'); },
  set teams(v) { localStorage.setItem('squadlink_teams', JSON.stringify(v)); },
  get profile() { return JSON.parse(localStorage.getItem('squadlink_playerProfile') || 'null'); },
  set profile(v) { localStorage.setItem('squadlink_playerProfile', JSON.stringify(v)); },
  get requests() { return JSON.parse(localStorage.getItem('squadlink_joinRequests') || '[]'); },
  set requests(v) { localStorage.setItem('squadlink_joinRequests', JSON.stringify(v)); },
  get invites() { return JSON.parse(localStorage.getItem('squadlink_invites') || '[]'); },
  set invites(v) { localStorage.setItem('squadlink_invites', JSON.stringify(v)); },
};

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

// ========== MOCK PLAYERS ==========
const MOCK_PLAYERS = [
  { id:'p1', username:'NeonSlayer', game:'Valorant', rank:'Diamond', role:'Entry', playstyle:'Aggressive', region:'India', language:'Hindi', playTime:'Evening', voiceChat:'yes', kd:2.1, winRate:67, online:true },
  { id:'p2', username:'ShadowIGL', game:'Valorant', rank:'Immortal', role:'IGL', playstyle:'Balanced', region:'India', language:'English', playTime:'Night', voiceChat:'yes', kd:1.4, winRate:72, online:false },
  { id:'p3', username:'AceSniper99', game:'BGMI', rank:'Ace', role:'Sniper', playstyle:'Defensive', region:'India', language:'Hindi', playTime:'Evening', voiceChat:'yes', kd:3.2, winRate:61, online:true },
  { id:'p4', username:'GhostLurker', game:'Valorant', rank:'Platinum', role:'Lurker', playstyle:'Defensive', region:'Asia', language:'English', playTime:'Night', voiceChat:'no', kd:1.8, winRate:55, online:false },
  { id:'p5', username:'FrostSupport', game:'CS2', rank:'Gold', role:'Support', playstyle:'Balanced', region:'India', language:'English', playTime:'Afternoon', voiceChat:'yes', kd:1.1, winRate:60, online:true },
  { id:'p6', username:'BlazeFlex', game:'Free Fire', rank:'Diamond', role:'Flex', playstyle:'Aggressive', region:'SEA', language:'English', playTime:'Evening', voiceChat:'yes', kd:2.5, winRate:64, online:true },
  { id:'p7', username:'CobraEntry', game:'COD Mobile', rank:'Gold', role:'Entry', playstyle:'Aggressive', region:'India', language:'Hindi', playTime:'Evening', voiceChat:'yes', kd:2.3, winRate:58, online:false },
  { id:'p8', username:'VortexIGL', game:'BGMI', rank:'Conqueror', role:'IGL', playstyle:'Balanced', region:'India', language:'Hindi', playTime:'Night', voiceChat:'yes', kd:1.6, winRate:78, online:true },
  { id:'p9', username:'PhantomAWP', game:'CS2', rank:'Platinum', role:'Sniper', playstyle:'Defensive', region:'EU', language:'English', playTime:'Morning', voiceChat:'no', kd:2.8, winRate:55, online:false },
  { id:'p10', username:'StormFlex', game:'Valorant', rank:'Gold', role:'Flex', playstyle:'Aggressive', region:'India', language:'Tamil', playTime:'Evening', voiceChat:'yes', kd:1.7, winRate:62, online:true },
  { id:'p11', username:'CyberSupport', game:'Free Fire', rank:'Silver', role:'Support', playstyle:'Defensive', region:'India', language:'Telugu', playTime:'Afternoon', voiceChat:'yes', kd:0.9, winRate:54, online:false },
  { id:'p12', username:'RapidEntry', game:'COD Mobile', rank:'Diamond', role:'Entry', playstyle:'Aggressive', region:'Asia', language:'English', playTime:'Night', voiceChat:'yes', kd:2.6, winRate:69, online:true },
];

// ========== SEED DEFAULT TEAMS ==========
function seedTeams() {
  if (STORE.teams.length > 0) return;
  STORE.teams = [
    { id:'t1', name:'Neon Predators', game:'Valorant', logo:'🦁', description:'Diamond+ Valorant squad looking for an IGL and Support. Compete in weekly tournaments.', requiredRoles:['IGL','Support'], rankRequirement:'Diamond+', region:'India', privacy:'public', leaderId:'demo', members:[{userId:'demo',username:'Founder',role:'Entry',joinedAt:new Date().toISOString()}], stats:{matchesPlayed:24,wins:17,tournamentsPlayed:3}, achievements:[{icon:'🏆',name:'First Blood',desc:'First tournament win'},{icon:'🔥',name:'Hot Streak',desc:'5 wins in a row'},{icon:'⚔️',name:'Veteran',desc:'25+ matches played'}], matchHistory:[{result:'win',map:'Bind',score:'13-8',date:'2025-03-25'},{result:'loss',map:'Ascent',score:'9-13',date:'2025-03-22'},{result:'win',map:'Icebox',score:'13-10',date:'2025-03-20'}], createdAt:new Date().toISOString() },
    { id:'t2', name:'Shadow Brotherhood', game:'BGMI', logo:'🐺', description:'Conqueror-level BGMI team for competitive ranked and tournaments. Looking for a sniper.', requiredRoles:['Sniper'], rankRequirement:'Conqueror', region:'India', privacy:'public', leaderId:'demo2', members:[{userId:'demo2',username:'BattleKing',role:'IGL',joinedAt:new Date().toISOString()},{userId:'p8',username:'VortexIGL',role:'Flex',joinedAt:new Date().toISOString()}], stats:{matchesPlayed:40,wins:28,tournamentsPlayed:5}, achievements:[{icon:'👑',name:'Conquerors',desc:'All members reached Conqueror'},{icon:'🏆',name:'Champions',desc:'2x tournament champion'},{icon:'💎',name:'Diamond Run',desc:'10 wins in a season'}], matchHistory:[{result:'win',map:'Erangel',score:'#1 Chicken Dinner',date:'2025-03-26'},{result:'win',map:'Miramar',score:'#1 Chicken Dinner',date:'2025-03-24'}], createdAt:new Date().toISOString() },
    { id:'t3', name:'Ghost Protocol', game:'CS2', logo:'👻', description:'Competitive CS2 squad from EU. Looking for a dedicated support and flex player.', requiredRoles:['Support','Flex'], rankRequirement:'Gold+', region:'EU', privacy:'public', leaderId:'demo3', members:[{userId:'demo3',username:'EUGhost',role:'IGL',joinedAt:new Date().toISOString()},{userId:'p9',username:'PhantomAWP',role:'Sniper',joinedAt:new Date().toISOString()}], stats:{matchesPlayed:18,wins:11,tournamentsPlayed:2}, achievements:[{icon:'💀',name:'Headhunter',desc:'Highest avg HS rating'},{icon:'🎯',name:'Precise',desc:'90%+ HS rate in 5 matches'}], matchHistory:[{result:'win',map:'Mirage',score:'16-11',date:'2025-03-27'},{result:'loss',map:'Dust 2',score:'12-16',date:'2025-03-25'}], createdAt:new Date().toISOString() },
    { id:'t4', name:'Blaze Squad', game:'Free Fire', logo:'🔥', description:'Free Fire team competing in Asian servers. Recruiting skilled entry fraggers.', requiredRoles:['Entry','Lurker'], rankRequirement:'Diamond+', region:'SEA', privacy:'public', leaderId:'demo4', members:[{userId:'demo4',username:'BlazeMaster',role:'IGL',joinedAt:new Date().toISOString()}], stats:{matchesPlayed:32,wins:20,tournamentsPlayed:4}, achievements:[{icon:'🔥',name:'On Fire',desc:'3 Booyahs in a day'}], matchHistory:[{result:'win',map:'Bermuda',score:'Booyah!',date:'2025-03-26'}], createdAt:new Date().toISOString() },
    { id:'t5', name:'Phantom Force', game:'COD Mobile', logo:'⚡', description:'COD Mobile squad for Battle Royale and Multiplayer ranked. Any rank welcome.', requiredRoles:['Support','Sniper','Flex'], rankRequirement:'Any', region:'India', privacy:'public', leaderId:'demo5', members:[{userId:'demo5',username:'PhantomX',role:'Entry',joinedAt:new Date().toISOString()},{userId:'p7',username:'CobraEntry',role:'Lurker',joinedAt:new Date().toISOString()}], stats:{matchesPlayed:15,wins:8,tournamentsPlayed:1}, achievements:[], matchHistory:[{result:'loss',map:'Standoff',score:'45-60',date:'2025-03-27'}], createdAt:new Date().toISOString() },
  ];
}

// ========== TOAST ==========
function toast(msg, type='info') {
  const c = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  const icons = { success:'✅', error:'❌', warn:'⚠️', info:'ℹ️' };
  el.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  c.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

// ========== SCROLL PROGRESS ==========
const scrollIndicator = document.querySelector('.scroll-indicator');
const progressRing = document.querySelector('.progress-ring');
const percentText = document.querySelector('.scroll-percentage');
const circ = 2 * Math.PI * 27;
progressRing.style.strokeDasharray = circ;
progressRing.style.strokeDashoffset = circ;
window.addEventListener('scroll', () => {
  const pct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100) || 0;
  progressRing.style.strokeDashoffset = circ - (pct / 100) * circ;
  percentText.textContent = pct + '%';
  scrollIndicator.classList.toggle('visible', window.scrollY > 50);
  percentText.classList.toggle('past-half', pct >= 50);
});
scrollIndicator.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.custom-cursor');
const trails = document.querySelectorAll('.cursor-trail');
let mx=0, my=0, cx=0, cy=0;
const tp = [{x:0,y:0},{x:0,y:0},{x:0,y:0}];
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor() {
  cx += (mx-cx)*0.15; cy += (my-cy)*0.15;
  cursor.style.left = cx+'px'; cursor.style.top = cy+'px';
  tp[0].x += (cx-tp[0].x)*0.1; tp[0].y += (cy-tp[0].y)*0.1;
  tp[1].x += (tp[0].x-tp[1].x)*0.1; tp[1].y += (tp[0].y-tp[1].y)*0.1;
  tp[2].x += (tp[1].x-tp[2].x)*0.1; tp[2].y += (tp[1].y-tp[2].y)*0.1;
  trails.forEach((t,i) => { t.style.left=tp[i].x+'px'; t.style.top=tp[i].y+'px'; });
  requestAnimationFrame(animCursor);
})();
document.addEventListener('mouseover', e => {
  if (e.target.closest('a,button,input,select,textarea,.team-card,.player-card,.myteam-card')) cursor.classList.add('hover');
  else cursor.classList.remove('hover');
});

// ========== NAV AUTH ==========
function initNav() {
  const user = JSON.parse(localStorage.getItem('squadlink_currentUser') || 'null');
  const btn = document.getElementById('nav-join-btn');
  if (user && btn) {
    btn.innerHTML = `${user.profilePhoto ? `<img src="${user.profilePhoto}" style="width:22px;height:22px;border-radius:50%;object-fit:cover;margin-right:6px;vertical-align:middle;border:1px solid #00FFFF">` : ''}<span style="vertical-align:middle">${user.username}</span>`;
    btn.onclick = () => window.location.href = 'profile.html';
  }
}

// ========== HERO COUNTER ==========
function animCounter(el, target) {
  let start = 0;
  const step = () => {
    start += Math.ceil((target - start) / 12);
    el.textContent = start.toLocaleString();
    if (start < target) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
}

// ========== TABS ==========
function initTabs() {
  document.querySelectorAll('.teams-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.teams-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-content-' + tab.dataset.tab)?.classList.add('active');
      if (tab.dataset.tab === 'find') renderPlayers();
      if (tab.dataset.tab === 'invites') renderInvites();
      if (tab.dataset.tab === 'myteams') renderMyTeams();
    });
  });
}

// ========== RENDER TEAMS ==========
function renderTeams(filter = {}) {
  const grid = document.getElementById('teams-grid');
  const empty = document.getElementById('browse-empty');
  let teams = STORE.teams;
  if (filter.search) teams = teams.filter(t => (t.name+t.game+t.region).toLowerCase().includes(filter.search.toLowerCase()));
  if (filter.game) teams = teams.filter(t => t.game === filter.game);
  if (filter.region) teams = teams.filter(t => t.region === filter.region);
  if (filter.rank) teams = teams.filter(t => t.rankRequirement === filter.rank);
  document.getElementById('tab-browse-badge').textContent = STORE.teams.length;
  grid.innerHTML = '';
  if (!teams.length) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  teams.forEach(team => {
    const wr = team.stats.matchesPlayed ? Math.round((team.stats.wins / team.stats.matchesPlayed) * 100) : 0;
    const autoFill = team.requiredRoles.length > 0;
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <div class="team-card-banner" style="background:linear-gradient(135deg,${gameColor(team.game)}20,#1a1f35)"></div>
      <div class="team-card-body">
        <div class="team-card-header">
          <div class="team-card-logo">${team.logo || '🎮'}</div>
          <div class="team-card-info">
            <div class="team-card-name">${team.name}</div>
            <div class="team-card-game">${team.game}</div>
          </div>
        </div>
        <div class="team-card-tags">
          <span class="team-tag team-tag-region">📍 ${team.region}</span>
          <span class="team-tag team-tag-rank">⭐ ${team.rankRequirement}</span>
          <span class="team-tag team-tag-privacy">${team.privacy === 'public' ? '🌐 Public' : '🔒 Private'}</span>
          ${autoFill ? '<span class="team-tag team-tag-autofill">⚡ Recruiting</span>' : ''}
        </div>
        <div class="member-count">👥 ${team.members.length} member${team.members.length !== 1 ? 's' : ''}</div>
        <div class="team-card-stats">
          <div class="tc-stat"><span class="tc-stat-val">${team.stats.matchesPlayed}</span><span class="tc-stat-label">Matches</span></div>
          <div class="tc-stat"><span class="tc-stat-val">${team.stats.wins}</span><span class="tc-stat-label">Wins</span></div>
          <div class="tc-stat"><span class="tc-stat-val">${wr}%</span><span class="tc-stat-label">Win %</span></div>
        </div>
        ${team.requiredRoles.length ? `<div class="team-card-roles">${team.requiredRoles.map(r=>`<span class="role-pill">${r}</span>`).join('')}</div>` : ''}
        <div class="team-card-footer">
          <button class="cta-btn secondary-btn view-team-btn" data-id="${team.id}">View</button>
          <button class="cta-btn primary-btn join-team-btn" data-id="${team.id}">Join Team</button>
        </div>
      </div>`;
    card.querySelector('.view-team-btn').addEventListener('click', () => openTeamProfile(team.id));
    card.querySelector('.join-team-btn').addEventListener('click', () => sendJoinRequest(team.id));
    grid.appendChild(card);
  });
}

function gameColor(g) {
  const c = { Valorant:'#ff4655', BGMI:'#f5a623', 'Free Fire':'#ff6600', 'COD Mobile':'#7fba00', CS2:'#de9b35' };
  return c[g] || '#00ffff';
}

// ========== RENDER MY TEAMS ==========
function renderMyTeams() {
  const grid = document.getElementById('myteams-grid');
  const empty = document.getElementById('myteams-empty');
  const user = JSON.parse(localStorage.getItem('squadlink_currentUser') || 'null');
  const userId = user?.id || 'current_user';
  const mine = STORE.teams.filter(t => t.leaderId === userId || t.members.some(m => m.userId === userId));
  document.getElementById('tab-myteams-badge').textContent = mine.length;
  grid.innerHTML = '';
  if (!mine.length) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  mine.forEach(team => {
    const isLeader = team.leaderId === userId;
    const wr = team.stats.matchesPlayed ? Math.round((team.stats.wins / team.stats.matchesPlayed) * 100) : 0;
    const card = document.createElement('div');
    card.className = 'myteam-card';
    card.innerHTML = `
      <div class="myteam-card-header">
        <div class="myteam-logo">${team.logo || '🎮'}</div>
        <div>
          <div class="myteam-name">${team.name}</div>
          <span class="myteam-role-badge ${isLeader ? 'badge-leader' : 'badge-member'}">${isLeader ? '👑 Leader' : '⚔️ Member'}</span>
        </div>
      </div>
      <div class="myteam-stats">
        <div class="tc-stat"><span class="tc-stat-val">${team.stats.matchesPlayed}</span><span class="tc-stat-label">Matches</span></div>
        <div class="tc-stat"><span class="tc-stat-val">${team.stats.wins}</span><span class="tc-stat-label">Wins</span></div>
        <div class="tc-stat"><span class="tc-stat-val">${wr}%</span><span class="tc-stat-label">Win %</span></div>
      </div>
      <div class="myteam-actions">
        <button class="cta-btn secondary-btn view-team-btn" data-id="${team.id}">View Team</button>
        ${isLeader ? `<button class="cta-btn primary-btn manage-team-btn" data-id="${team.id}">Manage</button>` : ''}
      </div>`;
    card.querySelector('.view-team-btn').addEventListener('click', () => openTeamProfile(team.id));
    card.querySelector('.manage-team-btn')?.addEventListener('click', () => { openTeamProfile(team.id); setTimeout(() => clickTPTab('manage'), 400); });
    grid.appendChild(card);
  });
}

// ========== TEAM PROFILE MODAL ==========
let currentTeamId = null;
function openTeamProfile(id) {
  const team = STORE.teams.find(t => t.id === id);
  if (!team) return;
  currentTeamId = id;
  const user = JSON.parse(localStorage.getItem('squadlink_currentUser') || 'null');
  const userId = user?.id || 'current_user';
  const isLeader = team.leaderId === userId;
  const isMember = team.members.some(m => m.userId === userId);
  const wr = team.stats.matchesPlayed ? Math.round((team.stats.wins / team.stats.matchesPlayed) * 100) : 0;

  document.getElementById('tp-name').textContent = team.name;
  document.getElementById('tp-game').textContent = team.game;
  document.getElementById('tp-region').textContent = team.region;
  document.getElementById('tp-rank-badge').textContent = team.rankRequirement;
  document.getElementById('tp-privacy-badge').textContent = team.privacy.toUpperCase();
  document.getElementById('tp-logo').innerHTML = team.logoData ? `<img src="${team.logoData}" alt="logo">` : team.logo || '🎮';
  document.getElementById('tp-hero-bg').style.background = `linear-gradient(135deg,${gameColor(team.game)}15,#0d1127)`;
  document.getElementById('tps-matches').textContent = team.stats.matchesPlayed;
  document.getElementById('tps-wins').textContent = team.stats.wins;
  document.getElementById('tps-winrate').textContent = wr + '%';
  document.getElementById('tps-tournaments').textContent = team.stats.tournamentsPlayed;
  document.getElementById('tp-description').textContent = team.description || 'No description provided.';
  document.getElementById('tp-leader-actions').style.display = isLeader ? 'block' : 'none';
  document.getElementById('tp-manage-tab').style.display = isLeader ? 'block' : 'none';

  // Roster
  const roster = document.getElementById('tp-roster');
  roster.innerHTML = team.members.map(m => `
    <div class="roster-member">
      <div class="roster-avatar">${m.username[0]}</div>
      <div>
        <div class="roster-name">${m.username} ${m.userId === team.leaderId ? '<span class="roster-leader-tag">Leader</span>':''}</div>
        <div class="roster-role">${m.role || 'Player'}</div>
      </div>
    </div>`).join('');

  // Required roles
  const roleSection = document.getElementById('tp-required-roles-section');
  const roleList = document.getElementById('tp-roles-list');
  if (team.requiredRoles.length) {
    roleSection.style.display = '';
    roleList.innerHTML = team.requiredRoles.map(r => `<span class="open-role-pill">+ ${r}</span>`).join('');
  } else { roleSection.style.display = 'none'; }

  // Achievements
  const achGrid = document.getElementById('tp-achievements-grid');
  const achEmpty = document.getElementById('tp-achievements-empty');
  if (team.achievements.length) {
    achEmpty.classList.add('hidden');
    achGrid.innerHTML = team.achievements.map(a => `<div class="achievement-badge"><span class="ach-icon">${a.icon}</span><div class="ach-name">${a.name}</div><div class="ach-desc">${a.desc}</div></div>`).join('');
  } else { achEmpty.classList.remove('hidden'); achGrid.innerHTML = ''; }

  // Match History
  const histList = document.getElementById('tp-match-history');
  const histEmpty = document.getElementById('tp-history-empty');
  if (team.matchHistory.length) {
    histEmpty.classList.add('hidden');
    histList.innerHTML = team.matchHistory.map(m => `<div class="match-history-item"><span class="mh-result ${m.result==='win'?'mh-win':'mh-loss'}">${m.result.toUpperCase()}</span><span class="mh-map">${m.map}</span><span class="mh-score">${m.score}</span><span class="mh-date">${m.date}</span></div>`).join('');
  } else { histEmpty.classList.remove('hidden'); histList.innerHTML = ''; }

  // Join button
  const footer = document.getElementById('tp-footer-actions');
  const joinBtn = document.getElementById('tp-join-btn');
  if (isMember || isLeader) {
    footer.style.display = 'none';
  } else {
    footer.style.display = 'block';
    joinBtn.textContent = '⚔️ Request to Join';
    joinBtn.onclick = () => { sendJoinRequest(id); document.getElementById('team-profile-modal').classList.remove('active'); };
  }

  // Simulate buttons (leader)
  const simMatch = document.getElementById('tp-sim-match-btn');
  const simTour = document.getElementById('tp-sim-tournament-btn');
  if (simMatch) simMatch.onclick = () => simulateMatch(id);
  if (simTour) simTour.onclick = () => simulateTournament(id);

  // Reset to roster tab
  clickTPTab('roster');
  document.getElementById('team-profile-modal').classList.add('active');
}

function clickTPTab(name) {
  document.querySelectorAll('.tp-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tp-tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector(`.tp-tab[data-tptab="${name}"]`)?.classList.add('active');
  document.getElementById('tptab-' + name)?.classList.add('active');
}

document.querySelectorAll('.tp-tab').forEach(t => t.addEventListener('click', () => clickTPTab(t.dataset.tptab)));

// ========== JOIN REQUEST ==========
function sendJoinRequest(teamId) {
  const user = JSON.parse(localStorage.getItem('squadlink_currentUser') || 'null');
  const userId = user?.id || 'current_user';
  const username = user?.username || 'You';
  const team = STORE.teams.find(t => t.id === teamId);
  const existing = STORE.requests.find(r => r.teamId === teamId && r.userId === userId);
  if (existing) { toast('Already sent a request to this team', 'warn'); return; }
  if (team.members.some(m => m.userId === userId)) { toast('You are already a member!', 'warn'); return; }
  const reqs = STORE.requests;
  reqs.push({ id: uid(), teamId, teamName: team.name, teamLogo: team.logo, userId, username, status: 'pending', createdAt: new Date().toISOString() });
  STORE.requests = reqs;
  updateInviteBadge();
  toast(`Join request sent to ${team.name}!`, 'success');
}

// ========== INVITE SYSTEM ==========
function sendInvite(playerId, teamId) {
  const player = MOCK_PLAYERS.find(p => p.id === playerId);
  const team = STORE.teams.find(t => t.id === teamId);
  if (!player || !team) return;
  const invites = STORE.invites;
  if (invites.find(i => i.playerId === playerId && i.teamId === teamId)) { toast('Already invited this player', 'warn'); return; }
  invites.push({ id: uid(), teamId, teamName: team.name, teamLogo: team.logo, playerId, playerName: player.username, status: 'pending', createdAt: new Date().toISOString() });
  STORE.invites = invites;
  toast(`Invited ${player.username} to ${team.name}!`, 'success');
  renderInviteSearch(document.getElementById('invite-search-input').value, teamId);
}

// ========== INVITE SEARCH ==========
function renderInviteSearch(query, teamId) {
  const container = document.getElementById('invite-search-results');
  if (!query.trim()) { container.innerHTML = ''; return; }
  const results = MOCK_PLAYERS.filter(p => p.username.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  if (!results.length) { container.innerHTML = '<div style="color:var(--color-text-secondary);font-size:.85rem;padding:10px">No players found</div>'; return; }
  container.innerHTML = results.map(p => {
    const invited = STORE.invites.find(i => i.playerId === p.id && i.teamId === teamId);
    return `<div class="invite-result-row">
      <div class="invite-result-avatar">${p.username[0]}</div>
      <span class="invite-result-name">${p.username} <span style="font-size:.75rem;color:var(--color-text-secondary)">${p.role} · ${p.rank}</span></span>
      <button class="cta-btn ${invited?'secondary-btn':'primary-btn'} invite-result-btn" data-pid="${p.id}" ${invited?'disabled':''}>
        ${invited ? '✓ Invited' : 'Invite'}
      </button>
    </div>`;
  }).join('');
  container.querySelectorAll('.invite-result-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => sendInvite(btn.dataset.pid, teamId));
  });
}

document.getElementById('invite-search-btn').addEventListener('click', () => {
  const q = document.getElementById('invite-search-input').value;
  if (currentTeamId) renderInviteSearch(q, currentTeamId);
});
document.getElementById('invite-search-input').addEventListener('input', e => {
  if (currentTeamId) renderInviteSearch(e.target.value, currentTeamId);
});

// ========== RENDER INVITES TAB ==========
function renderInvites() {
  // Outgoing join requests
  const reqList = document.getElementById('requests-list');
  const reqs = STORE.requests;
  reqList.innerHTML = reqs.length ? reqs.map(r => `
    <div class="request-card">
      <div class="invite-logo">${r.teamLogo || '🎮'}</div>
      <div class="invite-info">
        <div class="invite-team-name">${r.teamName}</div>
        <div class="invite-meta">Join request sent</div>
      </div>
      <span class="status-badge status-${r.status}">${r.status.toUpperCase()}</span>
    </div>`).join('') : '<div class="empty-invites"><span class="empty-invites-icon">📭</span>No join requests sent yet</div>';

  // Incoming team invites received
  const invList = document.getElementById('invites-list');
  const allInvites = STORE.invites.filter(i => i.status === 'pending');
  invList.innerHTML = allInvites.length ? allInvites.map(inv => `
    <div class="invite-card" id="invite-${inv.id}">
      <div class="invite-logo">${inv.teamLogo || '🎮'}</div>
      <div class="invite-info">
        <div class="invite-team-name">${inv.teamName}</div>
        <div class="invite-meta">${inv.playerName} — Invited to join</div>
      </div>
      <div class="invite-actions">
        <button class="cta-btn primary-btn accept-invite" data-id="${inv.id}" style="padding:8px 14px;font-size:.8rem">Accept</button>
        <button class="cta-btn secondary-btn reject-invite" data-id="${inv.id}" style="padding:8px 14px;font-size:.8rem">Reject</button>
      </div>
    </div>`).join('') : '<div class="empty-invites"><span class="empty-invites-icon">📬</span>No pending invites</div>';

  // Incoming join requests (for team leaders)
  const user = JSON.parse(localStorage.getItem('squadlink_currentUser') || 'null');
  const userId = user?.id || 'current_user';
  const myLeadTeams = STORE.teams.filter(t => t.leaderId === userId).map(t => t.id);
  const incoming = STORE.requests.filter(r => myLeadTeams.includes(r.teamId) && r.status === 'pending');
  const inList = document.getElementById('incoming-requests-list');
  inList.innerHTML = incoming.length ? incoming.map(r => `
    <div class="invite-card" id="req-${r.id}">
      <div class="invite-logo">👤</div>
      <div class="invite-info">
        <div class="invite-team-name">${r.username}</div>
        <div class="invite-meta">Wants to join ${r.teamName}</div>
      </div>
      <div class="invite-actions">
        <button class="cta-btn primary-btn accept-req" data-id="${r.id}" style="padding:8px 14px;font-size:.8rem">Accept</button>
        <button class="cta-btn secondary-btn reject-req" data-id="${r.id}" style="padding:8px 14px;font-size:.8rem">Reject</button>
      </div>
    </div>`).join('') : '<div class="empty-invites"><span class="empty-invites-icon">🏴</span>No incoming requests</div>';

  // Accept/Reject invite listeners
  document.querySelectorAll('.accept-invite').forEach(btn => btn.addEventListener('click', () => {
    const invs = STORE.invites; const inv = invs.find(i => i.id === btn.dataset.id);
    if (inv) { inv.status = 'accepted'; STORE.invites = invs; toast(`Joined ${inv.teamName}!`, 'success'); renderInvites(); }
  }));
  document.querySelectorAll('.reject-invite').forEach(btn => btn.addEventListener('click', () => {
    const invs = STORE.invites.filter(i => i.id !== btn.dataset.id);
    STORE.invites = invs; toast('Invite declined', 'info'); renderInvites();
  }));

  // Accept/Reject join request (leader)
  document.querySelectorAll('.accept-req').forEach(btn => btn.addEventListener('click', () => {
    const reqs = STORE.requests; const req = reqs.find(r => r.id === btn.dataset.id);
    if (req) {
      req.status = 'accepted';
      const teams = STORE.teams; const team = teams.find(t => t.id === req.teamId);
      if (team && !team.members.some(m => m.userId === req.userId)) {
        team.members.push({ userId: req.userId, username: req.username, role: 'Player', joinedAt: new Date().toISOString() });
        STORE.teams = teams;
      }
      STORE.requests = reqs; toast(`${req.username} added to team!`, 'success'); renderInvites();
    }
  }));
  document.querySelectorAll('.reject-req').forEach(btn => btn.addEventListener('click', () => {
    const reqs = STORE.requests; const req = reqs.find(r => r.id === btn.dataset.id);
    if (req) { req.status = 'rejected'; STORE.requests = reqs; toast('Request rejected', 'info'); renderInvites(); }
  }));

  updateInviteBadge();
}

function updateInviteBadge() {
  const badge = document.getElementById('tab-invites-badge');
  const count = STORE.invites.filter(i => i.status==='pending').length + STORE.requests.filter(r => r.status==='pending').length;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline-block' : 'none';
}

// ========== SMART MATCHING ==========
function matchScore(player, profile) {
  let score = 0;
  if (!profile) return Math.floor(Math.random() * 40 + 30);
  if (player.game === profile.game) score += 40;
  if (player.region === profile.region) score += 20;
  const ranks = ['Bronze','Silver','Gold','Platinum','Diamond','Immortal','Radiant','Ace','Conqueror'];
  const pR = ranks.indexOf(profile.rank), plR = ranks.indexOf(player.rank);
  if (Math.abs(pR - plR) <= 1) score += 30;
  else if (Math.abs(pR - plR) <= 2) score += 15;
  if (player.voiceChat === profile.voiceChat) score += 5;
  if (player.playstyle === profile.playstyle) score += 5;
  return Math.min(score, 100);
}

function renderPlayers() {
  const profile = STORE.profile;
  const filterGame = document.getElementById('match-filter-game').value;
  const filterRegion = document.getElementById('match-filter-region').value;
  const filterRole = document.getElementById('match-filter-role').value;

  let players = MOCK_PLAYERS.slice();
  if (filterGame) players = players.filter(p => p.game === filterGame);
  if (filterRegion) players = players.filter(p => p.region === filterRegion);
  if (filterRole) players = players.filter(p => p.role === filterRole);

  players = players.map(p => ({ ...p, score: matchScore(p, profile) })).sort((a, b) => b.score - a.score);
  document.getElementById('match-count-label').textContent = `${players.length} player${players.length!==1?'s':''} found`;

  const grid = document.getElementById('players-grid');
  grid.innerHTML = '';
  players.forEach(p => {
    const isBest = p.score >= 80;
    const isRole = profile && p.role === (STORE.teams.find(t=>t.requiredRoles.includes(p.role))?.requiredRoles[0]);
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
      <div class="player-card-top">
        <div class="player-avatar">${p.username[0]}</div>
        <div class="player-name-wrap">
          <div class="player-name">${p.username}</div>
          <div class="player-game">${p.game}</div>
        </div>
        <div class="player-match-tags">
          ${isBest ? '<span class="match-tag match-tag-best">★ Best Match</span>' : ''}
          ${p.role === (profile?.role) ? '<span class="match-tag match-tag-role">Role Match</span>' : ''}
          ${p.online ? '<span class="match-tag match-tag-online">Online</span>' : ''}
        </div>
      </div>
      <div class="player-stats">
        <div class="player-stat"><span class="player-stat-val">${p.kd}</span><span class="player-stat-label">K/D</span></div>
        <div class="player-stat"><span class="player-stat-val">${p.winRate}%</span><span class="player-stat-label">Win %</span></div>
        <div class="player-stat"><span class="player-stat-val">${p.rank}</span><span class="player-stat-label">Rank</span></div>
      </div>
      <div class="match-score-bar">
        <div class="match-score-bar-label"><span>Match Score</span><span>${p.score}%</span></div>
        <div class="match-score-track"><div class="match-score-fill" style="width:${p.score}%"></div></div>
      </div>
      <div class="player-tags-row">
        <span class="player-tag">📍 ${p.region}</span>
        <span class="player-tag">🎭 ${p.role}</span>
        <span class="player-tag">⚡ ${p.playstyle}</span>
        <span class="player-tag">🎙️ VC: ${p.voiceChat==='yes'?'Yes':'No'}</span>
      </div>
      <div class="player-card-actions">
        <button class="cta-btn primary-btn send-invite-player-btn" data-pid="${p.id}">📨 Send Invite</button>
      </div>`;
    card.querySelector('.send-invite-player-btn').addEventListener('click', () => {
      const myTeams = STORE.teams.filter(t => t.leaderId === (JSON.parse(localStorage.getItem('squadlink_currentUser')||'null')?.id||'current_user'));
      if (!myTeams.length) { toast('Create or lead a team first to invite players', 'warn'); return; }
      sendInvite(p.id, myTeams[0].id);
    });
    grid.appendChild(card);
  });
  updateProfileCard();
}

function updateProfileCard() {
  const p = STORE.profile;
  const user = JSON.parse(localStorage.getItem('squadlink_currentUser') || 'null');
  document.getElementById('profile-username-display').textContent = user?.username || 'Anonymous';
  document.getElementById('profile-avatar-display').textContent = (user?.username || 'A')[0].toUpperCase();
  if (p) {
    document.getElementById('profile-game-tag-display').textContent = `${p.game || '—'} · ${p.rank || '—'}`;
    document.getElementById('ps-kd').textContent = p.kd || '—';
    document.getElementById('ps-wr').textContent = p.winRate ? p.winRate+'%' : '—';
    document.getElementById('ps-rank').textContent = p.rank || '—';
    const tags = document.getElementById('profile-tags-display');
    tags.innerHTML = [p.role, p.region, p.playstyle, p.voiceChat==='yes'?'🎙️ VC':'🔇 No VC'].filter(Boolean).map(t => `<span class="profile-tag">${t}</span>`).join('');
  } else {
    document.getElementById('profile-game-tag-display').textContent = 'Profile incomplete';
  }
}

// ========== AUTO FILL ==========
function initAutoFill() {
  document.getElementById('autofill-trigger-btn').addEventListener('click', () => {
    const profile = STORE.profile;
    const drawer = document.getElementById('autofill-drawer');
    const results = document.getElementById('autofill-results');
    drawer.classList.remove('hidden');
    drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    const matchingTeams = STORE.teams.filter(t => t.requiredRoles.length > 0);
    if (!matchingTeams.length) { results.innerHTML = '<div style="color:var(--color-text-secondary);padding:10px">No teams recruiting right now.</div>'; return; }
    results.innerHTML = matchingTeams.slice(0, 4).map(team => {
      const wr = team.stats.matchesPlayed ? Math.round((team.stats.wins / team.stats.matchesPlayed) * 100) : 0;
      const score = profile ? (team.game === profile.game ? 50 : 20) + (team.region === profile.region ? 30 : 0) + (team.requiredRoles.includes(profile.role) ? 20 : 0) : Math.floor(Math.random() * 50 + 30);
      return `<div class="team-card" style="cursor:none">
        <div class="team-card-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
            <div class="team-card-logo" style="width:40px;height:40px;font-size:1.2rem">${team.logo}</div>
            <div><div class="team-card-name" style="font-size:.9rem">${team.name}</div><div class="team-card-game">${team.game}</div></div>
          </div>
          <div class="match-score-bar"><div class="match-score-bar-label"><span>Compatibility</span><span>${score}%</span></div><div class="match-score-track"><div class="match-score-fill" style="width:${score}%"></div></div></div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">${team.requiredRoles.map(r=>`<span class="role-pill">${r}</span>`).join('')}</div>
          <button class="cta-btn primary-btn" style="width:100%;padding:8px;font-size:.8rem" onclick="sendJoinRequest('${team.id}');document.getElementById('autofill-drawer').classList.add('hidden')">Request to Join</button>
        </div>
      </div>`;
    }).join('');
  });
  document.getElementById('autofill-drawer-close').addEventListener('click', () => {
    document.getElementById('autofill-drawer').classList.add('hidden');
  });
}

// ========== SIMULATE MATCH / TOURNAMENT ==========
function simulateMatch(teamId) {
  const teams = STORE.teams;
  const team = teams.find(t => t.id === teamId);
  if (!team) return;
  const win = Math.random() > 0.4;
  team.stats.matchesPlayed++;
  if (win) team.stats.wins++;
  const maps = { Valorant:['Bind','Ascent','Haven','Icebox','Pearl'], BGMI:['Erangel','Miramar','Sanhok','Vikendi'], CS2:['Mirage','Dust 2','Inferno','Overpass'], 'Free Fire':['Bermuda','Purgatory','Alpine'], 'COD Mobile':['Standoff','Raid','Crossfire'] };
  const mapList = maps[team.game] || ['Map'];
  const map = mapList[Math.floor(Math.random() * mapList.length)];
  const score = team.game === 'BGMI' || team.game === 'Free Fire' ? (win ? '#1 Chicken Dinner' : `#${Math.floor(Math.random()*10+2)} Place`) : `${win ? 13 : Math.floor(Math.random()*12+1)}-${win ? Math.floor(Math.random()*12+1) : 13}`;
  if (!team.matchHistory) team.matchHistory = [];
  team.matchHistory.unshift({ result: win ? 'win' : 'loss', map, score, date: new Date().toISOString().split('T')[0] });
  checkAchievements(team);
  STORE.teams = teams;
  toast(win ? `🏆 Match won on ${map}!` : `😤 Lost on ${map}. Better luck next time!`, win ? 'success' : 'warn');
  openTeamProfile(teamId);
}

function simulateTournament(teamId) {
  const teams = STORE.teams;
  const team = teams.find(t => t.id === teamId);
  if (!team) return;
  team.stats.tournamentsPlayed++;
  const won = Math.random() > 0.5;
  if (won && !team.achievements.find(a => a.name === 'Tournament Victor')) {
    team.achievements.push({ icon: '🏆', name: 'Tournament Victor', desc: 'Won a tournament!' });
  }
  STORE.teams = teams;
  toast(won ? '🎉 Tournament Victory! Achievement unlocked!' : '🏅 Tournament completed. Keep competing!', won ? 'success' : 'info');
  openTeamProfile(teamId);
}

function checkAchievements(team) {
  const achs = team.achievements || [];
  if (team.stats.wins >= 1 && !achs.find(a => a.name === 'First Blood')) achs.push({ icon:'🩸', name:'First Blood', desc:'First match win!' });
  if (team.stats.matchesPlayed >= 10 && !achs.find(a => a.name === 'Veteran')) achs.push({ icon:'⚔️', name:'Veteran', desc:'10+ matches played' });
  if (team.stats.matchesPlayed >= 25 && !achs.find(a => a.name === 'Elite')) achs.push({ icon:'💎', name:'Elite', desc:'25+ matches played' });
  const wr = team.stats.matchesPlayed ? (team.stats.wins / team.stats.matchesPlayed) * 100 : 0;
  if (wr >= 70 && team.stats.matchesPlayed >= 5 && !achs.find(a => a.name === 'Dominant')) achs.push({ icon:'👑', name:'Dominant', desc:'70%+ win rate' });
  team.achievements = achs;
}

// ========== CREATE TEAM MODAL ==========
function initCreateTeam() {
  let selectedPrivacy = 'public';
  let logoData = null;
  const selectedRoles = new Set();

  document.querySelectorAll('[data-privacy]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-privacy]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); selectedPrivacy = btn.dataset.privacy;
    });
  });

  document.querySelectorAll('.role-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      if (chip.classList.contains('selected')) selectedRoles.add(chip.dataset.role);
      else selectedRoles.delete(chip.dataset.role);
    });
  });

  const logoArea = document.getElementById('logo-upload-area');
  const logoInput = document.getElementById('ct-logo');
  logoArea.addEventListener('click', () => logoInput.click());
  logoInput.addEventListener('change', () => {
    const file = logoInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      logoData = e.target.result;
      document.getElementById('logo-preview').innerHTML = `<img src="${logoData}" alt="Team Logo"><span>Click to change</span>`;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('create-team-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('ct-name').value.trim();
    const game = document.getElementById('ct-game').value;
    if (!name || !game) { toast('Team name and game are required', 'error'); return; }
    const game_emojis = { Valorant:'⚡', BGMI:'🔫', 'Free Fire':'🔥', 'COD Mobile':'💥', CS2:'🎯' };
    const team = {
      id: uid(), name, game,
      logo: game_emojis[game] || '🎮', logoData,
      description: document.getElementById('ct-desc').value.trim(),
      requiredRoles: [...selectedRoles],
      rankRequirement: document.getElementById('ct-rank').value,
      region: document.getElementById('ct-region').value,
      privacy: selectedPrivacy,
      leaderId: JSON.parse(localStorage.getItem('squadlink_currentUser')||'null')?.id || 'current_user',
      members: [{ userId: JSON.parse(localStorage.getItem('squadlink_currentUser')||'null')?.id || 'current_user', username: JSON.parse(localStorage.getItem('squadlink_currentUser')||'null')?.username || 'You', role: 'IGL', joinedAt: new Date().toISOString() }],
      stats: { matchesPlayed:0, wins:0, tournamentsPlayed:0 },
      achievements: [{ icon:'🆕', name:'New Squad', desc:'Team created!' }],
      matchHistory: [], createdAt: new Date().toISOString()
    };
    const teams = STORE.teams;
    teams.unshift(team);
    STORE.teams = teams;
    document.getElementById('create-team-modal').classList.remove('active');
    document.getElementById('create-team-form').reset();
    document.querySelectorAll('.role-chip').forEach(c => c.classList.remove('selected'));
    selectedRoles.clear(); logoData = null;
    document.getElementById('logo-preview').innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" style="opacity:.3"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg><span>Click or drag to upload logo</span>`;
    renderTeams(); renderMyTeams();
    toast(`Team "${name}" created! 🎉`, 'success');
  });
}

// ========== PLAYER PROFILE MODAL ==========
function initPlayerProfile() {
  let selectedVC = 'yes';
  document.querySelectorAll('[data-vc]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-vc]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); selectedVC = btn.dataset.vc;
    });
  });

  // Load existing profile
  const p = STORE.profile;
  if (p) {
    ['game','rank','role','playstyle','region','language','playtime'].forEach(k => {
      const el = document.getElementById(`pp-${k}`);
      if (el && p[k]) el.value = p[k];
    });
    if (p.kd) document.getElementById('pp-kd').value = p.kd;
    if (p.winRate) document.getElementById('pp-winrate').value = p.winRate;
    selectedVC = p.voiceChat || 'yes';
    document.querySelector(`[data-vc="${selectedVC}"]`)?.classList.add('active');
    document.querySelector(`[data-vc="${selectedVC==='yes'?'no':'yes'}"]`)?.classList.remove('active');
  }

  document.getElementById('player-profile-form').addEventListener('submit', e => {
    e.preventDefault();
    const profile = {
      game: document.getElementById('pp-game').value,
      rank: document.getElementById('pp-rank').value,
      role: document.getElementById('pp-role').value,
      playstyle: document.getElementById('pp-playstyle').value,
      region: document.getElementById('pp-region').value,
      language: document.getElementById('pp-language').value,
      playtime: document.getElementById('pp-playtime').value,
      voiceChat: selectedVC,
      kd: parseFloat(document.getElementById('pp-kd').value) || 0,
      winRate: parseInt(document.getElementById('pp-winrate').value) || 0,
    };
    STORE.profile = profile;
    document.getElementById('player-profile-modal').classList.remove('active');
    updateProfileCard();
    renderPlayers();
    toast('Profile saved! Your matches will improve now 🎯', 'success');
  });
}

// ========== MODAL CONTROLS ==========
function initModals() {
  // Open modals
  const openModal = (id) => document.getElementById(id)?.classList.add('active');
  const closeModal = (id) => document.getElementById(id)?.classList.remove('active');

  document.getElementById('hero-create-team-btn').addEventListener('click', () => openModal('create-team-modal'));
  document.getElementById('hero-edit-profile-btn').addEventListener('click', () => openModal('player-profile-modal'));
  document.getElementById('myteams-create-btn').addEventListener('click', () => openModal('create-team-modal'));
  document.getElementById('browse-create-btn').addEventListener('click', () => openModal('create-team-modal'));
  document.getElementById('find-edit-profile-btn').addEventListener('click', () => openModal('player-profile-modal'));
  document.getElementById('myteams-empty-create').addEventListener('click', () => openModal('create-team-modal'));
  document.getElementById('myteams-empty-browse').addEventListener('click', () => { document.querySelector('[data-tab="browse"]').click(); });
  document.getElementById('tp-manage-btn').addEventListener('click', () => clickTPTab('manage'));
  document.getElementById('refresh-matches-btn').addEventListener('click', renderPlayers);

  // Close buttons
  document.getElementById('close-team-profile').addEventListener('click', () => closeModal('team-profile-modal'));
  document.getElementById('close-create-team').addEventListener('click', () => closeModal('create-team-modal'));
  document.getElementById('close-player-profile').addEventListener('click', () => closeModal('player-profile-modal'));

  // Close on overlay click
  ['team-profile-modal','create-team-modal','player-profile-modal'].forEach(id => {
    document.getElementById(id).addEventListener('click', e => { if (e.target.id === id) closeModal(id); });
  });
}

// ========== SEARCH & FILTERS ==========
function initFilters() {
  let debounce;
  const applyFilters = () => {
    renderTeams({
      search: document.getElementById('browse-search').value,
      game: document.getElementById('filter-game').value,
      region: document.getElementById('filter-region').value,
      rank: document.getElementById('filter-rank').value,
    });
  };
  document.getElementById('browse-search').addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(applyFilters, 250); });
  ['filter-game','filter-region','filter-rank'].forEach(id => document.getElementById(id).addEventListener('change', applyFilters));
}

// ========== MOBILE NAV ==========
document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
  const nav = document.querySelector('.nav-links');
  const open = nav.style.display === 'flex';
  nav.style.display = open ? '' : 'flex';
  if (!open) Object.assign(nav.style, { flexDirection:'column', position:'absolute', top:'100%', left:'0', right:'0', background:'rgba(10,14,26,.98)', padding:'20px', gap:'20px', borderTop:'1px solid rgba(0,255,255,.1)', zIndex:'999' });
});

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  seedTeams();
  initNav();
  initTabs();
  initModals();
  initCreateTeam();
  initPlayerProfile();
  initFilters();
  initAutoFill();
  renderTeams();
  renderMyTeams();
  renderPlayers();
  updateInviteBadge();

  // Hero counters
  document.querySelectorAll('.th-stat-num').forEach(el => animCounter(el, parseInt(el.dataset.val)));

  // Ripple on buttons
  document.addEventListener('click', e => {
    const btn = e.target.closest('.cta-btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const rip = document.createElement('span');
    Object.assign(rip.style, { position:'absolute', width:'8px', height:'8px', background:'rgba(255,255,255,.35)', borderRadius:'50%', left:(e.clientX-rect.left)+'px', top:(e.clientY-rect.top)+'px', transform:'translate(-50%,-50%) scale(0)', animation:'rippleEffect .6s ease-out', pointerEvents:'none' });
    btn.style.overflow = 'hidden';
    btn.appendChild(rip);
    setTimeout(() => rip.remove(), 700);
  });

  console.log('Squadlink Teams Platform initialized ✅');
});
