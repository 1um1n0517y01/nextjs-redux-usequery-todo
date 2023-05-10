import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import MyApp from './_app.js';

describe('MyApp', () => {
  it('renders without errors', () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MyApp Component={() => null} pageProps={{}} />
        </PersistGate>
      </Provider>
    );
  });
});
