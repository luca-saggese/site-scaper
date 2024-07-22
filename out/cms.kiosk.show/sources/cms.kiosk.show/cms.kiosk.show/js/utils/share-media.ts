import config from '@Config/config';
import { ShowHtmlQuery } from '@Graphql/graphqlTypes.generated';

const options: RequestInit = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  redirect: 'follow',
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function show2Gif(data: ShowHtmlQuery) {
  if (data.show) {
    const url = `${config.REACT_APP_UNFURLER_URL}/gif`;
    return fetch(url, {
      ...options,
      headers: { Accept: 'image/gif' },
      body: JSON.stringify(data),
    })
      .then((response) => response.blob())
      .then(downloadBlob(data.show.name, 'gif'));
  }
}

export async function show2Mp4(data: ShowHtmlQuery) {
  if (data.show) {
    const url = `${config.REACT_APP_UNFURLER_URL}/mp4`;
    return fetch(url, {
      ...options,
      headers: { Accept: 'video/mp4' },
      body: JSON.stringify(data),
    })
      .then((response) => response.blob())
      .then(downloadBlob(data.show.name, 'mp4'));
  }
}

const downloadBlob = (showName: string, fileType: 'gif' | 'mp4') => (blob: Blob) => {
  const href = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = `${showName}.${fileType}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
};
