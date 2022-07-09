import React, { useState } from 'react'
import { BsPencil } from 'react-icons/bs';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import TextArea from 'react-textarea-autosize';
import { updateList } from '../utils/features/listSlice';
import { Draggable } from 'react-beautiful-dnd';

export default function Task({ text, id, index, listId }) {
    const [formOpen, setFormOpen] = useState(false);
    const [inputChange, setInputChange] = useState(null);

    const dispatch = useDispatch();


    async function handleEditTask(listId, taskId, text) {
        let currentList;
        let currentTaskText;
        await axios.get('/api/list/getList').then(lists => {
            return currentList = lists.data.find(list => list.id == listId);
        });
        if (!text) {
            return setFormOpen(false)
        }
        const newTasks = currentList.tasks.map(task => {
            if (task.id == id) {
                return {
                    ...task,
                    text: text
                }
            } else {
                return task
            }
        })
        currentList.tasks = newTasks;

        dispatch(updateList(currentList))
        return setFormOpen(false)
    }

    function renderForm() {
        return (
            <TextArea
                placeholder={"Bu kart için başlık girin..."}
                autoFocus
                onBlur={() => handleEditTask(listId, id, inputChange)}
                onChange={(e) => setInputChange(e.target.value)}
                className="min-h-[5rem] w-full p-2 rounded resize-none outline-none border-none"
                defaultValue={text}
            />
        )
    }

    return (
        <Draggable draggableId={`${id}`} index={index}>
            {provided => (
                <div
                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    className="flex task items-center justify-between w-sm bg-white rounded overflow-hidden shadow-lg p-2 my-2">
                    <div className="text-sm">
                        {
                            (formOpen) ? renderForm(id) : text
                        }
                    </div>
                    <div
                        onClick={() => setFormOpen(true)}
                        className='hover:bg-[#00000014] cursor-pointer rounded p-2 taskEdit transition duration-150 ease-in-out'>
                        <BsPencil className='w-3 h-3' />
                    </div>
                </div>
            )}
        </Draggable>
    )
}
