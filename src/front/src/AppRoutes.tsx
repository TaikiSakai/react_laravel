import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import Home from './pages/home';
import App from './App';

  const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<App />} path='app' />
          <Route element={<Login />} path="login" />

          <Route element={<Dashboard />} path='dashboard'>
            <Route element={<Home />} index />
            <Route element={<Settings />} path="settings" />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  };
  
export default AppRoutes;