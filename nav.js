// Shared site menu, injected at the top of every page.
(function () {
    const links = [
        { href: 'index.html', label: '🏠 Dashboard', match: ['', 'index.html'] },
        { href: 'index.html#calculator', label: '🧮 Calculator', match: [] },
        { href: 'calendar.html', label: '📅 Calendar', match: ['calendar.html'] },
        { href: 'https://github.com/rifaterdemsahin/local-ai-setup-plan#readme', label: '📘 README', match: [], ext: true },
    ];
    const page = location.pathname.split('/').pop();
    const nav = document.createElement('nav');
    nav.className = 'glass-card mb-8 px-4 py-3 flex flex-wrap items-center gap-2 text-sm';
    nav.innerHTML =
        '<a href="index.html" class="font-bold text-white mr-auto">🖥️ Local AI Plan</a>' +
        links.map((l) => {
            const active = l.match.includes(page);
            return '<a href="' + l.href + '"' + (l.ext ? ' target="_blank" rel="noopener"' : '') +
                ' class="px-3 py-1.5 rounded-lg transition-colors ' +
                (active ? 'bg-sky-400/20 text-sky-300 font-semibold' : 'text-slate-300 hover:bg-slate-700') +
                '">' + l.label + '</a>';
        }).join('');
    document.body.prepend(nav);
})();
