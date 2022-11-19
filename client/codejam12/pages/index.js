import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
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

  useEffect(() => {
    fetch('http://localhost:8000/course/all')
      .then((response) => response.json())
      .then((data) => setCourses(data.data));
  }, [])


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {courses.map(course => {
          console.log(course);
          return (
            <Grid item xs={2} sm={4} md={4} key={course.course_id}>
              <Link href={`/course/${course.course_id}`}>
                <Item>{course.course_id}</Item>
                </Link>
            </Grid>
          )
        } )}
      </Grid>
    </Box>
  );
}