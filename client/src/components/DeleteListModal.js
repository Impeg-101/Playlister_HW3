import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteListModal(props){
    const {store, storeReducer} = useContext(GlobalStoreContext);

    let name = (store.PlaylistToDelete === undefined || store.PlaylistToDelete === null) ? "" : store.PlaylistToDelete.name;

    function handleConfirmDelete(){
        store.deletePlaylist(store.PlaylistToDelete._id);
        store.hideModal("delete-list-modal");
    }

    function handleCancelDelete(){
        store.hideModal("delete-list-modal");
    }
    
    return (
        <div
            id="delete-list-modal"
            className={"modal"}
            data-animation="slideInOutLeft">
            <div 
                className="modal-root" 
                id='verify-delete-list-root'>
                <div className="modal-north">
                Delete the {name} playlist?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently delete the {name} playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <input 
                        type="button" 
                        id="remove-song-confirm-button" 
                        className="modal-button" 
                        onClick={handleConfirmDelete} 
                        value='Confirm' 
                    />
                    <input 
                        type="button" 
                        id="remove-song-cancel-button" 
                        className="modal-button" 
                        onClick={handleCancelDelete} 
                        value='Cancel' 
                    />
                </div>
            </div>
        </div>
    )
} 

export default DeleteListModal;