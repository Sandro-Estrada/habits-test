import {types} from '../types/types';

export const openSidebar = () => (dispatch) => {
    try {
        dispatch({
          type: types.openSidebar,
        });
      } catch (error) {
        console.log(error);
      }
};

export const closeSidebar = () => (dispatch) => {
    try {
        dispatch({
            type: types.closeSidebar,
        });
      } catch (error) {
        console.log(error);
      }
};
