import React, { useRef, useState } from 'react';

import Icon, { IconStyle, IconType } from '@Components/Icon';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { LayoutFragment } from '@Graphql/graphqlTypes.generated';
import { useDebounce } from '@Hooks/useDebounce';
import useDimensions from '@Hooks/useDimensions';
import CanvasPreview from '@Routes/show/pages/editor/CanvasPreview';
import { disabledSubmitOnEnterKeyPress } from '@Utils/form';
import { groupBy } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './CanvasEditorLayoutSelectionOverlay.module.scss';

interface LayoutButtonProps {
  layout: LayoutFragment;
  onLayoutSelect: (layout: LayoutFragment) => void;
  onDeleteLayoutClick?: (layoutId: string) => void;
}

const LayoutButton = ({ layout, onLayoutSelect, onDeleteLayoutClick }: LayoutButtonProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useDimensions(containerRef);

  return (
    <button className={styles.layoutItem} onClick={() => onLayoutSelect(layout)}>
      <div ref={containerRef}>
        <CanvasPreview data={layout.data} id={`LayoutPreview-${layout.id}`} width={dimensions.width || 300} />
      </div>
      <Typography
        color={TextColor.White}
        styleType={TextType.MobileBody}
        className={styles.layoutName}
        WrapperElement="div"
      >
        {layout.name}
      </Typography>
      {onDeleteLayoutClick && (
        <div
          className={styles.removeIcon}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDeleteLayoutClick(layout.id);
          }}
        >
          <Icon icon={IconType.Trash} iconStyle={IconStyle.None} />
        </div>
      )}
    </button>
  );
};
interface CanvasEditorProps {
  layouts: LayoutFragment[];
  onDeleteLayoutClick?: (layoutId: string) => void;
  onLayoutSelect: (layout: LayoutFragment) => void;
}

const CanvasEditorLayoutSelectionOverlay = ({ layouts, onLayoutSelect, onDeleteLayoutClick }: CanvasEditorProps) => {
  const t = useTranslation();
  const [layoutFilterValue, setLayoutFilterValue] = useState('');
  const debounceLayoutFilterValue = useDebounce(layoutFilterValue, 200);

  const filteredLayouts = layouts.filter(
    (layout) =>
      layout.name.toLowerCase().includes(debounceLayoutFilterValue.toLowerCase()) ||
      layout.category.toLowerCase().includes(debounceLayoutFilterValue.toLowerCase())
  );
  const layoutGroups = groupBy(filteredLayouts, 'category');
  const categoryNames = Object.keys(layoutGroups);

  const sortedCategoryNames = [
    ...categoryNames.filter((categoryName) => categoryName !== 'Other').sort(),
    ...categoryNames.filter((categoryName) => categoryName === 'Other'),
  ];

  return (
    <div className={styles.layoutSelectionOverlay}>
      <Typography styleType={TextType.LargeBoldHeadline}>{t('msg_canvas_editor_layout_overlay_title')}</Typography>
      <div className={styles.layoutFilterInputContainer}>
        <Icon icon={IconType.Search} />
        <input
          type="text"
          placeholder={t('msg_canvas_editor_layout_filter_input_placeholder')}
          value={layoutFilterValue}
          onKeyPress={disabledSubmitOnEnterKeyPress}
          onChange={(e) => {
            setLayoutFilterValue(e.currentTarget.value);
          }}
        />
      </div>
      <div className={styles.layoutGroups}>
        {sortedCategoryNames.map((categoryName) => (
          <div key={categoryName}>
            <Typography styleType={TextType.RegularHeadline}>{categoryName}</Typography>
            <div className={styles.layoutList}>
              {layoutGroups[categoryName].map((layout) => (
                <LayoutButton
                  key={layout.id}
                  layout={layout}
                  onLayoutSelect={onLayoutSelect}
                  onDeleteLayoutClick={onDeleteLayoutClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CanvasEditorLayoutSelectionOverlay);
