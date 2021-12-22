import Image from 'next/image'
import React from 'react'

const Author = ({ author }) => {
    return (
        <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-white'>
            <div className='absolute left-0 right-2 -top-14'>
                <Image 
                    alt={author.name}
                    unoptimized
                    height={100}
                    width={100}
                    src={author.photo.url}
                    className='align-middle rounded-full object-cover'
                />
            </div>
            <h3 className='text-stone-800 my-4 text-xl font-bold'>
                {author.name}
            </h3>
            <p className='text-stone-800 text-lg'>{author.bio}</p>
        </div>
    )
}

export default Author
