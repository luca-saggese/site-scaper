import { fabric } from 'fabric';
import { useEffect, useState } from 'react';

import { SLIDE_TEMPLATE_HEIGHT, SLIDE_TEMPLATE_WIDTH } from '@Config/constants';
import { FabricJSONStructure, isGifImage } from '@Utils/fabric';

import styles from './CanvasPreview.module.scss';

interface CanvasEditorProps {
  id: string;
  data: string;
  width: number;
}

const CanvasPreview = ({ data, id, width }: CanvasEditorProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();

  useEffect(() => {
    setCanvas(new fabric.Canvas(id));
  }, [id]);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    canvas.setZoom(width / SLIDE_TEMPLATE_WIDTH);
    canvas.setWidth(SLIDE_TEMPLATE_WIDTH * canvas.getZoom());
    canvas.setHeight(SLIDE_TEMPLATE_HEIGHT * canvas.getZoom());
  }, [canvas, width]);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    const parsedJson = JSON.parse(data) as FabricJSONStructure;
    canvas.loadFromJSON(
      {
        ...parsedJson,
        objects: parsedJson.objects.map((obj) => {
          return isGifImage(obj) ? { ...obj, src: obj.originalSrc } : obj;
        }),
      },
      () => {
        canvas.getObjects().forEach((obj) => {
          obj.selectable = false;
          obj.evented = false;
        });
      }
    );
  }, [canvas, data]);

  return (
    <div className={styles.container}>
      <canvas id={id} />
    </div>
  );
};

export default CanvasPreview;
