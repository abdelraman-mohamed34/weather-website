import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    stateComponent: false
}

export const showSidebarSlice = createSlice({
    name: 'navBar',
    initialState,
    reducers: {
        show: (state) => {
            state.stateComponent = true
        },
        hide: (state) => {
            state.stateComponent = false
        }
    },
})

export const { show, hide } = showSidebarSlice.actions

export default showSidebarSlice.reducer