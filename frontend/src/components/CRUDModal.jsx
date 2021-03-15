import React, { useState, useEffect } from "react";
import Modal from "./Modal/Modal";
import { createMedicament, updateMedicament, getAllMedicaments } from "../redux/actions/medicamentActions";
import { useDispatch } from "react-redux";
import { closeSidebar } from "../redux/actions/generalActions";

const CRUDModal = ({
  isOpenModal,
  closeModal,
  filterDate,
  modalTitle,
  isEdit,
  medicamentSelected,
  setFilterDate
}) => {
  const dispatch = useDispatch();
  const [medicament, setMedicament] = useState({
    name: '',
    type: '',
    quantity: 0,
    price: 0,
    location: ''
  });

  useEffect(() => {
    if (isEdit) {
      setMedicament(medicamentSelected);
    }
  }, [medicamentSelected, isEdit]);
  const closeAndCleanModal = () => {
    closeModal();

    if (isEdit) {
      dispatch(closeSidebar());
    } else {
      setMedicament({
        name: '',
        type: '',
        quantity: 0,
        price: 0,
        location: ''
      });
    }
  };
  const evaluateFields = () => {
    let empty = false
    Object.keys(medicament).forEach(key => {
      if (!medicament[key]) {
        empty = true
        return;
      }
    })
    return empty
  }
  const createEdit = async (e) => {
    e.preventDefault();
    try {
      const params = {
        ...medicament,
        quantity: +medicament.quantity,
        price: +medicament.price
        
      };
      if (evaluateFields()) {
        return;
      }
      if (isEdit) {
        dispatch(updateMedicament(params));
        closeAndCleanModal();
      } else {
        await dispatch(createMedicament(params, filterDate))
        dispatch(getAllMedicaments())
         
        closeAndCleanModal();
      }
      setFilterDate('')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal title={modalTitle} isOpen={isOpenModal} closeModal={closeModal}>
        <form
          onSubmit={createEdit}
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <label htmlFor='input_title'>Nombre</label>
          <input
            type='text'
            id='input_title'
            name='input_title'
            value={medicament.name}
            onChange={(e) => setMedicament({
              ...medicament,
              name: e.target.value
            })}
          />
          <p className='text-error'>{!medicament.name ? 'Requerido' : '' }</p>

          <label htmlFor='input_title'>Tipo</label>
          <input
            type='text'
            id='input_title'
            name='input_title'
            value={medicament.type}
            onChange={(e) => setMedicament({
              ...medicament,
              type: e.target.value
            })}
          />
          <p className='text-error'>{!medicament.type ? 'Requerido' : '' }</p>

          <label htmlFor='input_title'>Cantidad</label>
          <input
            type='number'
            id='input_title'
            name='input_title'
            value={medicament.quantity}
            onChange={(e) => setMedicament({
              ...medicament,
              quantity: e.target.value
            })}
          />
          <p className='text-error'>{!medicament.quantity ? 'Requerido' : '' }</p>

          <label htmlFor='input_title'>Precio</label>
          <input
            type='number'
            id='input_title'
            name='input_title'
            value={medicament.price}
            onChange={(e) => setMedicament({
              ...medicament,
              price: e.target.value
            })}
          />
          <p className='text-error'>{!medicament.price ? 'Requerido' : '' }</p>

          <label htmlFor='input_title'>Ubicación</label>
          <input
            type='text'
            id='input_title'
            name='input_title'
            value={medicament.location}
            onChange={(e) => setMedicament({
              ...medicament,
              location: e.target.value
            })}
          />
          <p className='text-error'>{!medicament.location ? 'Requerido' : '' }</p>

          <div className=' buttons d-flex mt-3 justify-content-end'>
            <button
              className='cancel-btn mr-4'
              onClick={() => closeAndCleanModal()}
              type='button'
            >
              Cancelar
            </button>
            <button type='submit' className='save-btn'>
              {isEdit ? "Editar" : "Guardar"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CRUDModal;
