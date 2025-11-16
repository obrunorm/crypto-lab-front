import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { RubiksCube } from './rubiks/rubiks-cube';
import { TerminalComponent } from '../terminal/terminal';
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, TerminalComponent] // 👈 ADICIONE AQUI
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  showTerminal = false;

  ngAfterViewInit() {
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 4;
    camera.position.y = 4;
    camera.position.z = 4;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x000000, 0); // transparente
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // sombras suaves


  // 💡 Luz ambiente suave
    const ambient = new THREE.AmbientLight(0xffffff, 0.05); // quase imperceptível
    scene.add(ambient);

    // ☀️ Luz direcional principal (como um sol)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7.5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);


    // ✨ Luz de preenchimento (para suavizar sombras)
    const fillLight = new THREE.PointLight(0xffffff, 0.6);
    fillLight.position.set(-5, 2, 3);
    scene.add(fillLight);

    // 🔦 Pequena luz de fundo para dar contraste
    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(0, -5, -5);
    scene.add(backLight);

    // 🧊 Cubo de Rubik
    const cube = new RubiksCube(1);
    cube.group.children.forEach(mesh => mesh.castShadow = true);
    scene.add(cube.group);

    // 🎯 Raycaster e mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // 🔥 Animação de afastamento
    const originalPositions = cube.cubies.map(c => c.mesh.position.clone());
    const maxDistance = 2.5; // distância máxima de afastamento

    const animate = () => {
      requestAnimationFrame(animate);


      // Atualiza raycaster
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cube.cubies.map(c => c.mesh));

      // Se o mouse estiver sobre algum cubinho
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;

        // Afastar cubinhos próximos do impacto
        cube.cubies.forEach((c, i) => {
          const dir = new THREE.Vector3().subVectors(c.mesh.position, hit.position).normalize();
          const dist = c.mesh.position.distanceTo(hit.position);
          const intensity = Math.max(0, (1 - dist / 3)); // decai com a distância
          const target = new THREE.Vector3().addVectors(originalPositions[i], dir.multiplyScalar(intensity * maxDistance));
          c.mesh.position.lerp(target, 0.010);
        });
      } else {
        // Retorna suavemente à posição original
        cube.cubies.forEach((c, i) => {
          c.mesh.position.lerp(originalPositions[i], 0.05);
        });
      }

      const time = Date.now() * 0.001;
      cube.group.rotation.x = Math.sin(time * 0.7) * 0.8;
      cube.group.rotation.y = Math.cos(time * 0.9) * 0.4;
      cube.group.rotation.z = Math.sin(time * 0.5) * 0.6;


      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
