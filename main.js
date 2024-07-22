const readline = require('readline');
const path = require('path');
const fs = require('fs');
const { createDirIfNotExist, deleteFolderRecursive, logToFile, updateProgress } = require('./utils');
const Downloader = require('./Downloader');
const SourceReconstructor = require('./SourceReconstructor');
const PackageJsonGenerator = require('./PackageJsonGenerator');

// Function to parse command-line arguments
function parseArguments() {
  const args = process.argv.slice(2);
  const options = {
    generatePackageJson: true,
    validatePackages: false,
    normalizePaths: true,
    siteUrl: ''
  };

  args.forEach(arg => {
    if (arg.startsWith('--generate-package-json=')) {
      options.generatePackageJson = arg.split('=')[1] === 'true';
    } else if (arg.startsWith('--validate-packages=')) {
      options.validatePackages = arg.split('=')[1] === 'true';
    } else if (arg.startsWith('--normalize-paths=')) {
      options.normalizePaths = arg.split('=')[1] === 'true';
    } else {
      options.siteUrl = arg;
    }
  });

  return options;
}

// Main function
(async () => {
  const options = parseArguments();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let siteUrl = options.siteUrl;

  if (!siteUrl) {
    siteUrl = await new Promise((resolve) => {
      rl.question('Please enter the URL of the site you want to download: ', (answer) => {
        resolve(answer);
        rl.close();
      });
    });
  } else {
    rl.close();
  }

  if (!siteUrl) {
    console.error('No URL provided. Exiting.');
    process.exit(1);
  }

  const domain = new URL(siteUrl).hostname;
  const baseDir = path.join('out', domain);
  const downloadDir = path.join(baseDir, 'downloaded');
  const sourcesDir = path.join(baseDir, 'sources', domain);
  const logPath = path.join(baseDir, 'log.txt');

  // Delete the out/hostname folder
  deleteFolderRecursive(baseDir);

  // Create the base folder
  createDirIfNotExist(baseDir);

  // Initialize the log file
  fs.writeFileSync(logPath, '');

  const downloader = new Downloader(logPath);
  await downloader.downloadSite(siteUrl, downloadDir);

  // Process all downloaded map files
  const mapFilesDir = path.join(downloadDir, 'maps');
  if (fs.existsSync(mapFilesDir)) {
    const mapFiles = fs.readdirSync(mapFilesDir);
    const totalFiles = mapFiles.length;
    const processedFiles = { count: 0 };
    const sourceReconstructor = new SourceReconstructor(logPath, options.normalizePaths);
    for (const mapFile of mapFiles) {
      await sourceReconstructor.reconstructSourceFromMap(path.join(mapFilesDir, mapFile), sourcesDir, domain, totalFiles, processedFiles);
    }
  } else {
    logToFile(logPath, 'No map files found.');
  }

  // Search for node_modules directories and generate package.json if enabled
  if (options.generatePackageJson) {
    const packageJsonGenerator = new PackageJsonGenerator(logPath, options.validatePackages);
    await packageJsonGenerator.findNodeModulesAndGeneratePackageJson(sourcesDir);
  }

  // Complete progress to 100%
  updateProgress(100, 'Done');
})();
