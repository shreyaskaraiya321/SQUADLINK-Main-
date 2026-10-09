import os
import re

svgs = {
    'controller': '<svg class="filter-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"></path></svg>',
    'lightning': '<svg class="filter-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',
    'ticket': '<svg class="filter-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="7" y1="4" x2="7" y2="20"></line><line x1="17" y1="4" x2="17" y2="20"></line></svg>',
    'clock': '<svg class="status-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>',
    'check_circle': '<svg class="status-icon" viewBox="0 0 24 24" width="14" height=\"14\" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg>',
    'alert': '<svg class="urgency-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
    'trophy': '<svg class="action-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10M5 4h14v4a7 7 0 0 1-14 0V4z"></path></svg>',
    'medal_1': '<svg class="prize-icon prize-1" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
    'medal_2': '<svg class="prize-icon prize-2" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
    'medal_3': '<svg class="prize-icon prize-3" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
    'skull': '<svg class="prize-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="7"></circle><path d="M9 16v4M15 16v4M12 16v4M8 17h8"></path></svg>'
}

import codecs

def patch_file(path, replacements):
    with codecs.open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with codecs.open(path, 'w', encoding='utf-8') as f:
        f.write(content)

repl_html = [
    ('🎮 All Games', 'All Games'),
    ('⚡ All Status', 'All Status'),
    ('🎟️ Entry Type', 'Entry Type'),
    ('Upcoming 🟡', f'Upcoming {svgs["clock"]}'),
    ('Completed ⚫', f'Completed {svgs["check_circle"]}'),
]

patch_file(r'd:\SL(TESTER)[Shreyas]\tournaments.html', repl_html)

repl_js = [
    ('🥇 1st Place', '1st Place'),
    ('🥈 2nd Place', '2nd Place'),
    ('🥉 3rd Place', '3rd Place'),
    ('🟡 UPCOMING', f'{svgs["clock"]} UPCOMING'),
    ('⚫ COMPLETED', f'{svgs["check_circle"]} COMPLETED'),
    ('🔥 Only ', f'{svgs["alert"]} Only '),
    ('⚡ Starting ', f'{svgs["lightning"]} Starting '),
    ('🏆 View Bracket', f'{svgs["trophy"]} View Bracket'),
    ('🥇 Winner', 'Winner'),
    ('🥉 Top 3', 'Top 3'),
    ('💀 Eliminated', 'Eliminated'),
    ('🔴 LIVE ROOM DETAILS', 'LIVE ROOM DETAILS'),
    ('⚡ Generate Invite Code', 'Generate Invite Code'),
    ('🏆 Prize Pool', 'Prize Pool'),
    ('🏆 ${t.name}', '${t.name}'),
    ('🏆 ${b.final.winner}', '${b.final.winner}')
]
patch_file(r'd:\SL(TESTER)[Shreyas]\tournaments.js', repl_js)

repl_teams = [
    ('🎮 Filter by Game', 'Filter by Game'),
    ('🌍 Filter by Region', 'Filter by Region'),
    ('🏆 Any Rank', 'Any Rank'),
    ('⚔️ Looking For', 'Looking For'),
]
if os.path.exists(r'd:\SL(TESTER)[Shreyas]\teams.html'):
    patch_file(r'd:\SL(TESTER)[Shreyas]\teams.html', repl_teams)

if os.path.exists(r'd:\SL(TESTER)[Shreyas]\teams.js'):
    patch_file(r'd:\SL(TESTER)[Shreyas]\teams.js', [('🔥`', '`')])
