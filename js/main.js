// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});
// Logika Dark Mode
    const htmlElement = document.documentElement;
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = themeToggleButton ? themeToggleButton.querySelector('i') : null;

    // Fungsi untuk mengganti tema
    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Simpan pilihan pengguna

        // Ubah ikon
        if (themeIcon) {
            themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    // Cek preferensi tema saat halaman dimuat
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        if (themeIcon) {
            themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Jika belum ada preferensi, gunakan preferensi sistem
        htmlElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    }

    // Gunakan Event Delegation karena tombol dimuat secara dinamis
    document.body.addEventListener('click', (event) => {
        if (event.target.closest('#theme-toggle')) {
            toggleTheme();
        }
    });
// Hide loader when page is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll to Top Button
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handler dengan Formspree
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Mencegah redirect ke Formspree
    
    console.log('📧 Form submission started');
    
    // Get form elements
    const formMessage = document.getElementById('formMessage');
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    formMessage.textContent = '🔄 Mengirim pesan...';
    formMessage.className = 'form-message info';
    formMessage.style.display = 'block';
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    
    // Get form data
    const formData = new FormData(this);
    
    try {
        console.log('📤 Sending form data...');
        
        // Send form to Formspree
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        console.log('📨 Response received:', response.status);
        
        if (response.ok) {
            // Success
            const data = await response.json();
            console.log('✅ Form submitted successfully:', data);
            
            formMessage.innerHTML = `
                <strong>✅ Pesan Berhasil Dikirim!</strong><br>
                Terima kasih ${formData.get('name')}! Saya akan segera menghubungi Anda melalui email ${formData.get('email')}.
            `;
            formMessage.className = 'form-message success';
            
            // Reset form
            this.reset();
            
            // Log submission
            console.log('📋 Form data submitted:', {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            });
            
        } else {
            // Error
            const errorData = await response.json();
            console.error('❌ Form submission error:', errorData);
            
            formMessage.innerHTML = `
                <strong>❌ Gagal Mengirim Pesan</strong><br>
                ${errorData.error || 'Silakan coba lagi nanti.'}
            `;
            formMessage.className = 'form-message error';
        }
        
    } catch (error) {
        console.error('❌ Network error:', error);
        
        formMessage.innerHTML = `
            <strong>❌ Terjadi Kesalahan</strong><br>
            Periksa koneksi internet Anda dan coba lagi.
        `;
        formMessage.className = 'form-message error';
    }
    
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    
    // Hide message after 7 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 7000);
});

// Form validation visual feedback
document.getElementById('contactForm').addEventListener('input', function(e) {
    const input = e.target;
    const formGroup = input.closest('.form-group');
    
    if (input.validity.valid) {
        formGroup.classList.remove('error');
        formGroup.classList.add('valid');
    } else {
        formGroup.classList.remove('valid');
        formGroup.classList.add('error');
    }
});

// Remove validation classes on focus
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.closest('.form-group').classList.remove('error', 'valid');
    });
});