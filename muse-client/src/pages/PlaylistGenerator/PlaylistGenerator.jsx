import React, { useEffect } from 'react';
import "./PlaylistGenerator.scss";
import { useState } from "react";
import { createNewPlaylist, getArtistsTracks, getTopArtists, trackSelection } from "../../utils";
import SongsList from '../../components/SongsList/SongsList';


export default function PlaylistGenerator({ playlistId, songs, setSongs, setTitle, title, setPlaylistId, setOffset, uriList, setUri, setPlay, currentSong, isPlaying }) {

    const [newPlaylistId, setNewPlaylistId] = useState(null);
    const [feeling, setFeeling] = useState(60);
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState('#993333');


    useEffect(() => {

        document.title = "Playlist Generator - Muse: Emotion-Based Music Player";

    }, [])

    const handleSliderChange = ((event) => {

        setFeeling(event.target.value)
        let colorValue = Math.floor(event.target.value * 2.55);
        setColor(`rgb(${colorValue},${colorValue / 3},${colorValue / 3})`);

    })


    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);
        setNewPlaylistId("")
        getTopArtists()
            .then(res => {
                return getArtistsTracks(res)
            })
            .then(res => {
                return trackSelection(res, feeling)
            })
            .then(res => {
                return createNewPlaylist(res, feeling)
            })
            .then(res => {
                setNewPlaylistId(res)
                setPlaylistId(res)
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                window.location.reload();
            })


        setOffset(0)

    }



    return (
        <div className="playlist-gen">
            <section className="playlist-gen__hero">
                <div className="playlist-gen__title">All The Vibes. All The Feels.</div>
            </section>

            <form onSubmit={handleSubmit} className="playlist-gen__form" >
                <fieldset className='playlist-gen__fieldset'>
                    <legend className="playlist-gen__set-title">Dive Right In</legend>
                    <p className="playlist-gen__slogan">I'm feeling:</p>
                    <input type="range" min="20" max="100" value={feeling} className="playlist-gen__slider" style={{ background: color }} id="range" onChange={handleSliderChange} />
                    <div className="playlist-gen__set-text">

                        <div className="playlist-gen__emotion">
                            <p className="playlist-gen__text">Angry </p>
                            <p className='playlist-gen__emoji'>💢</p>
                        </div>
                        <div className="playlist-gen__emotion">
                            <p className="playlist-gen__text">Melancholic </p>
                            <p className='playlist-gen__emoji'>❤️‍🩹</p>
                        </div>
                        <div className="playlist-gen__emotion">
                            <p className="playlist-gen__text">Uneasy </p>
                            <p className='playlist-gen__emoji'>😰</p>
                        </div>
                        <div className="playlist-gen__emotion">
                            <p className="playlist-gen__text">Calm </p>
                            <p className='playlist-gen__emoji'>🧘‍♀️</p>
                        </div>
                        <div className="playlist-gen__emotion">
                            <p className="playlist-gen__text">Content </p>
                            <p className='playlist-gen__emoji'>✨</p>
                        </div>
                        <div className="playlist-gen__emotion">
                            <p className="playlist-gen__text">Enamoured  </p>
                            <p className='playlist-gen__emoji'>💕</p>
                        </div>
                        <div className="playlist-gen__emotion">
                            <p className="playlist-gen__text">Energetic </p>
                            <p className='playlist-gen__emoji'></p>
                        </div>
                    </div>
                </fieldset>
                <button type="submit" className='primary-btn'>Tune My Feeling</button>
            </form>
            <div className="playlist-gen__song-wrapper">
                {!loading ? "" :
                    <div className="playlist-gen__animation">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                }
                {!newPlaylistId ?
                    "" :
                    <SongsList
                        songs={songs}
                        setSongs={setSongs}
                        setTitle={setTitle}
                        title={title}
                        playlistId={newPlaylistId}
                        setPlaylistId={setPlaylistId}
                        setOffset={setOffset}
                        uriList={uriList}
                        setUri={setUri}
                        setPlay={setPlay}
                        currentSong={currentSong}
                        isPlaying={isPlaying}
                    />}

            </div>
        </div>
    )
}
