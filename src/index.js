import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserForm from "./components/UserForm"
import Header from "./components/Header";
import Menu from "./components/Menu";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
<Header />
<BrowserRouter>
<Menu />
<Routes>
<Route exact path="/" element={<App />} />

<Route exact path="/newproject" element={<UserForm />} />
</Routes>
</BrowserRouter>
  </React.StrictMode>
);


