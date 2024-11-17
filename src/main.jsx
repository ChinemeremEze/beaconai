import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { ReCaptchaProvider } from './components/ReCaptchaProvider';
import { Auth0ProviderWithNavigate } from './components/Auth0Provider';
import { HelmetProvider } from "react-helmet-async";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <QueryClientProvider client={queryClient}>
        <ReCaptchaProvider>
          <HelmetProvider>
            <App /> 
          </HelmetProvider>
        </ReCaptchaProvider>
      </QueryClientProvider>
    </Auth0ProviderWithNavigate>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals