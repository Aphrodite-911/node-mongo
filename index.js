const MongoClient = require('mongodb').MongoClient; //required mongodb node driver and imported in the client object from it
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/'; //port number that mongodb is running
const dbname = 'nucampsite'; // name of the particular database we want to connect to (We created in ripple)

                                                        //calback function
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => {   //drop or delete campsites collection from the database 
        assert.strictEqual(err, null);
        console.log('Dropped Collection:', result);    

        //const collection = db.collection('campsites');

        /*collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"}, //re-create it by insert a new document to the campsites collection
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);

            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });
        });*/

        //calling a function                                                                   //defining a function
        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},'campsites', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                { description: "Updated Test Description" }, 'campsites',
                result => {
                    console.log('Updated Document Count:', result.result.nModified);

                    dboper.findDocuments(db, 'campsites', docs => {
                        console.log('Found Documents:', docs);

                        dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                            'campsites', result => {
                                console.log('Deleted Document Count:', result.deletedCount);
                                
                                client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});
