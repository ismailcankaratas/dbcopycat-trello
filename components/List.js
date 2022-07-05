import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import Task from './Task';
import ActionButton from './ActionButton';
import { deleteList } from '../utils/features/listSlice';
import { useDispatch } from 'react-redux'

export default function List({ title, tasks, listId, index }) {
    const [formOpen, setFormOpen] = useState(false);
    const [inputChange, setInputChange] = useState(null);
    const dispatch = useDispatch();

    return (
        <div className="bg-[#ebecf0] rounded-sm w-72 px-2 pb-2 m-2">
            <div className='relative'>
                <div className='flex items-center justify-between'>
                    {
                        formOpen ? renderForm(listId)
                            :
                            <h2
                                onClick={() => setFormOpen(true)}
                                className='cursor-pointer font-semibold m-2 pt-2 text-[#172b4d]'>
                                {title}
                            </h2>
                    }

                    <Menu as="div">
                        <Menu.Button className='hover:bg-[#00000014] rounded p-2 cursor-pointer'>
                            <BiDotsHorizontalRounded />
                        </Menu.Button>
                        <Menu.Items className="flex left-0 flex-col w-72 absolute py-2 bg-white font-normal">
                            <div className='flex justify-between border-b-2 text-base py-2 mx-2'>
                                <span className='w-full text-center'>
                                    Liste İşlemleri
                                </span>
                            </div>
                            <div className='flex flex-col mt-2'>
                                <Menu.Item>
                                    {({ active }) => (
                                        <span
                                            className={`p-1 cursor-pointer text-[#5e6c84] ${active && ' bg-[#091e4214] text-[#172b4d] '}`}
                                            onClick={() => dispatch(deleteList(listId))}
                                        >
                                            Sil
                                        </span>
                                    )
                                    }
                                </Menu.Item >
                            </div >

                            {/* <Menu.Item disabled>
                            <span className="opacity-75">Bir arkadaşınızı davet edin (çok yakında!)</span>
                        </Menu.Item> */}
                        </Menu.Items >
                    </Menu >
                </div>

                {tasks.map((task, key) => (
                    <Task text={task.text} id={task.id} listId={listId} index={key} key={key} />
                ))}


                <ActionButton listId={listId} />
            </div>
        </div >
    )
}
