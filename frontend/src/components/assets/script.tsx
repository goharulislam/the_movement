'use client';
import Script from 'next/script';
 
export default function Dashboard() {
  return (
    <Script src='./script.js' strategy='afterInteractive' />
  )
}