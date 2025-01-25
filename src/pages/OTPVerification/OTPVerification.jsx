import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import API from '../../api';

function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  useEffect(() => {
    const countdown = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
        if (prevInput) {
          prevInput.focus();
        }
        setOtp([...otp.map((d, idx) => (idx === index - 1 ? '' : d))]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const response = await API.post('verify-otp/', {
        email,
        otp: otpValue,
      });

      localStorage.setItem('accessToken', response.data.access); // Store JWT
      localStorage.setItem('refreshToken', response.data.refresh); // Store Refresh Token
      navigate('/'); // Redirect to dashboard or home
    } catch (error) {
      console.error('Error:', error.response.data);
      setError(error.response.data.detail || 'Invalid OTP');
    }
  };

  const handleResendOTP = async () => {
    if (timer === 0) {
      try {
        await API.post('resend-otp/', { email });
        setTimer(30); // Reset timer
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    }
  };


  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <button
            onClick={() => navigate('/login')}
            className="flex items-center text-gray-600 hover:text-primary-600 mb-6"
          >
            <FiArrowLeft className="mr-2" /> Back to Login
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-600">
              We've sent a verification code to<br />
              <span className="font-medium">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center gap-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`otp-${index}`}
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ))}
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full">
              Verify Email
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendOTP}
                className={`text-sm ${timer === 0
                    ? 'text-primary-600 hover:text-primary-700'
                    : 'text-gray-400 cursor-not-allowed'
                  }`}
                disabled={timer > 0}
              >
                Resend Code
                {timer > 0 && ` (${timer}s)`}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default OTPVerification;