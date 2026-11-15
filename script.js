
// Set Tahun Otomatis di Footer
    if (document.getElementById('year')) {
        document.getElementById('year').textContent = new Date().getFullYear();
    }

    // CONFIGURATION (FOTO PROFIL & BACKGROUND)
    const CONFIG = {
        // Link foto profil kamu:
        profilePicture: "https://i.pinimg.com/736x/3c/a5/d1/3ca5d183c9e3d5964b78ac725764420e.jpg",
        // Link gambar background website:
        backgroundImage: "https://www.upload.ee/image/19879348/sa-mp-007.png"
    };

    // Apply Configuration
    if (document.getElementById('user-pp')) {
        document.getElementById('user-pp').src = CONFIG.profilePicture;
    }
    if (document.getElementById('dynamic-bg')) {
        document.getElementById('dynamic-bg').style.backgroundImage = `url('${CONFIG.backgroundImage}')`;
    }

    // 1. DAFTAR MODS DATA
const modsData = [
    {
        id: 1,
        title: "Croshair ori enak buat tcw kata gw",
        description: "Croshair ori buat yang pengen aja.",
        category: "crosshair",
        image: "https://www.upload.ee/image/19880136/sa-mp-008.png",
        downloadUrl: "https://www.mediafire.com/file/54pwz2jles8hdp8/dsada.png/file",
        previewUrl: "https://www.upload.ee/image/19880136/sa-mp-008.png" // <--- Perhatikan tanda koma di akhir baris downloadUrl di atasnya!
    },
    {
        id: 2,
        title: "Nissan GTR",
        description: "Bagus untuk anak anak jdm atau pembalap.",
        category: "vehicles",
        image: "https://www.upload.ee/image/19885628/IMG-20241124-WA0198.jpg",
        downloadUrl: "https://www.mediafire.com/file/1kssvbpnh2y2n0z/Nissan_GTR_R33.zip/file",
        previewUrl: "https://www.upload.ee/image/19885628/IMG-20241124-WA0198.jpg"
    },
    {
        id: 3,
        title: "Skybox.",
        description: "Dapat Dari Discord Orang.",
        category: "skybox",
        image: "https://www.upload.ee/image/19925623/sa-mp-003.png",
        downloadUrl: "https://www.mediafire.com/file/rktqdvzlxo2yzf0/Skybox_1.rar/file",
        previewUrl: "https://www.upload.ee/image/19925623/sa-mp-003.png"
    },
    {
        id: 4,
        title: "Skin Epep.",
        description: "Skin epep nih dapat dari discord orang.",
        category: "skins",
        image: "https://www.upload.ee/image/19925639/skin_aleatorio_free_fire_1.jpg",
        downloadUrl: "https://www.mediafire.com/file/akhv9ldjgkjhdj7/skin+aleatorio+free+fire+1.rar/file",
        previewUrl: "https://www.upload.ee/image/19925639/skin_aleatorio_free_fire_1.jpg"
    },
    {
        id: 5,
        title: "Timecyc.",
        description: "Timecyc ini dapat dari discord orang.",
        category: "timecyc",
        image: "https://www.upload.ee/image/19925664/Grand_Theft_Auto__San_Andreas_Screenshot_2022.png",
        downloadUrl: "https://www.mediafire.com/file/f1bpnewnvniacyu/extGen_TimeCycle.rar/file",
        previewUrl: "https://www.upload.ee/image/19925664/Grand_Theft_Auto__San_Andreas_Screenshot_2022.png"
    },
    {
        id: 6,
        title: "modpack compe zizi.",
        description: "racik di guzman gw remake sikit.",
        category: "modpack",
        image: "https://www.upload.ee/image/19926656/sa-mp-013.png",
        downloadUrl: "https://www.mediafire.com/file/w2iuli1o7dl4sog/gta+compe+zizii+auto+gacor.rar/file",
        previewUrl: "https://www.tiktok.com/@ziipelitz/video/7701012269659917575?is_from_webapp=1&sender_device=pc"
    }
];
  
    // 2. LABEL KATEGORI
    const categoryLabels = {
        'vehicles': 'Kendaraan',
        'skins': 'Skin / Karakter',
        'modpack': 'Modpack',
        'crosshair': 'Crosshair',
        'skybox': 'Skybox',
        'timecyc': 'Timecyc'
    };

    // 3. FUNGSI RENDER MODS KE GRID
 function renderMods(items) {
    const grid = document.getElementById('mods-grid');
    const emptyState = document.getElementById('empty-state');
    const totalCount = document.getElementById('total-mods-count');

    if (totalCount) totalCount.textContent = items.length;

    if (items.length === 0) {
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    } else {
        if (emptyState) emptyState.classList.add('hidden');
    }

    grid.innerHTML = ''; // Mengosongkan grid sebelum di-render ulang

    items.forEach(mod => {
        const card = document.createElement('div');
        card.className = "bg-brand-card rounded-2xl overflow-hidden border border-slate-800 shadow-lg";

        card.innerHTML = `
            <!-- Thumbnail Image -->
            <div class="relative aspect-video">
                <img src="${mod.image}" alt="${mod.title}" class="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" onclick="openPreviewModal('${mod.id}')">
                <span class="absolute top-2 right-2 px-2 py-1 text-xs font-semibold bg-black/60 rounded text-slate-200">
                    ${categoryLabels[mod.category] || mod.category}
                </span>
            </div>

            <!-- Konten & Tombol -->
            <div class="p-4">
                <h3 class="font-bold text-slate-100">${mod.title}</h3>
                <p class="text-xs text-slate-400 my-2">${mod.description}</p>
                
                <!-- Kontainer Tombol Jejer ke Samping -->
                <div class="flex items-center gap-2 mt-3">
                    <!-- Tombol Download -->
                    <a href="${mod.downloadUrl}" target="_blank" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-2">
                        <i class="fa-solid fa-download"></i> Download
                    </a>
                    
                    <!-- Tombol Preview Baru -->
                    <a href="${mod.previewUrl}" target="_blank" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-2">
                        <i class="fa-solid fa-eye"></i> Preview
                    </a>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

    // 4. FUNGSI FILTER KATEGORI
    function filterCategory(category) {
        if (category === 'all') {
            renderMods(modsData);
        } else {
            const filtered = modsData.filter(mod => mod.category === category);
            renderMods(filtered);
        }
    }

    // Panggil fungsi render pertama kali
    renderMods(modsData);

        // Live Preview Modal Functions
        function openPreviewModal(id) {
            const mod = modsData.find(m => m.id === id);
            if (!mod) return;

            document.getElementById('modal-title').textContent = mod.title;
            document.getElementById('modal-category').textContent = categoryLabels[mod.category] || mod.category;
            document.getElementById('modal-description').textContent = mod.description;
            document.getElementById('modal-image').src = mod.image;
            document.getElementById('modal-download-btn').href = mod.downloadUrl;

            const modal = document.getElementById('preview-modal');
            const content = document.getElementById('modal-content');

            modal.classList.remove('hidden');
            setTimeout(() => {
                content.classList.remove('scale-95', 'opacity-0');
                content.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        function closePreviewModal() {
            const modal = document.getElementById('preview-modal');
            const content = document.getElementById('modal-content');

            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');

            setTimeout(() => {
                modal.classList.add('hidden');
            }, 200);
        }

        // Close modal when clicking outside content
        document.getElementById('preview-modal').addEventListener('click', (e) => {
            if (e.target.id === 'preview-modal') {
                closePreviewModal();
            }
        });
          // Initial Render on Page Load
    renderMods(modsData);

// Initial Render on Page Load
    renderMods(modsData);

    // Fungsi Play / Pause Manual & Auto-start
    function toggleMusic() {
        const music = document.getElementById('bgMusic');
        const btnText = document.getElementById('musicBtnText');
        
        if (music.paused) {
            music.volume = 0.4;
            music.play();
            btnText.innerText = "Pause Music 🎵";
        } else {
            music.pause();
            btnText.innerText = "Play Music 🎵";
        }
    }

    // Muter otomatis saat pengguna klik di mana saja pertama kali
    window.addEventListener('click', function autoPlayOnce() {
        const music = document.getElementById('bgMusic');
        if (music && music.paused) {
            music.volume = 0.4;
            music.play().then(() => {
                document.getElementById('musicBtnText').innerText = "Pause Music 🎵";
            }).catch(() => {});
        }
    }, { once: true });
    // --- ANIMASI GERIMIS (RAIN EFFECT) ---
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Buat butiran air hujan
const raindrops = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: Math.random() * 15 + 10,
    speed: Math.random() * 10 + 12,
    opacity: Math.random() * 0.3 + 0.1
}));

function animateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'rgba(200, 225, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    raindrops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 1, drop.y + drop.length); // Efek garis miring tipis
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= 0.5; // Angin sepoi-sepoi ke kiri

        // Reset saat jatuh ke bawah layar
        if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animateRain);
}

animateRain();

// Fungsi untuk membuka modal gambar besar
function openImageModal(imgSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImg.src = imgSrc;
    modalCaption.textContent = title;
    modal.classList.remove('hidden');
}

// Fungsi untuk menutup modal gambar
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden');
}

// Tutup modal pakai tombol ESC di keyboard
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});
