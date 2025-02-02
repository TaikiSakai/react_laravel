import axios from 'axios';
import useUserState from '../hooks/useUserState';


const fetchCurrentUser = async () => {
  const [user, setUser] = useUserState();

  if (user.isFetched) {
    return;
  } else {
    const baseURL = import.meta.env.VITE_PUBLIC_API_URL;
    axios.defaults.withXSRFToken  = true;
    const headers = { 'Content-Type': 'application/json' };  

    try {
      await axios({
        method: 'GET',
        headers: headers,
        url: baseURL + '/api/current_user',
        withCredentials: true,
      }).then((res) => {
        console.log('fetcher',res);
        setUser({
          ...res.data,
          isSignedIn: true,
          isFetched: true,
        });
      });
    } catch (e) {
      console.log(e);
      setUser({
        ...user,
        isFetched: false,
      });
    }
  }
};

export default fetchCurrentUser;