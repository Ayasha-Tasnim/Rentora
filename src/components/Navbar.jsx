'use client';

// এই Navbar-এ 'use client' অবশ্যই প্রয়োজন। কারণ এখানে browser-side interaction রয়েছে:

import Link from 'next/link';
import Image from 'next/image';
  //  User-এর profile image দেখাতে Next.js-এর optimized Image component আনা হয়েছে।
import { useState } from 'react';

// এখানে React থেকে useState নামের একটি Hook আনা হয়েছে.এর কাজ হলো component - এর ভেতরে এমন কোনো value রাখা, যেটা পরে পরিবর্তন হতে পারে। তোমার Navbar - এ এটি mobile menu open / close করার জন্য ব্যবহার হয়েছে:

import { usePathname, useRouter } from 'next/navigation';
// usePathname --- বর্তমানে কোন page open আছে জানে --সেই page-এর Navbar link highlight করে

// link er smy -User কোনো লেখা বা button-এ click করলে অন্য page-এ যায়
// useRouter কোনো কাজ শেষ হওয়ার পরে code নিজে থেকে user-কে অন্য page-এ পাঠায়..যেমন:

// Login সফল → Homepage-এ পাঠানো
// Logout সফল → Login page-এ পাঠানো
// Form submit সফল → Details page-এ পাঠানো

// তোমার Navbar-এ:

// usePathname → Active link blue করে
// useRouter   → Logout-এর পর login page-এ পাঠায়

import {
  Menu,
  X,
  CarFront,
  CalendarCheck,
  LayoutDashboard,
  PlusCircle,
  LogOut,
} from 'lucide-react';

// lucide-react package থেকে icon আনা হয়েছে।
// Icon	           কোথায় ব্যবহৃত
// Menu------------Mobile menu বন্ধ থাকলে
// X---------------	Mobile menu খোলা থাকলে
// CarFront--------	Website logo
// CalendarCheck---	My Bookings
// LayoutDashboard-	My Added Cars
// PlusCircle------	Add Car
// LogOut----------	Logout

import toast from 'react-hot-toast';
// User-কে success বা error message দেখায়।
// notification dekhay.(login Successful/failed)

import { authClient } from '@/lib/auth-client';
// authentication file(login ,logout ,session sob contrl hocche)
// তোমার authentication system-এর client-side functions এখানে আছে।
// এই Navbar-এ দুটি গুরুত্বপূর্ণ কাজে ব্যবহৃত হয়েছে:
// authClient.useSession()
// authClient.signOut()
// useSession()--বর্তমানে user login করা আছে কি না জানতে ব্যবহৃত হয়।
// signOut()--User-কে logout করাতে ব্যবহৃত হয়।


// export default = এই file-এর প্রধান component অন্য file-এ ব্যবহার করার অনুমতি দেওয়া
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  // এই line authentication system থেকে user-এর session information নিচ্ছে।

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

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      // await বলে:Logout পুরোপুরি শেষ না হওয়া পর্যন্ত পরের line-এ যেও না। awit nh dile এতে logout fail করলেও আগে থেকেই "Logout Successful" দেখাতে পারে।
     
      // async না দিয়ে function-এর ভিতরে await লিখলে error হবে:
      toast.success('Logout Successful');

      router.push('/login');
    } catch (error) {
      toast.error('Logout Failed');
    }
  };
  // এই handleLogout function-এর কাজ হলো user-কে logout করানো, success message দেখানো, তারপর login page-এ পাঠানো।
  
//   Code------	কাজ
// await ------	Logout শেষ হওয়া পর্যন্ত অপেক্ষা করে
// try---------	Error হতে পারে এমন code চালানোর চেষ্টা করে
// catch-------	Error হলে সেটি ধরে এবং alternative কাজ করে
// async	------  Function-এর ভিতরে await ব্যবহারের অনুমতি দেয়

 //  async ---কারণ logout process শেষ হতে কিছু সময় লাগতে পারে।
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      {/* sticky-- Page scroll করলেও Navbar উপরে আটকে থাকবে। */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <CarFront className="h-8 w-8 text-blue-600" />

          <h1 className="text-2xl font-bold text-gray-900">Rentora</h1>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.path}
              // React list-এর প্রতিটি item আলাদা করে চিনতে key ব্যবহার করে। Explore Cars-এর key:/explore-cars
              href={link.path}
              className={`font-medium transition hover:text-blue-600 ${
                pathname === link.path ? 'text-blue-600' : 'text-gray-700'
              }`}
              // এটি ternary condition .এই অংশটি current page-এর link blue করে।
            >
              {link.title}
            </Link>
          ))}

          {session && (
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
          )}
        </div>
        {/* session && ---login kra thkle add car ,my bookings dekhao */}
        {/* isPending না দিলে → flicker হতে পারে isPending দিলে → session check শেষ */}
        {/* না হওয়া পর্যন্ত অপেক্ষা করে */}
        <div className="hidden items-center gap-4 md:flex">
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
          {/* !session---login nh kra thkle login, register dekhao */}
          {/* isPending = checking চলছে কি না
          session = checking শেষে user login করা
          আছে কি না এবং user-এর data */}
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
              {/* session ----user image dekhao. nh thkle aavatar dekhao */}

              <div className="invisible absolute right-0 top-14 w-64 rounded-2xl border border-gray-100 bg-white p-4 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="font-semibold text-gray-900">
                    {session?.user?.name}
                  </h2>
                  {/* truncate ---Email বেশি লম্বা হলে শেষে ... দেখাবে */}
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
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? (
            <X className="h-7 w-7 text-gray-900" />
          ) : (
            <Menu className="h-7 w-7 text-gray-900" />
          )}
          {/* এটি ternary condition। */}
        </button>
      </nav>
      {isOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-3 px-4 py-5">
            {/* .map() প্রতিটি object থেকে একটি mobile link তৈরি করছে। */}
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
