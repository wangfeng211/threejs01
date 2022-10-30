import "./style.css";
import * as THREE from "three";
import { WebGLRenderer } from "three";
import Stat from "three/examples/jsm/libs/stats.module";

//目标 添加一个帧率监测

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();

//添加帧率监测器 最后把它加入到dom 中
const stat = new Stat();

// 添加多个物体到页面中
const cubes = [];
function createCube() {
  //设置一个随机大小
  const d = Math.random() * 3;
  const geometry = new THREE.BoxGeometry(d, d, d);

  const material = new THREE.MeshBasicMaterial({
    // 添加颜色的几种方式
    // color: "red",
    // color: 'rgb(255, 200, 100)'
    color: 0xffffff * Math.random(),
  });
  const cube = new THREE.Mesh(geometry, material);
  //为每个物体设置一个随机位置
  cube.position.set(
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 3
  );
  cubes.push(cube);
}

for (let i = 0; i < 20; i++) {
  createCube();
}

cubes.forEach((cube) => {
  scene.add(cube);
});

//添加坐标系
const asex = new THREE.AxesHelper(5, 5, 5);
scene.add(asex);

//相机
const carema = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
carema.position.set(2, 2, 5); //设置一个位置
carema.lookAt(0, 0, 0);
scene.add(carema);

//渲染器
const renderer = new WebGLRenderer();
renderer.setSize(w, h);
renderer.render(scene, carema);

//定义一个 clock
const clock = new THREE.Clock();
function tick() {
  const time = clock.getElapsedTime();

  cubes.forEach((cube, index) => {
    // 乘 index 让起始旋转值不同
    cube.rotation.x = time * 0.1 * index;
    cube.rotation.y = time * 0.1 * index;
  });

  requestAnimationFrame(tick);
  renderer.render(scene, carema);
  //每次渲染需要更新帧率
  stat.update();
}
tick();

document.getElementById("app").appendChild(renderer.domElement);
//注意 这里添加的是dom 
document.getElementById("app").appendChild(stat.dom);

