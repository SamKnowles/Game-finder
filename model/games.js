const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    tags: [Boolean]
})

module.exports = mongoose.model("game", gameSchema);
