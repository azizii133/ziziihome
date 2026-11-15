import { 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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
    window.toggleMusic = function() {
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

// Tutup modal pakai tombol ESC di keyboardssssss
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});
let isRegisterMode = false; // Status awal: Mode Login

// Fungsi untuk tukar tampilan form (Login <-> Register)
function toggleMode() {
    isRegisterMode = !isRegisterMode;

    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');
    const toggleText = document.getElementById('toggleText');
    const toggleBtnText = document.getElementById('toggleBtnText');

    if (isRegisterMode) {
        modalTitle.innerText = "Register";
        submitBtn.innerText = "Register Now";
        toggleText.innerText = "Already have an account?";
        toggleBtnText.innerText = "Login";
    } else {
        modalTitle.innerText = "Login";
        submitBtn.innerText = "Login";
        toggleText.innerText = "Don't have an account?";
        toggleBtnText.innerText = "Register";
    }
}

// Fungsi Utama: Eksekusi Login / Register via Firebase
async function handleAuthSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('userPassword').value.trim();

    try {
        if (isRegisterMode) {
            // PROSES BUAT AKUN BARU
            await window.createUserWithEmailAndPassword(window.auth, email, password);
            alert("Registrasi Berhasil! Silakan login menggunakan akun baru kamu.");
            toggleMode(); // Kembalikan ke tampilan login
        } else {
            // PROSES MASUK / LOGIN
            await window.signInWithEmailAndPassword(window.auth, email, password);
            
            // Sembunyikan modal login agar website utama terbuka
            document.getElementById('loginModal').classList.add('hidden');

            // Putar musik otomatis setelah sukses masuk
            const music = document.getElementById('bgMusic');
            if (music) {
                music.volume = 0.4;
                music.play().catch(() => {});
            }
        }
    } catch (error) {
        alert("Gagal: " + error.message);
    }
}
// 1. Pantau Status Login User secara Real-time
// Fungsi ini otomatis mengecek apakah ada user yang sedang aktif login
document.addEventListener("DOMContentLoaded", () => {
    // Pastikan Firebase Auth sudah siap, lalu pantau statusnya
    if (window.auth) {
        window.auth.onAuthStateChanged((user) => {
            const profileSection = document.getElementById('userProfileSection');
            const emailDisplay = document.getElementById('userEmailDisplay');
            const loginModal = document.getElementById('loginModal');

            if (user) {
                // USER SEDANG LOGIN:
                // Sembunyikan modal login
                if (loginModal) loginModal.classList.add('hidden');
                
                // Tampilkan info profil & email user di navbar
                if (profileSection) profileSection.classList.remove('hidden');
                if (emailDisplay) emailDisplay.innerText = user.email;
            } else {
                // USER BELUM LOGIN / KELUAR:
                // Tampilkan kembali modal login
                if (loginModal) loginModal.classList.remove('hidden');
                
                // Sembunyikan info profil
                if (profileSection) profileSection.classList.add('hidden');
            }
        });
    }
});

// 2. Fungsi untuk Proses Logout
async function handleLogout() {
    try {
        await window.auth.signOut();
        alert("Berhasil keluar akun!");
    } catch (error) {
        alert("Gagal logout: " + error.message);
    }
}
const ADMIN_EMAIL = "habibazizi725@gmail.com";

onAuthStateChanged(window.auth, (user) => {
    const loginModal = document.getElementById("loginModal");
    const userProfileSection = document.getElementById("userProfileSection");
    const userEmailDisplay = document.getElementById("userEmailDisplay");

    // Ambil elemen khusus Admin
    const adminBadge = document.getElementById("adminBadge");
    const adminPanel = document.getElementById("adminPanel");

    if (user) {
        // User sedang login
        loginModal.classList.add("hidden");
        userProfileSection.classList.remove("hidden");
        userEmailDisplay.textContent = user.email;

        // Cek apakah email yang login adalah Admin
        if (user.email === ADMIN_EMAIL) {
            if (adminBadge) adminBadge.classList.remove("hidden");
            if (adminPanel) adminPanel.classList.remove("hidden");
            console.log("Mode Admin Aktif!");
        } else {
            // Pastikan elemen admin tetap tersembunyi untuk pengunjung biasa
            if (adminBadge) adminBadge.classList.add("hidden");
            if (adminPanel) adminPanel.classList.add("hidden");
        }
    } else {
        // User belum login / sudah logout
        loginModal.classList.remove("hidden");
        userProfileSection.classList.add("hidden");
    }
});
// Pastikan fungsi ini di-import dari modul firebase/auth di bagian atas script.js kamu
// import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Fungsi untuk menampilkan menu Lupa Password dan menyembunyikan form login biasa
window.showForgotPassword = function() {
    // Sembunyikan elemen input login biasa jika perlu, atau buat container khusus form login
    document.getElementById("forgotPasswordContainer").classList.remove("hidden");
    // Sembunyikan tombol login utama kalau mau lebih rapi
}

window.backToLogin = function() {
    document.getElementById("forgotPasswordContainer").classList.add("hidden");
}

// Fungsi eksekusi kirim email reset password via Firebase
window.handleResetPassword = function() {
    const email = document.getElementById("resetEmail").value.trim();
    
    if (!email) {
        alert("Mohon masukkan alamat email kamu terlebih dahulu!");
        return;
    }

    sendPasswordResetEmail(window.auth, email)
        .then(() => {
            alert("Link reset password berhasil dikirim! Silakan cek kotak masuk (inbox/spam) Gmail kamu.");
            document.getElementById("forgotPasswordContainer").classList.add("hidden");
            document.getElementById("resetEmail").value = "";
        })
        .catch((error) => {
            console.error("Error reset password:", error.code);
            if (error.code === 'auth/user-not-found') {
                alert("Email tidak terdaftar di sistem.");
            } else {
                alert("Gagal mengirim email reset: " + error.message);
            }
        });
}
// --- FUNGSI AUTH & RESET PASSWORD ZIZII HOME ---

window.handleLogin = function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    signInWithEmailAndPassword(window.auth, email, password)
        .then((userCredential) => {
            document.getElementById("loginModal").classList.add("hidden");
        })
        .catch((error) => {
    // Ubah teksnya jadi lebih ramah dan hilangkan error teknis Firebase
    document.getElementById("errorMessage").textContent = "Email atau password yang kamu masukkan salah. Coba cek lagi ya!";
    document.getElementById("errorModal").classList.remove("hidden");
});
};

// Fungsi untuk menutup popup saat tombol Close diklik
window.closeErrorModal = function() {
    document.getElementById("errorModal").classList.add("hidden");
};

window.showForgotPassword = function() {
    document.getElementById("loginFormContainer").classList.add("hidden");
    document.getElementById("forgotPasswordContainer").classList.remove("hidden");
};

window.backToLogin = function() {
    document.getElementById("forgotPasswordContainer").classList.add("hidden");
    document.getElementById("loginFormContainer").classList.remove("hidden");
};

window.handleResetPassword = function() {
    const email = document.getElementById("resetEmail").value.trim();
    if (!email) {
        alert("Masukkan email terlebih dahulu!");
        return;
    }
    sendPasswordResetEmail(window.auth, email)
        .then(() => {
            alert("Link reset password telah dikirim ke email kamu!");
            backToLogin();
        })
        .catch((error) => {
            alert("Gagal mengirim reset password: " + error.message);
        });
};
window.handleLogout = async function() {
    try {
        await signOut(window.auth);
        alert("Berhasil keluar akun!");
    } catch (error) {
        alert("Gagal logout: " + error.message);
    }
};