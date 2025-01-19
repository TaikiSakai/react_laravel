import axios from 'axios';
import { useEffect } from 'react';
import useUserState from '../../hooks/useUserState';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [user, setUser] = useUserState();
  const navigate = useNavigate();

  // ページがマウントされた時に1回だけ実行したいためuseEffectを使用
  useEffect(() => {
    const userSignOut = async () => {
    const baseUrl = import.meta.env.VITE_PUBLIC_API_URL;
    console.log(user);

      try {
        const res = await axios({
          method: 'POST',
          url: baseUrl + '/logout',
          withCredentials: true,
        });
        setUser({
          id: 0,
          name: '',
          email: '',
          isSignedIn: false,
          isFetched: false,
        });

        console.log(res);
        console.log('logout しました');
        navigate('/dashboard');
      } catch (e) {
        console.log(e);
        navigate('/dashboard');
      }
    };

    userSignOut();
  }, []);

  return <></>;
};

export default Logout;
