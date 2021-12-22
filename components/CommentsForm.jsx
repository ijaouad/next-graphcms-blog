import React, { useEffect, useRef, useState } from 'react'
import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {

    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMSG, setShowSuccessMSG] = useState(false);
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name');
        emailEl.current.value = window.localStorage.getItem('email');
    }, [])

    const handleSubmitComment = () => {
        setError(false);
        const {value: comment} = commentEl.current;
        const {value: name} = nameEl.current;
        const {value: email} = emailEl.current;
        const {checked: storeData} = storeDataEl.current;

        if (!name || !comment || !email) {
            setError(true)
            return;
        }

        const commentObj = { name, email, comment, slug }

        if (storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name', name);
            window.localStorage.removeItem('email', email);
        }

        submitComment(commentObj).then(res => {
            setShowSuccessMSG(true);
            setTimeout(() => {
                setShowSuccessMSG(false)
            }, 3000);
        });
    }

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Drop a comment</h3>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea ref={commentEl} className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400
                 border-2 text-gray-700' placeholder='Comment' name='comment'/>
            </div> 
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                <input ref={nameEl} type="text" className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 border-2 text-gray-700" placeholder="Name" name="name" />
                <input ref={emailEl} type="text" className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 border-2 text-gray-700" placeholder="Email" name="email" />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <div>
                    <input ref={storeDataEl} type="checkbox" name="storeData" id="storeData" value={true} />
                    <label htmlFor="storeData" className='text-gray-500 cursor-pointer ml-2'>Save my Name and Email for the next comment</label>
                </div>
            </div>
            {error && <p className='text-xs text-red-500'>All fileds are required.</p>}
            <div className='mt-8'>
                <button type='button' onClick={handleSubmitComment} className='transition duration-500 ease border-2 border-stone-800 hover:bg-stone-800 hover:text-white inline-block  text-lg rounded-full text-black px-8 py-3 cursor-pointer '>
                    Publish
                </button>
                {showSuccessMSG && <span className='text-lg float-right font-medium mt-3 text-green-500'>Comment submitted for review</span>}
            </div>
        </div>
    )
}

export default CommentsForm
