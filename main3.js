import "./style.css";
import * as THREE from "three";
import { WebGLRenderer } from "three";

//目标 简单动画

const w = window.innerWidth;
const h = window.innerHeight;

//以一个房间为例
//房间就是一个场景
const scene = new THREE.Scene();

//房间里面有家具
// geometry (物体)+ material （材质）
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//添加坐标系
const asex = new THREE.AxesHelper(2, 2, 2);
scene.add(asex);

//相机 类似于人的眼睛
const carema = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
carema.position.set(2, 2, 5); //设置一个位置
carema.lookAt(0, 0, 0);
scene.add(carema);

//渲染器 可理解为计算机把以上东西渲染出来
const renderer = new WebGLRenderer();
renderer.setSize(w, h);
renderer.render(scene, carema);

// 一、 基本不使用
// 使用js 中最常用的setInterval
// setInterval(() => {
//   // 旋转
//   cube.rotation.x += 0.01;
//   //更新变化后的值
//   renderer.render(scene, carema);
// }, 1000 / 60);
// // 60分之一秒 执行一次 但是这种方式不是我们开发中常用的

//二、 可以使用 但是在不同刷新率的机器上存在问题
//实际开发中我们使用 requestAnimationFrame
// 定义一个函数 让这个函数调用requestAnimationFrame
// function tick() {
//   cube.rotation.y += 0.01;
//   renderer.render(scene, carema);
//   requestAnimationFrame(tick);
// }
// tick();
// requestAnimationFrame 在功耗上比setInterVal做了很多优化，这里我们并没有传入时间间隔，它会尽可能的接近计算机的刷新频率

// 三 解决不同刷新率的问题
// 二的解决方式存在问题：在60Hz的机器上 每 1/60秒旋转0.01， 但是在 120 Hz的机器上 每1/120秒旋转0.01，所以在120Hz的机器上看上去转的快
//为了解决问题二 我们可以定义一个时间
// let time = Date.now();
// function tick() {
//   let current = Date.now();
//   let delta = time - current;
//   cube.rotation.y += delta * 0.00001;
//   renderer.render(scene, carema);
//   requestAnimationFrame(tick);
// }
// tick();


//四  推荐
// 方案三 的做法有点麻烦 所以ThreeJS 为我们提供了一种更优雅的方式，这种方式已经考虑了不同刷新率的问题
//定义一个 clock
const clock = new THREE.Clock()
function tick (){
    const time = clock.getElapsedTime()
    //time 是一个均匀增加的值
    // console.log(time)
    cube.rotation.z  = time;
    cube.position.x = Math.sin(time * 2) * 2
    cube.position.y = Math.cos(time * 2) * 2

    requestAnimationFrame(tick)
    renderer.render(scene, carema)
}
tick()

document.getElementById("app").appendChild(renderer.domElement);
