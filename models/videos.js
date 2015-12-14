var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    _id: {type: String, default: Schema.Types.ObjectId},
    title: {type: String, required: true},
    description: {type: String, default: ''},
    src: {type: String, required: true},
    length: {type: Number, required: true},
    timestamp: {type: Number, default: Date.now()},
    playcount: {type: Number, default: 0},
    ranking: {type: Number, default: 0}
}, {
    timestamps: {createdAt: 'timestamp'}
});

module.exports = mongoose.model('Video', VideoSchema);