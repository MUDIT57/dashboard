"use client";
import axios from "axios";
import {
  Users,
  Building,
  Award,
  Search,
  Filter,
  Star,
  Eye,
  TrendingUp,
  Bookmark,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookmark } from "@/context/BookmarkContext";
import { departments,ratings,avatarColors,getRandomPosition } from "@/utils/constants";
import { setUsers } from "../redux/actions/userActions";
import { useDispatch,useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { toggleBookmark, setAllEmployees, bookmarked } = useBookmark();
  const [records, setRecords] = useState([]);
  const [notification, setNotification] = useState(null);

  const dispatch=useDispatch();
  const employees=useSelector((state)=>state.user.employees)||[];

  useEffect(()=>{
    setAllEmployees(employees);
    setRecords(employees);
  },[employees]);

  const handlePromote = (employee) => {
    setNotification(
      `${employee.firstName} ${employee.lastName} has been promoted!`
    );
    setTimeout(() => setNotification(null), 3000);
  };

  const isBookmarkedEmployee = (id) => {
    if (!bookmarked) return false;
    if (bookmarked.find((emp) => emp.id === id)) return true;
    else return false;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex mt-2 space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
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

  useEffect(() => {
    if(employees.length>0) return ;
    axios
      .get("https://dummyjson.com/users?limit=20")
      .then((res) => {
        const newRes = res.data.users.map((user, index) => ({
          ...user,
          avatarColor: avatarColors[getRandomPosition()],
          department: departments[getRandomPosition()],
          rating: ratings[getRandomPosition()],
        }));
        dispatch(setUsers(newRes));

      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
      console.log("fetched");
  }, []);

  return (
    <div className="mx-5 my-7 font-serif flex flex-col gap-6">
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade">
          {notification}
        </div>
      )}

      <div className="px-2 flex justify-between ">
        <div className="flex gap-3 items-center">
          <div
            className={`inline-flex p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl`}
          >
            <Users className="text-white w-8 h-8" />
          </div>
          <div>
            <div className="font-bold text-4xl">
              Employee
              <br /> Directory
            </div>
            <div className="text-gray-700">Manage your team with style</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <Building className="text-blue-600 w-6 h-6" />
            <div className="text-gray-700 text-2xl">
              10 <br />
              Employees
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="text-green-600 w-6 h-6" />
            <div className="text-gray-700 text-2xl">
              6 <br />
              Departments
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("bookmark")}
            className="self-start p-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
          >
            Bookmarks
          </button>
          <button
            onClick={() => router.push("chart")}
            className="self-start p-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
          >
            Analytics
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <div className="w-[40%] p-2 flex items-center border-2 border-transparent focus-within:border-blue-400 rounded-md transition">
          <Search className="text-gray-600" />
          <input
            className="w-full p-1 outline-none"
            placeholder="Search by name, email, or department..."
          />
        </div>

        <div className="p-2 w-40 flex gap-2 items-center border-2 border-transparent hover:border-blue-400 rounded-md transition cursor-pointer">
          <Filter className="text-gray-500" />
          <div className="text-gray-700">Department</div>
          <ChevronDown className="text-gray-500 w-4 h-4" />
        </div>

        <div className="p-2 w-40 flex gap-2 items-center border-2 border-transparent hover:border-blue-400 rounded-md transition cursor-pointer">
          <Star className="text-gray-500 w-4 h-4" />
          <div className="text-gray-700">Rating</div>
          <ChevronDown className="text-gray-500 w-4 h-4" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {records.map((employee) => (
          <div key={employee.id} className="flex flex-col items-center">
            <div
              className={`h-13 w-13 justify-center items-center text-white p-2 rounded-xl inline-flex bg-gradient-to-r ${employee.avatarColor}`}
            >
              {employee.firstName[0]} {employee.lastName[0]}
            </div>
            <div className="font-bold mt-4">
              {employee.firstName} {employee.lastName}
            </div>
            <div className="text-sm text-gray-600">{employee.email}</div>
            <div className="mt-2 flex gap-3 items-center">
              <label className="text-sm text-gray-500">
                Age {employee.age}
              </label>
              <label className="p-1 rounded-2xl text-sm text-blue-700 bg-blue-100 font-semibold">
                {employee.department}
              </label>
            </div>
            <div>{renderStars(employee.rating)}</div>
            <div className="mt-8 flex gap-2">
              <button
                onClick={() => router.push(`/employee/${employee.id}`)}
                className="p-1 px-3 text-blue-600 rounded-xl flex items-center gap-2 bg-blue-50"
              >
                <Eye className="w-4 h-4" />
                <span className="font-medium text-sm">View</span>
              </button>
              <button
                onClick={() => toggleBookmark(employee)}
                className="p-1 px-3 text-amber-600 rounded-xl flex items-center gap-2 bg-amber-50"
              >
                <Bookmark
                  className={`${
                    isBookmarkedEmployee(employee.id) ? "fill-red-500" : ""
                  } w-4 h-4`}
                />
                <span className="font-medium text-sm">Bookmark</span>
              </button>
              <button
                onClick={() => handlePromote(employee)}
                className="p-1 px-3 text-green-600 rounded-xl flex items-center gap-2 bg-green-50"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium text-sm">Promote</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}