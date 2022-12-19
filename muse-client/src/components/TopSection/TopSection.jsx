import React from 'react'

export default function TopSection({ artists, songs }) {

    let list = []
    typeof artists === 'undefined' ? list = songs : list = artists;

    return (
        <div className="profile__container">
            {list.map((range, index) => {

                return (<div key={index} className="profile__top-artists">
                    <h3 className="profile__subtitle--bottom">{range.range}</h3>
                    <ul className="profile__list">
                        {range.items.map((item, index) => {
                            let images = "";
                            typeof artists === 'undefined' ?
                                images = item.album.images[0].url :
                                images = item.images[0].url;
                            return <li className="profile__item" key={index}>
                                <p className="profile__counter">{index + 1}</p>
                                <a href={item.external_urls.spotify} className="profile__link">
                                    <img src={images} alt={`${item.name}`} className="profile__image" />
                                    <span className='profile__name'>{item.name}</span>
                                </a>
                            </li>

                        })}
                    </ul>
                </div>)
            })}
        </div>
    )
}
