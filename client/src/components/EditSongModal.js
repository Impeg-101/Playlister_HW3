import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function EditSongModal(){
    const {store} = useContext(GlobalStoreContext);

    let name = (store.SongToEdit === undefined || store.SongToEdit === null) ? "" : store.SongToEdit.name;

    function handleConfirmEdit(){
        store.deleteSong(store.SongToEdit._id);
        store.hideEditModal();
    }

    function handleCancelEdit(){
        store.hideEditModal();
    }
    
    return (null
        // <div
        //     id="delete-song-modal"
        //     className={"modal"}
        //     data-animation="slideInOutLeft">
        //     <div 
        //         className="modal-root" 
        //         id='verify-delete-song-root'>
        //         <div className="modal-north">
        //         Edit the {name} playsong?
        //         </div>
        //         <div className="modal-center">
        //             <div className="modal-center-content">
        //                 Are you sure you wish to permanently delete the {name} playsong?
        //             </div>
        //         </div>
        //         <div className="modal-south">
        //             <input 
        //                 type="button" 
        //                 id="remove-song-confirm-button" 
        //                 className="modal-button" 
        //                 onClick={handleConfirmEdit} 
        //                 value='Confirm' 
        //             />
        //             <input 
        //                 type="button" 
        //                 id="remove-song-cancel-button" 
        //                 className="modal-button" 
        //                 onClick={handleCancelEdit} 
        //                 value='Cancel' 
        //             />
        //         </div>
        //     </div>
        // </div>
    )
} 

export default EditSongModal;