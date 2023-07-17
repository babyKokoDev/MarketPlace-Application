import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name : 'users',
    initialState : {
        user : null
    },
    reducers : {
        SetUsers : (state, action) => {
            state.user = action.payload
        }
    }
})

export const { SetUsers } = usersSlice.actions