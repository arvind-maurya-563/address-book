import React, { useState } from 'react';
import '../styles/loginSignup.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { getApiUrl, getSecureKey } from '../components/apiComponent';
import { LoaderComponentData } from '../components/LoaderComponent';
import AlertModal from './Modal';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons from react-icons

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setloading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const loginUser = async (userdata) => {
    try {
      setloading(true);
      const loginUserData = await fetch(`${getApiUrl()}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(userdata),
        headers: {
          "Content-Type": "application/json",
          "SecureKey": getSecureKey(userdata)
        }
      });
      const response = await loginUserData.json();
      setloading(false);
      if (response.status) {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('name', response.name);
        navigate('/address-book-list');
      } else {
        setOpen(true);
        setloading(false);
        setMessage(response.message);
        handleOpen();
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      alert(error.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      loginUser(formData);
    } else {
      setMessage("Please fill in both fields.");
      handleOpen();
    }
  };

  return (
      <>
      {isLoading && <LoaderComponentData />}
        {open && <AlertModal handleClose={handleClose} open={open} message={message} />}
        <div className="auth-page-container">
          <div className="auth-container">
            <div className="auth-welcome">
              <h1>Hello!</h1>
              <h1>Manage Your AddressBook</h1>
              <button onClick={() => navigate("/signup")}>Sign up</button>
            </div>
            <div className="auth-form">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="email"
                  placeholder="Email ID"
                  onChange={handleChange}
                  required
                />
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                  <span onClick={handleClickShowPassword} className="password-toggle-icon">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        </div>
      </>
  );
};
