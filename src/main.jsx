// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RecoilRoot } from 'recoil'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RecoilRoot>
    <App />
    </RecoilRoot>
  </BrowserRouter>
);
