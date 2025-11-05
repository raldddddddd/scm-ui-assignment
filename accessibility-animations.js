/**
 * Accessibility-focused animations for the PWD Registration UI Analysis page
 * These animations demonstrate improved user experience principles
 */

// Particle system for background effect
class AccessibilityParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const colors = [
      'rgba(59, 130, 246, 0.5)',  // Blue
      'rgba(147, 51, 234, 0.5)',  // Purple
      'rgba(236, 72, 153, 0.5)',  // Pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvas.width || this.x < 0) {
      this.speedX *= -1;
    }
    if (this.y > this.canvas.height || this.y < 0) {
      this.speedY *= -1;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Main animation system
export function initAccessibilityAnimations() {
  // Create canvas for particle background
  const canvas = document.createElement('canvas');
  canvas.id = 'accessibility-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.3';
  
  document.body.insertBefore(canvas, document.body.firstChild);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create particles
  const particles = [];
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new AccessibilityParticle(canvas));
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw(ctx);
    });

    // Draw connections between nearby particles
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 100)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  return { canvas, particles };
}

// Typewriter effect for the header
export function initTypewriterEffect() {
  const header = document.querySelector('header h1');
  if (!header) return null;

  const originalText = header.textContent;
  header.textContent = '';
  header.style.borderRight = '2px solid #3b82f6';
  header.style.paddingRight = '5px';
  header.style.display = 'inline-block';
  
  let charIndex = 0;
  
  const typeInterval = setInterval(() => {
    if (charIndex < originalText.length) {
      header.textContent += originalText.charAt(charIndex);
      charIndex++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => {
        header.style.borderRight = 'none';
      }, 500);
    }
  }, 100);

  return typeInterval;
}

// Smooth scroll reveal for sections
export function initScrollReveal() {
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  return observer;
}

// Interactive button enhancement
export function enhanceButtons() {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      ripple.style.animation = 'ripple-effect 0.6s ease-out';
      
      const rect = button.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add CSS animation for ripple effect
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-effect {
      to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Calculate and return animation statistics
export function getAnimationStats() {
  return {
    particleCount: 50,
    canvasId: 'accessibility-canvas',
    animationsActive: true
  };
}

// Main initialization function
export function initAllAnimations() {
  const animations = initAccessibilityAnimations();
  const typewriter = initTypewriterEffect();
  const scrollObserver = initScrollReveal();
  enhanceButtons();
  
  return {
    animations,
    typewriter,
    scrollObserver,
    stats: getAnimationStats()
  };
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations);
  } else {
    initAllAnimations();
  }
}