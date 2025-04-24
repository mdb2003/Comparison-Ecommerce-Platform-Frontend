import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import API from '../../api';

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get email and OTP from location state (passed from OTP verification)
    const { email, otp } = location.state || {};
    
    if (!email || !otp) {
        // If no email or OTP, redirect to forgot password page
        navigate('/forgot-password');
    }

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsSubmitting(false);
            return;
        }
    
        try {
            const response = await API.post('reset-password/', { 
                email, 
                new_password: formData.newPassword, 
                confirm_password: formData.confirmPassword,
                otp
            });
    
            if (response.status === 200) {
                setMessage('Password reset successful!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(response.data.message || 'Error resetting password');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error resetting password');
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
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Set New Password</h2>
                        <p className="text-gray-600 mt-2">
                            Enter a new password to reset your account access.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? <FiEyeOff className="text-gray-500" /> : <FiEye className="text-gray-500" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />
                            </div>
                        </div>

                        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                        {message && <div className="text-green-600 text-sm text-center">{message}</div>}

                        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default ResetPassword;
