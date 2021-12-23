import Link from 'next/link'
import React from 'react'

const Error404 = () => {
    return (
        <div className="text-center text-white py-10 mt-20">
            <h1 className="text-9xl font-bold">404 Error</h1>
            <p className="mt-6 text-lg">The page you are looking for does not exist.<br/>Please check the URL in the address bar and try again</p>
            <div className="text-center mt-6">
                <Link href='/'>
                    <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block text-lg  rounded-full bg-white px-8 py-3 cursor-pointer text-pink-400 font-medium">Go Home</span>
                </Link>
            </div>
        </div>
    )
}

export default Error404
