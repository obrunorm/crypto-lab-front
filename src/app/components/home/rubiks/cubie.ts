import * as THREE from 'three';

export class Cubie {
  mesh: THREE.Mesh;
  materials: THREE.MeshStandardMaterial[];

  constructor(x: number, y: number, z: number, size: number) {
    const geometry = new THREE.BoxGeometry(size, size, size);

    // Inicializa as 6 faces com petro neutro
    this.materials = Array(6)
      .fill(0)
      .map(() => new THREE.MeshStandardMaterial({ color: 0x020403, }));

    this.mesh = new THREE.Mesh(geometry, this.materials);
    this.mesh.position.set(x, y, z);
  }

  /**
   * Altera a cor de uma face específica
   * @param faceIndex Índice da face (0–5)
   * @param color Nova cor (ex: 0xff0000)
   */
  setFaceColor(faceIndex: number, color: number) {
    if (faceIndex >= 0 && faceIndex < 6) {
      this.materials[faceIndex].color.set(color);
    }
  }

  /**
   * Altera a cor de todas as faces
   */
  setAllFacesColor(color: number) {
    this.materials.forEach(mat => mat.color.set(color));
  }
}
