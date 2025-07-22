"use client";
import Image from "next/image";
import axios from "axios";
import { Users, Building, Award, Search, Filter, Star, Eye, Save, TrendingUp, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];
  const ratings = [1, 2, 3, 4, 5];
  const avatarColors = [
    "bg-gradient-to-br from-purple-500 to-pink-500",
    "bg-gradient-to-br from-blue-500 to-cyan-500",
    "bg-gradient-to-br from-green-500 to-emerald-500",
    "bg-gradient-to-br from-orange-500 to-red-500",
    "bg-gradient-to-br from-indigo-500 to-purple-500",
    "bg-gradient-to-br from-teal-500 to-blue-500",
  ];

  const getRandomPosition = () => Math.floor(Math.random() * 4) + 1;
  const getDepartment = () => departments[getRandomPosition()];
  const getAvatarColor = () => avatarColors[getRandomPosition()];
  const getRating = () => ratings[getRandomPosition()];

  const renderStars = (rating) => {
    return (
      <div className="flex mt-2 space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
           <Star className={`${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            } transition-colors duration-200`}/>
        ))}
        <span className="text-gray-700">{rating}.0</span>
      </div>
    );
  };

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users?limit=20")
      .then((res) => {
        setEmployees(res.data.users);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, []);

  return (
    <div className="mx-5 my-7 font-serif flex flex-col gap-6">
      <div className="px-2 flex justify-between ">
        <div className="flex gap-3 items-center">
          <div className={`inline-flex p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl`}>
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
      </div>
      <div className="flex justify-center gap-2">
        <div className=" w-[40%] p-2 flex items-center border-2 border-transparent focus-within:border-blue-400 rounded-md transition">
          <Search className="text-gray-600" />
          <input
            className="w-full p-1 outline-none"
            placeholder="Search by name, email, or department..."
          />
        </div>
        <div className="p-2 w-[20%] flex gap-2 items-center border-2 border-transparent hover:border-blue-400 rounded-md transition">
          <Filter className="text-gray-500" />
          <div className="text-gray-700">Filters</div>
        </div>
      </div>
      <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {employees.map((employee) => (
          <div className="flex flex-col items-center">
            <div className={`h-13 w-13 justify-center items-center text-white p-2 rounded-xl inline-flex bg-gradient-to-r ${getAvatarColor()}`}>
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
                {getDepartment()}
              </label>
            </div>
            <div>{renderStars(getRating())}</div>
            <div className="mt-8 flex gap-2">
              <button className=" p-1 px-3 text-blue-600 rounded-xl flex items-center gap-2 bg-blue-50">
                <Eye className="w-4 h-4"/>
                <span className="font-medium text-sm">View</span>
              </button>
              <button className="p-1 px-3 text-amber-600 rounded-xl flex items-center gap-2 bg-amber-50">
                <Bookmark className="w-4 h-4"/>
                <span className="font-medium text-sm">Bookmark</span>
              </button>
              <button className="p-1 px-3 text-green-600 rounded-xl flex items-center gap-2 bg-green-50">
                <TrendingUp className="w-4 h-4"/>
                <span className="font-medium text-sm">Promote</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
