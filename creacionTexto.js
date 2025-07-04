const fs = require('fs/promises');
const path = require('path');

const LIMIT = 10; 
const TOTAL = 50; 

async function crearArchivo(indice) {
  const contenido = `Hola, este es el archivo número ${indice}`;
  const ruta = path.join('archivos', `archivo_${indice}.txt`);

  try {
    await fs.writeFile(ruta, contenido, 'utf-8');
  } catch (error) {
    console.error(`Error en archivo ${indice}:`, error);
  }
}

async function crearMuchosArchivos(cantidad) {
  await fs.mkdir('archivos', { recursive: true });

  const archivos = [];
  for (let i = 1; i <= cantidad; i++) {
    archivos.push(() => crearArchivo(i));
  }

  while (archivos.length > 0) {
    const batch = archivos.splice(0, LIMIT).map(fn => fn());
    await Promise.allSettled(batch);
  }

  console.log(`${cantidad} archivos generados correctamente.`);
}

crearMuchosArchivos(TOTAL);
