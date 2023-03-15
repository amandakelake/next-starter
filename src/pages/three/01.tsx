import {useEffect, useRef} from 'react';
import {BoxGeometry, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer} from "three";

/**
 * three basic usage
 */
export default function ThreeOne() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const resizeHandleRef = useRef<() => void>()

    useEffect(() => {
        initThree();
        return () => {
            if (resizeHandleRef && resizeHandleRef.current) {
                window.removeEventListener('resize', resizeHandleRef.current)
            }
        }
    }, [canvasRef])

    const initThree = () => {
        // @ts-ignore
        const renderer = new WebGLRenderer({canvas: canvasRef.current})
        const camera = new PerspectiveCamera(75, 2, 0.1, 5)
        const scene = new Scene()

        const geometry = new BoxGeometry(1, 1, 1) // 几何体

        // 材质
        const material1 = new MeshPhongMaterial({color: 0x44aa88})
        const material2 = new MeshPhongMaterial({color: 0xc50d0d})
        const material3 = new MeshPhongMaterial({color: 0x39b20a})

        // 网格
        const cube1 = new Mesh(geometry, material1)
        const cube2 = new Mesh(geometry, material2)
        const cube3 = new Mesh(geometry, material3)
        cube1.position.x = -2
        cube1.position.x = -0
        cube1.position.x = 2
        const cubes = [cube1, cube2, cube3]
        cubes.forEach(cube => {
            scene.add(cube)
        })

        const light = new DirectionalLight(0xFFFFFF, 1)
        light.position.set(-1, 2, 4)
        scene.add(light)// 将光源添加到场景中，若场景中没有任何光源，则可反光材质的物体渲染出的结果是一片漆黑，什么也看不见

        //设置透视镜头的Z轴距离，以便我们以某个距离来观察几何体
        //之前初始化透视镜头时，设置的近平面为 0.1，远平面为 5
        //因此 camera.position.z 的值一定要在 0.1 - 5 的范围内，超出这个范围则画面不会被渲染
        camera.position.z = 2

        const render = (time: number) => {
            time = time * 0.001 //原本 time 为毫秒，我们这里对 time 进行转化，修改成 秒，以便于我们动画旋转角度的递增
            cubes.map(cube => {
                cube.rotation.x = time
                cube.rotation.y = time
            })

            renderer.render(scene, camera)
            window.requestAnimationFrame(render)
        }
        window.requestAnimationFrame(render)

        const handleResize = () => {
            const canvas = renderer.domElement //获取 canvas
            camera.aspect = canvas.clientWidth / canvas.clientHeight //设置镜头宽高比
            camera.updateProjectionMatrix()//通知镜头更新视椎(视野)
            // 根据canvas尺寸调整渲染器的尺寸，且控制尺寸的主动权完全由canvas决定（第三个参数）
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
        }

        handleResize() //默认打开时，即重新触发一次

        resizeHandleRef.current = handleResize //将 resizeHandleRef.current 与 useEffect() 中声明的函数进行绑定
        window.addEventListener('resize', handleResize) //添加窗口 resize 事件处理函数
    }

    return <canvas ref={canvasRef}/>
}
