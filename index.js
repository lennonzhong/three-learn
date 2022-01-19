import "./style/index.less";
import Entity from "./model/entity";
import Controls from "three-js/addons/OrbitControls";
import * as THREE from "./three.module"
window.THREE = THREE
window.onload = function() {
  import("./glloader.js").then(()=>{
    Controls(THREE);
    let entity = new Entity();
    entity.init();
  })
}

