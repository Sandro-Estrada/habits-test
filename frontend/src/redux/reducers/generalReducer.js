import {types} from '../types/types';

const initialState = {
    sidebarOpen: false,
};
export const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.openSidebar:
      return {
        ...state,
        sidebarOpen: true,
      };
    case types.closeSidebar:
      return {
        state
      };

    default:
      return state;
  }
};
