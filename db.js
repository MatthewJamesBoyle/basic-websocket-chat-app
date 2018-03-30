const Datastore = require('nedb')
    , db = new Datastore();


const saveMessage = message => {
    db.insert({
        recieved: new Date(),
        message,
    }, (err, newDocs) => {
        if (err == null) {
            console.log(`saved new message to db.`);
            printAllDocs();
       }
    }) 
}


const printAllDocs = () => {
    db.find({}, function (err, docs) {
        console.log(docs);
    });
}

module.exports = { saveMessage };