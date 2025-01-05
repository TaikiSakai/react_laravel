import { Outlet } from 'react-router';
const  Dashboard = () => {
  return (
    <div>
      <h1 className="bg-teal-400">Dashboard Outer</h1>
      {/* will either be home.tsx or settings.tsx */}
      <Outlet />
    </div>
  );
};

export default Dashboard;