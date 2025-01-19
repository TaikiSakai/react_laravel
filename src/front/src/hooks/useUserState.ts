import useSWR from 'swr';
import type { currentUserType } from '../types/currentUser';

const useUserState = () => {
  const defaultData: currentUserType = {
    id: 0,
    name: '',
    email: '',
    isSignedIn: false,
    isFetched: false,
  };

  const { data: currentUser, mutate: setCurrentUser } = useSWR('api/current_user', null, {
    fallbackData: defaultData,
  });

  return [currentUser, setCurrentUser] as [currentUserType, (value: currentUserType) => void];
};

export default useUserState;
