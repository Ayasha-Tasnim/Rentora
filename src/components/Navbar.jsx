'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  Menu,
  X,
  CarFront,
  CalendarCheck,
  LayoutDashboard,
  PlusCircle,
  LogOut,
} from 'lucide-react';

import toast from 'react-hot-toast';
// import { authClient } from '@/lib/auth-client';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  // const { data: session, isPending } = authClient.useSession();

  const navLinks = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Explore Cars',
      path: '/explore-cars',
    },
  ];

  // // const handleLogout = async () => {
  //   try {
  //     await authClient.signOut();

  //     toast.success('Logout Successful');

  //     router.push('/login');
  //   } catch (error) {
  //     toast.error('Logout Failed');
  //   }
  // };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <CarFront className="h-8 w-8 text-blue-600" />

          <h1 className="text-2xl font-bold text-gray-900">DriveNest</h1>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-medium transition hover:text-blue-600 ${
                pathname === link.path ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {link.title}
            </Link>
          ))}

          {/* {session && (
            <>
              <Link
                href="/add-car"
                className={`font-medium transition hover:text-blue-600 ${
                  pathname === '/add-car' ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Add Car
              </Link>

              <Link
                href="/my-bookings"
                className={`font-medium transition hover:text-blue-600 ${
                  pathname === '/my-bookings'
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                My Bookings
              </Link>
            </>
          )} */}
        </div>

        {/* <div className="hidden items-center gap-4 md:flex">
          {!isPending && !session && (
            <>
              <Link href="/login">
                <button className="rounded-xl border border-blue-600 px-5 py-2 font-medium text-blue-600 transition hover:bg-blue-50">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">
                  Register
                </button>
              </Link>
            </>
          )}

          {!isPending && session && (
            <div className="group relative">
              <button className="flex items-center gap-2 rounded-full border border-gray-200 p-1 transition hover:shadow-md">
                <Image
                  src={
                    session?.user?.image ||
                    'https://i.ibb.co/4pDNDk1/avatar.png'
                  }
                  alt="profile"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </button>

              <div className="invisible absolute right-0 top-14 w-64 rounded-2xl border border-gray-100 bg-white p-4 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="font-semibold text-gray-900">
                    {session?.user?.name}
                  </h2>

                  <p className="truncate text-sm text-gray-500">
                    {session?.user?.email}
                  </p>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <Link
                    href="/add-car"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <PlusCircle size={18} />
                    Add Car
                  </Link>

                  <Link
                    href="/my-bookings"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <CalendarCheck size={18} />
                    My Bookings
                  </Link>

                  <Link
                    href="/my-added-cars"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <LayoutDashboard size={18} />
                    My Added Cars
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-red-500 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div> */}

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? (
            <X className="h-7 w-7 text-gray-900" />
          ) : (
            <Menu className="h-7 w-7 text-gray-900" />
          )}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-3 px-4 py-5">
            {navLinks.map(link => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block rounded-xl px-4 py-2 transition ${
                  pathname === link.path
                    ? 'bg-blue-100 font-semibold text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.title}
              </Link>
            ))}

            {session && (
              <>
                <Link
                  href="/add-car"
                  className="block rounded-xl px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Add Car
                </Link>

                <Link
                  href="/my-bookings"
                  className="block rounded-xl px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Bookings
                </Link>

                <Link
                  href="/my-added-cars"
                  className="block rounded-xl px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Added Cars
                </Link>
              </>
            )}

            {!session ? (
              <div className="flex flex-col gap-3 pt-3">
                <Link href="/login">
                  <button className="w-full rounded-xl border border-blue-600 py-2 font-medium text-blue-600">
                    Login
                  </button>
                </Link>

                <Link href="/register">
                  <button className="w-full rounded-xl bg-blue-600 py-2 font-medium text-white">
                    Register
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full rounded-xl bg-red-500 py-2 font-medium text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
