import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Login from './Login';

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);
  console.log(user);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {user ? (
        <div className='min-h-screen bg-gray-50'>
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Layout;
