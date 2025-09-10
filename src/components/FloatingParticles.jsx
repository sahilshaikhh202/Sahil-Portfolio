import React, { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouse = { x: 0, y: 0 };
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 120; // Height of the space between header and hero
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse tracking for interactive effects
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Enhanced Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.baseSize = this.size;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.baseOpacity = this.opacity;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = Math.random() * 0.02 - 0.01;
        this.color = this.getRandomColor();
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.connections = [];
      }
      
      getRandomColor() {
        const colors = [
          '#3b82f6', // blue-500
          '#6366f1', // indigo-500
          '#8b5cf6', // violet-500
          '#a855f7', // purple-500
          '#ec4899', // pink-500
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        // Floating movement with sine wave
        this.angle += this.angleSpeed;
        this.x += this.speedX + Math.sin(this.angle) * 0.5;
        this.y += this.speedY + Math.cos(this.angle) * 0.3;
        
        // Pulsing effect
        this.size = this.baseSize + Math.sin(Date.now() * this.pulseSpeed) * 0.5;
        this.opacity = this.baseOpacity + Math.sin(Date.now() * this.pulseSpeed) * 0.2;
        
        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          this.size = this.baseSize + force * 2;
          this.opacity = Math.min(1, this.baseOpacity + force * 0.3);
        }
        
        // Wrap around edges with smooth transition
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.y > canvas.height + 10) this.y = -10;
        if (this.y < -10) this.y = canvas.height + 10;
      }
      
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Main particle with glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Gradient glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.4, this.color + '80');
        gradient.addColorStop(1, this.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Inner bright core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.restore();
      }
      
      drawConnections(particles) {
        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i];
          const dx = this.x - particle.x;
          const dy = this.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120 && distance > 0) {
            ctx.save();
            ctx.globalAlpha = (120 - distance) / 120 * 0.15;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }
    
    // Create particles
    const particles = [];
    for (let i = 0; i < 25; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      // Clear with slight trail effect for smoother motion
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first (behind particles)
      particles.forEach(particle => {
        particle.drawConnections(particles);
      });
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-20 left-0 w-full h-30 pointer-events-none z-0">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-60 dark:opacity-70"
        style={{ pointerEvents: 'auto' }}
      />
    </div>
  );
}
