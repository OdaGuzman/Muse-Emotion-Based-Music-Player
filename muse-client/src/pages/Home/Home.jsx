import { useEffect } from "react";
import SongsList from "../../components/SongsList/SongsList";
import "./Home.scss";


function Home({ playlistId, songs, setSongs, setTitle, title, setPlaylistId, setOffset, uriList, setUri, setPlay, currentSong, isPlaying }) {

    useEffect(() => {
        document.title = 'Home - Muse: Emotion-Based Music Player';
    }, []);

    return (
        <div className="home">
            <div className="home__song-wrapper">
                <SongsList
                    songs={songs}
                    setSongs={setSongs}
                    setTitle={setTitle}
                    title={title}
                    playlistId={playlistId}
                    setPlaylistId={setPlaylistId}
                    setOffset={setOffset}
                    uriList={uriList}
                    setUri={setUri}
                    setPlay={setPlay}
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                />
            </div>
        </div>
    );
}

export default Home;