import React from 'react';
import Games from './Games';
import '../Styles/Home.css';

function Home() {
    return (
        <div className='home-wrapper'>
        <h2>Stop being 'bored' and play a damn game already</h2>
            <Games></Games>
        </div>
    )
}

export default Home
