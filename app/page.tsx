'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/components/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setIsAuthenticated, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://freshxpress-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      // Set authentication state and wait for it to complete
      await new Promise(resolve => {
        setIsAuthenticated(true);
        resolve(true);
      });
      
      // Redirect to dashboard
      router.push('/dashboard');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side - Image */}
      <div className="w-full md:w-1/2 bg-[#00843D] relative flex items-center justify-center p-4 min-h-[300px] md:min-h-screen">
        <Image
          src="/farmer.png"
          alt="Farmer in field"
          width={500}
          height={500}
          className="object-cover rounded-lg shadow-xl max-w-full h-auto"
          priority
        />
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#00843D] mb-6 md:mb-8 text-center">FreshXpress</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 md:px-4 md:py-3 rounded text-sm md:text-base">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 text-black py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:ring-[#00843D] focus:border-[#00843D] text-sm md:text-base"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 text-black py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:ring-[#00843D] focus:border-[#00843D] text-sm md:text-base"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00843D] text-white py-2 px-4 rounded-lg hover:bg-[#006F33] transition duration-200 disabled:opacity-50 text-sm md:text-base"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
