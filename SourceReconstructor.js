const fs = require('fs');
const path = require('path');
const { SourceMapConsumer } = require('source-map');
const { logToFile, updateProgress, createDirIfNotExist, normalizePath } = require('./utils');

class SourceReconstructor {
  constructor(logPath, normalizePaths) {
    this.logPath = logPath;
    this.normalizePaths = normalizePaths;
  }

  async reconstructSourceFromMap(mapFilePath, sourcesDir, domain, totalFiles, processedFiles) {
    try {
      const rawSourceMap = JSON.parse(fs.readFileSync(mapFilePath, 'utf8'));
      const consumer = await new SourceMapConsumer(rawSourceMap);

      consumer.sources.forEach(source => {
        const content = consumer.sourceContentFor(source);
        if (content) {
          const outputPath = this.normalizePaths ? normalizePath(sourcesDir, path.join(domain, source)) : path.join(sourcesDir, domain, source);
          createDirIfNotExist(path.dirname(outputPath));
          fs.writeFileSync(outputPath, content);
          logToFile(this.logPath, `Reconstructed source ${source} to ${outputPath}`);
        }
      });

      consumer.destroy();
    } catch (error) {
      logToFile(this.logPath, `Failed to reconstruct source from ${mapFilePath}: ${error}`);
    } finally {
      processedFiles.count++;
      updateProgress((processedFiles.count / totalFiles) * 100, mapFilePath);
    }
  }
}

module.exports = SourceReconstructor;
