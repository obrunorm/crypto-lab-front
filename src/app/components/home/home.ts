import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { RubiksCube } from './rubiks/rubiks-cube';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

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

        // cubo 1
    cube.setCubieColor(0, 1, 0x555fa3) // verde
    cube.setCubieColor(0, 3, 0xf6f7f9) // branco
    cube.setCubieColor(0, 5, 0xff1493) // laranja

    // cubo 2
    cube.setCubieColor(1, 1, 0x555fa3) // verde
    cube.setCubieColor(1, 3, 0xf6f7f9) // branco

    // cubo 3
    cube.setCubieColor(2, 1, 0x555fa3) // verde
    cube.setCubieColor(2, 3, 0xf6f7f9) // branco
    cube.setCubieColor(2, 4, 0x00aae4) // vermelho

    // cubo 4
    cube.setCubieColor(3, 1, 0x555fa3) // verde
    cube.setCubieColor(3, 5, 0xff1493) // laranja

    // cubo 5
    cube.setCubieColor(4, 1, 0x555fa3) // verde

    // cubo 6
    cube.setCubieColor(5, 1, 0x555fa3) // verde
    cube.setCubieColor(5, 4, 0x00aae4) // vermelho

    // cubo 7
    cube.setCubieColor(6, 1, 0x555fa3) // verde
    cube.setCubieColor(6, 5, 0xff1493) // laranja
    cube.setCubieColor(6, 2, 0x9400d3) // amarelo

    // cubo 8
    cube.setCubieColor(7, 1, 0x555fa3) // verde
    cube.setCubieColor(7, 2, 0x9400d3) // amarelo

    // cubo 9
    cube.setCubieColor(8, 1, 0x555fa3) // verde
    cube.setCubieColor(8, 4, 0x00aae4) // vermelho
    cube.setCubieColor(8, 2, 0x9400d3) // amarelo

    // cubo 10
    cube.setCubieColor(9, 5, 0xff1493) // laranja
    cube.setCubieColor(9, 3, 0xf6f7f9) // branco

    // cubo 11
    cube.setCubieColor(10, 3, 0xf6f7f9) // branco

    // cubo 12
    cube.setCubieColor(11, 4, 0x00aae4) // vermelho
    cube.setCubieColor(11, 3, 0xf6f7f9) // branco

    // cubo 13
    cube.setCubieColor(11, 4, 0x00aae4) // vermelho
    cube.setCubieColor(11, 3, 0xf6f7f9) // branco

    // cubo 13
    cube.setCubieColor(12, 5, 0xff1493) // laranja

    // cubo 14
    cube.setCubieColor(13, 4, 0x00aae4) // vermelho

    // cubo 15
    cube.setCubieColor(14, 5, 0xff1493) // laranja
    cube.setCubieColor(14, 2, 0x9400d3) // amarelo

    // cubo 16
    cube.setCubieColor(15, 2, 0x9400d3) // amarelo

    // cubo 17
    cube.setCubieColor(16, 4, 0x00aae4) // vermelho
    cube.setCubieColor(16, 2, 0x9400d3) // amarelo

    // cubo 18
    cube.setCubieColor(17, 0, 0x240054) // azul
    cube.setCubieColor(17, 3, 0xf6f7f9) // branco
    cube.setCubieColor(17, 5, 0xff1493) // laranja

    // cubo 19
    cube.setCubieColor(18, 0, 0x240054) // azul
    cube.setCubieColor(18, 3, 0xf6f7f9) // branco

    // cubo 20
    cube.setCubieColor(19, 0, 0x240054) // azul
    cube.setCubieColor(19, 3, 0xf6f7f9) // branco
    cube.setCubieColor(19, 4, 0x00aae4) // vermelho

    // cubo 21 
    cube.setCubieColor(20, 0, 0x240054) // azul
    cube.setCubieColor(20, 5, 0xff1493) // laranja

    // cubo 22
    cube.setCubieColor(21, 0, 0x240054) // azul

    // cubo 23
    cube.setCubieColor(22, 0, 0x240054) // azul
    cube.setCubieColor(22, 4, 0x00aae4) // vermelho

    // cubo 24
    cube.setCubieColor(23, 0, 0x240054) // azul
    cube.setCubieColor(23, 5, 0xff1493) // laranja
    cube.setCubieColor(23, 2, 0x9400d3) // amarelo

    // cubo 25
    cube.setCubieColor(24, 0, 0x240054) // azul
    cube.setCubieColor(24, 2, 0x9400d3) // amarelo

    // cubo 26
    cube.setCubieColor(25, 0, 0x240054) // azul
    cube.setCubieColor(25, 2, 0x9400d3) // amarelo
    cube.setCubieColor(25, 4, 0x00aae4) // vermelho

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
