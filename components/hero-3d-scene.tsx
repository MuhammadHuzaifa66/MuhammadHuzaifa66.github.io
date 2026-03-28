'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      
      // Gradient colors from cyan to dark blue
      const t = Math.random()
      colors[i * 3] = 0.15 + t * 0.15     // R
      colors[i * 3 + 1] = 0.84 * (1 - t) + 0.15 * t  // G
      colors[i * 3 + 2] = 0.86 * (1 - t) + 0.35 * t  // B
    }
    
    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function AICore() {
  const groupRef = useRef<THREE.Group>(null)
  const innerSphereRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.x = state.clock.elapsedTime * 0.3
      innerSphereRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Inner glowing core */}
      <Sphere ref={innerSphereRef} args={[0.8, 64, 64]}>
        <MeshDistortMaterial
          color="#27D6DB"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#27D6DB"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Outer wireframe shell */}
      <Sphere args={[1.2, 32, 32]}>
        <meshBasicMaterial
          color="#092658"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>
      
      {/* Orbiting rings */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Torus args={[1.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#27D6DB" transparent opacity={0.6} />
        </Torus>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Torus args={[1.8, 0.015, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#092658" transparent opacity={0.4} />
        </Torus>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
        <Torus args={[2.1, 0.01, 16, 100]} rotation={[Math.PI / 4, -Math.PI / 3, 0]}>
          <meshBasicMaterial color="#27D6DB" transparent opacity={0.3} />
        </Torus>
      </Float>
    </group>
  )
}

function FloatingGeometries() {
  const group1Ref = useRef<THREE.Group>(null)
  const group2Ref = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group1Ref.current) {
      group1Ref.current.rotation.y = state.clock.elapsedTime * 0.1
      group1Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.x = state.clock.elapsedTime * 0.15
      group2Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.2
    }
  })

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <group ref={group1Ref} position={[-4, 1, -2]}>
          <Octahedron args={[0.5]}>
            <meshStandardMaterial
              color="#27D6DB"
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.7}
            />
          </Octahedron>
        </group>
      </Float>
      
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.6}>
        <group ref={group2Ref} position={[4, -1, -3]}>
          <Octahedron args={[0.4]}>
            <meshStandardMaterial
              color="#092658"
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.6}
            />
          </Octahedron>
        </group>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.5}>
        <group position={[3, 2, -4]}>
          <Sphere args={[0.3, 32, 32]}>
            <meshStandardMaterial
              color="#27D6DB"
              metalness={0.7}
              roughness={0.3}
              transparent
              opacity={0.5}
            />
          </Sphere>
        </group>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
        <group position={[-3, -2, -2]}>
          <Sphere args={[0.25, 32, 32]}>
            <meshStandardMaterial
              color="#092658"
              metalness={0.6}
              roughness={0.4}
              transparent
              opacity={0.4}
            />
          </Sphere>
        </group>
      </Float>
    </>
  )
}

function MouseParallax() {
  const { camera } = useThree()
  
  useFrame((state) => {
    const x = state.pointer.x * 0.5
    const y = state.pointer.y * 0.3
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.05)
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#27D6DB" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#092658" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#ffffff"
      />
      
      <MouseParallax />
      <Particles count={300} />
      <AICore />
      <FloatingGeometries />
      
      <Environment preset="city" />
    </>
  )
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
