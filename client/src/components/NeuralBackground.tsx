import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function NeuralBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize points
    const numPoints = 50;
    pointsRef.current = Array.from({ length: numPoints }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    let animationId: number;

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      const points = pointsRef.current;
      const mouse = mouseRef.current;

      // Update points
      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
      });

      // Draw connections
      const connectionDistance = 150;
      const mouseDistance = 220;

      points.forEach((point, i) => {
        const distToMouse = Math.sqrt(
          (point.x - mouse.x) ** 2 + (point.y - mouse.y) ** 2
        );
        
        const isNearMouse = distToMouse < mouseDistance;
        
        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, isNearMouse ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isNearMouse 
          ? 'rgba(100, 180, 255, 1)' 
          : 'rgba(59, 130, 246, 0.8)';
        ctx.fill();
        
        // Add subtle glow for all points
        if (!isNearMouse) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
          ctx.fill();
        }
        
        // Add glow effect for points near mouse
        if (isNearMouse) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(100, 180, 255, 0.4)';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(point.x, point.y, 20, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(100, 180, 255, 0.15)';
          ctx.fill();
        }

        // Draw connections to other points
        for (let j = i + 1; j < points.length; j++) {
          const other = points[j];
          const dist = Math.sqrt(
            (point.x - other.x) ** 2 + (point.y - other.y) ** 2
          );

          if (dist < connectionDistance) {
            const otherDistToMouse = Math.sqrt(
              (other.x - mouse.x) ** 2 + (other.y - mouse.y) ** 2
            );
            const bothNearMouse = isNearMouse && otherDistToMouse < mouseDistance;
            
            const opacity = bothNearMouse 
              ? 1 * (1 - dist / connectionDistance)
              : 0.5 * (1 - dist / connectionDistance);

            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = bothNearMouse 
              ? `rgba(100, 180, 255, ${opacity})`
              : `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = bothNearMouse ? 3 : 1;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}
