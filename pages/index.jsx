import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TestModals from '../components/TestModals';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Modal In Next.JS</title>
      </Head>
      
      <TestModals />

    </div>
  );
}
