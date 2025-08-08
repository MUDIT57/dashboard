"use client";

import { useSession, signOut } from "next-auth/react";
import { Building2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";

export default function Dashboard() {
  const { data: session,status } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    if(status==="unauthenticated")
      router.push("/auth")
  },[status]);

  const user = session?.user;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Employee Directory</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Create User
            </button>

            {user && (
              <div className="text-right">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.role}</p>
              </div>
            )}

            <button
              onClick={() => signOut()}
              className="cursor-pointer px-4 py-2 text-red-600 hover:bg-red-200 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Employee Directory!</h2>
            <p className="text-gray-600">
              You have successfully logged in as {user?.name}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div
                onClick={() => router.push("home")}
                className="cursor-pointer p-4 bg-blue-200 rounded-lg"
              >
                <h3 className="font-semibold text-blue-900">View Employees</h3>
                <p className="text-blue-700 text-sm">Browse all company employees</p>
              </div>
              <div
                onClick={() => router.push("chart")}
                className="cursor-pointer p-4 bg-green-200 rounded-lg"
              >
                <h3 className="font-semibold text-green-900">Analytics</h3>
                <p className="text-green-700 text-sm">View performance metrics</p>
              </div>
              <div
                onClick={() => router.push("bookmark")}
                className="cursor-pointer p-4 bg-purple-200 rounded-lg"
              >
                <h3 className="font-semibold text-purple-900">Bookmarks</h3>
                <p className="text-purple-700 text-sm">Manage saved employees</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
