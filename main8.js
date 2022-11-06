import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'dat.gui'


//创建场景
const scene = new THREE.Scene();

const gui = new dat.GUI()

//添加灯光 颜色 强度
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1);
scene.add(light);

//环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

//创建一个球体
const geometry = new THREE.SphereGeometry(0.5);
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 0.5;
scene.add(mesh);

//添加一个平面
const planeGeo = new THREE.PlaneGeometry(10, 10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xcccccc,
});
const planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
planeMesh.rotateX(-0.5 * Math.PI);
scene.add(planeMesh);

//创建透视相机
const carema = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  100
);
carema.position.set(1, 2, 2);
carema.lookAt(0, 0, 0);

//创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, carema);

//控制器
const orbitControls = new OrbitControls(carema, renderer.domElement);

//坐标轴
const axes = new THREE.AxesHelper(2, 2, 3);
scene.add(axes);

//显示阴影需要4步
// 1.渲染器 打开阴影
renderer.shadowMap.enabled = true;
// 2.设置 灯光
light.castShadow = true;
// 3.设置物体
mesh.castShadow = true;
// 4.设置平面接收阴影
planeMesh.receiveShadow = true;

//设置阴影的光滑程度 默认512 * 512
// 此时可以看到阴影非常光滑 一般设置为2的幂次方
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;

gui.add(light.position, 'x', -5,5, 0.01)
gui.add(light.position, 'y', -5,5, 0.01)


const clock = new THREE.Clock();
const time = () => {
  requestAnimationFrame(() => {
    renderer.render(scene, carema);

    const count = clock.getElapsedTime();
    mesh.position.y = Math.abs(Math.sin(count)) + 0.5;
    orbitControls.update();
    time();
  });
};
time();

document.getElementById("app").appendChild(renderer.domElement);
