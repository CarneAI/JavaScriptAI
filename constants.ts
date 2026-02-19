
import { Module } from './types';

export const CURRICULUM: Module[] = [
  {
    id: 'm1',
    title: 'Fundamentos: Variables y Tipos',
    difficulty: 'Principiante',
    lessons: [
      {
        id: 'l1-1',
        title: 'Introducción a Variables',
        content: `JavaScript es el lenguaje de la web. Para empezar, necesitamos guardar datos. Usamos 'let' para variables que cambian y 'const' para las que no.`,
        codeExample: `let nombre = "Juan";\nconst PI = 3.1416;\nconsole.log(nombre, PI);`,
        exercise: {
          instruction: 'Crea una variable llamada "edad" con valor 25 y una constante "ciudad" con valor "Madrid". Luego imprime ambas.',
          initialCode: `// Escribe tu código aquí\n`,
          solution: `let edad = 25;\nconst ciudad = "Madrid";\nconsole.log(edad, ciudad);`,
          testCase: (output, code) => code.includes('let edad') && code.includes('const ciudad')
        }
      },
      {
        id: 'l1-2',
        title: 'Tipos de Datos',
        content: `Existen varios tipos básicos: String (texto), Number (números), Boolean (true/false), y null/undefined.`,
        codeExample: `let esVerdad = true;\nlet precio = 19.99;\nlet saludo = "Hola!";`,
        exercise: {
          instruction: 'Define una variable booleana "estaAprendiendo" como true y un número "lecciones" como 1.',
          initialCode: `// Define las variables\n`,
          solution: `let estaAprendiendo = true;\nlet lecciones = 1;`,
          testCase: (output, code) => code.includes('true') && code.includes('1')
        }
      }
    ]
  },
  {
    id: 'm2',
    title: 'Control de Flujo',
    difficulty: 'Principiante',
    lessons: [
      {
        id: 'l2-1',
        title: 'Condicionales If/Else',
        content: `Permiten tomar decisiones en el código. Si la condición es verdadera, se ejecuta un bloque; si no, otro.`,
        codeExample: `let hora = 14;\nif (hora < 12) {\n  console.log("Buenos días");\n} else {\n  console.log("Buenas tardes");\n}`,
        exercise: {
          instruction: 'Escribe un condicional que verifique si una variable "puntuacion" es mayor a 50. Si lo es, imprime "Aprobado", si no, "Suspenso".',
          initialCode: `let puntuacion = 75;\n// Tu if aquí\n`,
          solution: `let puntuacion = 75;\nif(puntuacion > 50) {\n  console.log("Aprobado");\n} else {\n  console.log("Suspenso");\n}`,
          testCase: (output) => output.includes('Aprobado')
        }
      }
    ]
  },
  {
    id: 'm3',
    title: 'Funciones y Objetos',
    difficulty: 'Intermedio',
    lessons: [
      {
        id: 'l3-1',
        title: 'Funciones de Flecha',
        content: `Las Arrow Functions son una forma moderna y concisa de escribir funciones en JS.`,
        codeExample: `const saludar = (nombre) => "Hola " + nombre;\nconsole.log(saludar("Mundo"));`,
        exercise: {
          instruction: 'Crea una función de flecha llamada "doble" que reciba un número "n" y devuelva su multiplicación por 2.',
          initialCode: `// Define la función doble\n`,
          solution: `const doble = (n) => n * 2;`,
          testCase: (output, code) => code.includes('=>') && code.includes('* 2')
        }
      }
    ]
  }
];
