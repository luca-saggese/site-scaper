import { useCallback, useEffect, useRef } from 'react';

import { noop } from '@Utils/helpers';

export const useEventHandler = <T extends keyof DocumentEventMap>(
  eventType: T,
  onEvent: (event: Event) => void,
  onEventOut: (event: Event) => void = noop
) => {
  const ref = useRef();

  return useEventHandlerWithRef(eventType, ref, onEvent, onEventOut);
};

export const useEventHandlerWithRef = <T extends keyof DocumentEventMap>(
  eventType: T,
  ref: any,
  onEvent: (event: Event) => void,
  onEventOut: (event: Event) => void = noop
) => {
  const handleEvent = useCallback(
    (event) => {
      if (ref?.current?.contains(event.target)) {
        onEvent(event);
      } else {
        onEventOut(event);
      }
    },
    [onEvent, onEventOut, ref]
  );

  useEffect(() => {
    document.addEventListener(eventType, handleEvent);
    return () => {
      document.removeEventListener(eventType, handleEvent);
    };
  }, [eventType, handleEvent]);

  return ref;
};
