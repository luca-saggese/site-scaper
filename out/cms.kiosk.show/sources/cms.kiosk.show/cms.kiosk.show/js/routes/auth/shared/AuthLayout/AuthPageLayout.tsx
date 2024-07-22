import classnames from 'classnames';
import React from 'react';

import styles from './AuthPageLayout.module.scss';

export interface AuthPageLayoutProps {
  FooterComponent?: React.ReactNode;
}

const AuthPageLayout: React.FunctionComponent<AuthPageLayoutProps> = ({ FooterComponent, children }) => {
  return (
    <div className={classnames(styles.container)}>
      <div className={classnames(styles.wrapper)}>
        <div className={classnames(styles.content)}>{children}</div>
        {FooterComponent && <div className={classnames(styles.footer)}>{FooterComponent}</div>}
      </div>
    </div>
  );
};

export default AuthPageLayout;
