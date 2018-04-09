import React from 'react';
import { connect } from 'react-redux';
import { filterGames } from '../Redux/games';
import '../Styles/FilterForm.css';

function FilterForm({filterGames, filter}) {
    return (
        <div className='filtered-form-wrapper'>
            <h1>Game Filter</h1>
            <div className='indoor-filter'>
                <label>Indoor</label>
                <input checked={filter[0]} onChange={filterGames} type="checkbox" name='0' />
            </div>
            <div className='outdoor-filter'>
                <label>Outdoor</label>
                <input checked={filter[1]} onChange={filterGames} type="checkbox" name='1' />
            </div>
            <div className='daytime-filter'>
                <label>Daytime</label>
                <input checked={filter[2]} onChange={filterGames} type="checkbox" name='2' />
            </div>
            <div className='night-filter'>
                <label>Night</label>
                <input checked={filter[3]} onChange={filterGames} type="checkbox" name='3' />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state.games
}

export default connect(mapStateToProps, { filterGames })(FilterForm);

