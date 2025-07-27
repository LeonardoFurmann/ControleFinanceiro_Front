import React from 'react'
import Login from '../../components/Login/Login'


type Props = {}

const Home = (props: Props) => {
  return (
    <section className='h-screen bg-background flex'>
      <Login />
    </section>
  )
}

export default Home