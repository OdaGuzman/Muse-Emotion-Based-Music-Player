import './Song.scss';
import playIcon from '../../assets/icons/play-solid.svg';
import pauseIcon from '../../assets/icons/pause-solid.svg';



function Song({ index, name, artists, duration, image, preview, id, uri, playlistId, setOffset, setPlay, setUri, currentSong, isPlaying }) {

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const handlePlay = () => {
        setPlay(false)
        setOffset(index)
        setPlay(true)
    }

    const handlePause = () => {
        setPlay(false)
    }

    const handleSongSelection = () => {
        setPlay(false)
        setOffset(index)
        setPlay(true)
    }

    return (

        <div className="song">
            <div className="song__image">
                <img src={image} alt={`${name} cover art`} className='song__img' />
            </div>
            <div className="song__wrapper">
                <p className="song__data song__name" onClick={handleSongSelection}>{name}</p>
                <p className="song__data">{artists}</p>
                <p className="song__data--duration">{millisToMinutesAndSeconds(duration)}</p>
            </div>
            <div className='song__action'>{
                id === currentSong && isPlaying ?
                    <img src={pauseIcon} alt="pause icon" className='song__icon' onClick={handlePause} /> :
                    <img src={playIcon} alt="play icon" className='song__icon' onClick={handlePlay} />
            }
            </div>


        </div>
    );
}

export default Song;