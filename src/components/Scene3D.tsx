import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D, Center, RoundedBox, Grid, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

interface Scene3DProps {
  letter: string;
  color: string;
  materialType: string;
  labelText: string;
  glow: boolean;
  size: number;
}

function LetterMesh({ letter, color, materialType, glow, size }: Omit<Scene3DProps, "labelText">) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const scale = 0.5 + (size - 10) / 40 * 1.0;

  const materialProps = (() => {
    switch (materialType) {
      case "silk": return { roughness: 0.2, metalness: 0.8 };
      case "neon": return { roughness: 0.1, metalness: 0.3, emissive: color, emissiveIntensity: glow ? 1.5 : 0.3 };
      default: return { roughness: 0.8, metalness: 0.1 };
    }
  })();

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group scale={scale}>
        <RoundedBox ref={meshRef} args={[2, 2.5, 0.5]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color={color} {...materialProps} />
        </RoundedBox>
        <Center position={[0, 0, 0.3]}>
          <mesh>
            <textGeometry args={[letter, { size: 1.2, depth: 0.2 }]} />
            <meshStandardMaterial color={glow ? "#ffffff" : color} emissive={glow ? color : "#000000"} emissiveIntensity={glow ? 0.8 : 0} />
          </mesh>
        </Center>
      </group>
    </Float>
  );
}

function FloorGrid() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={ref}>
      <Grid args={[20, 20]} cellSize={0.5} cellThickness={0.5} cellColor="#1a3a4a" sectionSize={2} sectionThickness={1} sectionColor="#00e5ff" fadeDistance={15} fadeStrength={1} position={[0, -2, 0]} />
    </group>
  );
}

function PlaceholderObject({ color, materialType, glow, size }: { color: string; materialType: string; glow: boolean; size: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const scale = 0.5 + (size - 10) / 40 * 1.0;

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.3;
  });

  const materialProps = (() => {
    switch (materialType) {
      case "silk": return { roughness: 0.2, metalness: 0.8 };
      case "neon": return { roughness: 0.1, metalness: 0.3, emissive: color, emissiveIntensity: glow ? 2 : 0.5 };
      default: return { roughness: 0.8, metalness: 0.1 };
    }
  })();

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={scale}>
        <dodecahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color={color} {...materialProps} />
      </mesh>
    </Float>
  );
}

const Scene3D = ({ letter, color, materialType, labelText, glow, size }: Scene3DProps) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, 3, -3]} intensity={0.5} color="#00e5ff" />

        <PlaceholderObject color={color} materialType={materialType} glow={glow} size={size} />

        {labelText && (
          <Center position={[0, -1.2, 0]}>
            <mesh>
              <planeGeometry args={[3, 0.4]} />
              <meshBasicMaterial color="#111" transparent opacity={0.7} />
            </mesh>
          </Center>
        )}

        <FloorGrid />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Scene3D;
