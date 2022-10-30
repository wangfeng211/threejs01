import "./style.css";
import * as THREE from "three";
import { WebGLRenderer } from "three";

//目标 添加坐标系 了解位置Position 旋转Rotation 缩放Scale

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

//灯光 由于我们使用的是基本材质，所以不使用灯光也可以看到物体
// 这里创建一个环境光
// const light = new THREE.AmbientLight()
// scene.add(light);

//添加坐标系
const asex = new THREE.AxesHelper(2, 2, 2);
scene.add(asex);

//改变位置
// cube.position.set(1,1,1)
//也可以单独设置
// cube.position.x = 2
// cube.position.y = 2
// cube.position.z = 2

// 旋转 Rotation 弧度制
// cube.rotation.x = 45 / 180 * Math.PI; //沿x轴 旋转45 度
// cube.rotation.y = 45 / 180 * Math.PI;// 沿y轴 旋转45度
// // 旋转时一般只需要旋转2个轴 就可了，旋转3个轴的效果其实也可以通过旋转2个轴来实现
// console.log(cube.rotation);

//缩放
// cube.scale.x = 2;//沿x轴放大2倍
// cube.scale.y = 0.5;//在y轴缩小为原来的0.5倍
// cube.scale.z = 2;
//也可以写成如下样式：
cube.scale.set(2, 1, 1);
console.log(cube.scale)

//相机 类似于人的眼睛
const carema = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
carema.position.set(2, 2, 5); //设置一个位置
carema.lookAt(0, 0, 0);
scene.add(carema);

//渲染器 可理解为计算机把以上东西渲染出来
const renderer = new WebGLRenderer();
renderer.setSize(w, h);
renderer.render(scene, carema);

document.getElementById("app").appendChild(renderer.domElement);
