import React, { useState } from 'react';

import ColourPicker from '@Components/ColourPicker';
import DropDown, { DropDownAlign, DropDownPosition } from '@Components/DropDown';
import Emoji from '@Components/Emoji';
import { FormFieldRenderProps } from '@Components/Form/FormField';
import Tabs from '@Components/Tabs';
import { EmojiList, getEmojiUrl } from '@Utils/emoji';

import styles from './EmojiPicker.module.scss';

enum SelectionMode {
  EmojiSelection = 'Emoji',
  ColourSelection = 'Colour',
}

interface EmojiModel {
  backgroundColor: string;
  code: string;
}

interface EmojiPickerProps extends FormFieldRenderProps<EmojiModel> {}

const EmojiPicker: React.FunctionComponent<EmojiPickerProps> = ({ input }) => {
  const [activeMode, setActiveMode] = useState(SelectionMode.EmojiSelection);

  return (
    <DropDown
      component={<Emoji {...input.value} />}
      contentClassName={styles.dropdownContent}
      position={DropDownPosition.Right}
      align={DropDownAlign.Start}
      onOpen={input.onFocus}
      onClose={input.onBlur}
    >
      <div className={styles.topContainer}>
        <Tabs value={activeMode} options={Object.values(SelectionMode)} onChange={setActiveMode} />
      </div>
      {activeMode === SelectionMode.EmojiSelection && (
        <div className={styles.emojiContainer}>
          <div className={styles.emojiList}>
            {EmojiList.map((emojiInfo) => (
              <img
                key={emojiInfo.code}
                className={styles.emoji}
                onClick={() => {
                  input.onChange({ ...input.value, code: emojiInfo.code });
                }}
                src={getEmojiUrl(emojiInfo.code)}
                alt={emojiInfo.title}
              />
            ))}
          </div>
        </div>
      )}
      {activeMode === SelectionMode.ColourSelection && (
        <div className={styles.colourContainer}>
          <ColourPicker
            color={input.value.backgroundColor}
            onChange={(color) => input.onChange({ ...input.value, backgroundColor: color.hex })}
          />
        </div>
      )}
    </DropDown>
  );
};

export default EmojiPicker;
