import "./style.css";
import * as THREE from "three";
import { WebGLRenderer } from "three";
import Stat from "three/examples/jsm/libs/stats.module";
//引入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//目标 Group练习 实现一个简易的汽车
// 汽车由一个立方体表示，包含一个立方体（人），四个滚动的轮子

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const stat = new Stat();

//公共材质
const material = new THREE.MeshNormalMaterial();

const car = new THREE.Group(); //汽车
const body = new THREE.Group(); //车身
car.add(body);
scene.add(car);

const bodyGeo = new THREE.BoxGeometry(1, 2, 0.5);
const bodyMesh = new THREE.Mesh(bodyGeo, material);
body.add(bodyMesh);

//车上的人
const personGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const personMetrial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const personMesh = new THREE.Mesh(personGeometry, personMetrial);
personMesh.position.z = 0.5;
body.add(personMesh);

//添加轮子1
const wheelGroup1 = new THREE.Group();
const wheelGeometry1 = new THREE.BoxGeometry(0.1, 0.8, 0.8);
const wheelMaterial1 = new THREE.MeshBasicMaterial();
const wheelMesh1 = new THREE.Mesh(wheelGeometry1, wheelMaterial1);
wheelGroup1.add(wheelMesh1);
wheelGroup1.position.x = -0.7;
wheelGroup1.position.y = 0.7;
//创建轮胎
const count = 20;
const r = 0.5; //轮胎半径
const wheelItemsGroup = new THREE.Group(); //存放轮胎
for (let i = 0; i < count; i++) {
  const wheelItemGeo = new THREE.BoxGeometry(0.1, 0.1, 0.2);
  const wheelItemMesh = new THREE.Mesh(wheelItemGeo, material);
  wheelItemMesh.position.x = r * Math.cos(((Math.PI * 2) / count) * i);
  wheelItemMesh.position.y = r * Math.sin(((Math.PI * 2) / count) * i);
  wheelItemsGroup.add(wheelItemMesh);
}
wheelItemsGroup.rotation.y = Math.PI / 2;
wheelGroup1.add(wheelItemsGroup);
car.add(wheelGroup1);

//克隆轮子2
const wheelGroup2 = wheelGroup1.clone();
wheelGroup2.position.x = 0.7;
wheelGroup2.position.y = 0.7;
car.add(wheelGroup2);

//克隆轮子3
const wheelGroup3 = wheelGroup1.clone();
wheelGroup3.position.x = 0.7;
wheelGroup3.position.y = -0.7;
car.add(wheelGroup3);

//克隆轮子4
const wheelGroup4 = wheelGroup1.clone();
wheelGroup4.position.x = -0.7;
wheelGroup4.position.y = -0.7;
car.add(wheelGroup4);

//相机
const carema = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
carema.position.set(0, 0, 5);
carema.lookAt(0, 0, 0);
scene.add(carema);

//渲染器
const renderer = new WebGLRenderer();
renderer.setSize(w, h);
renderer.render(scene, carema);

//控制器
const orbitControls = new OrbitControls(carema, renderer.domElement);

//clock
const clock = new THREE.Clock();
function tick() {
  const time = clock.getElapsedTime();

  //汽车开始移动
  // car.position.y = Math.sin(time) * 2;
  car.position.y = (time % 4) - 1;

  //轮子开始转动
  wheelGroup1.rotation.x = -time * 2;
  wheelGroup2.rotation.x = -time * 2;
  wheelGroup3.rotation.x = -time * 2;
  wheelGroup4.rotation.x = -time * 2;

  requestAnimationFrame(tick);
  renderer.render(scene, carema);
  orbitControls.update();
}
tick();

document.getElementById("app").appendChild(renderer.domElement);
