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
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookmark } from "@/context/BookmarkContext";

export default function Home() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];
  const ratings = [1, 2, 3, 4, 5];
  const { toggleBookmark, setAllEmployees, bookmarked } = useBookmark();
  const [records, setRecords] = useState([]);
  const avatarColors = [
    "bg-gradient-to-br from-purple-500 to-pink-500",
    "bg-gradient-to-br from-blue-500 to-cyan-500",
    "bg-gradient-to-br from-green-500 to-emerald-500",
    "bg-gradient-to-br from-orange-500 to-red-500",
    "bg-gradient-to-br from-teal-500 to-blue-500",
  ];
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showDepartmentFilter, setShowDepartmentFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleBookmark = (employee) => toggleBookmark(employee);
  const getRandomPosition = () => Math.floor(Math.random() * 4) + 1;

  const handleSearch = (term) => {
    const lowerTerm = term.toLowerCase();

    const filtered = employees.filter((emp) => {
      const matchesText =
        emp.firstName.toLowerCase().includes(lowerTerm) ||
        emp.lastName.toLowerCase().includes(lowerTerm) ||
        emp.email.toLowerCase().includes(lowerTerm) ||
        emp.department.toLowerCase().includes(lowerTerm);

      const matchesDept =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(emp.department);

      const matchesRating =
        selectedRatings.length === 0 || selectedRatings.includes(emp.rating);

      return matchesText && matchesDept && matchesRating;
    });

    setRecords(filtered);
  };

  const toggleDepartment = (dept) => {
    const newSelection = selectedDepartments.includes(dept)
      ? selectedDepartments.filter((d) => d !== dept)
      : [...selectedDepartments, dept];
    setSelectedDepartments(newSelection);
  };

  const toggleRating = (rating) => {
    const newSelection = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(newSelection);
  };

  const handlePromote = (employee) => {
    setNotification(
      `${employee.firstName} ${employee.lastName} has been promoted!`
    );
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    handleSearch("");
  }, [selectedDepartments, selectedRatings]);

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
    axios
      .get("https://dummyjson.com/users?limit=20")
      .then((res) => {
        const newRes = res.data.users.map((user, index) => ({
          ...user,
          avatarColor: avatarColors[getRandomPosition()],
          department: departments[getRandomPosition()],
          rating: ratings[getRandomPosition()],
        }));
        setEmployees(newRes);
        setAllEmployees(newRes);
        setRecords(newRes);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
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
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name, email, or department..."
          />
        </div>

        <div className="relative">
          <div
            className="p-2 w-40 flex gap-2 items-center border-2 border-transparent hover:border-blue-400 rounded-md transition cursor-pointer"
            onClick={() => setShowDepartmentFilter(!showDepartmentFilter)}
          >
            <Filter className="text-gray-500" />
            <div className="text-gray-700">Department</div>
            <ChevronDown className="text-gray-500 w-4 h-4" />
          </div>

          {showDepartmentFilter && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-48">
              {departments.map((dept) => (
                <div
                  key={dept}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => toggleDepartment(dept)}
                >
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dept)}
                    onChange={() => {}}
                    className="w-4 h-4"
                  />
                  <span>{dept}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className="p-2 w-40 flex gap-2 items-center border-2 border-transparent hover:border-blue-400 rounded-md transition cursor-pointer"
            onClick={() => setShowRatingFilter(!showRatingFilter)}
          >
            <Star className="text-gray-500 w-4 h-4" />
            <div className="text-gray-700">Rating</div>
            <ChevronDown className="text-gray-500 w-4 h-4" />
          </div>

          {showRatingFilter && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-48">
              {ratings.map((rating) => (
                <div
                  key={rating}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => toggleRating(rating)}
                >
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => {}}
                    className="w-4 h-4"
                  />
                  <span>{rating} Stars</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(selectedDepartments.length > 0 || selectedRatings.length > 0) && (
        <div className="flex flex-wrap gap-2 px-2">
          {selectedDepartments.map((dept) => (
            <span
              key={dept}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {dept}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => toggleDepartment(dept)}
              />
            </span>
          ))}
          {selectedRatings.map((rating) => (
            <span
              key={rating}
              className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {rating} Stars
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => toggleRating(rating)}
              />
            </span>
          ))}
        </div>
      )}

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
