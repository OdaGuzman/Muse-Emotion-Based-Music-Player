import './SongsList.scss';
import { useEffect } from 'react';
import apiClient from '../../spotify';
import Song from '../Song/Song';
import defaultImg from '../../assets/images/spotify-default.jpg';


function SongsList({ playlistId, songs, setSongs, setTitle, title, setOffset, uriList, setUri, setPlay, currentSong, isPlaying }) {

    useEffect(() => {

        const getPlaylist = async () => {
            try {
                const { data } = await apiClient.get(`playlists/${playlistId}`)
                let uriList = []
                setTitle(data.name)
                setSongs(data.tracks.items)
                data.tracks.items.forEach((song) => {
                    uriList.push(song.track.uri)
                })
                setUri(uriList)

            } catch (err) {
                console.error(err)
            }
        }

        getPlaylist();

    }, [playlistId, setSongs, setTitle, setUri]);


    return (
        <div className="songlist">
            <h1 className="songlist__title">{title}</h1>
            <div className="songlist__table">

                <div className="songlist__text">

                    <div className="songlist__image">
                        <p className="songlist__head">Cover</p>
                    </div>
                    <div className="songlist__wrapper">
                        <p className="songlist__head songlist__data">Title</p>
                        <p className="songlist__head songlist__data">Artist</p>
                        <p className="songlist__head songlist__data--duration">Duration</p>
                    </div>
                    <div className='songlist__action'>
                        <p className="songlist__head">Action</p>
                    </div>

                </div>



                {songs &&
                    songs.map((song, index) => {
                        let image = ""
                        typeof song.track.album.images[1] === "undefined" ? image = defaultImg : image = song.track.album.images[1].url
                        return <Song key={index}
                            index={index}
                            name={song.track.name}
                            artists={song.track.artists.map(s => s.name).join()}
                            image={image}
                            duration={song.track.duration_ms}
                            preview={song.track.preview_url}
                            id={song.track.id}
                            uri={song.track.uri}
                            playlistId={playlistId}
                            setOffset={setOffset}
                            setPlay={setPlay}
                            uriList={uriList}
                            setUri={setUri}
                            currentSong={currentSong}
                            isPlaying={isPlaying} />
                    })}

            </div>
        </div>
    );
}

export default SongsList;