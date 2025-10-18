import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    theme: 'light',
    colors: {
        background: 'bg-white',
        card: 'bg-gray-100',
        text: 'text-gray-800 hover:text-gray-800/70',
        accent: 'bg-indigo-500',
        contains: 'bg-gray-200/90',
        title: 'text-gray-500',
        secondTitle: 'text-gray-400',
        container: 'bg-white/70',
        containerBorder: 'border-gray-300',
        containerText: 'text-gray-800',
        selectBg: 'bg-gray-200',
        selectText: 'text-gray-800',
        icon: 'text-blue-500',
        buttonBg: 'bg-blue-500 hover:bg-blue-600',
        buttonText: 'text-white'
    }
}

const defaultLightColors = initialState.colors

const darkColors = {
    background: 'bg-gray-900',
    card: 'bg-gray-700/50',
    text: 'text-gray-100 hover:text-gray-100/70',
    accent: 'bg-yellow-500',
    contains: 'bg-gray-800',
    title: ' text-gray-400',
    secondTitle: 'text-gray-400',
    container: 'bg-gray-800/70',
    containerBorder: 'border-gray-700',
    containerText: 'text-gray-100',
    selectBg: 'bg-gray-700',
    selectText: 'text-gray-100',
    icon: 'text-blue-400',
    buttonBg: 'bg-blue-600 hover:bg-blue-700',
    buttonText: 'text-white'
}

const lightColors = defaultLightColors

export const changeThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        swapTheme: (state, action) => {
            const mode = action.payload
            state.theme = mode
            state.colors = mode === 'dark' ? darkColors : lightColors
        }
    },
})

export const { swapTheme } = changeThemeSlice.actions
export default changeThemeSlice.reducer
