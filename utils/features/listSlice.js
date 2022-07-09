import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../helpers';

export const listSlice = createSlice({
    name: 'list',
    initialState: {
        lists: [],
    },
    reducers: {
        setList: (state, action) => {
            state.lists = action.payload;
        },
        dragHappened: (state, action) => {
            const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, type } = action.payload;

            if (type === "list") {
                const list = state.lists.splice(droppableIndexStart, 1);
                state.lists.splice(droppableIndexEnd, 0, ...list)
                localStorage.setItem("localList", JSON.stringify(state.lists))
                return
            }


            if (droppableIdStart === droppableIdEnd) {
                const newList = state.lists.find(list => droppableIdStart == list.id);
                const task = newList.tasks.splice(droppableIndexStart, 1);
                newList.tasks.splice(droppableIndexEnd, 0, ...task);
                const localList = [...state.lists];

                const newLocalList = localList.map(list => {
                    if (list.id == droppableIdStart) {
                        return newList
                    } else {
                        return {
                            ...list
                        }
                    }
                })
                setList(newLocalList);
                localStorage.setItem("localList", JSON.stringify(newLocalList))
            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.lists.find(list => droppableIdStart === list.id);

                const task = listStart.tasks.splice(droppableIndexStart, 1);

                const listEnd = state.lists.find(list => droppableIdEnd === list.id);

                listEnd.tasks.splice(droppableIndexEnd, 0, ...task);

                const localList = [...state.lists];

                const newLocalList = localList.map(list => {
                    if (list.id == droppableIdStart) {
                        return listStart;
                    } else if (list.id == droppableIdEnd) {
                        return listEnd;
                    }
                    else {
                        return {
                            ...list
                        }
                    }
                })

                setList(JSON.stringify(newLocalList));
                localStorage.setItem("localList", JSON.stringify(newLocalList))
            }

        }
    },
})

export const addList = (title) => (dispatch) => {
    axios.post('/api/list/addList', { title }).then((result) => {
        dispatch(getList())
        toast.success(`${result.data.title} adlı liste oluşturuldu`)
    }).catch((err) => {
        toast.error(getError(err))
    });
}

export const getList = (reFetch) => (dispatch) => {
    axios.get('/api/list/getList').then((result) => {
        if (result.data) {
            (result.data.length > 0 || reFetch) && dispatch(setList(result.data));
        }
    }).catch((err) => {
        console.log(err);
    });
}

export const addTask = (listId, taskText) => (dispatch) => {
    axios.post('/api/list/addTask', { listId, taskText }).then((result) => {
        dispatch(getList())
        toast.success(`Kart eklendi`)
    }).catch((err) => {
        toast.error(getError(err))
    });
}

export const deleteList = (listId) => (dispatch) => {
    axios.post('/api/list/deleteList', { listId }).then((result) => {
        dispatch(getList({ reFetch: true }))
        toast.success(result.data);
    }).catch((err) => {
        toast.error(getError(err))
    });
}

export const updateList = (list) => (dispatch) => {
    axios.post('/api/list/updateList', { list }).then((result) => {
        dispatch(getList())
        toast.success(`Liste güncellendi.`);
    }).catch((err) => {
        toast.error(getError(err))
    });
}

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => (dispatch) => {
    dispatch(dragHappened(
        {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    ))
}


export const { setList, dragHappened } = listSlice.actions;

export default listSlice.reducer