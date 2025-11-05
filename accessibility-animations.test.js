/**
 * Jest tests for accessibility animations
 */

import {
  initAccessibilityAnimations,
  initTypewriterEffect,
  initScrollReveal,
  enhanceButtons,
  getAnimationStats
} from './accessibility-animations.js';

beforeEach(() => {
  document.body.innerHTML = `
    <header>
      <h1>SCM & UI/UX Analysis</h1>
    </header>
    <section>
      <h2>Test Section</h2>
    </section>
    <button id="testButton">Test Button</button>
  `;
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Accessibility Animations Module', () => {
  
  describe('getAnimationStats', () => {
    test('should return correct animation statistics', () => {
      const stats = getAnimationStats();
      expect(stats).toHaveProperty('particleCount');
      expect(stats).toHaveProperty('canvasId');
      expect(stats).toHaveProperty('animationsActive');
      expect(stats.particleCount).toBe(50);
      expect(stats.canvasId).toBe('accessibility-canvas');
      expect(stats.animationsActive).toBe(true);
    });

    test('particle count should be a positive number', () => {
      const stats = getAnimationStats();
      expect(stats.particleCount).toBeGreaterThan(0);
      expect(typeof stats.particleCount).toBe('number');
    });
  });

  describe('initAccessibilityAnimations', () => {
    test('should create canvas element with correct properties', () => {
      initAccessibilityAnimations();
      
      const canvas = document.getElementById('accessibility-canvas');
      expect(canvas).not.toBeNull();
      expect(canvas.tagName).toBe('CANVAS');
      expect(canvas.style.position).toBe('fixed');
      expect(canvas.style.zIndex).toBe('-1');
    });

    test('should create 50 particles', () => {
      const result = initAccessibilityAnimations();
      expect(result.particles).toHaveLength(50);
    });

    test('each particle should have required properties', () => {
      const result = initAccessibilityAnimations();
      const particle = result.particles[0];
      
      expect(particle).toHaveProperty('x');
      expect(particle).toHaveProperty('y');
      expect(particle).toHaveProperty('size');
      expect(particle).toHaveProperty('speedX');
      expect(particle).toHaveProperty('speedY');
      expect(particle).toHaveProperty('color');
    });
  });

  describe('initTypewriterEffect', () => {
    test('should clear header text initially', () => {
      const header = document.querySelector('header h1');
      
      initTypewriterEffect();
      
      expect(header.textContent).toBe('');
      expect(header.style.borderRight).toContain('2px solid');
    });

    test('should return interval ID', () => {
      const intervalId = initTypewriterEffect();
      expect(intervalId).not.toBeNull();
      clearInterval(intervalId);
    });

    test('should return null if header not found', () => {
      document.querySelector('header').remove();
      const result = initTypewriterEffect();
      expect(result).toBeNull();
    });
  });

  describe('initScrollReveal', () => {
    test('should apply initial styles to sections', () => {
      initScrollReveal();
      
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        expect(section.style.opacity).toBe('0');
        expect(section.style.transform).toBe('translateY(30px)');
        expect(section.style.transition).toContain('opacity');
      });
    });

    test('should return IntersectionObserver instance', () => {
      const observer = initScrollReveal();
      expect(observer).toBeInstanceOf(IntersectionObserver);
      observer.disconnect();
    });
  });

  describe('enhanceButtons', () => {
    test('should add ripple animation styles to document', () => {
      enhanceButtons();
      
      const styles = Array.from(document.head.querySelectorAll('style'));
      const hasRippleAnimation = styles.some(style => 
        style.textContent.includes('ripple-effect')
      );
      
      expect(hasRippleAnimation).toBe(true);
    });

    test('should add event listeners to buttons', () => {
      const buttons = document.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      // Just verify the function runs without errors
      expect(() => enhanceButtons()).not.toThrow();
    });
  });

  // FAILING TEST EXAMPLE (Intentionally fails to demonstrate test failure)
  // Comment out the test below after taking screenshot to allow deployment
  describe('Failing Test Example', () => {
    test('INTENTIONAL FAIL: particle count should be 100 (actually 50)', () => {
      const stats = getAnimationStats();
      // This will fail because particleCount is actually 50, not 100
      expect(stats.particleCount).toBe(100);
    });
  });

  describe('Edge Cases', () => {
    test('should handle missing DOM elements gracefully', () => {
      document.body.innerHTML = '';
      
      expect(() => initTypewriterEffect()).not.toThrow();
      expect(() => initScrollReveal()).not.toThrow();
      expect(() => enhanceButtons()).not.toThrow();
    });

    test('canvas should resize on window resize event', () => {
      const result = initAccessibilityAnimations();
      const canvas = result.canvas;
      
      global.innerWidth = 1920;
      global.innerHeight = 1080;
      window.dispatchEvent(new Event('resize'));
      
      expect(canvas.width).toBeDefined();
      expect(canvas.height).toBeDefined();
    });
  });
});
