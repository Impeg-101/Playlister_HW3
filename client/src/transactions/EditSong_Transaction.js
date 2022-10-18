import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
        this.id = this.store.currentList._id;
        this.index = this.store.SongToEdit.index;
        this.oldsong = {
            title : this.store.SongToEdit.title, 
            artist: this.store.SongToEdit.artist, 
            youTubeId: this.store.SongToEdit.youTubeId};
        this.newsong = {
            title: document.getElementById("title-input").value, 
            artist: document.getElementById("artist-input").value, 
            youTubeId: document.getElementById("youtubeID-input").value};
    }

    doTransaction() {
        this.store.editSong({
            title : this.newsong.title, 
            artist: this.newsong.artist, 
            youTubeId: this.newsong.youTubeId});
        this.store.showModal("edit-song-modal");
    }
    
    undoTransaction() {
        this.store.editSong({
            title : this.oldsong.title, 
            artist: this.oldsong.artist, 
            youTubeId: this.oldsong.youTubeId});
    }
}