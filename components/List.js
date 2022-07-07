import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import Task from './Task';
import ActionButton from './ActionButton';
import { deleteList, updateList } from '../utils/features/listSlice';
import { useDispatch } from 'react-redux'
import ListDropdawn from './dropdawns/ListDropdawn';
import axios from 'axios';

export default function List({ title, tasks, listId, index }) {
    const [formOpen, setFormOpen] = useState(false);
    const [inputChange, setInputChange] = useState(null);
    const dispatch = useDispatch();

    async function handleEditTitle(listId, text) {
        let currentList;
        await axios.get('/api/list/getList').then(lists => {
            currentList = lists.data.find(list => list.id == listId);
        });
        if (!text) {
            return setFormOpen(false)
        }
        currentList.title = text;
        dispatch(updateList(currentList))
        return setFormOpen(false)
    }
    function renderForm(title) {
        return (
            <input
                type="text"
                placeholder="Liste başlığı girin..."
                autoFocus
                onBlur={() => handleEditTitle(listId, inputChange)}
                onChange={(e) => setInputChange(e.target.value)}
                className=" w-72 m-2 mt-3 ml-0 p-1 py-0 rounded resize-none outline-none border-2 border-[#0079bf]"
                defaultValue={title}
            />
        )
    }

    return (
        <div className="bg-[#ebecf0] rounded-sm w-72 px-2 pb-2 m-2">
            <div className='relative'>
                <div className='flex items-center justify-between'>
                    {
                        formOpen ? renderForm(title)
                            :
                            <h2
                                onClick={() => setFormOpen(true)}
                                className='cursor-pointer font-semibold m-2 pt-2 text-[#172b4d]'>
                                {title}
                            </h2>
                    }
                    <ListDropdawn listId={listId} />
                </div>

                {tasks.map((task, key) => (
                    <>
                        <Task text={task.text} id={task.id} listId={listId} index={key} key={key} />
                    </>
                ))}


                <ActionButton listId={listId} />
            </div>
        </div >
    )
}
