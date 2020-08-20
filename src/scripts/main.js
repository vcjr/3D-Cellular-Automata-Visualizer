import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as GraphicUtils from "../scripts/grid/utils/3d_utils";
import Grid from "./grid/grid";
import { cloneDeep } from "lodash";

class Main {
  constructor(element, options) {
    const canvas = document.getElementById(element);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.scene = new THREE.Scene();
    this.camera = this.createCamera(options.camera, options.worldSize);
    this.world = this.grid(
      options.worldSize,
      options.cubeGeometry,
      options.cellSpacing,
      this.scene
    );

    GraphicUtils.directionalLight({ scene: this.scene });
    GraphicUtils.ambientLight({ scene: this.scene, color: 0xffffff });

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;
    const halfWorldSize = options.worldSize / 2;
    this.controls.target.set(halfWorldSize, halfWorldSize, halfWorldSize);
    this.clock = new THREE.Clock();
    
    // debugger // Check what this.world has
  }

  // Function to initialize a perspective camera
  createCamera(options, worldSize) {
    const { posX, posY, posZ } = options;
    const camera = GraphicUtils.makeCamera(options);
    camera.position.x = posX;
    camera.position.y = posY;
    camera.position.z = worldSize * 2;//posZ ;//+ options.worldSize * 2.5;

    return camera;
  }

  grid(worldSize, cubeGeometry, cellSpacing, scene) {
    return new Grid(worldSize, cubeGeometry, cellSpacing, scene);
  }

  render(time) {
    // time *= 0.005;
    
    const resizeviewportToDisplaySize = (renderer) => {
      const viewport = renderer.domElement;
      const width = viewport.clientWidth;
      const height = viewport.clientHeight;

      const forceResize =
        viewport.width !== width || viewport.height !== height;

      if (forceResize) {
        this.renderer.setSize(width, height, false);
      }
      return forceResize;
    };

    if (resizeviewportToDisplaySize(this.renderer)) {
      const viewport = this.renderer.domElement;
      this.camera.aspect = viewport.clientWidth / viewport.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  update(){
    // this.delta = this.clock.getDelta();
    // let ticks = Math.round( delta / 60);
    // this.ticks = Math.round(this.delta / 0.160);
   
    // document.getElementById("ticks-span").innerText = `Ticks: ${this.ticks}`;
  
    // setTimeout( () => {
    //   this.world.cubes.forEach((cube, cubeIndex) => {
    //     // const speed = 1 + cubeIndex * 0.1;
    //     // const speed = 0.1;
    //     // const rot = time * speed;
  
    //     // cube.rotation.x = rot;
    //     // cube.rotation.y = rot;
    //     // cube.rotation.z = rot;
      
    //     // for ( let i = 0 ; i < ticks ; i++ ) {
    //     //   cube.material.transparent = !cube.material.transparent;
    //     // };
    //     // if (this.ticks === 1) cube.material.transparent = !cube.material.transparent;
    //     cube.material.transparent = !cube.material.transparent;
    //   });
    // }, 3000);
  }

  play() {
    this.renderer.setAnimationLoop( () => {
      this.update();
      this.render();
      // requestAnimationFrame(this.render.bind(this));
    });
  }

  stop(){
    this.renderer.setAnimationLoop(null);
  }
}

export default Main;
