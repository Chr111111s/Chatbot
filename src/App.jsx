import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/templates/login/Form';
import CheckEmail from './components/templates/login/CheckEmail';
import ConfirmCode from './components/templates/login/ConfirmCode';
import NewPassword from './components/templates/login/NewPassword';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/templates/admin/Home';
import Users from './components/templates/admin/Users';
import Profile from './components/templates/admin/Profile';
import HomeIntern from './components/templates/intern/HomeIntern';
import ProfileIntern from './components/templates/intern/ProfileIntern';
import HomeExtern from './components/templates/extern/HomeExtern';
import ProfileExtern from './components/templates/extern/ProfileExtern';
const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path='/' element={<Form user={user} />} />
        <Route path='/checkEmail' element={<CheckEmail user={user} />} />
        <Route path='/confirmCode' element={<ConfirmCode user={user} />} />
        <Route path='/newPassword' element={<NewPassword user={user} />} />

        {/* Rutas para ADMIN */}

        <Route
          path='/home'
          element={
            <ProtectedRoute allowedRoles='ADMIN'>
              <Home user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path='/users'
          element={
            <ProtectedRoute allowedRoles='ADMIN'>
              <Users user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute allowedRoles='ADMIN'>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />

        {/* Rutas para INTERNO */}
        <Route
          path='/homeIntern'
          element={
            <ProtectedRoute allowedRoles='INTERNO'>
              <HomeIntern user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profileIntern'
          element={
            <ProtectedRoute allowedRoles='INTERNO'>
              <ProfileIntern user={user} />
            </ProtectedRoute>
          }
        />

        {/* Rutas para EXTERNO */}
        <Route
          path='/homeExtern'
          element={
            <ProtectedRoute allowedRoles='EXTERNO'>
              <HomeExtern user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profileExtern'
          element={
            <ProtectedRoute allowedRoles='EXTERNO'>
              <ProfileExtern user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
