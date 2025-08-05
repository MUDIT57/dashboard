"use client"
import { useEffect } from "react";
import axios from "axios";
import {
  setAllEmployees,
  setTotalUsers,
} from "@/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  avatarColors,
  departments,
  ratings,
  getRandomPosition,
} from "@/utils/constants";

export default function useGlobalEmployeeFetch() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.user.employees) || [];

  useEffect(() => {
    if (employees.length > 0) return;
    console.log("wrapper redux");
    axios
      .get(`https://dummyjson.com/users?limit=208`)
      .then((res) => {
        const newRes = res.data.users.map((user, index) => ({
          ...user,
          avatarColor: avatarColors[getRandomPosition()],
          department: departments[getRandomPosition()],
          rating: ratings[getRandomPosition()],
        }));
        dispatch(setAllEmployees(newRes));
        dispatch(setTotalUsers(res.data.total));
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, []);
}
