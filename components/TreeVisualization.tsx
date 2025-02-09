"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three"

function Tree(props: any) {
  const groupRef = useRef<THREE.Group>(null)
  const [model, setModel] = useState<THREE.Group | null>(null)

  useEffect(() => {
    const loader = new GLTFLoader()
    loader.load(
      "part1.glb",
      (gltf) => {
        setModel(gltf.scene)
      },
      undefined,
      (error) => {
        console.error("Failed to load GLTF model:", error)
        setModel(createFallbackTree())
      },
    )
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  const createFallbackTree = () => {
    const treeGroup = new THREE.Group()

    // Tree trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, 2, 32)
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: "#8B4513" })
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
    trunk.position.set(0, 1, 0)
    treeGroup.add(trunk)

    // Tree foliage
    const foliageGeometry = new THREE.ConeGeometry(1, 2, 32)
    const foliageMaterial = new THREE.MeshStandardMaterial({ color: "#228B22" })
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial)
    foliage.position.set(0, 2.5, 0)
    treeGroup.add(foliage)

    return treeGroup
  }

  return (
    <group ref={groupRef} {...props}>
      {model && <primitive object={model} />}
    </group>
  )
}

export function TreeVisualization() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Tree position={[0, -2, 0]} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}

export default TreeVisualization

