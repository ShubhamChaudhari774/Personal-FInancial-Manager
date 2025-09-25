import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UiState = {
  isSidebarOpen: boolean
  modal: null | { title: string; content: string }
}

const initialState: UiState = {
  isSidebarOpen: true,
  modal: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    showModal(state, action: PayloadAction<{ title: string; content: string }>) {
      state.modal = action.payload
    },
    hideModal(state) {
      state.modal = null
    },
  },
})

export const { toggleSidebar, showModal, hideModal } = uiSlice.actions
export default uiSlice.reducer

