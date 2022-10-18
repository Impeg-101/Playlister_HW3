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
 export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
        this.id = this.store.currentList._id;
        this.index = this.store.song_toDelete_index;
        this.savedsong = {
            title : this.store.SongToDelete.title, 
            artist: this.store.SongToDelete.artist, 
            youTubeId: this.store.SongToDelete.youTubeId};
    }

    doTransaction() {
        this.store.deleteSong(this.id, this.index);
        this.store.showModal("delete-song-modal")
    }
    
    undoTransaction() {
        this.store.createNewSong(this.id, this.savedsong, this.index);
    }
}