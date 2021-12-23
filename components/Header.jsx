import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../services'


const Header = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then(res => setCategories(res))
    }, [])

    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='border-b w-full inline-block py-8'>
                <div className='md:float-left block'>
                    <Link href='/'>
                        <span className='cursor-pointer font-bold text-4xl text-black'>!just.dev</span>
                    </Link>
                </div>
                <div className='hidden md:float-left md:contents'>
                    {categories.map(category => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className='md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer text-black'>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Header
