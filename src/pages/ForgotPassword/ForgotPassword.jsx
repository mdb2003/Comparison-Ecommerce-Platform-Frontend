import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import API from '../../api';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setMessage('');
    
        try {
            const response = await API.post('forgot-password/', { email });
    
            if (response.status === 200) {
                setMessage('OTP sent to your email. Please check your inbox.');
    
                // Redirect to OTPVerification page instead of Reset Password
                setTimeout(() => {
                    navigate('/otp-verification', { state: { email } });
                }, 3000);
            } else {
                setError(response.data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
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
                        <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
                        <p className="text-gray-600 mt-2">
                            Enter your email and we'll send you reset instructions.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input mt-1"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                        {message && <div className="text-green-600 text-sm text-center">{message}</div>}

                        <button
                            type="submit"
                            className="btn-primary w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default ForgotPassword;
