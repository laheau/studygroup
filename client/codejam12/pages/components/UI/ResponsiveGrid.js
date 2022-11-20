import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  const [courses, setCourses] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      fetch('http://localhost:8000/course/all')
        .then((response) => response.json())
        .then((data) => {
          setCourses(data.data)
          setFetched(true);
        });
    }
  }, [])


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid className="my-10" container spacing={{ xs: 10, md: 3 }} columns={{ xs: 16, sm: 8, md: 12 }} alignItems='center' justifyContent="center" margin="auto">
        {courses.map(course => {
          console.log(course);
          return (
            <Grid item xs={10} sm={4} md={1} key={course.course_id}>
              <Link href={`/course/${course.course_id}`}>
                <div className='mx-10 bg-[#212326] w-fit p-[15px] rounded-lg font-bold text-xl text-white  transition transform hover:scale-125'>{course.course_id}</div>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  );
}