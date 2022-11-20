import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import TextField from "@mui/material/TextField";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    if (!fetched) {
      fetch("http://localhost:8000/course/all")
        .then((response) => response.json())
        .then((data) => {
          setCourses(data.data);
          setFetched(true);
        });
    }
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredCourses(courses.filter(course => course.course_id.toLowerCase().includes(filter.toLowerCase()) || course.name.toLowerCase().includes(filter.toLowerCase())))
    } else setFilteredCourses(courses);
  }, [filter, courses])
  console.log(filteredCourses)

  return (
    <div className="text-center">
      <div className="flex justify-center m-auto rounded-lg p-[20px]">
        <div className="w-[50%] ">
          <TextField fullWidth label="Search for Courses" id="search" onChange={(e)=> setFilter(e.target.value)} 
          />
        </div>
      </div>

      <div className="flex flex-col w-fit m-auto items-center h-screen content-center">
        {filteredCourses.map((course) => {
          console.log(course);
          return (
            <Link href={`/course/${course.course_id}`} key={course.course_id}>
              <div className="flex justify-between space-x-5 w-[500px] bg-[#66b2ff] text-xl my-2 rounded-lg p-[25px] transition transform hover:scale-125">
                <div className="text-left text-white">{course.name}</div>
                <div className="text-right text-white">{course.course_id}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
