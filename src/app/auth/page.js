"use client"
import { useState } from "react";
import { Lock, User, Eye, EyeOff, Building2 } from "lucide-react";
import {useRouter} from "next/navigation";

export default function Auth() {
  const router=useRouter();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Employee" });
  const [users, setUsers] = useState([]);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === "admin@company.com" && password === "admin123") {
      setUser({ name: "John Admin", email, role: "Administrator" });
    } else {
      setError("Invalid credentials");
    }
    setLoading(false);
  };

  const createUser = () => {
    if (!newUser.name || !newUser.email || !newUser.email.includes("@")) {
      setError("Please fill all fields with valid data");
      return;
    }
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ name: "", email: "", role: "Employee" });
    setShowModal(false);
    setError("");
  };

  const handleLogout = () => {
    setUser(null);
    setEmail("");
    setPassword("");
    setError("");
  };

  // Login Screen
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">CompanyHub</h1>
            </div>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Email: <span className="font-mono">admin@company.com</span></p>
                <p>Password: <span className="font-mono">admin123</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


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
            <div className="text-right">
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.role}</p>
            </div>
            <button
              onClick={handleLogout}
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
            <p className="text-gray-600">You have successfully logged in as {user.name}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div onClick={()=>router.push("home")} className="cursor-pointer p-4 bg-blue-200 rounded-lg">
                <h3 className=" font-semibold text-blue-900">View Employees</h3>
                <p className="text-blue-700 text-sm">Browse all company employees</p>
              </div>
              <div onClick={()=>router.push("chart")} className="cursor-pointer p-4 bg-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900">Analytics</h3>
                <p className="text-green-700 text-sm">View performance metrics</p>
              </div>
              <div onClick={()=>router.push("bookmark")} className="cursor-pointer p-4 bg-purple-200 rounded-lg">
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