import React from 'react'
import Header from '../Header/Header'
type Props = {}
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, CalendarDays } from "lucide-react";

const Calendar = (props: Props) => {
    return (
        <section className="h-screen bg-background flex justify-center">
            <div className="w-[2200px] flex flex-col items-center">
                <Header />
                <div className="w-full bg-card px-10 shadow-md rounded-b-sm my-1 flex items-center h-20">
                    
                    {/* Seção esquerda */}
                    <div className="flex items-center w-[40%]">
                        <span className="font-bold text-3xl">Agosto 2025</span>
                        <div className="flex flex-col items-center ml-3">
                            <button className="hover:text-mint-500 hover:font-bold px-3 cursor-pointer">
                                <ChevronUp size={20}/>
                            </button>
                            <button className="hover:text-mint-500 hover:font-bold cursor-pointer">
                                <ChevronDown size={20}/>
                            </button>
                        </div>
                        <button className="ml-3 hover:text-mint-500 hover:font-bold cursor-pointer">
                            <CalendarDays size={28}/>
                        </button>
                        <div className="bg-background h-18 w-1 mx-5"></div>
                    </div>

                    {/* Seção direita */}
                    <div className="flex items-center justify-evenly w-[60%]">
                        <div className="flex-1 flex flex-col items-center">
                            <span className="text-gray-700 font-bold text-2xl">Entradas</span>
                            <span className='font-bold text-mint-500 text-2xl'>1000</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <span className="text-gray-700 font-bold text-2xl">Saídas</span>
                            <span className="text-red-400 font-bold text-2xl">300</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <span className="text-gray-700 font-bold text-2xl">Total</span>
                            <span className="text-gray-800 font-bold text-2xl">700</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Calendar