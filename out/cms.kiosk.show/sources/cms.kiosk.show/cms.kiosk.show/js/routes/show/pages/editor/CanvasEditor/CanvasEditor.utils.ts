import { fabric } from 'fabric';

import { SLIDE_TEMPLATE_HEIGHT, SLIDE_TEMPLATE_WIDTH } from '@Config/constants';
import { fabricGif } from '@Utils/fabric';

export function isLine(object: fabric.Object): object is fabric.Line {
  return object.type === 'line';
}

export function isImage(object: fabric.Object): object is fabric.Image {
  return object.type === 'image';
}

export function isTextbox(object: fabric.Object): object is fabric.Textbox {
  return object.type === 'textbox';
}

export async function transformToFabricImage(url: string) {
  return new Promise<fabric.Image>((resolve, reject) => {
    fabric.Image.fromURL(url, async (image) => {
      if (!image.width || !image.height) {
        return;
      }

      const widthRatio = image.width / SLIDE_TEMPLATE_WIDTH;
      const heightRatio = image.height / SLIDE_TEMPLATE_HEIGHT;

      if (url.endsWith('.gif')) {
        const result = await fabricGif(url, image.width, image.height);
        if ('error' in result) {
          reject(result.error);
          return;
        }

        image = result;
      }

      const margin = 200;

      if (heightRatio > widthRatio) {
        image.scaleToHeight(SLIDE_TEMPLATE_HEIGHT - 2 * margin);
      } else {
        image.scaleToWidth(SLIDE_TEMPLATE_WIDTH - 2 * margin);
      }
      image.set({ left: margin, top: margin });

      resolve(image);
    });
  });
}
