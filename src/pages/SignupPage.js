import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginSignup.css';
import { getApiUrl, getSecureKey } from '../components/apiComponent';
import { LoaderComponentData } from '../components/LoaderComponent';
import AlertModal from './Modal';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons from react-icons

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // To track if OTP is sent
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (verified) {
      navigate('/login');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const sendOtp = async (userdata) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${getApiUrl()}/api/auth/sendOtp`, {
        method: "POST",
        body: JSON.stringify(userdata),
        headers: {
          "Content-Type": "application/json",
          "SecureKey": getSecureKey(userdata)
        }
      });
      const data = await response.json();
      setIsLoading(false);
      setMessage(data.message);
      handleOpen();
      if (data.status) {
        setOtpSent(true);
      }
    } catch (error) {
      setIsLoading(false);
      setMessage(error.message);
      handleOpen();
    }
  };

  const verifyOtp = async (userdata) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${getApiUrl()}/api/auth/verifyOtp`, {
        method: "POST",
        body: JSON.stringify(userdata),
        headers: {
          "Content-Type": "application/json",
          "SecureKey": getSecureKey(userdata)
        }
      });
      const data = await response.json();
      if (data.status) {
        setVerified(true);
      }
      setIsLoading(false);
      setMessage(data.message);
      handleOpen();
    } catch (error) {
      setIsLoading(false);
      setMessage(error.message);
      handleOpen();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword, fullname, email, otp } = formData;
    if (password.length !== 8) {
      alert('Password length should be minimum 8 characters');
      return;
    } else if (password !== confirmPassword) {
      alert("Both passwords are not matching");
      return;
    }
    if (fullname && email) {
      if (otpSent) {
        if(otp.length !==6){
          alert("Enter 6 digit otp first to verify");
        }else{
          verifyOtp(formData);
        }
      } else {
        sendOtp({ fullname, email });
      }
    } else {
      alert("Name or email cannot be empty");
    }
  };

  return (
    <>
      {isLoading && <LoaderComponentData />}
      {open && <AlertModal handleClose={handleClose} open={open} message={message} />}
      <div className="auth-page-container">
        <div className="auth-container">
          <div className="auth-welcome" style={{ backgroundColor: '#28a745' }}>
            <h1>Hello!</h1>
            <h1>Manage Your AddressBook</h1>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
          <div className="auth-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                onChange={handleChange}
                required
                disabled={otpSent}
              />
              <input
                type="text"
                name="email"
                placeholder="Email ID"
                onChange={handleChange}
                required
                disabled={otpSent}
              />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  disabled={otpSent}
                />
                <span onClick={handleClickShowPassword} className="password-toggle-icon">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                  disabled={otpSent} // Disable input if OTP is sent
                />
                <span onClick={handleClickShowConfirmPassword} className="password-toggle-icon">
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {otpSent && (
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  onChange={handleChange}
                  required
                />
              )}
              <button type="submit" style={{ backgroundColor: '#28a745' }}>
                {otpSent ? 'Verify OTP' : 'Send OTP'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
