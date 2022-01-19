// import THREE from "three-js/three";
export default class Test {
  constructor() {}
  init() {
    this.createScene();
    this.createRender();
    this.createBox(2, 2, 2);
    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.loader = new THREE.GLTFLoader();
    window.loader = this.loader;

    let axis = new THREE.AxisHelper(100);
    // this.scene.add(axis)

    // this.addLine();
    // this.addDog();
    this.render();
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.lookAt(0, 0, 0);
    this.camera.position.z = 20;
  }

  createRender() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  createBox(x = 1, y = 1, z = 1) {
    // let geometry = new THREE.BoxGeometry(x, y, z);
    // let material = new THREE.MeshBasicMaterial({
    //   color: "#A49FEF",
    //   wireframe: true,
    //   // transparent: true
    // });
    // let box = new THREE.Mesh(geometry, material);
    // this.box = box;
    // this.scene.add(box);

    const createMesh = (boxOptions, meshOptions) => {
      const geometry = new THREE.BoxGeometry(...boxOptions);
      const material = new THREE.MeshBasicMaterial(meshOptions);
      return new THREE.Mesh(geometry, material);
    };

    const cube01 = createMesh([1, 1, 1], {
      color: "#A49FEF",
      wireframe: true,
      transparent: true,
    });

    cube01.name = "cube01"
    this.cube01 = cube01;
    this.scene.add(cube01);

    const cube01_wireframe = createMesh([3, 3, 3], {
      color: "#433F81",
      wireframe: true,
      transparent: true,
    });
    this.cube01_wireframe = cube01_wireframe;
    this.scene.add(cube01_wireframe);

    const cube02 = createMesh([1, 1, 1], {
      color: "#A49FEF",
    });
    this.cube02 = cube02;
    this.scene.add(cube02);

    const cube02_wireframe = createMesh([3, 3, 3], {
      color: "#433F81",
      wireframe: true,
      transparent: true,
    });
    this.cube02_wireframe = cube02_wireframe;
    this.scene.add(cube02_wireframe);

    const bar01 = createMesh([10, 0.05, 0.5], {
      color: "#00FFBC",
    });
    bar01.position.z = 0.5;
    this.bar01 = bar01;
    this.scene.add(bar01);

    const bar02 = createMesh([10, 0.05, 0.5], {
      color: "#ffffff",
    });
    bar02.position.z = 0.5;
    this.bar02 = bar02;
    this.scene.add(bar02);
  }

  addLine() {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 10, 0));
    geometry.vertices.push(new THREE.Vector3(10, 0, 0));

    let material = new THREE.LineBasicMaterial({
      color: 0x0000ff,
    });

    let line = new THREE.Line(geometry, material);
    this.scene.add(line);
  }

  addText() {
    let geometry = new THREE.TextGeometry("Hello world", {
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelSegments: 5,
    });
    let material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    let textMesh1 = new THREE.Mesh(geometry, material);

    textMesh1.position.x = 0;
    textMesh1.position.y = 10;
    textMesh1.position.z = 0;

    this.scene.add(textMesh1);
  }

  addDog() {
    this.loader.load(
      "http://10.16.84.190:8888/shiba/scene.gltf",
      (gltf) => {
        console.log(gltf);
        gltf.scene.scale.set(10, 10, 10);
        this.scene.add(gltf.scene);
      },
      undefined,
      function (err) {
        console.log(err, "====>");
      }
    );
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    this.cube01.rotation.x += 0.01;
    this.cube01.rotation.y += 0.01;

    this.cube01_wireframe.rotation.x += 0.01;
    this.cube01_wireframe.rotation.y += 0.01;

    this.cube02.rotation.x -= 0.01;
    this.cube02.rotation.y -= 0.01;

    this.cube02_wireframe.rotation.x -= 0.01;
    this.cube02_wireframe.rotation.y -= 0.01;

    this.bar01.rotation.z -= 0.01;
    this.bar02.rotation.z += 0.01;

    this.renderer.render(this.scene, this.camera);
  }
}
