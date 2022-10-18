import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteSongModal(props){
    const {store, storeReducer} = useContext(GlobalStoreContext);

    let name = (store.SongToDelete === undefined || store.SongToDelete === null) ? "" : store.SongToDelete.name;

    function handleConfirmDelete(){
        store.deleteSong(store.SongToDelete.playlistID, store.SongToDelete.index);
        store.hideModal("delete-song-modal");
    }

    function handleCancelDelete(){
        store.hideModal("delete-song-modal");
    }
    
    return (
        <div
            id="delete-song-modal"
            className={"modal"}
            data-animation="slideInOutLeft">
            <div 
                className="modal-root" 
                id='verify-delete-song-root'>
                <div className="modal-north">
                Delete the {name} song?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently delete the {name} song?
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

export default DeleteSongModal;