import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import apiClient from '../../spotify'
import avatar from '../../assets/images/2.jpg'
import './Profile.scss'
import TopSection from '../../components/TopSection/TopSection'

export default function Profile() {

    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [profile, setProfile] = useState("");

    const regionNames = new Intl.DisplayNames(
        ['en'], { type: 'region' }
    );

    useEffect(() => {
        document.title = "Profile - Muse: Emotion-Based Music Player";

        const getProfile = async () => {
            try {
                const { data } = await apiClient.get('me');
                setProfile(data);
            } catch (error) {
                console.error(error)
            }
        }

        getProfile();

    }, []);


    useEffect(() => {
        async function fetchSongs() {
            const topSong = []
            const ranges = ['short_term', 'medium_term', 'long_term'];
            for (let range of ranges) {
                let newRange = ""

                try {
                    const { data } = await apiClient.get(`me/top/tracks?limit=10&time_range=${range}`)

                    if (range === "short_term") {
                        newRange = "Last Month"
                    } else if (range === "medium_term") {
                        newRange = "Past 6 Months"
                    } else {
                        newRange = "All Time"
                    }

                    topSong.push({ "range": newRange, "items": data.items })

                } catch (err) {
                    console.error(err)
                }
            }
            setSongs(topSong)
        }

        async function fetchArtists() {
            const topArtist = []
            const ranges = ['short_term', 'medium_term', 'long_term'];
            for (let range of ranges) {
                let newRange = ""
                try {
                    const { data } = await apiClient.get(`me/top/artists?limit=10&time_range=${range}`)

                    if (range === "short_term") {
                        newRange = "Last Month"
                    } else if (range === "medium_term") {
                        newRange = "Past 6 Months"
                    } else {
                        newRange = "All Time"
                    }

                    topArtist.push({ "range": newRange, "items": data.items })

                } catch (err) {
                    console.error(err);
                }
            }

            setArtists(topArtist)
        }

        fetchArtists();
        fetchSongs();

    }, [])

    return (
        <div className="profile">
            {profile && <> <div className="profile__top">
                <img src={(profile.images.length === 0 || !profile.images) ? avatar : profile.images[0]} alt="" className="profile__avatar" />
                <div className="profile__info">
                    <div className="profile__wrapper">
                        <h3 className="profile__subtitle">Username</h3>
                        <p className="profile__text">{profile.display_name}</p>
                    </div>
                    <div className="profile__wrapper">
                        <h3 className="profile__subtitle">Country</h3>
                        <p className="profile__text">{regionNames.of(profile.country)}</p>
                    </div>
                    <div className="profile__wrapper">
                        <h3 className="profile__subtitle">Followers</h3>
                        <p className="profile__text">{profile.followers.total}</p>
                    </div>
                </div>
            </div>
                <div className="profile__bottom">
                    <h1 className="profile__title">Your Top Artists</h1>
                    <TopSection artists={artists} />
                    <h1 className="profile__title">Your Top Songs</h1>
                    <TopSection songs={songs} />
                </div>
            </>}

        </div>
    )
}
