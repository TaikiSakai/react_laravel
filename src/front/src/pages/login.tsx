import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState<string>('');
    console.log(username);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
  return (
    <div>
      <div>About</div>
      <Link to='/'>Home</Link>
        <div style={{ display: 'flex' }}>
            <a>{username}</a>
            <input onChange={handleChange} type="text" value={username} />
        </div>
    </div>
  );
};

export default Login;