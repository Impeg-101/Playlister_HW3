import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
// OUR TRANSACTIONS
import MoveSong_Transaction from '../transactions/MoveSong_Transaction.js';
import AddSong_Transaction from '../transactions/AddSong_Transaction.js';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction.js';
import EditSong_Transaction from '../transactions/EditSong_Transaction.js';
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    DELETE_PLAYLIST : "DELETE_PLAYLIST",
    ADD_SONG: "ADD_SONG",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    DELETE_SONG : "DELETE_SONG",
    MOVE_SONG: "MOVE_SONG",
    MARK_SONG_FOR_EDIT : "MARK_SONG_FOR_EDIT",
    EDIT_SONG: "EDIT_SONG"

}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        SongToEdit : null,
        SongToDelete : null,
        PlaylistToDelete : null, 
        addListButton : false,
        ToolBarButton : true,
        hasUndo : false,
        hasRedo : false,

    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    ToolBarButton : false,
                    hasUndo : false,
                    hasRedo : false,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    ToolBarButton : false,
                    hasUndo : false,
                    hasRedo : false,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    ToolBarButton : false,
                    hasUndo : false,
                    hasRedo : false,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    ToolBarButton : false,
                    hasUndo : false,
                    hasRedo : false,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    PlaylistToDelete : payload.PlaylistToDelete,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    addListButton : true,
                    ToolBarButton : false,
                    hasUndo : false,
                    hasRedo : false,
                });
            }
            case GlobalStoreActionType.DELETE_PLAYLIST: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    addListButton : false,
                    ToolBarButton : false,
                    hasUndo : false,
                    hasRedo : false,
                })
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    ToolBarButton : true,
                    hasUndo : false,
                    hasRedo : false,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    ToolBarButton : false,
                    hasUndo : false,
                    hasRedo : false,
                });
            }
            case GlobalStoreActionType.ADD_SONG: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    ToolBarButton : true,
                    hasUndo : tps.hasTransactionToUndo(),
                    hasRedo : tps.hasTransactionToRedo(),
                })
            }
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    SongIndex : payload.SongIndex,
                    SongToDelete : payload.SongToDelete,
                    ToolBarButton : false,
                    hasUndo : false,
                    hasRedo : false,
                })
            }
            case GlobalStoreActionType.DELETE_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    SongToDelete : null,
                    ToolBarButton : true,
                    SongIndex : null,
                    hasUndo : tps.hasTransactionToUndo(),
                    hasRedo : tps.hasTransactionToRedo(),
                })
            }
            case GlobalStoreActionType.MARK_SONG_FOR_EDIT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    SongToEdit : payload.SongToEdit,
                    ToolBarButton : false,
                    hasUndo : false,
                    hasRedo : false,
                })
            }
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    SongToEdit : null,
                    ToolBarButton : true,
                    hasUndo : tps.hasTransactionToUndo(),
                    hasRedo : tps.hasTransactionToRedo(),
                })
            }
            case GlobalStoreActionType.MOVE_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    ToolBarButton : true,
                    hasUndo : tps.hasTransactionToUndo(),
                    hasRedo : tps.hasTransactionToRedo(),
                })
            }


            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist.name);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        store.clearTransaction();
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
    //create and then open the last one to edit
    store.createPlaylistT = function () {
        store.createNewList();
        if(this.store.currentList !== null){
            store.setCurrentList(this.store.idNamePairs[this.store.idNamePairs.length-1]);
        }
    }

    store.createNewList = function () {
        async function asyncCreateNewList() {
            let response = await api.createPlaylist({name : "Untitled", song : []});
            if(response.data.success){
                let playlist = response.data.playlist;
                let id = playlist._id;
                let pairs = store.idNamePairs;
                pairs.push(playlist);
                storeReducer({
                    type : GlobalStoreActionType.CREATE_NEW_LIST,
                    payload : {idNamePairs : pairs, playist : playlist},
                })
                store.setCurrentList(id);
            }
        }
        asyncCreateNewList();
    }

    store.markListForDeletion = function (pair){
        storeReducer({
            type : GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload : {
                PlaylistToDelete : pair
            }
        })
        store.showModal("delete-list-modal");
    }

    store.deletePlaylist = function (id){
        async function asyncDeletePlaylist(){          
            let response = await api.deletePlaylist(id);
            if(response.data.success){
                let pairs = store.idNamePairs.filter((list) => list._id !== id);
                storeReducer({
                    type : GlobalStoreActionType.DELETE_PLAYLIST,
                    payload : {idNamePairs : pairs},
                })
            }
        }
        asyncDeletePlaylist();
    }

    store.addSong = function (id, newSong, index) {
        // GET THE LIST
        async function asyncAddSong() {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if(index === playlist.songs.length){
                    playlist.songs.push(newSong);
                }else{
                    playlist.songs.splice(index, 0, newSong);
                }
                async function updateList() {
                    response = await api.songChange(id, playlist.songs);
                    if (response.data.success) {
                        async function getListPairs() {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.ADD_SONG,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs();
                    }
                }
                updateList();
            }
        }
        asyncAddSong();
    }

    store.markSongForDeletion = function ( song, index){
        storeReducer({
            type:GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: {
                SongToDelete : song,
                SongIndex : index
            }
        })
        store.showModal("delete-song-modal"); 
    }

    store.deleteSong = function (id, index) {
        async function asyncDeleteSong () {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.songs.splice(index, 1);
                async function updateList() {
                    response = await api.songChange(id, playlist.songs);
                    if (response.data.success) {
                        async function getListPairs() {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.DELETE_SONG,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs();
                    }
                }
                updateList();
            }
        }
        asyncDeleteSong();
    }

    store.markSongForEdit = function (song) {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_EDIT,
            payload: {
                SongToEdit : song,
            }
        })
        store.showModal("edit-song-modal");
    }

    store.editSong = function (newSong){
        let song = store.SongToEdit;
        song.title = newSong.title;
        song.artist = newSong.artist;
        song.youTubeId = newSong.youTubeId;
        let playlist = this.currentList;

        async function updateList() {
            let response = await api.songChange(store.currentList._id, playlist.songs);
            if (response.data.success) {
                async function getListPairs() {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        storeReducer({
                            type: GlobalStoreActionType.EDIT_SONG,
                            payload: {
                                idNamePairs: pairsArray,
                                playlist: playlist
                            }
                        });
                    }
                }
                getListPairs();
            }
        }
        updateList();
    }

    store.moveSong = function (from, to){
        let playlist = this.currentList;
        let song1 = playlist.songs[from];
        let song2 = playlist.songs[to];
        playlist.songs[from] = song2;
        playlist.songs[to] = song1;
        async function updateList() {
            let response = await api.songChange(store.currentList._id, playlist.songs);
            if (response.data.success) {
                async function getListPairs() {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        storeReducer({
                            type: GlobalStoreActionType.MOVE_SONG,
                            payload: {
                                idNamePairs: pairsArray,
                                playlist: playlist
                            }
                        });
                    }
                }
                getListPairs();
            }
        }
        updateList();
    }

    //transactions
    store.addAddSongTransaction = function(id, newSong){
        tps.addTransaction(new AddSong_Transaction(store));
    }

    store.addDeleteSongTransaction = function(){
        tps.addTransaction(new DeleteSong_Transaction(store));
    }

    store.addEditSongTransaction = function(){
        tps.addTransaction(new EditSong_Transaction(store));
    }

    store.addMoveSongTransaction = function(from, to, id){
        tps.addTransaction(new MoveSong_Transaction(store, from, to, id));
    }

    store.clearTransaction = function () {
        tps.clearAllTransactions();
    }

    //control modal to display/undisplay
    store.hideModal = function (id){
        let modal = document.getElementById(id);
        modal.classList.remove("is-visible");
        storeReducer({
            type: GlobalStoreActionType.MOVE_SONG,
            payload: {
                idNamePairs: store.idNamePairs,
                playlist: store.currentList,
            }
        });
        
    }
    store.showModal = function (id){
        let modal = document.getElementById(id);
        modal.classList.add("is-visible");
        
    }

    //handle key z and y

    document.onkeydown = (event) => store.handleKeyDown(event, this);

    store.handleKeyDown = function (event){
        if((event.metaKey || event.ctrlKey) && event.key === 'y'){
            store.redo();
        }
        else if((event.metaKey || event.ctrlKey) && event.key === 'z'){
            store.undo();
        }
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };

}