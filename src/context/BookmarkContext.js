"use client";
import { createContext, useContext, useState } from "react";

const BookmarkContext = createContext();

export const useBookmark = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [allEmployees,setAllEmployees]=useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const toggleBookmark = (employee) => {
    setBookmarked((prev) => {
      const exist = prev.find((emp) => emp.id === employee.id);
      if (exist) {
        return prev.filter((emp) => emp.id !== employee.id);
      } else {
        return [...prev, employee];
      }
    });
  };
  return (
    <BookmarkContext.Provider value={{ bookmarked, toggleBookmark,setAllEmployees,allEmployees }}>
      {children}
    </BookmarkContext.Provider>
  );
};
