// Typing Effect
const typingTexts = [
    'Web Developer',
    'Data Analyst',
    'Digital Marketing',
    'STEM Enthusiast',
    'Creative Thinker'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.getElementById('typingText');
    
    if (!typingElement) return;
    
    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, pauseTime);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }
    }
    
    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}

// Start typing effect
setTimeout(typeText, 1500);

// Animate Skill Bars
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        const skillTop = bar.getBoundingClientRect().top;
        const skillVisible = 150;
        
        if (skillTop < window.innerHeight - skillVisible && bar.style.width === '') {
            bar.style.width = percent + '%';
        }
    });
};

window.addEventListener('scroll', animateSkillBars);

// Initial check for skill bars in view
setTimeout(animateSkillBars, 1000);