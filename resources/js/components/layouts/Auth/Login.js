import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className='d-flex justify-content-center align-item-center'>
        <div className='card'>
            <div className='card-header'>
                Login
            </div>

            <div className='card-body'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                    type="email"
                    id="email"
                    placeholder='email'
                    className='form-control my-2 mx-2 '
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                    type="password"
                    id="password"
                    placeholder='password'
                    className='form-control my-2 mx-2 '
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='text-danger'>
                    {error && <div>{error}</div>}
                </div>
                <button className='btn btn-block btn-primary my-2 mx-2 ' type="submit" disabled={isLoading}>
                    Login
                </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;
