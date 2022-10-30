import "./style.css";
import * as THREE from "three";
import { WebGLRenderer } from "three";
import Stat from "three/examples/jsm/libs/stats.module";
//引入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//目标 Group 并使用Group实现一个类似于太阳、地球、月球 自转和公转效果

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const stat = new Stat();



//添加2个Group
const group1 = new THREE.Group();// 表示太阳系 包含cube2（太阳） 和 group2
const group2 = new THREE.Group();//表示地月系 包含cube1（地球） 和 cube3 (月球)

// 添加3个物体
//地球
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshNormalMaterial();
const cube1 = new THREE.Mesh(geometry, material);
group2.position.y = 2;
group2.add(cube1)
group1.add(group2)


// 太阳
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshNormalMaterial();
const cube2 = new THREE.Mesh(geometry2, material2);
group1.add(cube2)

// 月球
const geometry3 = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material3 = new THREE.MeshNormalMaterial();
const cube3 = new THREE.Mesh(geometry3, material3);
cube3.position.y = -0.8;
group2.add(cube3)

scene.add(group1);

//坐标系
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

  //自转
  cube1.rotation.z = time;
  cube2.rotation.z = time;
  cube3.rotation.z = time;

  // 公转
  group1.rotation.z = time;
  group2.rotation.z = time;
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
