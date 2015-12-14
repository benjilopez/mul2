var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TweetSchema = new Schema({
    message:  { type: String, required: true},
    creator:  { type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: {createdAt: 'timestamp'}
});

module.exports = mongoose.model('Tweet', TweetSchema);