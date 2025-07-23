"use client";
import { useBookmark } from "@/context/BookmarkContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Star,
  Mail,
  Phone,
  User,
  Briefcase,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

export default function employee() {
  const { id } = useParams();
  const { allEmployees } = useBookmark();
  const [activeTab, setActiveTab] = useState("overview");
  const router=useRouter();
  const [employee,setEmployee]=useState(null);
  useEffect(()=>{
      setEmployee(allEmployees.find((emp)=>emp.id===parseInt(id)));
      console.log(allEmployees);
      console.log(employee);
  },[])


  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            className={`${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            } transition-colors duration-200`}
          />
        ))}
        <span className="text-gray-700">{rating}.0</span>
      </div>
    );
  };

  return (
     employee ?(
        <div className="m-6 font-serif">
      <div className="flex gap-2 items-center">
        <ArrowLeft onClick={()=>router.push("/home")}/>
        <div className="font-bold text-2xl">Employee Details</div>
      </div>
      <div className="mt-8 flex gap-4">
        <div
          className={`${employee.avatarColor} inline-flex p-5 rounded text-white text-4xl `}
        >
          {employee.firstName[0]}
          {employee.lastName[0]}
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div className="font-semibold">
            {employee.firstName} {employee.lastName}
          </div>
          <div className="flex gap-2 flex-row justify-center items-center">
            <div className="inline-flex bg-blue-100 rounded p-1 text-blue-600 text-sm">
              {employee.department}
            </div>
            <div>{renderStars(employee.rating)}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-16">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{employee.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{employee.phone}</p>
          </div>
        </div>
      </div>
      <div className="bg-white border border-blue-100 rounded-lg mt-12">
        <div className="border border-blue-100">
          <div className="flex">
            {[
              { id: "overview", label: "Overview", icon: User },
              { id: "projects", label: "Projects", icon: Briefcase },
              { id: "feedback", label: "Feedback", icon: MessageCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-gray-700">{employee.bio}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Performance History</h3>
                <div className="space-y-3">
                  {[
                    { period: "Q4 2024", score: 4.5, status: "Excellent" },
                    { period: "Q3 2024", score: 4.2, status: "Good" },
                    { period: "Q2 2024", score: 4.8, status: "Excellent" },
                  ].map((perf, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium">{perf.period}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= perf.score
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                          {perf.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Current Projects</h3>
              {[
                {
                  name: "E-commerce Platform",
                  status: "In Progress",
                  progress: 75,
                },
                { name: "Mobile App", status: "Review", progress: 90 },
                { name: "API Integration", status: "Planning", progress: 25 },
              ].map((project, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {project.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {project.progress}% complete
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Recent Feedback</h3>
              {[
                {
                  from: "Team Lead",
                  message: "Great work on the recent project!",
                  rating: 5,
                },
                {
                  from: "Manager",
                  message: "Excellent problem-solving skills.",
                  rating: 4,
                },
                {
                  from: "Client",
                  message: "Very professional and responsive.",
                  rating: 5,
                },
              ].map((feedback, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{feedback.from}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= feedback.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{feedback.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>):
    (<>Employee not Found</>)
  );
}
