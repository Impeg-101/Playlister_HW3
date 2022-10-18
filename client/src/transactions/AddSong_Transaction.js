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
 export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(store, id, newsong) {
        super();
        this.store = store;
        this.id = store.currentList._id;
        this.newsong = {
            title : "Untitled", 
            artist : "Unknown", 
            youTubeId: "dQw4w9WgXcQ"};
    }

    doTransaction() {
        this.index = this.store.currentList.songs.length + 1;
        this.store.addSong(this.id, this.newsong, this.index);
        this.index = this.store.currentList.songs.length;
    }
    
    undoTransaction() {
        this.store.deleteSong(this.id, this.index);
    }
}