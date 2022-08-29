import * as THREE from "three"

export default class GraphicalScene
{
    public static FPS: number = 60

    protected scene: THREE.Scene

    protected camera: THREE.PerspectiveCamera

    protected renderer: THREE.WebGLRenderer

    protected x: number

    protected z: number

    public constructor()
    {
        this.scene = new THREE.Scene
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
        this.renderer = new THREE.WebGLRenderer
        this.x = 0
        this.z = 1
    }

    public init(domElement: HTMLDivElement): void
    {
        const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
        const boxMaterial = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xf9f9f9
        })
        const box = new THREE.Mesh(boxGeometry, boxMaterial)

        this.scene.add(box)

        this.camera.position.set(Math.sin(this.x) * 30, 30, Math.cos(this.z) * 30)
        this.camera.lookAt(0, 0, 0)

        this.renderer.setClearColor(0x363636)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        
        domElement.appendChild(this.renderer.domElement)
    }

    public render(): void
    {
        this.camera.position.x = Math.sin(this.x) * 30
        this.camera.position.z = Math.cos(this.z) * 30
        this.camera.lookAt(0, 0, 0)
        this.renderer.render(this.scene, this.camera)
    }
}