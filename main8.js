import "./style.css";
import * as THREE from "three";
import { WebGLRenderer } from "three";
import Stat from "three/examples/jsm/libs/stats.module";
//引入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//目标 添加阴影

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();

//公共材质
const material = new THREE.MeshNormalMaterial();

// 添加一个球体
const sphereGeo = new THREE.SphereGeometry(0.5);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "yellow",
});
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMaterial);
sphereMesh.position.y = 1
//1、 球体产生阴影
sphereMesh.castShadow = true;
scene.add(sphereMesh);

//添加一个平面
const planGeo = new THREE.PlaneGeometry(8, 8, 8);
const planMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
const planM = new THREE.Mesh(planGeo, planMaterial);
planM.rotation.x = -0.25 * Math.PI;
//2、平面接收阴影
planM.receiveShadow = true;
scene.add(planM);

//添加灯光
// // 环境光
const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.2;//强度
scene.add(ambientLight);
//平行光
const directionLight = new THREE.DirectionalLight({ color: 0xffffff });
directionLight.position.set(2, 2, 2);
//3、光线产生阴影
directionLight.castShadow = true;
scene.add(directionLight);

//相机
const carema = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
carema.position.set(0, 0, 5);
carema.lookAt(0, 0, 0);
scene.add(carema);

//渲染器
const renderer = new WebGLRenderer();
renderer.setSize(w, h);
 //4、 渲染器开启阴影
renderer.shadowMap.enabled = true;
renderer.render(scene, carema);

//控制器
const orbitControls = new OrbitControls(carema, renderer.domElement);

//clock
const clock = new THREE.Clock();
function tick() {
  const time = clock.getElapsedTime();

  requestAnimationFrame(tick);
  renderer.render(scene, carema);
  orbitControls.update();
}
tick();

document.getElementById("app").appendChild(renderer.domElement);
