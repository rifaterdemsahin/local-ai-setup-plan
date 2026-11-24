// Shared site menu + site-wide search, injected at the top of every page.
(function () {
    const PAGES = [
        { href: 'index.html', title: '🏠 Dashboard' },
        { href: 'calendar.html', title: '📅 Calendar' },
        { href: 'voyage.html', title: '🚢 Two Boats' },
    ];
    const links = [
        { href: 'index.html', label: '🏠 Dashboard', match: ['', 'index.html'] },
        { href: 'index.html#calculator', label: '🧮 Calculator', match: [] },
        { href: 'calendar.html', label: '📅 Calendar', match: ['calendar.html'] },
        { href: 'voyage.html', label: '🚢 Two Boats', match: ['voyage.html'] },
        { href: 'https://github.com/rifaterdemsahin/local-ai-setup-plan#readme', label: '📘 README', match: [], ext: true },
    ];
    const page = location.pathname.split('/').pop();
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    // ----- Menu -----
    const nav = document.createElement('nav');
    nav.className = 'glass-card mb-8 px-4 py-3 flex flex-wrap items-center gap-2 text-sm relative z-50';
    nav.innerHTML =
        '<a href="index.html" class="font-bold text-white mr-auto flex items-center gap-2"><img src="favicon.svg" alt="" class="w-6 h-6"> Local AI Plan</a>' +
        '<div class="relative order-last w-full md:order-none md:w-64">' +
        '  <input id="site-search" type="search" placeholder="🔍 Search…  ( / )" autocomplete="off" aria-label="Search the site"' +
        '   class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:border-sky-400 outline-none">' +
        '  <div id="site-search-results" class="hidden absolute right-0 left-0 md:left-auto md:w-96 mt-1 max-h-96 overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 shadow-2xl"></div>' +
        '</div>' +
        links.map((l) => {
            const active = l.match.includes(page);
            return '<a href="' + l.href + '"' + (l.ext ? ' target="_blank" rel="noopener"' : '') +
                ' class="px-3 py-1.5 rounded-lg transition-colors ' +
                (active ? 'bg-sky-400/20 text-sky-300 font-semibold' : 'text-slate-300 hover:bg-slate-700') +
                '">' + l.label + '</a>';
        }).join('');
    document.body.prepend(nav);

    // ----- Search index (built lazily from every page) -----
    const SEL = 'h1,h2,h3,h4,p,li,label>span,.mermaid';
    let indexPromise = null;
    function textsFrom(doc) {
        return [...doc.querySelectorAll(SEL)]
            .filter((el) => !el.closest('nav,script,style'))
            .map((el) => {
                let t = el.textContent.replace(/\s+/g, ' ').trim();
                if (el.classList.contains('mermaid')) t = t.replace(/[-=.>|:]{2,}|\b(flowchart|stateDiagram-v2|sequenceDiagram|gantt|subgraph|end|participant|actor|section|dateFormat|axisFormat|tickInterval)\b/g, ' ').replace(/\s+/g, ' ').trim();
                return t;
            })
            .filter((t) => t.length > 2);
    }
    function buildIndex() {
        if (indexPromise) return indexPromise;
        indexPromise = Promise.all(PAGES.map(async (p) => {
            try {
                const html = await (await fetch(p.href)).text();
                const doc = new DOMParser().parseFromString(html, 'text/html');
                return [...new Set(textsFrom(doc))].map((t) => ({ page: p, text: t }));
            } catch (e) { return []; } // page unavailable offline: skip
        })).then((parts) => parts.flat());
        return indexPromise;
    }

    const input = document.getElementById('site-search');
    const box = document.getElementById('site-search-results');
    function snippet(text, q) {
        const i = text.toLowerCase().indexOf(q);
        const start = Math.max(0, i - 40), end = Math.min(text.length, i + q.length + 60);
        const s = (start ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
        const j = s.toLowerCase().indexOf(q);
        return esc(s.slice(0, j)) + '<mark class="bg-amber-400/40 text-white rounded px-0.5">' + esc(s.slice(j, j + q.length)) + '</mark>' + esc(s.slice(j + q.length));
    }
    async function run() {
        const q = input.value.trim().toLowerCase();
        if (q.length < 2) { box.classList.add('hidden'); return; }
        const hits = (await buildIndex()).filter((r) => r.text.toLowerCase().includes(q)).slice(0, 25);
        box.innerHTML = hits.length
            ? hits.map((h) => '<a href="' + h.page.href + '?q=' + encodeURIComponent(q) + '" class="block px-3 py-2 border-b border-slate-800 hover:bg-slate-800">' +
                '<span class="text-xs text-sky-300">' + h.page.title + '</span><br><span class="text-slate-300 text-xs">' + snippet(h.text, q) + '</span></a>').join('')
            : '<p class="px-3 py-2 text-slate-400 text-xs">No results for “' + esc(q) + '”</p>';
        box.classList.remove('hidden');
    }
    input.addEventListener('input', run);
    input.addEventListener('focus', () => { buildIndex(); if (input.value) run(); });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { box.classList.add('hidden'); input.blur(); }
        if (e.key === 'Enter') { const first = box.querySelector('a'); if (first) location.href = first.href; }
    });
    document.addEventListener('click', (e) => { if (!nav.contains(e.target)) box.classList.add('hidden'); });
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
    });

    // ----- Arriving from a search result: scroll to and highlight the first match -----
    const q = new URLSearchParams(location.search).get('q');
    if (q) {
        input.value = q;
        window.addEventListener('load', () => setTimeout(() => {
            const needle = q.toLowerCase();
            const el = [...document.querySelectorAll(SEL + ',svg text,td,a')]
                .filter((n) => !n.closest('nav'))
                .find((n) => n.textContent.toLowerCase().includes(needle));
            if (!el) return;
            const target = el.closest('.mermaid') || el;
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.style.transition = 'box-shadow .3s, background-color .3s';
            target.style.boxShadow = '0 0 0 3px #fbbf24';
            target.style.backgroundColor = 'rgba(251,191,36,.15)';
            target.style.borderRadius = '6px';
            setTimeout(() => { target.style.boxShadow = ''; target.style.backgroundColor = ''; }, 3500);
        }, 600));
    }
})();
