"use client";
import { Bookmark,BookmarkX,Star,Eye,TrendingUp, FolderPlus } from "lucide-react";
import { useBookmark } from "@/context/BookmarkContext";

export default function bookmark() {
  const { toggleBookmark, bookmarked } = useBookmark();
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
  return (
    <div className="mx-5 my-7 font-serif flex flex-col gap-6">
      <div className="px-2 flex justify-between ">
        <div className="flex gap-3 items-center">
          <div
            className={`inline-flex p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl`}
          >
            <Bookmark className="text-white w-8 h-8" />
          </div>
          <div>
            <div className="font-bold text-3xl">Bookmark Manager</div>
            <div className="text-gray-700">
              Manage your bookmarked employees
            </div>
          </div>
        </div>
        <div className="text-gray-700 text-2xl">6 Bookmarked Employees</div>
      </div>
      <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {bookmarked.map((employee) => (
          <div className="flex flex-col items-center">
            <div className={`h-13 w-13 justify-center items-center text-white p-2 rounded-xl inline-flex bg-gradient-to-r ${employee.avatarColor}`}>
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
              <button onClick={()=>router.push("/bookmark")} className=" p-1 px-3 text-blue-600 rounded-xl flex items-center gap-2 bg-blue-50">
                <Eye className="w-4 h-4"/>
                <span className="font-medium text-sm">View</span>
              </button>
              <button onClick={()=>toggleBookmark(employee)} className="p-1 px-3 text-red-600 rounded-xl flex items-center gap-2 bg-red-50">
                <BookmarkX className="w-4 h-4"/>
                <span className="font-medium text-sm">Remove</span>
              </button>
              <button className="p-1 px-3 text-green-600 rounded-xl flex items-center gap-2 bg-green-50">
                <TrendingUp className="w-4 h-4"/>
                <span className="font-medium text-sm">Promote</span>
              </button>
              <button className="p-1 px-3 text-purple-600 rounded-xl flex items-center gap-2 bg-purple-50">
                <FolderPlus className="w-4 h-4"/>
                <span className="font-medium text-sm">Assign to Project</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
