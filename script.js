// DOM Elements
const progressBar = document.querySelector('.progress-bar');
const progressText = document.querySelector('.progress-text');
const continueButton = document.querySelector('button');
const courseSections = document.querySelectorAll('.bg-gray-800');

// State
let currentProgress = 0;
const totalSections = 8;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    document.querySelectorAll('.animate-fade-in').forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover effects to course sections
    courseSections.forEach(section => {
        section.classList.add('card-hover');
    });

    // Initialize progress
    updateProgress(currentProgress);
});

// Update progress bar and text
function updateProgress(progress) {
    const progressPercentage = (progress / totalSections) * 100;
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }
    if (progressText) {
        progressText.textContent = `${progress}/${totalSections}`;
    }
}

// Handle continue button click
if (continueButton) {
    continueButton.addEventListener('click', () => {
        // Add hover effect class
        continueButton.classList.add('hover-lift');
        
        // Simulate loading state
        continueButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
        
        // Reset button after delay
        setTimeout(() => {
            continueButton.innerHTML = 'Continue';
            // Here you would typically navigate to the next section
        }, 1000);
    });
}

// Handle course section clicks
courseSections.forEach(section => {
    section.addEventListener('click', () => {
        // Add click animation
        section.classList.add('animate-fade-in');
        
        // Remove animation class after it completes
        setTimeout(() => {
            section.classList.remove('animate-fade-in');
        }, 500);
        
        // Here you would typically handle navigation to the section
    });
});

// Handle scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all course sections for scroll animations
courseSections.forEach(section => {
    observer.observe(section);
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentSection = document.activeElement.closest('.bg-[#2d2d2d]');
        if (currentSection) {
            const sections = Array.from(courseSections);
            const currentIndex = sections.indexOf(currentSection);
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = currentIndex + 1;
            } else {
                nextIndex = currentIndex - 1;
            }
            
            if (nextIndex >= 0 && nextIndex < sections.length) {
                sections[nextIndex].focus();
                sections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
});

// Add accessibility attributes
courseSections.forEach((section, index) => {
    section.setAttribute('role', 'button');
    section.setAttribute('tabindex', '0');
    section.setAttribute('aria-label', `Course section ${index + 1}`);
});