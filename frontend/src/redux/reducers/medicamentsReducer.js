import {types} from '../types/types';

const initialState = {
    medicaments: [],
    medicamentSelected: {},
    originalMedicaments: [],
};
export const medicamentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getMedicaments:
          return {
            ...state,
            medicaments: action.payload,
            originalMedicaments: action.payload,
          };
        case types.setMedicament:
          return {
            ...state,
            medicamentSelected: action.payload,
          };
        case types.setMedicaments:
          return {
            ...state,
            medicaments: action.payload,
          };
        case types.deleteMedicament:
          const initialArray = state.medicaments;
          const origArray = state.originalMedicaments;
          const newInitialMedicaments = initialArray.filter(
            (medicament) => action.payload.data.id !== medicament.id
          );
          const newOrigMedicaments = origArray.filter(
            (medicament) => action.payload.data.id !== medicament.id
          );
          return {
            ...state,
            medicaments: newInitialMedicaments,
            originalMedicaments: newOrigMedicaments,
          };
        default:
          return state;
      }
};
