import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function EditSongModal(){
    const {store} = useContext(GlobalStoreContext);

    function handleConfirmEdit(){
        store.addEditSongTransaction();
        store.hideModal("edit-song-modal");
    }

    function handleCancelEdit(){
        store.hideModal("edit-song-modal");
    }
    
    return (
        <div 
        id="edit-song-modal" 
        className={"modal"} 
        data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-edit-song-root' style={{width : "800px"}}>
                <div className="modal-north">
                    Edit Song
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Title:
                        <input className="inputs" type="text" id="titleinput" size="30" style={{fontSize:"x-large"}} ></input><br></br>
                        Artist: 
                        <input className="inputs" type="text" id="artistinput" size="30" style={{fontSize:"x-large"}} ></input><br></br>
                        Youtube Id: 
                        <input className="inputs" type="text" id="youtubeidinput" size="30" style={{fontSize:"x-large"}} ></input><br></br>
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button" 
                        id="edit-song-confirm-button" 
                        className="modal-button" 
                        onClick={handleConfirmEdit}
                        value='Confirm' />
                    <input type="button" 
                        id="edit-song-cancel-button" 
                        className="modal-button" 
                        onClick={handleCancelEdit}
                        value='Cancel' />
                </div>
            </div>
    </div>
    )
} 

export default EditSongModal;