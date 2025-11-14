'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLogin, logout } from '@/store/slices/authSlice';
import { setPageTitle } from '@/store/slices/uiSlice';
import { useGetUsersQuery } from '@/store/routes/users/userApi';
import { toast } from 'sonner';
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export default function TestComponent() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const ui = useAppSelector((state) => state.ui);
  const { data: users, isLoading, error } = useGetUsersQuery();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme =
      document.cookie
        .split('; ')
        .find((c) => c.startsWith('theme='))
        ?.split('=')[1] ?? 'light';

    setTheme(savedTheme as 'light' | 'dark');
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(savedTheme);
    toast.success('Test Component Loaded!');
  }, []);

  useEffect(() => {
    if (error) toast.error('Failed to load users');
  }, [error]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">{ui.pageTitle}</h1>

      <p className="mb-2">
        Auth Status: {auth.isLoggedIn ? `Logged in as ${auth.username}` : 'Logged out'}
      </p>

      <div className="space-x-4 mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => dispatch(setLogin('Nuvo'))}
        >
          Login
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => dispatch(setPageTitle('Home Dashboard'))}
        >
          Set Page Title
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={toggleTheme}>
          Toggle Theme (Current: {theme})
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Users (Dummy REST API)</h2>
        {isLoading ? (
          <p>Loading users...</p>
        ) : (
          <ul className="list-disc pl-5">
            {users?.users?.slice(0, 10).map((user: User) => (
              <li key={user.id}>
                {user.firstName} {user.lastName} – {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
