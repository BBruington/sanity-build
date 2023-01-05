import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/nav'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Medium Blog </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <Nav />
    </div>
  )
}

export default Home
