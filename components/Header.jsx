import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getCategories } from '../services';




const Header = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then(res => setCategories(res))
    }, [])

    return (
        <nav className="container mx-auto relative flex flex-wrap items-center justify-between px-10 mb-8">
            <div className="flex flex-wrap items-center justify-between border-b w-full py-8">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <Link href='/'>
                        <span className='cursor-pointer font-bold text-4xl text-white'>!just.dev</span>
                    </Link>
                    <button
                    className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"
                    onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                    <Image src="/burger.svg" alt="burger" width={30} height={30} />
                    </button>
                </div>
                <div
                    className={
                    "lg:flex flex-grow items-center" +
                    (navbarOpen ? " flex" : " hidden")
                    }
                    id="example-navbar-danger"
                >
                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                        
                        {categories.map(category => (
                            <li key={category.slug}  className="nav-item">
                                <Link className="" href={`/category/${category.slug}`}>
                                    <span className="md:float-left mt-2 align-middle ml-4 font-semibold cursor-pointer text-white">{category.name}</span>
                                </Link>
                            </li>
                        ))}
                        
                    </ul>
                </div>
            </div>
        </nav>
)}

export default Header 
