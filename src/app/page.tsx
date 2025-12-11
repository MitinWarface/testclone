'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
 const { data: session, status } = useSession({
   required: true,
   onUnauthenticated() {
     // If no session, redirect to login
     router.push('/auth/login');
   }
 });

  useEffect(() => {
    if (status === 'authenticated' && session) {
      // If user is logged in, redirect to the main app
      router.push('/'); // This will go to the root page.tsx which has the Discord clone UI
    }
  }, [session, status, router]);

  // Optionally, you can show a loading state while checking the session
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-white">Redirecting...</div>
    </div>
  );
}
