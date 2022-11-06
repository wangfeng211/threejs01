本项目使用Vite 构建工具，原生js，没有使用Vue 或React框架，下载后npm install 安装three依赖，然后npm run dev 运行项目，在index.html 中打开相应的js 文件即可


ThreeJs基本认识：
场景(scene)类似于一个房间
房间内有物体，物体由2部分组成：几何体（geometry） 和 材质（material）
房间内有灯光：light，这个项目中我们使用的是环境光 AmbientLight
相机，类似于我们的眼睛，或者说看物体的视角
最后还有一个跟平时不太相关的渲染器：rendered，可理解为我们的计算机，使用渲染器把以上所有的东西渲染到页面上
最后渲染器返回一个canvas对象，添加到body 或者其他Element中

名词解释： Mesh，可理解为面 或者物体，由两部分组成（几何体）geometry 和 material 
Point 、Line 也是由上面2部分组成