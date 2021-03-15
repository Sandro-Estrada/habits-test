import axios from "axios";
import moment from "moment";
import { types } from '../types/types';

const apiUrl = "http://localhost:4010/v1";

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString
  };

  export const getAllMedicaments = () => async (dispatch) => {
    try {
      const token = getToken();
      const resp = await axios.get(`${apiUrl}/medicament`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({
        type: types.getMedicaments,
        payload: resp.data.medicaments
      });
    } catch (error) {
      console.log(error,"**************");
      dispatch({
        type: types.getMedicaments,
        payload: []
      });
    }
  };
  
  export const filterByDate = (date) => async (dispatch, getState) => {
    try {
      const medicament = getState().medicaments.originalMedicaments;
      let medicamentsFilter = medicament;
      if (date) {
        medicamentsFilter = medicament.filter(
          (medicament) => moment(medicament.createdAt).format("YYYY-MM-DD") === date
        );
      }
      dispatch({
        type: types.setMedicaments,
        payload: medicamentsFilter,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const setSelectedMedicament = (medicament) => async (dispatch) => {
    try {
      dispatch({
        type: types.setMedicament,
        payload: medicament,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createMedicament = (params) => () => {
    try {
      const token = getToken();
      console.log(token,"-----********-----")
      return axios.post(`${apiUrl}/medicament`, params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  export const updateMedicament = (params) => async (dispatch, getState) => {
    try {
      const token = getToken();
      const medicament = getState().medicaments.medicaments;
      const medicamentSelected = getState().medicaments.medicamentSelected;
      await axios.put(`${apiUrl}/medicament/${medicamentSelected.id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const editArray = medicament.map((item) =>
        item.id === medicamentSelected.id
          ? {
              ...item,
              ...params
            }
          : item
      );
      dispatch({
        type: types.setMedicaments,
        payload: editArray,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteMedicament = (medicament) => async (dispatch) => {
    try {
      const token = getToken();
      await axios.delete(`${apiUrl}/medicament/${+medicament.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({
        type: types.deleteMedicament,
        payload: { data: medicament },
      });
    } catch (error) {
      console.log(error);
    }
  };
  
