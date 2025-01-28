import React from 'react';

import './components.css';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    key: number;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Card({ title, description, imageUrl, onClick }: CardProps) {
    return (
        <div className="card unloaded" onClick={onClick}>
            <div className="card-image" style={{backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
            {/* <img src={imageUrl} alt={title} className="card-image" /> */}
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
};