import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function EditListModal(){
    const {store} = useContext(GlobalStoreContext);

    let name = (store.PlaylistToEdit === undefined || store.PlaylistToEdit === null) ? "" : store.PlaylistToEdit.name;

    function handleConfirmEdit(){
        store.deletePlaylist(store.PlaylistToEdit._id);
        store.hideEditModal();
    }

    function handleCancelEdit(){
        store.hideEditModal();
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
                Edit the {name} playlist?
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
                        onClick={handleConfirmEdit} 
                        value='Confirm' 
                    />
                    <input 
                        type="button" 
                        id="remove-song-cancel-button" 
                        className="modal-button" 
                        onClick={handleCancelEdit} 
                        value='Cancel' 
                    />
                </div>
            </div>
        </div>
    )
} 

export default EditListModal;