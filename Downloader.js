const axios = require('axios');
const fs = require('fs');
const path = require('path');
const urlModule = require('url');
const { logToFile, updateProgress, createDirIfNotExist } = require('./utils');

class Downloader {
  constructor(logPath) {
    this.logPath = logPath;
  }

  async downloadResource(baseUrl, resourcePath, outputPath, processedLinks, totalLinks) {
    try {
      const resourceUrl = urlModule.resolve(baseUrl, resourcePath);
      const response = await axios.get(resourceUrl, { responseType: 'arraybuffer' });
      createDirIfNotExist(path.dirname(outputPath));
      fs.writeFileSync(outputPath, response.data);
      logToFile(this.logPath, `Downloaded ${resourceUrl} to ${outputPath}`);
    } catch (error) {
      logToFile(this.logPath, `Failed to download ${resourcePath}: ${error}`);
    } finally {
      processedLinks.count++;
      updateProgress((processedLinks.count / totalLinks) * 100, resourcePath);
    }
  }

  async downloadSite(url, downloadDir) {
    try {
      const response = await axios.get(url);
      const html = response.data;

      // Save the main HTML page
      createDirIfNotExist(downloadDir);
      fs.writeFileSync(path.join(downloadDir, 'index.html'), html);
      logToFile(this.logPath, `Downloaded ${url} to ${downloadDir}/index.html`);

      // Extract links to CSS, JS, images, PDFs, and other files
      const cssLinks = [...html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map(match => match[1]);
      const jsLinks = [...html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map(match => match[1]);
      const imgLinks = [...html.matchAll(/<img[^>]+src="([^"]+\.(?:jpg|jpeg|png|gif|svg))"/g)].map(match => match[1]);
      const pdfLinks = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"/g)].map(match => match[1]);
      const otherLinks = [...html.matchAll(/<a[^>]+href="([^"]+\.(?:zip|rar|tar|gz|mp3|mp4|wav|ogg))"/g)].map(match => match[1]);

      const totalLinks = cssLinks.length + jsLinks.length + imgLinks.length + pdfLinks.length + otherLinks.length;
      const processedLinks = { count: 0 };

      // Download CSS files and their map files
      for (const link of cssLinks) {
        await this.downloadResource(url, link, path.join(downloadDir, 'css', path.basename(link)), processedLinks, totalLinks);
        await this.downloadResource(url, `${link}.map`, path.join(downloadDir, 'maps', `${path.basename(link)}.map`), processedLinks, totalLinks);
      }

      // Download JS files and their map files
      for (const link of jsLinks) {
        await this.downloadResource(url, link, path.join(downloadDir, 'js', path.basename(link)), processedLinks, totalLinks);
        await this.downloadResource(url, `${link}.map`, path.join(downloadDir, 'maps', `${path.basename(link)}.map`), processedLinks, totalLinks);
      }

      // Download image files
      for (const link of imgLinks) {
        await this.downloadResource(url, link, path.join(downloadDir, 'images', path.basename(link)), processedLinks, totalLinks);
      }

      // Download PDF files
      for (const link of pdfLinks) {
        await this.downloadResource(url, link, path.join(downloadDir, 'pdf', path.basename(link)), processedLinks, totalLinks);
      }

      // Download other files
      for (const link of otherLinks) {
        await this.downloadResource(url, link, path.join(downloadDir, 'other', path.basename(link)), processedLinks, totalLinks);
      }
    } catch (error) {
      logToFile(this.logPath, `Failed to download site from ${url}: ${error}`);
    }
  }
}

module.exports = Downloader;
