import "./style.css";
import * as THREE from "three";
import { WebGLRenderer } from "three";
import Stat from "three/examples/jsm/libs/stats.module";
//引入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//目标 添加控制器 鼠标滑动可以转动坐标轴 可以放大缩小物体

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const stat = new Stat();

//添加几何体
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({
//   color: "red",
// });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

//添加几何体2 法向量物体
// const geometry = new THREE.BoxGeometry(1,1,1)
const geometry = new THREE.SphereGeometry(1)//球体，只需要传一个半径
const material = new THREE.MeshNormalMaterial()//每个面都是不同的
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)




//添加坐标系
const asex = new THREE.AxesHelper(5, 5, 5);
scene.add(asex);

//相机
const carema = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
carema.position.set(2, 2, 5);
carema.lookAt(0, 0, 0);
scene.add(carema);

//渲染器
const renderer = new WebGLRenderer();
renderer.setSize(w, h);
renderer.render(scene, carema);

//添加控制器
const orbitControls = new OrbitControls(carema, renderer.domElement);


//定义一个 clock
const clock = new THREE.Clock();
function tick() {
  const time = clock.getElapsedTime();

  // cube.rotation.x = time;
  // cube.rotation.y = time;
  requestAnimationFrame(tick);
  renderer.render(scene, carema);
  stat.update();
  //更新控制器
  orbitControls.update();
}
tick();

document.getElementById("app").appendChild(renderer.domElement);
//注意 这里添加的是dom
document.getElementById("app").appendChild(stat.dom);
