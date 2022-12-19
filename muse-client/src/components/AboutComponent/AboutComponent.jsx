import React from 'react'
import './AboutComponent.scss'


export default function AboutComponent({ title, picture, description, references }) {

    return (
        <div className='bio'>
            <div className="bio__container"  >
                <img src={picture} alt={title} className="bio__img" />
                <div className="bio__text">
                    <h4 className="bio__title">{title}</h4>
                    <div className="bio__description">{description}</div>
                </div>
                <div className="bio__wrapper">
                    <img src={references} alt="" />
                </div>
            </div>
        </div >
    )
}
