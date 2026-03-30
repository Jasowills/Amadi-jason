import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 180, mousePos, isDark }) {
  const mesh = useRef();

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 15;
      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [positions, velocities];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const posArray = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3] += velocities[i3] + Math.sin(time * 0.1 + i * 0.5) * 0.002;
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.08 + i * 0.3) * 0.002;
      posArray[i3 + 2] += velocities[i3 + 2];

      // Wrap boundaries
      if (Math.abs(posArray[i3]) > 15) posArray[i3] *= -0.95;
      if (Math.abs(posArray[i3 + 1]) > 15) posArray[i3 + 1] *= -0.95;
      if (Math.abs(posArray[i3 + 2]) > 8) posArray[i3 + 2] *= -0.95;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Subtle mouse-driven rotation
    const mx = mousePos.current.x;
    const my = mousePos.current.y;
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mx * 0.15, 0.02);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, my * 0.1, 0.02);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.06 : 0.05}
        color={isDark ? '#B5FF48' : '#3D6600'}
        transparent
        opacity={isDark ? 0.6 : 0.35}
        sizeAttenuation
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

export default function ParticleField({ className = '', isDark = true }) {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <Particles mousePos={mousePos} isDark={isDark} />
      </Canvas>
    </div>
  );
}
