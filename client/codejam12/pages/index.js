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

import ResponsiveGrid from './components/UI/ResponsiveGrid';
import ResponsiveAppBar from './components/UI/ResponsiveAppBar';
import Navbar from './components/UI/Navbar';

export default function Home() {
  return (
    <div>
      {/* <ResponsiveAppBar /> */}
      <ResponsiveGrid />
    </div>
  )
}