"use client";

import React, { useEffect, useRef } from "react";

export function ThreeDCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Mouse state
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-0.5, 0.5]
      mouse.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouse.targetY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Points definition
    interface Point3D {
      x: number;
      y: number;
      z: number;
      color: string;
      size: number;
    }

    const points: Point3D[] = [];
    // Calculate radius dynamically based on canvas size
    const getRadius = (w: number, h: number) => Math.min(w, h) * 0.22;
    let sphereRadius = getRadius(width, height);
    const totalPoints = 140;

    // Generate sphere points (Fibonacci sphere algorithm for even distribution)
    for (let i = 0; i < totalPoints; i++) {
      const phi = Math.acos(1 - 2 * (i / totalPoints));
      const theta = Math.sqrt(totalPoints * Math.PI) * phi;

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      // Color transition from blue to lime
      const ratio = i / totalPoints;
      const color = ratio > 0.5 ? "#38BDF8" : "#A3E635";

      points.push({ x, y, z, color, size: Math.random() * 2 + 1 });
    }

    // Generate some floating background particles
    const backgroundParticles: Point3D[] = [];
    const bgCount = 60;
    for (let i = 0; i < bgCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const distance = sphereRadius * (1.2 + Math.random() * 1.5);

      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = distance * Math.cos(phi);

      backgroundParticles.push({
        x,
        y,
        z,
        color: Math.random() > 0.5 ? "#38BDF8" : "#A3E635",
        size: Math.random() * 1.2 + 0.5,
      });
    }

    // Rotation angles
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      sphereRadius = getRadius(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen mouse movement for smooth inertial rotation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Base auto-rotation + mouse control offset
      angleY += 0.003 + mouse.x * 0.01;
      angleX += 0.002 + mouse.y * 0.01;
      angleZ += 0.001;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // Perspective projection parameters
      const fov = 350;
      const cameraDistance = 450;

      // Render background particles first (depth-sorting helper)
      const allParticles = [
        ...points.map(p => ({ ...p, isSphere: true })),
        ...backgroundParticles.map(p => ({ ...p, isSphere: false })),
      ];

      // Transform 3D coordinates
      const projected = allParticles.map(p => {
        // Rotate Z
        let x1 = p.x * cosZ - p.y * sinZ;
        let y1 = p.x * sinZ + p.y * cosZ;
        let z1 = p.z;

        // Rotate Y
        let x2 = x1 * cosY - z1 * sinY;
        let y2 = y1;
        let z2 = x1 * sinY + z1 * cosY;

        // Rotate X
        let x3 = x2;
        let y3 = y2 * cosX - z2 * sinX;
        let z3 = y2 * sinX + z2 * cosX;

        // Perspective Projection
        const scale = fov / (fov + z3 + cameraDistance);
        const projX = x3 * scale + width / 2;
        const projY = y3 * scale + height / 2;

        return {
          projX,
          projY,
          scale,
          zDepth: z3,
          color: p.color,
          size: p.size * scale * 2,
          isSphere: p.isSphere,
        };
      });

      // Depth sort (render back particles first, then lines, then front particles)
      projected.sort((a, b) => b.zDepth - a.zDepth);

      // Draw lines between near sphere particles
      ctx.lineWidth = 0.4;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (!p1.isSphere) continue;

        // Check nearest neighbors on the sphere
        let connections = 0;
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (!p2.isSphere) continue;

          // Compute screen distance
          const dx = p1.projX - p2.projX;
          const dy = p1.projY - p2.projY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect points that are close enough
          const maxDist = sphereRadius * p1.scale * 0.45;
          if (dist < maxDist && connections < 4) {
            connections++;
            // Alpha falls off as distance increases and based on depth
            const alpha = (1 - dist / maxDist) * 0.15 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = p1.color === "#38BDF8" 
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(163, 230, 53, ${alpha})`;
            
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.stroke();
          }
        }
      }

      // Draw all particles
      projected.forEach(p => {
        // Skip rendering points outside viewport
        if (p.projX < 0 || p.projX > width || p.projY < 0 || p.projY > height) return;

        ctx.beginPath();
        ctx.arc(p.projX, p.projY, p.size, 0, Math.PI * 2);

        if (p.isSphere) {
          // Sphere points are more solid and have small glows
          const opacity = Math.min(1, Math.max(0.2, p.scale));
          ctx.fillStyle = p.color === "#38BDF8"
            ? `rgba(56, 189, 248, ${opacity})`
            : `rgba(163, 230, 53, ${opacity})`;
          ctx.fill();
        } else {
          // Floating background particles are soft and blurred
          const opacity = (1 - (p.zDepth + cameraDistance) / (fov * 2)) * 0.25;
          ctx.fillStyle = p.color === "#38BDF8"
            ? `rgba(56, 189, 248, ${opacity})`
            : `rgba(163, 230, 53, ${opacity})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 md:opacity-60"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
