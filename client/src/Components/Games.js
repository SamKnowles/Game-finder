import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGame, loadGames } from '../Redux/games';
import Game from './Game';
import FilterForm from './FilterForm';
import Form from './Form';
import '../Styles/Games.css';

class Games extends Component {
    componentDidMount() {
        this.props.loadGames();
    }

    render() {
        let { data, filter } = this.props;
        let gameComponents = data.filter(game => {
            return game.tags.join() === filter.join();
        }).map((game, i) => {
            return <Game key={i + game.title} {...game} index={i}></Game>
        })
        return (
            <div className='page-wrapper'>
                <div className='side-bar-wrapper'>
                    <div>
                        <FilterForm></FilterForm>
                    </div>
                    <Form add submit={this.props.addGame}></Form>
                </div>
                <div className='all-the-games'>
                    {gameComponents}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return state.games
}

export default connect(mapStateToProps, { addGame, loadGames })(Games);

