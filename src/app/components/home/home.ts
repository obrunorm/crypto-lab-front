import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  ngAfterViewInit() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
//    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // Cria 6 materiais — um pra cada face
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x009B48 }), // frente
      new THREE.MeshBasicMaterial({ color: 0xB90000 }), // trás
      new THREE.MeshBasicMaterial({ color: 0x0045AD }), // topo
      new THREE.MeshBasicMaterial({ color: 0xFF5900 }), // base
      new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), // direita
      new THREE.MeshBasicMaterial({ color: 0xFFD500 })  // esquerda
    ];
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    camera.position.z = 2;

    // Controles de câmera (OrbitControls)
    const controls = new OrbitControls(camera, renderer.domElement);

//    function animate() {
//      requestAnimationFrame(animate);
//      cube.rotation.x += 0.01;
//      cube.rotation.y += 0.01;
//      renderer.render(scene, camera);
//    }

//    animate();

    // === Loop de animação ===
    function animate() {
      requestAnimationFrame(animate);
      controls.update(); // importante!
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
