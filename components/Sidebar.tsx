'use client';
import Link from 'next/link';
import { useAuth } from './AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-[#00843D] text-white p-6">
      <h2 className="text-2xl font-bold mb-6">FreshXpress</h2>
      <nav className="space-y-2">
        <Link 
          href="/dashboard" 
          className="block py-2 px-4 text-[#00843D] bg-white rounded-lg hover:bg-gray-100 transition duration-200"
        >
          Dashboard
        </Link>
        <button
          onClick={logout}
          className="block w-full py-2 px-4 text-white hover:bg-[#006F33] rounded-lg transition duration-200"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}