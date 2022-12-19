import React from 'react';
import { useEffect } from 'react';
import AboutComponent from '../../components/AboutComponent/AboutComponent.jsx';
import projectData from '../../data/about.json';
import './About.scss';

export default function About() {

    useEffect(() => {
        document.title = 'About - Muse: Emotion-Based Music Player';
    }, []);

    return (
        <div className="documentation">

            <h1 className="documentation__title">Behind The Project</h1>
            <div className="documentation__containers">
                {projectData.map((data, idx) => {
                    return <AboutComponent key={idx} title={data.title} picture={data.picture} description={data.description} references={data.references} />
                })}
            </div>
        </div>
    )
}

