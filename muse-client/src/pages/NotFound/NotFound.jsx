import React from 'react';
import './NotFound.scss';
import notFound from '../../assets/images/404-photo.png';

export default function NotFound() {
    return (
        <div className="nf404">
            <img src={notFound} alt="404 not found" className='nf404__img' />
            <div className="nf404__container">
                <h1 className="nf404__title">Uh-oh</h1>
                <p className='nf404__description'>The resource you were looking for hasn't been found.</p>
            </div>

        </div>
    )
}
