import '@/styles/globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { store } from '../Redux/store';

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_KEY}>
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </CookiesProvider>
    </Provider>
  ); // 이창수 바보
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;
