import axios from 'axios'

const gamesReducer = (games = { data: [], loading: true, filter: [true, true, true, true] }, action) => {
    switch (action.type) {
        case "LOAD_GAMES":
            return {
                ...games,
                data: action.games,
                loading: false
            }
        case 'ADD_GAME':
            return {
                ...games,
                data: [...games.data, action.game],
            }
        case 'DELETE_GAME':
            let newGames = [...games.data];
            return {
                ...games,
                data: newGames.filter((game) => {
                    return action.id !== game._id;
                }),
            }
        case "EDIT_GAME":
            return {
                ...games,
                data: games.data.map((game) => {
                    if (game._id === action.game._id) {
                        return Object.assign(game, action.game);
                    } else {
                        return game;
                    }
                })
            }
        case "FILTER_GAMES":
            let newFilter = [...games.filter]
            newFilter[Number(action.name)] = action.checked
            return {
                ...games,
                filter: newFilter
            }
        default:
            return games
    }
}

export function loadGames() {
    return dispatch => {
        axios.get('/games/')
            .then(response => {
                dispatch({
                    type: "LOAD_GAMES",
                    games: response.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function addGame(newGame) {
    return dispatch => {
        axios.post('/games/', newGame)
            .then(response => dispatch({ type: "ADD_GAME", game: response.data }))
            .catch(err => console.log(err))
    }
}

export function deleteGame(id) {
    console.log(id)
    return dispatch => {
        axios.delete('/games/' + id)
            .then(response => dispatch({
                type: 'DELETE_GAME',
                id
            }))
            .catch(err => console.log(err))
    }
}

export function editGame(editgame, id) {
    return dispatch => {
        axios.put('/games/' + id, editgame)
            .then(response => dispatch({ type: "EDIT_GAME", game: response.data }))
            .catch(err => console.log(err))
    }
}

export function filterGames(e) {
    let { name, checked } = e.target;
    return dispatch => {

        dispatch({ type: "FILTER_GAMES", name, checked })
    }
}

export default gamesReducer;