"use client"
import { useState } from "react";
import { Lock, User, Eye, EyeOff, Building2 } from "lucide-react";
import {useRouter} from "next/navigation";
import { signIn,signOut,useSession } from "next-auth/react";

export default function Auth() {
  const {data:session,status}=useSession();

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

    const res=await signIn("credentials",{
      redirect:true,
      callbackUrl:"/dashboard",
      email,
      password
    });

    // if(res.ok){
    //   router.push("/dashboard");
    // }else{
    //   setError("Invalid credentials");
    // }

    setLoading(false);
    
  };

  if(status==="loading") return <p>Loading...</p>

  // if (session) {
  //   return (
  //     <div className="p-6">
  //       <h1 className="text-xl font-bold">Welcome {session.user.name}</h1>
  //       <p>Role: {session.user.role}</p>
  //       <button
  //         onClick={() => signOut()}
  //         className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
  //       >
  //         Logout
  //       </button>
  //     </div>
  //   );
  // }

  const handleLogout = () => {
    setUser(null);
    setEmail("");
    setPassword("");
    setError("");
  };

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