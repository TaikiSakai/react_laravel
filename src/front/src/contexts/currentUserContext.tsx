import { ReactNode } from 'react';
import useUserState from '../hooks/useUserState';
import { CurrentUserContext } from './userContext';
import fetchCurrentUser from '../utils/currentUserFetcher';


type CurrentUserProviderProps = {
  children: ReactNode;
};

const CurrentUserProvider = ({children}: CurrentUserProviderProps) => {
  const [user, setUser] = useUserState();
  console.log('context: currentUserContext', user);

  fetchCurrentUser();
  // useEffect(() => {
    // console.log('effect');
    // // usefetchCurrentUser(); SWRが原因？で動かない
    // if (!user.isFetched) {
    //   const baseURL = import.meta.env.VITE_PUBLIC_API_URL;
    //   const headers = { 'Content-Type': 'application/json' };
    //   axios.defaults.withXSRFToken  = true;

    //   axios({
    //     method: 'GET',
    //     headers: headers,
    //     url: baseURL + '/api/current_user',
    //     withCredentials: true,
    //   }).then((res) => {
    //     console.log('effect_fetcher',res);
    //     setUser({
    //       ...res.data,
    //       isSignedIn: true,
    //       isFetched: true,
    //     });
    //   });
    // }
  // }, [user]); 

  return (
    <CurrentUserContext.Provider value={{user, setUser}}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserProvider };
