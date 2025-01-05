import { Outlet } from 'react-router';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const  Dashboard = () => {
  return (
    <div>
      <h1 className="bg-teal-400">Dashboard Outer</h1>
      {/* will either be home.tsx or settings.tsx */}
      <Button variant='contained'>
        <Link to='/app'>AppHome</Link>
      </Button>
      <Outlet />
    </div>
  );
};

export default Dashboard;