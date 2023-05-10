import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import MyApp from '../pages/_app';

describe('MyApp', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MyApp
            Component={() => <div>test</div>}
            pageProps={}
          />
        </PersistGate>
      </Provider>
    );
  });
});
