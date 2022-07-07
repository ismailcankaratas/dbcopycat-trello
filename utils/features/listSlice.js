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

export const { setList } = listSlice.actions;

export default listSlice.reducer