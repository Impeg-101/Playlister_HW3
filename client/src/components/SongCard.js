import React, { useContext, useState } from 'react'
import { __RouterContext } from 'react-router';
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";


    function handleRemoveSong(event){
        event.stopPropagation();
        store.markSongForDeletion(store.currentList._id ,song,index);
    }

    function handleEditSong(event){
        event.stopPropagation();
        document.getElementById("titleinput").value = song.title;
        document.getElementById("artistinput").value = song.artist;
        document.getElementById("youtubeidinput").value = song.youTubeId;
        store.markSongForEdit(song);
    }

    function handleDragStart(event){
        event.dataTransfer.setData("from", event.target.id);
    }

    function handleDragDrop(event){
        let from = event.dataTransfer.getData("from");
        let to = event.target.id;
        from = from.split('-')[1];
        to = to.split('-')[1];
        store.addMoveSongTransaction(from, to, store.currentList._id);
    }

    function handleDragIgnore(event){
        event.preventDefault();
    }


    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDoubleClick={handleEditSong}
            onDragStart={handleDragStart}
            onDragOver={handleDragIgnore}
            onDragEnter={handleDragIgnore}
            onDragLeave={handleDragIgnore}
            onDrop={handleDragDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleRemoveSong}
            />
        </div>
    );
}

export default SongCard;