const express = require('express');
const gamesRouter = express.Router();
const gameModel = require('../model/games');

gamesRouter.route('/')
.post((req, res) => {
    let newGame = new gameModel(req.body);
    newGame.save(req.body, (err, savedGame) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(savedGame);
        }
    })
})
.get((req,res) => {
    gameModel.find((err, foundGames) => {
        if (err) {
            console.error(err);
        }
        else {
            res.send(foundGames);
        }
    });
});
gamesRouter.route('/:id')
    .get((req, res) => {
        let {id} = req.params;
        gameModel.findById({ _id: id}, (err, foundGame) => {
            if (err) {
                console.error(err);
            }
            else {
                res.send(foundGame);
            }
        })
    })
    .delete((req, res) => {
        let {id} = req.params;
        gameModel.findByIdAndRemove(id, (err, removedGame) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(removedGame);
            }
        })
    })
    .put((req, res) => {
        let {id} = req.params;
        gameModel.findByIdAndUpdate(id, req.body, {new: true}, (err, updatedGame) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(updatedGame);
            }
        })
    })

module.exports = gamesRouter;