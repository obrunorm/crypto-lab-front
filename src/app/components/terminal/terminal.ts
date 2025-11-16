import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal.html',
  styleUrls: ['./terminal.css']
})
export class TerminalComponent {

categorias = [
  {
    nome: 'Cifras Clássicas',
    metodos: [
      'Cifra de César',
      'ROT13 (Caso específico da Cifra de César)',
      'Cifra de Substituição',
      'Análise de Frequência (Técnica de Criptoanálise)'
    ]
  },
  {
    nome: 'Criptografia Simétrica (Chave Única)',
    metodos: [
      // Cifras de Bloco
      'DES',
      'TripleDES (3DES)',
      'AES / Rijndael',
      'AES-128',
      'AES-192',
      'AES-256',
      'Blowfish',

      // Componentes Internos
      'S-Boxes',
      'Transformação Afim',

      // Cifras de Fluxo
      'RC4',
      'Stream Ciphers',

      // Outros Conceitos
      'Initialization Vector (IV)',
      'MAC (Message Authentication Code)'
    ]
  },
  {
    nome: 'Criptografia Assimétrica (Par de Chaves Pública/Privada)',
    metodos: [
      'RSA',
      'Diffie-Hellman (DH)',
      'STS (Station To Station)',
      'EEC / Elliptic Curve',
      'ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)',

      // Pós-quântica
      'Supersingular Isogeny (SIKE)',

      // Criptoanálise relacionada
      'General Number Field Sieve (GNFS)',
      'Quadratic Sieve (QS)'
    ]
  },
  {
    nome: 'Criptografia Homomórfica (Cálculo em Dados Criptografados)',
    metodos: [
      // Tipos
      'Parcialmente Homomórfica (PHC)',
      'Homomórfica de Nível (LHC)',
      'Totalmente Homomórfica (FHE / Fully Homomorphic Encryption)',

      // Algoritmos
      'Paillier (Aditivo)',
      'BFV',
      'CKKS',
      'SEAL'
    ]
  },
  {
    nome: 'Funções Hash & KDF',
    metodos: [
      // Hashes Criptográficos
      'MD5',
      'SHA-1',
      'SHA-3 / Keccak',

      // Autenticação
      'HMAC',

      // KDF e Fortalecimento
      'KDF (Conceito Geral)',
      'Key Stretching',
      'Key Strengthening',
      'PBKDF2',
      'Bcrypt',
      'Scrypt',
      'Argon2'
    ]
  },
  {
    nome: 'Ataques e Criptoanálise',
    metodos: [
      'Criptoanálise',
      'Ataque de Colisão',
      'Paradoxo do Aniversário',
      'Ataque de Extensão de Comprimento',
      'Ataque Rainbow Table',

      // Side-Channel
      'Cache Attack',
      'Timing Attack',
      'Power Monitoring',
      'Electromagnetic Attack',
      'Acoustic Cryptanalysis',
      'Differential Fault Analysis',
      'Data Remanence',
      'Software Fault Attacks'
    ]
  },
  {
    nome: 'Protocolos e Outros Conceitos',
    metodos: [
      'TLS/SSL (RSA x.509 + DH + AES-256)',
      'Kerberos',
      'ASCII Armor / Base64',
      'Texto Cifrado / Texto Plano / Chave'
    ]
  }
];

  selecionarMetodo(m: string) {
    console.log('Selecionado:', m);
    // futuramente: chamar backend
  }
}
