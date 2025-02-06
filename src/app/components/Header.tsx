'use client';

import { useState } from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function AdminHeader() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      {/* Logo or Title */}
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-extrabold text-yellow-400">Admin Dashboard</h1>
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } lg:flex lg:items-center lg:space-x-8 absolute lg:static top-16 left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent p-4 lg:p-0 z-10`}
      >
        <nav className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
          <Link href="/" className="text-lg hover:text-yellow-400 transition-all">
            Products
          </Link>
          <Link href="/form" className="text-lg hover:text-yellow-400 transition-all">
            Add Product
          </Link>
          <Link href="/orders" className="text-lg hover:text-yellow-400 transition-all">
            Orders
          </Link>
          <Link href="/Sales" className="text-lg hover:text-yellow-400 transition-all">
            Sales
          </Link>
        </nav>

        {/* User Info and Sign Out */}
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-white">
                    {user.firstName} {user.lastName}
                  </span>
                  <UserButton />
                </div>
              )}
              <SignOutButton>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
