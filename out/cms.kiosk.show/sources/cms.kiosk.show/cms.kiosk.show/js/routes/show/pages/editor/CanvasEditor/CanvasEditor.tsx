import classnames from 'classnames';
import { fabric } from 'fabric';
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { throttle } from 'throttle-debounce';

import { CANVAS_TEMPLATE_ID, SLIDE_TEMPLATE_HEIGHT, SLIDE_TEMPLATE_WIDTH } from '@Config/constants';
import {
  LayoutFragment,
  useCreateLayoutMutation,
  useDeleteLayoutMutation,
  useLayoutsQuery,
  useMeQuery,
} from '@Graphql/graphqlTypes.generated';
import useDimensions from '@Hooks/useDimensions';
import useLatest from '@Hooks/useLatest';
import { SlideFormModel } from '@Routes/show/pages/editor';
import { isTextbox } from '@Routes/show/pages/editor/CanvasEditor/CanvasEditor.utils';
import CanvasEditorLayoutSelectionOverlay from '@Routes/show/pages/editor/CanvasEditor/CanvasEditorLayoutSelectionOverlay';
import { fabricGif, isGifImage, loadCanvasJson, toJson } from '@Utils/fabric';
import { isDefined, logError, noop } from '@Utils/helpers';

import styles from './CanvasEditor.module.scss';
import CanvasEditorHeader from './CanvasEditorHeader';
import CanvasEditorLeftPanel from './CanvasEditorLeftPanel';

interface CanvasEditorProps {
  slide: SlideFormModel;
  isPublic?: boolean;
  onSave: () => void;
  onChange: (data: { data: string }) => void;
  isEditable?: boolean;
  footerPresent?: boolean;
}

const CanvasEditor = ({
  slide,
  isPublic = false,
  onSave,
  onChange,
  isEditable = true,
  footerPresent = true,
}: CanvasEditorProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [templateSelectionVisible, setTemplateSelectionVisible] = useState(
    () => JSON.parse(slide.data.data).objects.length === 0
  );
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const canvasHistoryRef = useRef<{ undo: string[]; redo: string[]; current: string; processing: boolean }>({
    undo: [],
    redo: [],
    current: '',
    processing: false,
  });

  const meQuery = useMeQuery({ skip: isPublic });
  const layoutsQuery = useLayoutsQuery({
    variables: { templateId: CANVAS_TEMPLATE_ID },
  });
  const [createLayoutMutation] = useCreateLayoutMutation({
    onCompleted: () => layoutsQuery.refetch(),
  });
  const [deleteLayoutMutation] = useDeleteLayoutMutation({
    onCompleted: () => layoutsQuery.refetch(),
  });

  const copiedObjectRef = useRef<fabric.Object | undefined>();
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(editorContainerRef);

  const onSaveRef = useLatest(onSave);
  const onChangeRef = useLatest(onChange);
  const slideDataRef = useLatest(slide.data.data);
  const saveDataRef = useRef(slide.data.data);

  const onSaveCallback = useCallback(() => {
    if (!canvas) {
      return;
    }

    const json = toJson(canvas);
    if (saveDataRef.current === json) {
      return;
    }

    saveDataRef.current = json;
    onSaveRef.current();
  }, [canvas, onSaveRef, saveDataRef]);

  // Stopping user when closing tab/browser if canvas has unsaved changes
  useEffect(() => {
    function onload(e: BeforeUnloadEvent) {
      if (canvas && saveDataRef.current !== toJson(canvas)) {
        // Cancel the event
        e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        // Chrome requires returnValue to be set
        e.returnValue = '';
      }
    }

    window.addEventListener('beforeunload', onload);

    return () => {
      window.removeEventListener('beforeunload', onload);
    };
  }, [canvas, saveDataRef]);

  useEffect(() => {
    const canvasRef = new fabric.Canvas('canvasId', { backgroundColor: '#ffffff', preserveObjectStacking: true });

    fabric.util.requestAnimFrame(function render() {
      canvasRef.renderAll();
      fabric.util.requestAnimFrame(render);
    });

    setCanvas(canvasRef);
  }, []);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    canvasHistoryRef.current.processing = true;

    loadCanvasJson(canvas, JSON.parse(slideDataRef.current)).then(() => {
      canvasHistoryRef.current.current = slideDataRef.current;
      canvasHistoryRef.current.processing = false;
    });
  }, [canvas, slideDataRef]);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    function saveHistory() {
      if (!canvas) {
        return;
      }

      onChangeRef.current({ data: toJson(canvas) });

      if (canvasHistoryRef.current.processing) {
        return;
      }

      if (canvasHistoryRef.current.undo.length === 20) {
        //Drop the oldest element
        canvasHistoryRef.current.undo.shift();
      }

      canvasHistoryRef.current.undo.push(canvasHistoryRef.current.current);
      canvasHistoryRef.current.redo = [];
      canvasHistoryRef.current.current = toJson(canvas);
    }

    canvas.on('object:added', saveHistory);
    canvas.on('object:removed', saveHistory);
    canvas.on('object:modified', saveHistory);
    canvas.on('object:skewing', saveHistory);
    // Custom events
    canvas.on('object:property-changed', saveHistory);
    canvas.on('object:order-changed', saveHistory);
    canvas.on('canvas:property-changed', saveHistory);
    canvas.on('canvas:layout-changed', saveHistory);
  }, [canvas, onChangeRef]);

  useEffect(() => {
    if (!canvas) return noop;

    async function onKeyUp(e: KeyboardEvent) {
      if (!canvas) {
        return;
      }

      if (e.target instanceof HTMLElement && e.target.tagName !== 'BODY') {
        // All canvas related events has target body
        return;
      }

      const activeObject = canvas?.getActiveObject();
      const key = e.key.toLowerCase();
      const ctrlOrMetaKey = e.ctrlKey || e.metaKey;

      if (ctrlOrMetaKey && key === 'c') {
        // Copy
        activeObject?.clone(
          (obj: fabric.Object) => {
            obj.set({ left: (obj.left || 0) + 50, top: (obj.top || 0) + 50 });
            copiedObjectRef.current = obj;
          },
          ['originalSrc', 'data']
        );
        return;
      }

      if (ctrlOrMetaKey && key === 'v') {
        // Paste
        copiedObjectRef.current?.clone(
          async (obj: fabric.Object) => {
            if (isGifImage(obj) && obj.width && obj.height) {
              const result = await fabricGif(obj.originalSrc, obj.width, obj.height);

              if ('error' in result) {
                logError(result.error);
                return;
              }

              result.set({ ...obj, src: result.src });
              obj = result;
            }

            canvas.add(obj);
            canvas.setActiveObject(obj);
          },
          ['originalSrc', 'data']
        );
        return;
      }

      if (ctrlOrMetaKey && e.shiftKey && key === 'z') {
        // Redo
        const nextState = canvasHistoryRef.current.redo.pop();

        if (!nextState) {
          return;
        }

        canvasHistoryRef.current.processing = true;
        await loadCanvasJson(canvas, JSON.parse(nextState));
        canvasHistoryRef.current.undo.push(canvasHistoryRef.current.current);
        canvasHistoryRef.current.current = nextState;
        canvasHistoryRef.current.processing = false;
        return;
      }

      if (ctrlOrMetaKey && key === 'z') {
        // Undo
        const previousState = canvasHistoryRef.current.undo.pop();

        if (!previousState) {
          return;
        }

        canvasHistoryRef.current.processing = true;
        await loadCanvasJson(canvas, JSON.parse(previousState));
        canvasHistoryRef.current.redo.push(canvasHistoryRef.current.current);
        canvasHistoryRef.current.current = previousState;
        canvasHistoryRef.current.processing = false;
      }

      if (
        ['Delete', 'Backspace'].includes(e.key) &&
        activeObject &&
        !(isTextbox(activeObject) && activeObject.isEditing)
      ) {
        canvas.remove(activeObject);
        return;
      }

      if (e.key === 'Escape' && activeObject) {
        canvas.discardActiveObject();
        return;
      }
    }

    window.addEventListener('keydown', onKeyUp);
    return () => window.removeEventListener('keydown', onKeyUp);
  }, [canvas, canvasHistoryRef]);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    // Small delay to avoid tons of force rerender (especially on item drag)
    canvas.on('after:render', throttle(10, forceUpdate));
  }, [canvas]);

  // sizing
  useEffect(() => {
    if (!canvas || !editorRef.current || !dimensions.height) {
      return;
    }

    const heightZoom = dimensions.height / SLIDE_TEMPLATE_HEIGHT;
    const widthZoom = dimensions.width / SLIDE_TEMPLATE_WIDTH;
    const canvasZoom = Math.min(heightZoom, widthZoom);

    const canvasHeight = SLIDE_TEMPLATE_HEIGHT * canvasZoom;
    const canvasWidth = SLIDE_TEMPLATE_WIDTH * canvasZoom;
    editorRef.current.style.width = `${canvasWidth}px`;
    editorRef.current.style.height = `${canvasHeight}px`;
    canvas.setZoom(canvasZoom);

    const w = SLIDE_TEMPLATE_WIDTH * canvasZoom;
    const h = SLIDE_TEMPLATE_HEIGHT * canvasZoom;
    canvas.setWidth(w);
    canvas.setHeight(h);
  }, [canvas, dimensions]);

  const onLayoutSelect = useCallback(
    async (layout: LayoutFragment) => {
      if (!canvas) {
        return;
      }

      await loadCanvasJson(canvas, JSON.parse(layout.data));
      canvas.fire('canvas:layout-changed');
      setTemplateSelectionVisible(false);
    },
    [canvas]
  );

  const onLayoutDelete = useCallback(
    (layoutId: string) => {
      deleteLayoutMutation({ variables: { input: { id: layoutId } } });
    },
    [deleteLayoutMutation]
  );

  const layouts = useMemo(() => layoutsQuery.data?.layouts?.filter(isDefined) || [], [layoutsQuery.data?.layouts]);

  return (
    <div
      className={classnames({
        [styles.container]: true,
        [styles.footerPresent]: footerPresent,
        [styles.isEditable]: isEditable,
      })}
    >
      {canvas && isEditable && (
        <CanvasEditorLeftPanel
          canvas={canvas}
          isPublic={isPublic}
          setTemplateSelectionVisible={setTemplateSelectionVisible}
        />
      )}
      <div className={styles.rightSide}>
        {canvas && isEditable && (
          <CanvasEditorHeader
            canvas={canvas}
            isPublic={isPublic}
            onSave={onSaveCallback}
            onSaveLayout={
              meQuery.data?.me?.info.permissions?.includes('add_layout')
                ? (input) => {
                    createLayoutMutation({ variables: { input } });
                  }
                : undefined
            }
            saveDisabled={saveDataRef.current === slideDataRef.current}
          />
        )}
        <div className={styles.editorContainer} ref={editorContainerRef}>
          <div className={styles.editor} ref={editorRef}>
            <div>
              <canvas id="canvasId" />
            </div>
          </div>
        </div>
        {templateSelectionVisible && canvas && (
          <CanvasEditorLayoutSelectionOverlay
            layouts={layouts}
            onLayoutSelect={onLayoutSelect}
            onDeleteLayoutClick={
              meQuery.data?.me?.info.permissions?.includes('delete_layout') ? onLayoutDelete : undefined
            }
          />
        )}
      </div>
    </div>
  );
};

export default CanvasEditor;
