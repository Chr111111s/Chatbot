import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

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
import RedirectIfAuthenticated from './components/auth/RedirectIfAuthenticated';
import RegisterForm from './components/templates/login/RegisterForm.jsx';

const AnimatedRoutes = ({ user, setUser }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path='/'
          element={
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <RedirectIfAuthenticated>
                <Form setUser={setUser} />
              </RedirectIfAuthenticated>
            </motion.div>
          }
        />
        <Route
          path='/register'
          element={
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4 }}
            >
              <RedirectIfAuthenticated>
                <RegisterForm />
              </RedirectIfAuthenticated>
            </motion.div>
          }
        />
        <Route path='/checkEmail' element={<CheckEmail user={user} />} />
        <Route path='/confirmCode' element={<ConfirmCode user={user} />} />
        <Route path='/newPassword' element={<NewPassword user={user} />} />

        {/* ADMIN */}
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

        {/* INTERNO */}
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

        {/* EXTERNO */}
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
    </AnimatePresence>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <AnimatedRoutes user={user} setUser={setUser} />
    </Router>
  );
};

export default App;
