# Web Scraper and Source Reconstructor

This project provides a tool to download a website, reconstruct source files from source maps, and generate a `package.json` based on the `node_modules` found in the reconstructed sources.

## Project Structure

```
project-root/
|-- Downloader.js
|-- SourceReconstructor.js
|-- PackageJsonGenerator.js
|-- utils.js
|-- main.js
|-- package.json
```

### Files

1. **Downloader.js** - Handles downloading of files and resources.
2. **SourceReconstructor.js** - Reconstructs source files from source maps.
3. **PackageJsonGenerator.js** - Generates a `package.json` based on the `node_modules` directory.
4. **utils.js** - Utility functions for logging, directory creation, deletion, and progress updates.
5. **main.js** - The main file that orchestrates the execution of the program.
6. **package.json** - Contains the project's dependencies.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Usage

To run the program, execute the following command:

```bash
node main.js
```

Alternatively, you can provide the URL as a command-line argument:

```bash
node main.js https://example.com
```

## Functionality

### 1. Downloader

The `Downloader` class is responsible for downloading the main HTML page and extracting and downloading CSS, JS, and their respective source maps.

### 2. SourceReconstructor

The `SourceReconstructor` class reads the downloaded source maps and reconstructs the original source files, saving them in a specified directory.

### 3. PackageJsonGenerator

The `PackageJsonGenerator` class searches through the reconstructed source directories for `node_modules` directories and generates a `package.json` file in the root of these directories.

## Utilities

The `utils.js` file contains utility functions for:
- Creating directories if they do not exist.
- Recursively deleting directories.
- Logging messages to a file.
- Updating progress on the console.
- Normalizing paths.

## Example Workflow

1. **Initialize the log file**: A log file is created to track the progress and any issues that occur during the process.
2. **Download site resources**: The `Downloader` downloads the main HTML page, CSS, JS, and source maps.
3. **Reconstruct source files**: The `SourceReconstructor` uses the downloaded source maps to reconstruct the original source files.
4. **Generate `package.json`**: The `PackageJsonGenerator` searches for `node_modules` directories in the reconstructed source files and generates a `package.json` file.

## Progress Updates

During execution, the console displays the progress percentage and the current file being processed. Detailed logs are written to the log file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
