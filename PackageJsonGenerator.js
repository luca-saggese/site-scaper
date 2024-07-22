const fs = require('fs');
const path = require('path');
const npmFetch = require('npm-registry-fetch');
const { logToFile } = require('./utils');

class PackageJsonGenerator {
  constructor(logPath, validatePackages) {
    this.logPath = logPath;
    this.validatePackages = validatePackages;
  }

  async validatePackage(packageName) {
    try {
      await npmFetch.json(`/${packageName}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  async generatePackageJson(nodeModulesDir) {
    const dependencies = {};

    // Read the node_modules directory
    const modules = fs.readdirSync(nodeModulesDir);

    for (const module of modules) {
      const modulePath = path.join(nodeModulesDir, module);

      if (module.startsWith('@')) {
        // Handle scoped packages
        const scopedModules = fs.readdirSync(modulePath);
        for (const scopedModule of scopedModules) {
          const scopedModulePath = path.join(modulePath, scopedModule);
          const packageName = `${module}/${scopedModule}`;
          if (this.validatePackages) {
            const isValid = await this.validatePackage(packageName);
            if (isValid) {
              dependencies[packageName] = '*';
            } else {
              logToFile(this.logPath, `Package not found on npm: ${packageName}`);
            }
          } else {
            dependencies[packageName] = '*';
          }
        }
      } else {
        if (this.validatePackages) {
          const isValid = await this.validatePackage(module);
          if (isValid) {
            dependencies[module] = '*';
          } else {
            logToFile(this.logPath, `Package not found on npm: ${module}`);
          }
        } else {
          dependencies[module] = '*';
        }
      }
    }

    // Create the package.json content
    const packageJsonContent = {
      name: "reconstructed-package",
      version: "1.0.0",
      dependencies: dependencies
    };

    // Write the package.json file in the root of the node_modules directory
    const outputPackageJsonPath = path.join(nodeModulesDir, '..', 'package.json');
    fs.writeFileSync(outputPackageJsonPath, JSON.stringify(packageJsonContent, null, 2));
    logToFile(this.logPath, `Generated package.json at ${outputPackageJsonPath}`);
  }

  async findNodeModulesAndGeneratePackageJson(startDir) {
    const promises = [];

    fs.readdirSync(startDir).forEach(file => {
      const curPath = path.join(startDir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        if (file === 'node_modules') {
          promises.push(this.generatePackageJson(curPath));
        } else {
          promises.push(this.findNodeModulesAndGeneratePackageJson(curPath));
        }
      }
    });

    await Promise.all(promises);
  }
}

module.exports = PackageJsonGenerator;
