import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isExpanded: true,
  isMobileOpen: false,
  isHovered: false,
  activeItem: null,
  openSubmenu: null,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded != state.isExpanded;
    },
    toggleMobileSidebar: (state) => {
      state.isMobileOpen = !state.isMobileOpen;
    },
    setHovered: (state, action) => {
      state.isHovered = action.payload;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
    toggleSubmenu: (state, action) => {
      state.openSubmenu =
        state.openSubmenu === action.payload ? null : action.payload;
    },
  },
});

export const {
  toggleSidebar,
  toggleMobileSidebar,
  setHovered,
  setActiveItem,
  toggleSubmenu,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
