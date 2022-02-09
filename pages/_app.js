// import '../styles/globals.scss'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

// function MyApp({ Component, pageProps }) {
//   const getLayout = Component.getLayout || ((page) => page)
//   return getLayout(<Component {...pageProps} />)
// }
// export default MyApp
import '../styles/globals.scss'
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from '../lib/store';
import { useStore } from 'react-redux';
import { setupInterceptors } from '../lib/axios';


function MyApp({Component, pageProps}) {
	const getLayout = Component.getLayout || ((page) => page)
  const store = useStore();
  setupInterceptors(store);
  
  return (
    <PersistGate persistor={store.__PERSISTOR} loading={null}>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </PersistGate>
  );
}
export default wrapper.withRedux(MyApp);