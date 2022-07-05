import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import Task from './Task';
import ActionButton from './ActionButton';

export default function List({ title, tasks, listId, index }) {
    const [formOpen, setFormOpen] = useState(false);
    const [inputChange, setInputChange] = useState(null);
    return (
        <div className="relative bg-[#ebecf0] z-[-50] rounded-sm w-72 px-2 pb-2 m-2">
            <div >
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
                        <Menu.Button className='hover:bg-[#00000014] rounded p-2'>
                            <BiDotsHorizontalRounded />
                        </Menu.Button>
                        <Menu.Items className="flex flex-col w-72 left-0 absolute py-2 bg-white font-normal">
                            <div className='flex justify-between border-b-2 text-base py-2 mx-2'>
                                <span className='w-full text-center'>
                                    Liste İşlemleri
                                </span>
                                <Menu.Button className='hover:bg-[#00000014] rounded'>
                                    <AiOutlineClose className='cursor-pointer' />
                                </Menu.Button>
                            </div>
                            <div className='flex flex-col mt-2'>
                                <Menu.Item>
                                    {({ active }) => (
                                        <span
                                            className={`p-1 text-[#5e6c84] ${active && ' bg-[#091e4214] text-[#172b4d] '}`}
                                            onClick={() => listDelete(listId)}
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
        </div>
    )
}
