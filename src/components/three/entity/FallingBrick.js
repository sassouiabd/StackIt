import * as THREE from 'three';
import * as Physijs from 'physijs-webpack/webpack';
import palette from '../Palette';

class FallingBrick {
  constructor(param = {}) {
    this.params = Object.assign(FallingBrick.default, param);
    // init geometry and material
    const geom = new THREE.BoxGeometry(this.params.edge.x, this.params.edge.y, this.params.edge.z);
    const mat = new THREE.MeshLambertMaterial({
      color: this.params.color,
    });
    mat.transparent = true;
    mat.opacity = 1;
    const physiMaterial = new Physijs.createMaterial(mat, 0.9, 0.6);
    // init mesh
    const mesh = new Physijs.BoxMesh(geom, physiMaterial, 500);
    mesh.position.copy(this.params.position);
    mesh.scale.copy(this.params.scale);
    mesh.castShadow = this.params.castShadow;
    mesh.receiveShadow = this.params.receiveShadow;
    mesh.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    this.mesh = mesh;
  }

  build() {
    return this.mesh;
  }

  update(deltaTime) {
    Object.getPrototypeOf(this.mesh.material).opacity -= 0.15 * deltaTime;
  }
}

FallingBrick.default = {
  edge: new THREE.Vector3(50, 8, 50),
  scale: new THREE.Vector3(1, 1, 1),
  position: new THREE.Vector3(0, 0, 0),
  castShadow: true,
  receiveShadow: true,
  color: palette.purple,
  mass: 500,
  scene: null,
};

export default FallingBrick;
