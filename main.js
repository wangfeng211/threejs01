import "./style.css";
import * as THREE from "three";
import { WebGLRenderer } from "three";

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

//灯光 
// 这里创建一个环境光
const light = new THREE.AmbientLight()
// light.position(1,1,0)
scene.add(light);

//相机 类似于人的眼睛
const carema = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
carema.position.set(0, 0, 5); //设置一个位置
scene.add(carema);

//渲染器
const renderer = new WebGLRenderer();
renderer.setSize(w, h);
renderer.render(scene, carema);

document.getElementById('app').appendChild(renderer.domElement);
