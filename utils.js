const fs = require('fs');
const path = require('path');

// Funzione per creare directory se non esistono
function createDirIfNotExist(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Funzione per cancellare una directory
function deleteFolderRecursive(directory) {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((file) => {
      const curPath = path.join(directory, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directory);
  }
}

// Funzione per scrivere nel file di log
function logToFile(logPath, message) {
  fs.appendFileSync(logPath, message + '\n');
}

// Funzione per aggiornare la percentuale di progresso
function updateProgress(percentage, filename) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`Progress: ${percentage.toFixed(2)}% (${filename})`);
}

// Funzione per normalizzare i percorsi
function normalizePath(outputDir, sourcePath) {
  const normalizedPath = path.normalize(sourcePath).replace(/^(\.\.[\/\\])+/, '');
  return path.join(outputDir, normalizedPath);
}

module.exports = {
  createDirIfNotExist,
  deleteFolderRecursive,
  logToFile,
  updateProgress,
  normalizePath
};
