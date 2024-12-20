import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from "react-redux";
import App from './App';
// import { store } from './features/store';
import ErrorBoundary from './common/ErrorBoundary';
import {QueryClientProvider,QueryClient} from '@tanstack/react-query';


const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback="There was an error">
      {/* <Provider store={store}> */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      {/* </Provider> */}
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
