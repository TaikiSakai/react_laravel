import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div>Dashboard Outlet_1</div>
      <Link to='/dashboard/settings'>settings</Link>
    </div>
  );
};

export default Home;