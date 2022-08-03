import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {
   QueryClientProvider,
   QueryClient
} from '@tanstack/react-query';

// styles
import '@styles/index.scss';

// components
import App from '@components/app/App';

// store
import {
   store,
   persistor
} from '@store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
     <HashRouter>
        <Provider store={store}>
           <PersistGate
              loading={null}
              persistor={persistor}
           >
              <QueryClientProvider client={queryClient}>
                 <App />
              </QueryClientProvider>
           </PersistGate>
        </Provider>
     </HashRouter>
  </React.StrictMode>
);
