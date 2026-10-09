import os
import codecs

svgs = {
    'controller': '<svg class="filter-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"></path></svg>',
    'lightning': '<svg class="filter-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',
    'ticket': '<svg class="filter-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="7" y1="4" x2="7" y2="20"></line><line x1="17" y1="4" x2="17" y2="20"></line></svg>',
    'clock': '<svg class="status-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>',
    'check_circle': '<svg class="status-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg>',
    'alert': '<svg class="urgency-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
    'trophy': '<svg class="action-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10M5 4h14v4a7 7 0 0 1-14 0V4z"></path></svg>',
    'fire': '<svg class="filter-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 2.4 5.6a6.5 6.5 0 11-9.9-10.6c-1.334 1.334-1.9 2.56-1.5 4.5.3 1.444.667 2.333 1.5 3.5z"></path></svg>'
}

def patch_file(path, replacements):
    with codecs.open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with codecs.open(path, 'w', encoding='utf-8') as f:
        f.write(content)

repl_teams = [
    ('⚡ TEAM MANAGEMENT PLATFORM', f'{svgs["lightning"]} TEAM MANAGEMENT PLATFORM'),
    ('<div class="empty-icon">🏆</div>', f'<div class="empty-icon">{svgs["trophy"]}</div>'),
    ('<div class="empty-icon">🎮</div>', f'<div class="empty-icon">{svgs["controller"]}</div>'),
    ('🏆 Log Win (+30 XP)', f'{svgs["trophy"]} Log Win (+30 XP)'),
    ('🏆 Simulate Tournament', f'{svgs["trophy"]} Simulate Tournament')
]
patch_file(r'd:\SL(TESTER)[Shreyas]\teams.html', repl_teams)

repl_teams_js = [
    ('⚡ Recruiting', f'{svgs["lightning"]} Recruiting'),
    ('⚡ ${p.playstyle}', f'{svgs["lightning"]} ${{p.playstyle}}'),
]
patch_file(r'd:\SL(TESTER)[Shreyas]\teams.js', repl_teams_js)

repl_profile = [
    ('Streak 🔥', f'Streak {svgs["fire"]}')
]
patch_file(r'd:\SL(TESTER)[Shreyas]\profile.html', repl_profile)

# Also fix the live dot from the first round in tournaments.js that got missed
# tournaments.js line 471
repl_tournaments_js = [
    ('🔴 LIVE —', 'LIVE —')
]
patch_file(r'd:\SL(TESTER)[Shreyas]\tournaments.js', repl_tournaments_js)
