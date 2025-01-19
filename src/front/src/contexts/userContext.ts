import { createContext } from 'react';
import type { currentUserType } from '../types/currentUser';

type CurrentUserContextType = {
  user: currentUserType | null;
  setUser: (user: currentUserType) => void;
};

// const [currentUser, setCurrentUser] = useUserState();
const CurrentUserContext = createContext<CurrentUserContextType>({
  user: {
    id: 0,
    name: '',
    email: '',
    isSignedIn: false,
    isFetched: false ,
  },
  setUser: () => {},
});

export { CurrentUserContext };
