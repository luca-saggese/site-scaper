import produce from 'immer';
import React, { useCallback, useContext, useState } from 'react';

import { assertIsDefined } from '@Utils/assert';
import { noop } from '@Utils/helpers';

import styles from './Modal.module.scss';

type PromiseResolvePayload<A extends string = string> = { action: A; [key: string]: unknown };

export type ModalProps = {
  closeModal: (param?: PromiseResolvePayload<'CLOSE'>) => void;
};

type ModalContextType = {
  showModal<P extends ModalProps>(options: {
    component: React.FunctionComponent<P>;
    props?: Omit<P, 'closeModal'>;
    closeable?: boolean;
  }): Promise<NonNullable<Parameters<P['closeModal']>[0]> | PromiseResolvePayload<'CLOSE'>>;
  updateModal<P extends ModalProps>(options: {
    component: React.FunctionComponent<P>;
    props?: Omit<P, 'closeModal'>;
    closeable?: boolean;
  }): void;
  closeModal(data?: PromiseResolvePayload): void;
};

let modalId = 1;

const ModalContext = React.createContext<ModalContextType>({
  showModal: () => Promise.resolve({ action: 'CLOSE' }),
  updateModal: noop,
  closeModal: noop,
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FunctionComponent = ({ children }) => {
  const [state, setState] = useState<{
    modals: {
      id: number;
      component: React.FunctionComponent<any>;
      props?: { [key: string]: unknown };
      resolve: (data: PromiseResolvePayload<any>) => void;
      closeable: boolean;
    }[];
  }>({
    modals: [],
  });

  const showModal = useCallback<ModalContextType['showModal']>(({ component, props, closeable = true }) => {
    return new Promise((resolve) => {
      setState((prevState) =>
        produce(prevState, (draft) => {
          draft.modals.push({ component, props, resolve, closeable, id: modalId++ });
          return draft;
        })
      );
    });
  }, []);

  const updateModal = useCallback<ModalContextType['updateModal']>(({ component, props, closeable = true }) => {
    setState((prevState) =>
      produce(prevState, (draft) => {
        const lastModal = draft.modals.pop();
        assertIsDefined(lastModal);
        draft.modals.push({
          ...lastModal,
          component,
          props,
          closeable,
        });
        return draft;
      })
    );
  }, []);

  const closeModal = useCallback<ModalContextType['closeModal']>((data = { action: 'CLOSE' }) => {
    setState((prevState) =>
      produce(prevState, (draft) => {
        const lastModal = draft.modals.pop();
        if (lastModal) {
          lastModal.resolve(data);
        }
        return draft;
      })
    );
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, updateModal, closeModal }}>
      {children}
      {state.modals.map((modal) => {
        return (
          <div className={styles.container} key={modal.id} role="dialog">
            {React.createElement(modal.component, { ...modal.props, closeModal })}
            <div
              className={styles.backdrop}
              onClick={() => {
                closeModal();
              }}
            />
          </div>
        );
      })}
    </ModalContext.Provider>
  );
};
