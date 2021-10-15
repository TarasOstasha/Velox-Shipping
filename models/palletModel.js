const mongoose = require('mongoose');

const palletSchema = mongoose.Schema({
    name: { type: String, require: true },
    quantity: { type: Number, require: true },
    qr: { type: Number, require: true },
    created: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Pallet', palletSchema);