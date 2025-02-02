import useUserState from '../hooks/useUserState';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

const IsAuthenticated = () => {
  const navigate = useNavigate();
  const [user] = useUserState();
  console.log('auth check', user);

// リロード対策
  // useEffect(() => {
  //   if (!user.isSignedIn) {
  //     navigate('/login');
  //   }
  // }, [user]);
  // return (
  //   user.isSignedIn ? <Outlet /> : null
  // );

  if (user.isFetched) {
    return <div>Loading...</div>; // 適宜ローディング表示をカスタマイズ
  }

  // サインインしていない場合はリダイレクト
  if (!user.isSignedIn) {
    return  navigate('/login');
  }

  // サインインしている場合は子ルートを表示
  return <Outlet />;
};

export default IsAuthenticated;
