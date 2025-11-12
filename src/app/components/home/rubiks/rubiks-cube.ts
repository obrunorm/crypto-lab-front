import * as THREE from 'three';
import { Cubie } from './cubie';

export class RubiksCube {
  group: THREE.Group = new THREE.Group();
  cubies: Cubie[] = [];

  constructor(size: number = 1) {
    const cubieSize = size / 1.2; // Cada cubinho ocupa 1/3 do cubo total
    const spacing = cubieSize + 0.01;  // Sem folga: eles se encostam perfeitamente

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue; // o cubo central pode ficar vazio

          // multiplica pelo tamanho exato do cubinho
          const cubie = new Cubie(x * spacing, y * spacing, z * spacing, cubieSize);
          this.group.add(cubie.mesh);
          this.cubies.push(cubie);
        }
      }
    }
  // 💡 Luz verde central mais forte
  const pointLight = new THREE.PointLight(0x8b008b, 50, 10);
  pointLight.position.set(0, 0, 0);
  this.group.add(pointLight);
  }


  /**
   * Exemplo: muda a cor de um cubinho específico
   */
  setCubieColor(index: number, face: number, color: number) {
    const cubie = this.cubies[index];
    if (cubie) {
      cubie.setFaceColor(face, color);
    }
  }
}
