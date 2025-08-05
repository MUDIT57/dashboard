"use client";
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
import useDebounce from "@/hooks/useDebounce";
import {
  departments,
  ratings,
} from "@/utils/constants";
import {setCurrentPage } from "@/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import employee from "../employee/[id]/page";

export default function Home() {
  const router = useRouter();
  const { toggleBookmark, bookmarked } = useBookmark();
  const [filtered, setfiltered] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showDepartmentFilter, setShowDepartmentFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 20;

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.user.currentPage);
  const maxLimit = useSelector((state) => state.user.total);
  const employees = useSelector((state) => state.user.employees) || [];
  const debounceTerm = useDebounce(searchTerm, 1000);


  useEffect(() => {
    setfiltered(employees);
  }, [employees]);

  const handleNext = () => {
    if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrev = () => {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  };

  useEffect(() => {
    if (employees.length === 0) return;
    handleSearch(debounceTerm);
  }, [debounceTerm]);

  const toggleDepartment = (dep) => {
    const isPresent = selectedDepartments.includes(dep);
    if (isPresent) {
      setSelectedDepartments((prev) =>
        prev.filter((department) => department !== dep)
      );
    } else {
      setSelectedDepartments([...selectedDepartments, dep]);
    }
  };

  const toggleRating = (rate) => {
    const isPresent = selectedRatings.includes(rate);
    if (isPresent) {
      setSelectedRatings((prev) => prev.filter((rating) => rating !== rate));
    } else {
      setSelectedRatings([...selectedRatings, rate]);
    }
  };

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

  const handleSearch = (term) => {
    const lowerTerm = term.toLowerCase();
    const result = employees.filter((employee) => {
      const srch =
        employee.firstName.toLowerCase().includes(lowerTerm) ||
        employee.lastName.toLowerCase().includes(lowerTerm) ||
        employee.email.toLowerCase().includes(lowerTerm) ||
        employee.department.toLowerCase().includes(lowerTerm);

      return srch;
    });
    setfiltered(result);
  };

  const handleFilter = () => {
    const result = employees.filter((employee) => {
      const isDeptPresent =
        selectedDepartments.length == 0 ||
        selectedDepartments.includes(employee.department);
      const isRatingPresent =
        selectedRatings.length == 0 ||
        selectedRatings.includes(employee.rating);
      return isDeptPresent && isRatingPresent;
    });
    setfiltered(result);
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
    handleFilter();
  }, [selectedDepartments, selectedRatings]);

  const paginatedEmployees=filtered.slice((currentPage-1)*pageSize,currentPage*pageSize); 
    const totalPages = Math.ceil(filtered.length / pageSize);

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
              {maxLimit} <br />
              Employees
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="text-green-600 w-6 h-6" />
            <div className="text-gray-700 text-2xl">
              {departments.length} <br />
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative">
          <div
            onClick={() => setShowDepartmentFilter((prev) => !prev)}
            className="p-2 w-40 flex gap-2 items-center border-2 border-transparent hover:border-blue-400 rounded-md transition cursor-pointer"
          >
            <Filter className="text-gray-500" />
            <div className="text-gray-700">Department</div>
            <ChevronDown className="text-gray-500 w-4 h-4" />
          </div>

          {showDepartmentFilter && (
            <div className="top-12 justify-between absolute flex flex-col bg-white">
              {departments.map((department) => {
                return (
                  <div className="px-3 flex flex-row gap-3">
                    <input
                      onClick={() => toggleDepartment(department)}
                      checked={selectedDepartments.includes(department)}
                      type="checkbox"
                    />
                    <label>{department}</label>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative">
          <div
            onClick={() => setShowRatingFilter((prev) => !prev)}
            className="p-2 w-40 flex gap-2 items-center border-2 border-transparent hover:border-blue-400 rounded-md transition cursor-pointer"
          >
            <Star className="text-gray-500 w-4 h-4" />
            <div className="text-gray-700">Rating</div>
            <ChevronDown className="text-gray-500 w-4 h-4" />
          </div>
          {showRatingFilter && (
            <div className="top-12 justify-between absolute flex flex-col bg-white">
              {ratings.map((rating) => {
                return (
                  <div className="px-3 flex flex-row gap-3">
                    <input
                      onClick={() => toggleRating(rating)}
                      checked={selectedRatings.includes(rating)}
                      type="checkbox"
                    />
                    <label>{rating}</label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paginatedEmployees.map((employee) => (
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
      <div className="flex gap-4 justify-center">
        <button
          className="bg-gray-200 px-2 rounded font-semibold disabled:opacity-50"
          onClick={() => handlePrev()}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <label>
          {currentPage} of {totalPages}
        </label>
        <button
          className="bg-gray-200 px-2 rounded font-semibold disabled:opacity-50"
          onClick={() => handleNext()}
          disabled={totalPages === currentPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
