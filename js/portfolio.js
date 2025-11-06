// Portfolio filter function
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-card');
    
    if (filterBtns.length === 0) {
        console.log('❌ No filter buttons found');
        return;
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter portfolio items
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Load portfolio data from JSON
async function loadPortfolio() {
    console.log('🔄 Loading portfolio data...');
    
    try {
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (!portfolioGrid) {
            console.error('❌ Portfolio grid element not found!');
            return;
        }
        
        const response = await fetch('data/portfolio.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const portfolioData = await response.json();
        console.log('✅ Portfolio data loaded:', portfolioData);
        
        portfolioGrid.innerHTML = '';
        
        if (!portfolioData || portfolioData.length === 0) {
            portfolioGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <h3>📁 Portfolio Sedang Disiapkan</h3>
                    <p>Konten portfolio akan segera tersedia</p>
                </div>
            `;
            return;
        }
        
        portfolioData.forEach((item, index) => {
            const portfolioCard = document.createElement('div');
            portfolioCard.className = 'portfolio-card';
            portfolioCard.setAttribute('data-category', item.category);
            portfolioCard.setAttribute('data-aos', 'fade-up');
            portfolioCard.setAttribute('data-aos-delay', (index + 1) * 100);
            
            const fallbackImages = [
                'https://picsum.photos/seed/ecommerce/400/300.jpg',
                'https://picsum.photos/seed/taskapp/400/300.jpg',
                'https://picsum.photos/seed/banking/400/300.jpg',
                'https://picsum.photos/seed/travel/400/300.jpg',
                'https://picsum.photos/seed/fitness/400/300.jpg',
                'https://picsum.photos/seed/dashboard/400/300.jpg'
            ];
            
            const imageUrl = item.image || fallbackImages[index] || `https://picsum.photos/seed/portfolio${index}/400/300.jpg`;
            const liveUrl = item.liveUrl || '#';
            const githubUrl = item.githubUrl || '#';
            const categoryLabel = item.categoryLabel || item.category || 'Project';
            
            portfolioCard.innerHTML = `
                <div class="portfolio-img">
                    <img src="${imageUrl}" alt="${item.title}" 
                         onerror="this.src='${fallbackImages[index]}'; console.log('⚠️ Image failed to load, using fallback');">
                    <div class="portfolio-overlay">
                        <div class="portfolio-links">
                            <a href="${liveUrl}" class="portfolio-link" target="_blank" title="Lihat Live Demo">
                                <i class="fas fa-eye"></i>
                            </a>
                            <a href="${githubUrl}" class="portfolio-link" target="_blank" title="Lihat Source Code">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="portfolio-content">
                    <h3 class="portfolio-title">${item.title}</h3>
                    <span class="portfolio-category">${categoryLabel}</span>
                    <p class="portfolio-description">${item.description}</p>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioCard);
        });
        
        // Initialize portfolio filter
        setTimeout(() => {
            initPortfolioFilter();
            console.log('🔍 Portfolio filter initialized');
        }, 200);
        
        console.log('✅ Portfolio loaded successfully');
        
    } catch (error) {
        console.error('❌ Error loading portfolio:', error);
        
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (portfolioGrid) {
            portfolioGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: rgba(239, 68, 68, 0.1); border-radius: 8px;">
                    <h3 style="color: #dc2626; margin-bottom: 10px;">❌ Error Loading Portfolio</h3>
                    <p style="color: #ef4444; margin-bottom: 10px;">${error.message}</p>
                    <button onclick="loadPortfolio()" style="margin-top: 15px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        🔄 Retry Loading
                    </button>
                </div>
            `;
        }
    }
}

// Load skills data from JSON
async function loadSkills() {
    console.log('🔄 Loading skills data...');
    
    try {
        const skillsGrid = document.getElementById('skillsGrid');
        if (!skillsGrid) {
            console.error('❌ Skills grid element not found!');
            return;
        }
        
        const response = await fetch('data/skills.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const skillsData = await response.json();
        console.log('✅ Skills data loaded:', skillsData);
        
        skillsGrid.innerHTML = '';
        
        if (skillsData.length === 0) {
            skillsGrid.innerHTML = '<p class="no-skills">Belum ada skills</p>';
            return;
        }
        
        skillsData.forEach((skill, index) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.setAttribute('data-aos', 'fade-up');
            skillCard.setAttribute('data-aos-delay', (index + 1) * 100);
            
            skillCard.innerHTML = `
                <div class="skill-header">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-level">${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-percent="${skill.level}"></div>
                </div>
            `;
            
            skillsGrid.appendChild(skillCard);
        });
        
        console.log('✅ Skills loaded successfully');
        
    } catch (error) {
        console.error('❌ Error loading skills:', error);
        
        const skillsGrid = document.getElementById('skillsGrid');
        if (skillsGrid) {
            skillsGrid.innerHTML = `
                <div class="error-message">
                    <h3>❌ Error Loading Skills</h3>
                    <p>${error.message}</p>
                    <button onclick="loadSkills()" style="margin-top: 15px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        🔄 Retry Loading
                    </button>
                </div>
            `;
        }
    }
}

// Load blog data from JSON
async function loadBlog() {
    console.log('🔄 Loading blog data...');
    
    try {
        const blogGrid = document.getElementById('blogGrid');
        if (!blogGrid) {
            console.error('❌ Blog grid element not found!');
            return;
        }
        
        const response = await fetch('data/blog.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blogData = await response.json();
        console.log('✅ Blog data loaded:', blogData);
        
        blogGrid.innerHTML = '';
        
        if (blogData.length === 0) {
            blogGrid.innerHTML = '<p class="no-posts">Belum ada blog</p>';
            return;
        }
        
        blogData.forEach((post, index) => {
            const blogCard = document.createElement('article');
            blogCard.className = 'blog-card';
            blogCard.setAttribute('data-aos', 'fade-up');
            blogCard.setAttribute('data-aos-delay', (index + 1) * 100);
            
            blogCard.innerHTML = `
                <div class="blog-img">
                    <img src="${post.image}" alt="${post.title}" onerror="this.src='https://picsum.photos/seed/blog${index}/400/300.jpg'">
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="far fa-calendar"></i> ${post.date}</span>
                        <span><i class="far fa-clock"></i> ${post.readingTime || 5} reading time</span>
                    </div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a href="${post.url || '#'}" class="read-more">Read More<i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            
            blogGrid.appendChild(blogCard);
        });
        
        console.log('✅ Blog loaded successfully');
        
    } catch (error) {
        console.error('❌ Error loading blog:', error);
        
        const blogGrid = document.getElementById('blogGrid');
        if (blogGrid) {
            blogGrid.innerHTML = `
                <div class="error-message">
                    <h3>❌ Error Loading Blog</h3>
                    <p>${error.message}</p>
                    <button onclick="loadBlog()" style="margin-top: 15px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        🔄 Retry Loading
                    </button>
                </div>
            `;
        }
    }
}

// Global functions for manual retry
window.loadPortfolio = loadPortfolio;
window.loadSkills = loadSkills;
window.loadBlog = loadBlog;

// Initialize all data loading
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, starting data loading...');
    
    // Load all data secara parallel
    Promise.all([
        loadPortfolio(),
        loadSkills(),
        loadBlog()
    ]).then(() => {
        console.log('✅ All data loaded successfully');
        
        // Initialize AOS setelah semua data dimuat
        setTimeout(() => {
            AOS.refresh();
            console.log('🎬 AOS refreshed for all sections');
        }, 300);
    }).catch(error => {
        console.error('❌ Error in data loading:', error);
        
        // Tetap initialize AOS meskipun ada error
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    });
});