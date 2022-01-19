import * as THREE from "three";
import "./style/index.less";
import OrbitControl from "./OrbitControl";
window.THREE = THREE;
window.onload = function () {
  OrbitControl(window.THREE);
  let scene = new THREE.Scene();
  let camara = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camara.lookAt(scene.position);
  camara.position.set(50, 0, 40);

  let renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // let gemetry = new THREE.BoxGeometry(10, 10, 10);
  //               // 左边  右边   上   下    前   后
  //              // ,"py" ,"ny", "nx",
  // let picList = ["nz","pz", "py", "ny", "px", "nx"];
  // let textureMap = [];

  // picList.forEach(item=>{
  //   let url = require(`./image/${item}.png`).default;
  //   let texture = new THREE.TextureLoader().load(url);
  //   texture.needsUpdate = true;
  //   let map = new THREE.MeshBasicMaterial({
  //     map: texture,
  //     side: THREE.DoubleSide
  //   })
  //   textureMap.push(map);
  // })

  // let mesh = new THREE.Mesh(gemetry, textureMap);
  // // mesh.geometry.scale(10, 10, -10)
  // scene.add(mesh)

  let dataList = [
    {
      url: "./room.jpg",
      tipList: [
        {
          position: { x: -200, y: -4, z: -147 }, // 标签位置
          content: {
            // 标签内容
            title: "进入厨房", // 标题
            text: "", // 文本内容
            image: 1, // 场景贴图的下标，对应dataList下标
            showTip: false, // 是否展示弹出框
            showTitle: true, // 是否展示提示标题
          },
        },
        {
          position: { x: -100, y: 0, z: -231 },
          content: {
            title: "信息点2",
            text: "77989",
            showTip: true,
            showTitle: false,
          },
        },
        {
          position: { x: 150, y: -50, z: -198 },
          content: {
            title: "信息点3",
            text: "qwdcz",
            showTip: true,
            showTitle: false,
          },
        },
        {
          position: { x: 210, y: 11, z: -140 },
          content: {
            title: "信息点4",
            text: "大豆食心虫侦察十大大苏打大大大大大大大",
            showTip: true,
            showTitle: false,
          },
        },
        {
          position: { x: 208, y: -12, z: 140 },
          content: {
            title: "信息点5",
            text: "eq",
            showTip: true,
            showTitle: false,
          },
        },
        {
          position: { x: 86, y: -9, z: 236 },
          content: {
            title: "进入房间",
            text: "",
            showTip: false,
            showTitle: true,
          },
        },
      ]
    },
  ];

  let sphereGemetry = new THREE.SphereGeometry(16, 50, 50);
  let sphereTexture = new THREE.TextureLoader().load(require('./room.jpg').default);
  let sphereMatial = new THREE.MeshBasicMaterial({
    map: sphereTexture,
    side: THREE.BackSide,
  });
  let mesh = new THREE.Mesh(sphereGemetry, sphereMatial);

  mesh.scale.set(16, 16, -16)
  scene.add(mesh);

  let controls = new window.THREE.OrbitControls(camara, renderer.domElement);
  controls.enablePan = false;
  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camara);
  }
  render();


  let spriteTips  = []
  function initTips(index) {
    let tips = dataList[index].tipList;
    let tipTexture = new THREE.TextureLoader().load(require("./tip.png").default);
    let material = new THREE.SpriteMaterial({
      map: tipTexture
    });

    tips.forEach(item=>{
      let spriteItem = new THREE.Sprite(material);
      spriteItem.scale.set(10, 10, 10);
      spriteItem.position.set(item.position.x, item.position.y, item.position.z);
      spriteItem.content= item.content;
      spriteTips.push(spriteItem);
      scene.add(spriteItem);
    })
  }

  initTips(0);

  window.scene = scene;


  document.addEventListener("click", handleClick, false)

  let mouse = new THREE.Vector2();
  let raycaster = new THREE.Raycaster();
  function handleClick(e) {
      let clientX = e.clientX;
      let clientY = e.clientY;

      let targetX = (clientX / window.innerWidth) * 2 - 1;
      let targetY = -(clientY / window.innerHeight) * 2 + 1;
      mouse.x = targetX;
      mouse.y = targetY;
      raycaster.setFromCamera(mouse, camara);

      let intersects = raycaster.intersectObjects(spriteTips, true);
      if(intersects.length) {
        console.log(intersects);
        let dom = document.createElement("span");
        dom.innerHTML = intersects[0].object.content.title;
        dom.style.left = `${clientX}px`;
        dom.style.top = `${clientY}px`;
        dom.classList.add("sprite")
        document.body.appendChild(dom);
      }
  }
};
