import { fabric } from 'fabric';
import { decompressFrames, IGIFFrame, parseGIF } from 'gifuct-js';

import { logError } from '@Utils/helpers';

// Most of the code is taken from https://codesandbox.io/s/red-flower-27i85
// And adapted to typescript

export interface FabricJSONStructure {
  objects: (fabric.Object | GifImage)[];
}

export interface GifImage extends fabric.Image {
  originalSrc: string;
  src?: string;
}

export interface QRCodeImage extends fabric.Image {
  data: {
    type: 'QR_CODE';
    value: string;
  };
}

export function toJson(canvas: fabric.Canvas) {
  const json = (canvas.toJSON(['originalSrc', 'data']) as unknown) as FabricJSONStructure;
  json.objects.forEach((obj) => {
    if (isGifImage(obj)) {
      delete obj.src;
    }
  });
  return JSON.stringify(json);
}

export function loadCanvasJson(canvas: fabric.Canvas, parsedJson: FabricJSONStructure) {
  return new Promise<void>((resolve) => {
    canvas.loadFromJSON(
      {
        ...parsedJson,
        objects: parsedJson.objects.map((obj) => {
          return isGifImage(obj) ? { ...obj, src: obj.originalSrc } : obj;
        }),
      },
      async () => {
        const promises = parsedJson.objects.map(async (obj, index) => {
          if (!isGifImage(obj) || !obj.width || !obj.height) {
            return;
          }

          const result = await fabricGif(obj.originalSrc, obj.width, obj.height);

          if ('error' in result) {
            logError(result.error);
            return;
          }

          result.set(obj);

          canvas.insertAt(result, index, true);
        });

        await Promise.all(promises);

        resolve();
      }
    );
  });
}

export function isGifImage(object: fabric.Object): object is GifImage {
  return 'originalSrc' in object && (object as GifImage).originalSrc.endsWith('.gif');
}

export function isQRCodeImage(object: fabric.Object): object is QRCodeImage {
  return object.data?.type === 'QR_CODE';
}

async function gifToSprite(
  gif: string,
  maxWidth: number,
  maxHeight: number
): Promise<
  | { error: string }
  | {
      spriteCanvas: HTMLCanvasElement;
      frameWidth: number;
      frameHeight: number;
      framesLength: number;
      columnCount: number;
      delay: number;
    }
> {
  let frames: IGIFFrame[];
  try {
    const arrayBuffer = await fetch(gif).then((resp) => resp.arrayBuffer());
    frames = decompressFrames(parseGIF(arrayBuffer), true);
    if (!frames?.length) {
      return { error: 'No_frame_error' };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }

  // Create the needed canvas
  const dataCanvas = document.createElement('canvas');
  const dataCtx = dataCanvas.getContext('2d');
  const frameCanvas = document.createElement('canvas');
  const frameCtx = frameCanvas.getContext('2d');
  const spriteCanvas = document.createElement('canvas');
  const spriteCtx = spriteCanvas.getContext('2d');

  if (!dataCtx || !frameCtx || !spriteCtx) {
    return { error: 'Canvas context missing' };
  }

  // Get the frames dimensions and delay
  let [width, height, delay] = [
    frames[0].dims.width,
    frames[0].dims.height,
    frames.reduce((acc, cur) => (!acc ? cur.delay : acc), 0),
  ];

  // Set the scale ratio if any
  maxWidth = maxWidth || width;
  maxHeight = maxHeight || height;
  const scale = Math.min(maxWidth / width, maxHeight / height);
  width = width * scale;
  height = height * scale;

  //Set the frame and sprite canvas dimensions
  frameCanvas.width = width;
  frameCanvas.height = height;
  const columnCount = Math.ceil(Math.sqrt(frames.length));
  const rowCount = Math.ceil(frames.length / columnCount);
  spriteCanvas.width = width * columnCount;
  spriteCanvas.height = height * rowCount;

  frames.forEach((frame, i) => {
    // Get the frame imageData from the "frame.patch"
    const frameImageData = dataCtx.createImageData(frame.dims.width, frame.dims.height);
    frameImageData.data.set(frame.patch);
    dataCanvas.width = frame.dims.width;
    dataCanvas.height = frame.dims.height;
    dataCtx.putImageData(frameImageData, 0, 0);

    // Draw a frame from the imageData
    if (frame.disposalType === 2) {
      frameCtx.clearRect(0, 0, width, height);
    }
    frameCtx.drawImage(
      dataCanvas,
      frame.dims.left * scale,
      frame.dims.top * scale,
      frame.dims.width * scale,
      frame.dims.height * scale
    );

    // Add the frame to the sprite sheet
    spriteCtx.drawImage(frameCanvas, width * (i % columnCount), height * Math.floor(i / columnCount));
  });

  // Clean the dom, dispose of the unused canvass
  dataCanvas.remove();
  frameCanvas.remove();
  spriteCanvas.remove();

  return {
    spriteCanvas,
    frameWidth: width,
    frameHeight: height,
    columnCount,
    framesLength: frames.length,
    delay,
  };
}

enum Status {
  PLAY,
  PAUSE,
  STOP,
}

export async function fabricGif(gif: string, maxWidth: number, maxHeight: number) {
  const result = await gifToSprite(gif, maxWidth, maxHeight);

  if ('error' in result) {
    return { error: result.error };
  }

  const { spriteCanvas, delay, frameWidth, frameHeight, columnCount, framesLength } = result;

  const img = new fabric.Image(fabric.util.createImage()) as GifImage;
  let framesIndex = 0;
  let start = performance.now();
  let status: Status;

  img.width = frameWidth;
  img.height = frameHeight;
  img.originalSrc = gif;

  img._render = function (ctx) {
    if (status === Status.PAUSE || (status === Status.STOP && framesIndex === 0)) return;
    const now = performance.now();
    const delta = now - start;
    if (delta > delay) {
      start = now;
      framesIndex++;
    }
    if (framesIndex === framesLength || status === Status.STOP) framesIndex = 0;
    ctx.drawImage(
      spriteCanvas,
      frameWidth * (framesIndex % columnCount),
      frameHeight * Math.floor(framesIndex / columnCount),
      frameWidth,
      frameHeight,
      -this.width / 2,
      -this.height / 2,
      frameWidth,
      frameHeight
    );
  };
  // @ts-ignore
  img.play = function () {
    status = Status.PLAY;
    this.dirty = true;
  };
  // @ts-ignore
  img.pause = function () {
    status = Status.PAUSE;
    this.dirty = false;
  };
  // @ts-ignore
  img.stop = function () {
    status = Status.STOP;
    this.dirty = false;
  };

  // @ts-ignore
  img.play();

  return img;
}

export const getImageCopyProperties = (object: fabric.Object) => {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { originalSrc, src, width, height, ...properties } = object;
  return properties;
};
