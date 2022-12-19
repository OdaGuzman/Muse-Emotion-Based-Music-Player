import apiClient from './spotify';

export const getTopArtists = async () => {
    console.log("Getting top artists...")
    let topArtistName = [];
    let topArtistUri = [];
    const ranges = ['short_term', 'medium_term', 'long_term'];

    for (let range of ranges) {
        let topArtistList = await apiClient.get(`me/top/artists?limit=50&time_range=${range}`)
        topArtistList.data.items.forEach(data => {
            if (!topArtistName.includes(data.name)) {
                topArtistName.push(data.name);
                topArtistUri.push(data.uri);
            }
        })
    }

    let topFollowedArtistList = await apiClient.get('me/following?type=artist&limit=50');

    topFollowedArtistList.data.artists.items.forEach(data => {
        if (!topArtistName.includes(data.name)) {
            topArtistName.push(data.name);
            topArtistUri.push(data.uri);
        }
    })

    return topArtistUri;
}

export const getArtistsTracks = async (topArtistUri) => {
    console.log("Getting artists' tracks...")
    const topTracksUri = [];

    for (let artist of topArtistUri) {
        let topTracksByArtist = await apiClient.get(`artists/${artist.split(':')[2]}/top-tracks?market=CA`)
        topTracksByArtist.data.tracks.forEach((track) => {
            topTracksUri.push(track.uri)
        })
    }

    return topTracksUri;
}

export const trackSelection = async (topTracksUri, feeling) => {
    console.log("Selecting tracks...")
    const selectedTracksUri = []
    const decimalFeel = feeling / 100;

    let shuffledTracks = topTracksUri
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value.split(':')[2])

    const groupSize = 50
    const groupedTrackUri = []
    for (let i = 0; i < shuffledTracks.length; i += groupSize) {
        const group = shuffledTracks.slice(i, i + groupSize);
        groupedTrackUri.push(group.join(","))
    }

    for (let trackGroup of groupedTrackUri) {
        let trackDataList = await apiClient.get(`audio-features?ids=${trackGroup}`)
        trackDataList.data.audio_features.forEach((track) => {
            if (decimalFeel < 0.10) {
                if ((0 <= track.valence && track.valence <= (decimalFeel + 0.15))
                    && track.danceability <= (decimalFeel * 8)
                    && track.energy <= (decimalFeel * 10)) {

                    selectedTracksUri.push(track.uri)
                }
            } else if (0.10 <= decimalFeel && decimalFeel < 0.25) {
                if (((decimalFeel - 0.075) <= track.valence && track.valence <= (decimalFeel + 0.075))
                    && track.danceability <= (decimalFeel * 4)
                    && track.energy <= (decimalFeel * 5)) {

                    selectedTracksUri.push(track.uri)
                }
            } else if (0.25 <= decimalFeel && decimalFeel < 0.50) {
                if (((decimalFeel - 0.05) <= track.valence && track.valence <= (decimalFeel + 0.05))
                    && track.danceability <= (decimalFeel * 1.75)
                    && track.energy <= (decimalFeel * 1.75)) {

                    selectedTracksUri.push(track.uri)
                }
            } else if (0.50 <= decimalFeel && decimalFeel < 0.75) {
                if (((decimalFeel - 0.075) <= track.valence && track.valence <= (decimalFeel + 0.075))
                    && track.danceability >= (decimalFeel / 2.5)
                    && track.energy >= (decimalFeel / 2)) {

                    selectedTracksUri.push(track.uri)
                }
            } else if (0.75 <= decimalFeel && decimalFeel < 0.90) {
                if (((decimalFeel - 0.075) <= track.valence && track.valence <= (decimalFeel + 0.075))
                    && track.danceability >= (decimalFeel / 2)
                    && track.energy >= (decimalFeel / 1.75)) {

                    selectedTracksUri.push(track.uri)
                }
            } else {
                if (((decimalFeel - 0.15) <= track.valence && track.valence <= 1)
                    && track.danceability >= (decimalFeel / 1.75)
                    && track.energy >= (decimalFeel / 1.5)) {

                    selectedTracksUri.push(track.uri)
                }
            }
        })
    }

    return selectedTracksUri
}


export const createNewPlaylist = async (selectedTracksUri, feeling) => {
    console.log("Creating new playlist...")
    let textFeeling = ""
    if (feeling >= 0 && feeling <= 30) {
        textFeeling = "Angry 💢"
    } else if (feeling >= 31 && feeling <= 41) {
        textFeeling = "Melancholic ❤️‍🩹"
    } else if (feeling >= 42 && feeling <= 52) {
        textFeeling = "Uneasy 😰"
    } else if (feeling >= 53 && feeling <= 63) {
        textFeeling = "Calm 🧘‍♀️"
    } else if (feeling >= 64 && feeling <= 74) {
        textFeeling = "Content ✨"
    } else if (feeling >= 75 && feeling <= 85) {
        textFeeling = "Enamoured 💕"
    } else if (feeling >= 86 && feeling <= 100) {
        textFeeling = "Energetic 🥳"
    }

    let userData = await apiClient.get(`me`)


    const playlistObj = {
        name: `Muse playlist for feeling ${textFeeling}`,
        public: false
    }
    let playlistData = await apiClient.post(`users/${userData.data.id}/playlists`, playlistObj)

    let shuffledTracks = selectedTracksUri
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)


    let n = shuffledTracks.length < 35 ? shuffledTracks.length : 35;

    const tracksObj = {
        uris: shuffledTracks.splice(0, n)
    }

    console.log("Adding new songs...")
    try {
        await apiClient.post(`playlists/${playlistData.data.id}/tracks`, tracksObj)
    } catch (err) {
        console.error(err)
    }

    return playlistData.data.id
}
