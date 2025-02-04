import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import API from '../../api';

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Extract token from URL query params or state
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token') || location.state?.token;

    const [formData, setFormData] = useState({
        password: '',
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
        
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        try {
            const response = await API.post('reset-password/', { 
                email: location.state?.email, 
                new_password: newPassword, 
                confirm_password: confirmPassword 
            });
    
            if (response.status === 200) {
                alert('Password reset successful! Redirecting to login...');
                navigate('/login'); // Redirect to login page
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error resetting password');
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
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
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
