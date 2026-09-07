var Profile = {
    render() {
        var el = gid('view-dev');
        if(!el) return;
        el.innerHTML = `
        <div class="pt-8 pb-5 px-5 sticky top-0 z-30 border-b border-white/[0.06] transition-all cc-header-blur">
            <span class="text-[11px] font-semibold text-white/40 tracking-wide">Akun</span>
            <h1 class="text-[28px] font-bold text-white tracking-tight -mt-0.5">Profil</h1>
        </div>

        <div class="pt-8 px-5 pb-10 max-w-2xl mx-auto">

            <!-- Profile card -->
            <div class="cc-panel rounded-[28px] p-6 text-center mb-5 max-w-sm mx-auto">
                <div class="relative w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden ring-1 ring-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                    <img src="/logo.png" class="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" onerror="this.style.display='none'" />
                </div>
                <h1 class="text-xl font-bold text-white mb-2">Cleo Cloud</h1>
                <p class="text-white/40 text-[12px] tracking-wide">Created &amp; Developed by</p>
                <p class="text-white font-bold text-[14px] mt-0.5 mb-5">Genta De Carlo</p>

                <div class="flex items-center justify-center gap-2 text-[12px]">
                    <span class="cc-pill"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> PWA Aktif</span>
                    <span class="cc-pill">v1.0.0</span>
                </div>
            </div>

            <!-- Official Cleo Cloud social profiles -->
            <div class="mb-2 px-1 flex items-center justify-between max-w-sm md:max-w-none mx-auto">
                <span class="text-[13px] font-semibold text-white/85">Cleo Cloud Official</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-5 max-w-sm md:max-w-none mx-auto">
                <a href="https://www.instagram.com/cleo.lvlla?stkn=MTI0b3o0eGg3MDluZg==" target="_blank" rel="noopener" class="cc-social-card">
                    <span class="cc-social-icon cc-ig-icon overflow-hidden">
                        <img src="/profilig1.png" class="w-full h-full object-cover" loading="lazy" decoding="async" onerror="this.remove(); this.parentElement.innerHTML='<svg class=&quot;w-5 h-5&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><rect x=&quot;2&quot; y=&quot;2&quot; width=&quot;20&quot; height=&quot;20&quot; rx=&quot;5&quot;/><circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;4&quot;/><circle cx=&quot;17.5&quot; cy=&quot;6.5&quot; r=&quot;1&quot; fill=&quot;currentColor&quot;/></svg>'" />
                    </span>
                    <span class="flex-1 text-left min-w-0">
                        <span class="block text-white font-semibold text-[14px] truncate">cleo.lvlla</span>
                        <span class="block text-white/40 text-[12px]">Instagram</span>
                    </span>
                    <span class="cc-open-btn"><i data-lucide="arrow-up-right" class="w-4 h-4"></i></span>
                </a>
                <a href="https://www.instagram.com/gentadecarlo?stkn=MW5xM245YWU1eHNkOA==" target="_blank" rel="noopener" class="cc-social-card">
                    <span class="cc-social-icon cc-ig-icon overflow-hidden">
                        <img src="/profilig2.png" class="w-full h-full object-cover" loading="lazy" decoding="async" onerror="this.remove(); this.parentElement.innerHTML='<svg class=&quot;w-5 h-5&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><rect x=&quot;2&quot; y=&quot;2&quot; width=&quot;20&quot; height=&quot;20&quot; rx=&quot;5&quot;/><circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;4&quot;/><circle cx=&quot;17.5&quot; cy=&quot;6.5&quot; r=&quot;1&quot; fill=&quot;currentColor&quot;/></svg>'" />
                    </span>
                    <span class="flex-1 text-left min-w-0">
                        <span class="block text-white font-semibold text-[14px] truncate">gentadecarlo</span>
                        <span class="block text-white/40 text-[12px]">Instagram</span>
                    </span>
                    <span class="cc-open-btn"><i data-lucide="arrow-up-right" class="w-4 h-4"></i></span>
                </a>
            </div>

            <!-- WhatsApp channel -->
            <div class="max-w-sm mx-auto">
                <a href="https://whatsapp.com/channel/0029Vb93nxsHltYDfZozNZ2Q" target="_blank" rel="noopener" class="cc-social-card mb-5" style="padding:16px 18px;">
                    <span class="cc-social-icon cc-wa-icon">
                        <i data-lucide="message-circle" class="w-5 h-5"></i>
                    </span>
                    <span class="flex-1 text-left min-w-0">
                        <span class="block text-white font-semibold text-[14px]">Join WhatsApp Channel</span>
                        <span class="block text-white/40 text-[12px]">Update &amp; rilis terbaru Cleo Cloud</span>
                    </span>
                    <span class="cc-open-btn"><i data-lucide="arrow-up-right" class="w-4 h-4"></i></span>
                </a>

                <!-- App info -->
                <div class="cc-panel rounded-[24px] p-5 text-left mb-5">
                    <h3 class="text-white/85 font-semibold text-[13px] mb-3">Aplikasi &amp; PWA</h3>
                    <div class="space-y-2.5 text-[13px]">
                        <div class="flex justify-between"><span class="text-white/40">Service Worker</span><span class="text-white/85 font-medium">${'serviceWorker' in navigator ? 'Terdaftar' : 'Tidak didukung'}</span></div>
                        <div class="pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
                            <span class="text-white/40">Cache tersimpan</span>
                            <button onclick="if(typeof clearPwaCache==='function') clearPwaCache();" class="text-rose-400/90 hover:text-rose-300 font-medium active:scale-95 transition">Bersihkan</button>
                        </div>
                    </div>
                </div>

                <button id="pwa-install-btn" onclick="installPWA()" class="${typeof isStandaloneApp !== 'undefined' && isStandaloneApp ? 'hidden ' : ''}w-full cc-btn-primary mb-3">
                    <i data-lucide="download" class="w-[18px] h-[18px]"></i> Install Aplikasi
                </button>
            </div>
        </div>`;
        lucide.createIcons();
    }
};

var Dev = Profile;
