const admin = require('firebase-admin');

admin.initializeApp();

// APIs
exports.carryOver = require('./api/helloworld.api');

// Triggers
// exports.entryTriggers = require('./triggers/helloworld.trigger');
