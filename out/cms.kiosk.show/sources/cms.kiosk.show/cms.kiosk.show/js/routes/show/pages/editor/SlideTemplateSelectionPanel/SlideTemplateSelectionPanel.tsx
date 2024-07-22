import React, { useState } from 'react';

import Icon, { IconSize, IconType } from '@Components/Icon';
import ContentBox from '@Components/Layout/ContentBox/ContentBox';
import List from '@Components/List';
import Typography, { TextType } from '@Components/Typography';
import { SlideTemplateFragment, useSlideTemplatesQuery } from '@Graphql/graphqlTypes.generated';
import { useEventHandler } from '@Hooks/useEventHandler';
import SlideTemplateItem, {
  SlideTemplateItemPlaceholder,
} from '@Routes/show/pages/editor/SlideTemplateSelectionPanel/SlideTemplateItem';
import { noop } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './SlideTemplateSelectionPanel.module.scss';

interface SlideTemplateSelectionPanelProps {
  onSelect: (template: SlideTemplateFragment) => Promise<void>;
  onOutsideClick: () => void;
}

const SlideTemplateSelectionPanel: React.FunctionComponent<SlideTemplateSelectionPanelProps> = ({
  onSelect,
  onOutsideClick,
}) => {
  const t = useTranslation();

  const ref = useEventHandler('click', noop, onOutsideClick);

  const [blockSelection, setBlockSelection] = useState(false);

  const { data, loading } = useSlideTemplatesQuery({
    fetchPolicy: 'cache-first',
  });

  return (
    <div className={styles.container} ref={ref}>
      <Typography styleType={TextType.MediumHeadline} className={styles.title} WrapperElement="div">
        {t('msg_label_slide_template_selection_panel_header')}
      </Typography>
      <div className={styles.listContainer}>
        <List
          className={styles.list}
          LoadingComponent={SlideTemplateItemPlaceholder}
          loadingItemsCount={12}
          emptyListComponent={
            <ContentBox>
              <Typography>{t('msg_label_empty_show_templates_list')}</Typography>
            </ContentBox>
          }
          items={data?.slideTemplates}
          loading={loading}
          label="Templates"
        >
          {({ item }) => (
            <SlideTemplateItem
              key={item.id}
              item={item}
              onClick={async () => {
                if (blockSelection) {
                  return;
                }

                setBlockSelection(true);
                await onSelect(item);
                setBlockSelection(false);
              }}
            />
          )}
        </List>
      </div>
      {blockSelection && (
        <div className={styles.savingOverlay}>
          <Icon icon={IconType.Loading} spin={true} size={IconSize.XXL} />
        </div>
      )}
    </div>
  );
};

export default SlideTemplateSelectionPanel;
