const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    // Get user, add custom claim
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        return {
            message: `${data.email} is now an admin !`
        }
    }).catch((error) => {
        return error.message;
    });
});
