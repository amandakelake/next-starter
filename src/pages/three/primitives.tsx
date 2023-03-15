import {useCallback, useEffect, useRef} from "react";
import styles from './index.module.css'
import * as Three from 'three'
import myBox from "@/components/primitive/box";
import MyCircle from "@/components/primitive/circle";

const meshArr: (Three.Mesh | Three.LineSegments)[] = []

export default function Primitives() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<Three.WebGLRenderer | null>(null)
    const cameraRef = useRef<Three.PerspectiveCamera | null>(null)

    const createInit = useCallback(() => {
        if (canvasRef.current === null) {
            return
        }
        meshArr.length = 0 // 以防万一，先清空原有数组
        // 1、初始化场景
        const scene = new Three.Scene()
        scene.background = new Three.Color(0xaaaaaa);
        // 2、初始化镜头
        const camera = new Three.PerspectiveCamera(40, 2, 0.1, 1000);
        camera.position.z = 120;
        cameraRef.current = camera
        // 3、初始化渲染器
        const renderer = new Three.WebGLRenderer({canvas: canvasRef.current as HTMLCanvasElement})
        rendererRef.current = renderer

        // 添加2盏灯光
        const light0 = new Three.DirectionalLight(0xFFFFFF, 1)
        const light1 = new Three.DirectionalLight(0xFFFFFF, 1)
        light0.position.set(-1, 2, 4)
        light1.position.set(-1, 2, -4)
        scene.add(light0)
        scene.add(light1)

        // 添加所有solid类型的图元实例，还有line类型的，此次暂不处理
        const solidPrimitivesArr: Three.BufferGeometry[] = []
        solidPrimitivesArr.push(myBox, MyCircle) // TODO 此次省略更多
        solidPrimitivesArr.forEach(item => {
            const material = createMaterial() // 随机获得一种颜色材质
            const mesh = new Three.Mesh(item, material)
            meshArr.push(mesh)
        })

        //定义物体在画面中显示的网格布局
        const eachRow = 5 //每一行显示 5 个
        const spread = 15 //行高 和 列宽

        meshArr.forEach((mesh, index) => {
            const row = Math.floor(index / eachRow) // 所在行
            const column = index % eachRow // 所在列

            mesh.position.x = (column - 2) * spread
            mesh.position.y = (2 - row) * spread

            scene.add(mesh)
        })

        const render = (time: number) => {
            time = time * 0.001
            meshArr.forEach(mesh => {
                mesh.rotation.x = time;
                mesh.rotation.y = time;
            })
            renderer.render(scene, camera)
            window.requestAnimationFrame(render)
        }
        window.requestAnimationFrame(render)

    }, [canvasRef])
    const resizeHandle = () => {
        //根据窗口大小变化，重新修改渲染器的视椎
        if (rendererRef.current === null || cameraRef.current === null) {
            return
        }

        const canvas = rendererRef.current.domElement
        cameraRef.current.aspect = canvas.clientWidth / canvas.clientHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(canvas.clientWidth, canvas.clientHeight, false)
    }

    const createMaterial = () => {
        const material = new Three.MeshPhongMaterial({side: Three.DoubleSide})

        const hue = Math.floor(Math.random() * 100) / 100 //随机获得一个色相
        const saturation = 1 //饱和度
        const luminance = 0.5 //亮度

        material.color.setHSL(hue, saturation, luminance)

        return material
    }

    //组件首次装载到网页后触发，开始创建并初始化 3D 场景
    useEffect(() => {
        createInit();
        resizeHandle();
        window.addEventListener('resize', resizeHandle)
        return () => {
            window.removeEventListener('resize', resizeHandle)
        }
    }, [canvasRef, createInit])

    return (
        <canvas ref={canvasRef} className={styles.fullScreenCanvas}></canvas>
    )
}