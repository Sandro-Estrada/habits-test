import { X, Trash, Pencil } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { closeSidebar } from "../../redux/actions/generalActions";
import { deleteMedicament } from "../../redux/actions/medicamentActions";
import Moment from "react-moment";
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import CRUDModal from "../CRUDModal";

function Sidebar({ medicamentObject }) {
  const isSidebarOpen = useSelector((store) => store.general.sidebarOpen);
  const dispatch = useDispatch();
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenModal, openModal, closeModal] = useModal();

  const deleteAndCloseSidebar = () => {
    dispatch(deleteMedicament(medicamentObject));
    dispatch(closeSidebar());
    closeDeleteModal();
  };

  return (
    <div className={`sidebar ${isSidebarOpen && "active"}`}>
      <div className='sidebar__header'>
        <X
          className='close__sidebar pointer'
          onClick={() => dispatch(closeSidebar())}
        />
      </div>
      <div className='sidebar__content'>
        <h2>{medicamentObject.name || "Sin nombre"}</h2>
        <div className='row w-100'>
          <div className='col-md-12 mt-3'>

            <div className='text__content mt-5'>
              <div className='created'>
                <p className='bolded'>Fecha de registro</p>
                <p>
                  { (
                    <Moment format='DD/MMM/YYYY'>{medicamentObject.createdAt}</Moment>
                  ) || (
                    <span>Sin fecha</span>
                  )}
                </p>
              </div>

              <div className='description'>
                <p className='bolded'>Tipo</p>
                <p>{ medicamentObject.type || "Sin tipo"}</p>
              </div>

              <div className='description'>
                <p className='bolded'>Ubicación</p>
                <p>{ medicamentObject.location || "Sin ubicación"}</p>
              </div>

              <div className='updated'>
                <p>
                  Actualizado el{" "}
                  <Moment format='DD/MMM/YYYY, hh:mm a'>
                    {medicamentObject.updatedAt}
                  </Moment>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sidebar__footer'>
        <div className='sidebar__buttons'>
          <button className='cancel-btn' onClick={openModal}>
            <Pencil /> Edit
          </button>
          <button className='cancel-btn ml-3' onClick={openDeleteModal}>
            <Trash /> Delete
          </button>
        </div>
      </div>
      <CRUDModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        modalTitle='Edit Task'
        isEdit={true}
        medicamentSelected={medicamentObject}
      />
      <Modal
        title='Eliminar'
        isOpen={isOpenDeleteModal}
        closeModal={closeDeleteModal}
      >
        <h3>¿Estás seguro de eliminar el siguiente medicamento? {medicamentObject.name}</h3>
        <div className='d-flex mt-5 justify-content-center'>
          <button className='cancel-btn mr-3' onClick={closeDeleteModal}>
            Cancelar
          </button>
          <button
            className='save-btn ml-2'
            onClick={() => deleteAndCloseSidebar()}
          >
            Borrar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Sidebar;
