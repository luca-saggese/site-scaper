import queryString from 'query-string';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { KIOSK_SOURCE } from '@Config/constants';

const DropboxOAuthPage: React.FunctionComponent = () => {
  const location = useLocation();

  // Get query params and remove # as it is not needed
  const params = queryString.parse(location.hash[0] === '#' ? location.hash.substring(1) : location.hash);

  if (!params.access_token) {
    window.close();
    return null;
  }

  // get the URL parameters which will include the auth token
  if (window.opener) {
    // send them to the opening window
    params.source = KIOSK_SOURCE;
    (window.opener as Window).postMessage(params, window.opener.location.origin);
    // close the popup
    window.close();
  }

  return null;
};

export default DropboxOAuthPage;
