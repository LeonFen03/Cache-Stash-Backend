const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id:  {type: mongoose.Schema.Types.ObjectId },
    user_id: {type: mongoose.Schema.Types.ObjectId },
    image_url: { type: String },
    user_name:{ type: String },
    description:{ type: String },
    title: {type: String},
    category:{ type: Array },
})

module.exports = mongoose.model('images', imageSchema);
