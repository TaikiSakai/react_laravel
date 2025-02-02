import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IsAuthenticated from './components/isAuthenticated';
import Login from './pages/user/login';
import Logout from './pages/user/logout';
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
          <Route element={<Logout />} path='logout'/>

          <Route element={<IsAuthenticated />}>
            <Route element={<Dashboard />} path='dashboard'>
              <Route element={<Home />} index />
              <Route element={<Settings />} path="settings" />
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    );
  };
  
export default AppRoutes;