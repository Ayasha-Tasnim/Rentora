'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">
            Useful Links
          </h2>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/explore-cars" className="hover:text-white">
                Explore Cars
              </Link>
            </li>
            <li>
              <Link href="/add-car" className="hover:text-white">
                Add Car
              </Link>
            </li>
            <li>
              <Link href="/my-bookings" className="hover:text-white">
                My Bookings
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-lg font-semibold mb-4">
            Contact Information
          </h2>

          <div className="space-y-2 text-sm">
            <p> Cumilla, Bangladesh</p>
            <p> +880 1521231818</p>
            <p> support@carrental.com</p>
          </div>
        </div> 

        <div>
          <h2 className="text-white text-lg font-semibold mb-4">
            Social Icons
          </h2>

          <div className="flex gap-5 text-2xl">
            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebook />
            </a>

            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>

            <a href="#" className="hover:text-white transition">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Car Rental Platform. All rights reserved.
      </div>
    </footer>
  );
}
// Next.js-এ component দুই ধরনের 1. Server Component 2. Client Component

// Next.js App Router-এ সাধারণভাবে component প্রথমে Server Component হিসেবে ধরা হয়। আর file-এর একদম উপরে 'use client' লিখলে সেই file একটি Client Component-এর entry point হয়।

// Server Component-এর code মূলত server-এ কাজ করে। Server component-এর ফলাফল প্রস্তুত করে browser-এ পাঠায়।

// যখন component-কে browser-এ interactive কাজ করতে হয়, তখন 'use client' প্রয়োজন হয়।