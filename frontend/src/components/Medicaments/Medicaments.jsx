import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllMedicaments,
  filterByDate,
  setSelectedMedicament,
} from "../../redux/actions/medicamentActions";
import { openSidebar } from "../../redux/actions/generalActions";
import {
  PlusCircle,
} from "react-bootstrap-icons";
import Moment from "react-moment";
import useModal from "../../hooks/useModal";
import CRUDModal from "../CRUDModal";
import Sidebar from "../Sidebar/Sidebar";

const Medicaments = ({socket}) => {

  const dispatch = useDispatch();
  const allMedicaments = useSelector((store) => store.medicaments.medicaments);
  const medicamentSelected = useSelector((store) => store.medicaments.medicamentSelected);
  const [filterDate, setFilterDate] = useState("");
  const [socketData, setSocketData] = useState(socket);
  const [isOpenModal, openModal, closeModal] = useModal();
  useEffect(() => {
    dispatch(getAllMedicaments());
  }, [dispatch]);

  useEffect(() => {
    if (socket.event === 'delete' || socket.event === 'create') {
      setSocketData(socket)
      console.log(socket,"**********************socket")
    }
  }, [socket]);

  const renderMedicaments = (medicament) => {
    return (
      <tr
        className='pointer'
        key={medicament.id}
        onClick={() => setMedicamentAndOpenSidebar(medicament)}
      >
        <td>{medicament.name}</td>
        <td>{medicament.type}</td>
        <td>{medicament.quantity}</td>
        <td>{medicament.price}</td>
        <td>{medicament.location}</td>
        <td>
          <Moment format='DD/MMM/YYYY'>{medicament.createdAt}</Moment>
        </td>
      </tr>
    );
  };

  const setMedicamentAndOpenSidebar = (medicament) => {
    dispatch(setSelectedMedicament(medicament));
    dispatch(openSidebar());
  };

  const medicamentDeleted = socketData.event === 'delete'
console.log(socket.event,"------------socket.event", socket)
  return (
    <div className='todos'>
      {
        socketData.event === 'delete' || socketData.event === 'create' ?
          <div className={ medicamentDeleted ? "alert alert-danger" : "alert alert-success" }
            role="alert">
            { medicamentDeleted ? 'Medicamento eliminado' : 'Medicamento agregado' }
            <button type="button" className="close" onClick={() => setSocketData({...socketData, event: 'close'})}>
              <span>&times;</span>
            </button>
          </div>
          : null
      }
      <h1 className='mb-2'>Mis medicamentos</h1>
      <div className='table-responsive todos__table'>
        <div className='row justify-content-between mb-3 align-items-center'>
          <div className='col-md-4 col-sm-12 col-xl-4'>
            <h4>Medicamentos</h4>
          </div>
          <div className='col-md-8 col-sm-12 col-xl-8 text-right'>
            <div className='actions'>
              <input
                type='date'
                className='mr-4'
                value={filterDate}
                onChange={(e) => {
                  dispatch(filterByDate(e.target.value));
                  setFilterDate(e.target.value);
                }}
              />
              <span className='separation'></span>
              <button className='main-btn ml-4' onClick={openModal}>
                <PlusCircle /> Agregar medicamento
              </button>
            </div>
          </div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Nombre</th>
              <th scope='col'>Tipo</th>
              <th scope='col'>Cantidad</th>
              <th scope='col'>Precio</th>
              <th scope='col'>Ubicación</th>
              <th scope='col'>Fecha de registro</th>
            </tr>
          </thead>
          <tbody>{allMedicaments.map(renderMedicaments)}</tbody>
        </table>
      </div>
      <CRUDModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        filterDate={filterDate}
        modalTitle='Nuevo medicamento'
        isEdit={false}
        setFilterDate={setFilterDate}
      />
      {medicamentSelected ? <Sidebar medicamentObject={medicamentSelected} /> : null}
      
    </div>
  );
};

export default Medicaments;
