import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Center, RoundedBox, Grid, Float, Environment, Text } from "@react-three/drei";
import * as THREE from "three";

interface Scene3DProps {
  letter: string;
  color: string;
  materialType: string;
  labelText: string;
  glow: boolean;
  size: number;
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
      <group scale={scale}>
        <RoundedBox ref={meshRef} args={[2, 2.5, 0.5]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color={color} {...materialProps} />
        </RoundedBox>
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

function LabelPlane({ text }: { text: string }) {
  if (!text) return null;
  return (
    <Center position={[0, -1.5, 0]}>
      <Text fontSize={0.25} color="#00e5ff" anchorX="center" anchorY="middle" font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPb54C_k3HqUtEw.woff2">
        {text}
      </Text>
    </Center>
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
        <LabelPlane text={labelText} />
        <FloorGrid />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Scene3D;
