import LogRocket from 'logrocket';

export default ({isDev}) => {
  if (!isDev) return LogRocket.init('bc1ult/spacedtime');
};
