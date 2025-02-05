'use client';

import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'; // Import necessary Clerk components
import { SignOutButton } from '@clerk/nextjs'; // Import SignOutButton
import Link from 'next/link';

export default function AdminHeader() {
  const { user } = useUser(); // Use Clerk's useUser hook to get the logged-in user

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      {/* Logo or Title */}
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-extrabold text-yellow-400">Admin Dashboard</h1>
      </div>

      {/* Navigation */}
      <div className="flex items-center space-x-8">
        {/* Admin Navigation */}
        <nav className="space-x-6">
          <Link href="/" className="text-lg hover:text-yellow-400 transition-all">
            Products
          </Link>
          <Link href="/form" className="text-lg hover:text-yellow-400 transition-all">
            Add  Product
          </Link>
          <Link href="/orders" className="text-lg hover:text-yellow-400 transition-all">
          Orders
          </Link>
          <Link href="/Sales" className="text-lg hover:text-yellow-400 transition-all">
          Sales
          </Link>
        </nav>

        {/* User Info and Sign Out */}
        <div className="flex items-center space-x-4">
          {/* Show SignInButton if the user is not signed in */}
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          {/* Show UserInfo when signed in */}
          <SignedIn>
            <div className="flex items-center space-x-4">
              {/* User Info and Avatar */}
              {user && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-white">{user.firstName} {user.lastName}</span>
                  <UserButton />
                </div>
              )}

              {/* Dropdown Menu for User Options */}
              <div className="relative">
              
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg hidden group-hover:block">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-200">Settings</Link>
                  <SignOutButton>
                    <button className="block w-full text-left px-4 py-2 bg-red-600 text-white rounded-b-lg hover:bg-red-700 transition-all">
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
