import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Account from './components/Account';
import Accueil from './components/Accueil';
import Main from './components/Main';
import PagePost from './components/PagePost';
import ErrorPage from './components/ErrorPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Accueil />}>
          <Route path="" element={<Main />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='profile' element={<Account />} />
          <Route path='post/:idPost' element={<PagePost />}/>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);