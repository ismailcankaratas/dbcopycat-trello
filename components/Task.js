import React, { useState } from 'react'
import { BsPencil } from 'react-icons/bs';

export default function Task({ text, id, index, listId }) {
    const [formOpen, setFormOpen] = useState(false);
    const [inputChange, setInputChange] = useState(null);
    return (
        <div >
            <div className="flex task items-center justify-between w-sm bg-white rounded overflow-hidden shadow-lg p-2 my-2">
                <div className="text-sm">
                    {
                        (formOpen) ? renderForm(listId, id) : text
                    }
                </div>
                <div
                    onClick={() => setFormOpen(true)}
                    className='hover:bg-[#00000014] cursor-pointer rounded p-2 taskEdit opacity-0 transition duration-150 ease-in-out'>
                    <BsPencil className='w-3 h-3' />
                </div>
            </div>
        </div>)
}
