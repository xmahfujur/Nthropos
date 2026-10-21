import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  phase: number;
  pulseSpeed: number;
  layer: number; // 0: back (subtle), 1: mid, 2: foreground
}

interface Pulse {
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  color: string;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
      isActive: false
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isActive = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let nodes: Node[] = [];
    let pulses: Pulse[] = [];

    const initNodes = () => {
      nodes = [];
      pulses = [];
      // Calculate node density based on screen dimensions
      const count = Math.min(Math.floor((width * height) / 16000), 55);

      for (let i = 0; i < count; i++) {
        const layer = Math.random() > 0.6 ? 2 : Math.random() > 0.3 ? 1 : 0;
        const baseRadius = layer === 2 ? 2.5 : layer === 1 ? 1.8 : 1.2;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (0.35 + layer * 0.15),
          vy: (Math.random() - 0.5) * (0.35 + layer * 0.15),
          radius: baseRadius,
          baseRadius,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          layer
        });
      }
    };

    initNodes();

    let lastPulseTime = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Spawn subtle synaptic pulses along connections
      if (!prefersReducedMotion && time - lastPulseTime > 1400 && nodes.length > 2) {
        lastPulseTime = time;
        const sourceIdx = Math.floor(Math.random() * nodes.length);
        // Find a nearby node
        const maxDist = 140;
        const candidates: number[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (j === sourceIdx) continue;
          const dx = nodes[sourceIdx].x - nodes[j].x;
          const dy = nodes[sourceIdx].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            candidates.push(j);
          }
        }
        if (candidates.length > 0) {
          const targetIdx = candidates[Math.floor(Math.random() * candidates.length)];
          pulses.push({
            sourceIdx,
            targetIdx,
            progress: 0,
            speed: 0.012 + Math.random() * 0.015,
            color: Math.random() > 0.5 ? '#818cf8' : '#38bdf8'
          });
        }
      }

      // Update and draw connections
      const maxConnectDist = Math.min(width * 0.2, 130);

      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        if (!prefersReducedMotion) {
          // Node movement
          nodeA.x += nodeA.vx;
          nodeA.y += nodeA.vy;

          // Bounce off boundaries gently
          if (nodeA.x < 10) {
            nodeA.x = 10;
            nodeA.vx *= -1;
          } else if (nodeA.x > width - 10) {
            nodeA.x = width - 10;
            nodeA.vx *= -1;
          }
          if (nodeA.y < 10) {
            nodeA.y = 10;
            nodeA.vy *= -1;
          } else if (nodeA.y > height - 10) {
            nodeA.y = height - 10;
            nodeA.vy *= -1;
          }

          // Gentle mouse displacement
          if (mouse.isActive) {
            const dx = nodeA.x - mouse.x;
            const dy = nodeA.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius && dist > 1) {
              const force = (1 - dist / mouse.radius) * 0.8;
              nodeA.x += (dx / dist) * force;
              nodeA.y += (dy / dist) * force;
            }
          }

          nodeA.phase += nodeA.pulseSpeed;
        }

        // Draw connections between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * (nodeA.layer === 2 ? 0.22 : 0.12);
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = nodeA.layer === 2 ? 0.9 : 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw and update active pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const n1 = nodes[pulse.sourceIdx];
        const n2 = nodes[pulse.targetIdx];
        if (!n1 || !n2) continue;

        const px = n1.x + (n2.x - n1.x) * pulse.progress;
        const py = n1.y + (n2.y - n1.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = pulse.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulseFactor = Math.sin(n.phase) * 0.4 + 1;
        const currentRadius = n.baseRadius * (prefersReducedMotion ? 1 : pulseFactor);

        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);

        if (n.layer === 2) {
          ctx.fillStyle = '#c7d2fe';
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(165, 180, 252, 0.5)';
        } else if (n.layer === 1) {
          ctx.fillStyle = '#818cf8';
          ctx.shadowBlur = 3;
          ctx.shadowColor = 'rgba(99, 102, 241, 0.3)';
        } else {
          ctx.fillStyle = '#475569';
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-70 mix-blend-screen"
      aria-hidden="true"
    />
  );
};
