import { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';
import PlaylistGenerator from './pages/PlaylistGenerator/PlaylistGenerator';
import Profile from './pages/Profile/Profile';
import About from './pages/About/About';
import apiClient, { accessToken } from './spotify';
import NotFound from './pages/NotFound/NotFound';
import SpotifyPlayer from 'react-spotify-web-playback';


function App() {

  const [token, setToken] = useState(null);
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [playlistId, setPlaylistId] = useState("37i9dQZEVXbNG2KDcFcKOF");
  const [uri, setUri] = useState([]);
  const [offset, setOffset] = useState(0);
  const [play, setPlay] = useState(false);
  const [currentSong, setCurrentSong] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    setToken(accessToken);
  }, []);



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

  }, [playlistId]);

  useEffect(() => {
    setPlay(true);
  }, [offset])

  return (
    !token ?
      <Landing /> :


      <BrowserRouter>
        <div className="App">
          <Header token={token} />
          <Routes>
            <Route path="/" element={<Home
              songs={songs}
              setSongs={setSongs}
              setTitle={setTitle}
              title={title}
              playlistId={playlistId}
              setPlaylistId={setPlaylistId}
              setOffset={setOffset}
              uriList={uri}
              setUri={setUri}
              setPlay={setPlay}
              currentSong={currentSong}
              isPlaying={isPlaying}
            />} />
            <Route path="/playlist" element={<PlaylistGenerator
              songs={songs}
              setSongs={setSongs}
              setTitle={setTitle}
              title={title}
              playlistId={playlistId}
              setPlaylistId={setPlaylistId}
              setOffset={setOffset}
              uriList={uri}
              setUri={setUri}
              setPlay={setPlay}
              currentSong={currentSong}
              isPlaying={isPlaying} />} />
            <Route path="/about" element={<About />} />
            <Route path="/me" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <div className="App__player">
            <SpotifyPlayer token={token} initialVolume={0.25} uris={uri}
              name={'Muse - Web Player'}
              callback={state => {
                !state.isPlaying && setPlay(false)
                setCurrentSong(state.track.id)
                setIsPlaying(state.isPlaying)
              }}
              play={play}
              offset={offset}
              persistDeviceSelection
              syncExternalDevice
              styles={{
                activeColor: '#fff',
                color: '#FBFAFA',
                bgColor: '#e9a300',
                sliderColor: '#00c4cc',
                sliderHeight: 7,
                sliderHandleColor: '#f05677',
                sliderTrackColor: "#FBFAFA",
                trackArtistColor: '#FBFAFA',
                trackNameColor: '#FBFAFA'
              }} />
          </div>
          <Footer />
        </div>
      </BrowserRouter >

  );
}

export default App;
