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
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.2;
  });

  const materialProps = (() => {
    switch (materialType) {
      case "silk": return { roughness: 0.3, metalness: 0.6 };
      case "neon": return { roughness: 0.15, metalness: 0.2, emissive: color, emissiveIntensity: glow ? 1.2 : 0.3 };
      default: return { roughness: 0.9, metalness: 0.05 };
    }
  })();

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group scale={scale}>
        <RoundedBox ref={meshRef} args={[2, 2.5, 0.5]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color={color} {...materialProps} />
        </RoundedBox>
      </group>
    </Float>
  );
}

function FloorGrid() {
  return (
    <Grid
      args={[20, 20]}
      cellSize={0.5}
      cellThickness={0.3}
      cellColor="#D4C5B0"
      sectionSize={2}
      sectionThickness={0.8}
      sectionColor="#C4754B"
      fadeDistance={15}
      fadeStrength={1}
      position={[0, -2, 0]}
    />
  );
}

function LabelPlane({ text }: { text: string }) {
  if (!text) return null;
  return (
    <Center position={[0, -1.5, 0]}>
      <Text fontSize={0.25} color="#8B6F5A" anchorX="center" anchorY="middle" font="https://fonts.gstatic.com/s/dmseriftext/v12/rnCu-xZa_krGOkCUY9IN49f2w_eGfIEt.woff2">
        {text}
      </Text>
    </Center>
  );
}

const Scene3D = ({ letter, color, materialType, labelText, glow, size }: Scene3DProps) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#F7F5F0"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFF8F0" />
        <pointLight position={[-3, 3, -3]} intensity={0.4} color="#FFB997" />

        <PlaceholderObject color={color} materialType={materialType} glow={glow} size={size} />
        <LabelPlane text={labelText} />
        <FloorGrid />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 4} />
        <Environment preset="apartment" />
      </Canvas>
    </div>
  );
};

export default Scene3D;
