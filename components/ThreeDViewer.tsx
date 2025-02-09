"use client"

import { useEffect, useState } from "react"
import { Canvas, useLoader, useThree } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

interface ThreeDViewerProps {
  modelPath: string
}

const Model = ({ modelPath }: { modelPath: string }) => {
  const gltf = useLoader(GLTFLoader, modelPath)
  const { camera } = useThree()

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(gltf.scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    const maxDim = Math.max(size.x, size.y, size.z)
    const fov = camera.fov * (Math.PI / 180)
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))

    cameraZ *= 1.5 // Zoom out a little so object fits in view

    camera.position.set(center.x, center.y, center.z + cameraZ)
    camera.lookAt(center)
    camera.updateProjectionMatrix()
  }, [gltf, camera])

  return <primitive object={gltf.scene} />
}

const ThreeDViewer: React.FC<ThreeDViewerProps> = ({ modelPath }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loader = new GLTFLoader()
    loader.load(
      modelPath,
      () => setIsLoading(false),
      undefined,
      (error) => console.error("Error loading 3D model:", error),
    )
  }, [modelPath])

  if (isLoading) {
    return <div>Loading 3D model...</div>
  }

  return (
    <Canvas style={{ height: "400px" }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Model modelPath={modelPath} />
      <OrbitControls />
    </Canvas>
  )
}

export default ThreeDViewer

