import React from 'react'
import Header from '../Header/Header'


type Props = {}

const Dashboard = (props: Props) => {
    return (
        <section className="h-screen bg-background flex justify-center">
            <div className="w-[1800px] flex flex-col items-center">
                <Header />
            </div>
        </section>
    )
}

export default Dashboard