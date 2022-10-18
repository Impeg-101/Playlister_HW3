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





    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            draggable = "true"
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