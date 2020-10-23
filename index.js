const MongoClient = require('mongodb').MongoClient; //required mongodb node driver and imported in the client object from it
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/'; //port number that mongodb is running
const dbname = 'nucampsite'; // name of the particular database we want to connect to (We created in ripple)

//used that client objects connect method in order to make a connection to the mongodb server and the connect method gave to us a client (err, **client**)object that we then used to access the new campsite database --->  const db = client.db(dbname);
// useUnifiedTopology: true // in the later version this won't be nessesary. It enables a major update and rewrite of the Topology layer of the Node Driver. It recommended by development team and it'll prevent deprecation(การเลิกใช้งาน การต่อต้าน) warning from showing up in our app
                                                        //calback function
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => {   //drop or delete campsites collection from the database 
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);    

        const collection = db.collection('campsites');

        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"}, //re-create it by insert a new document to the campsites collection
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);

            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });
        });
    });
});

//interact with the server through Database Operations
