
const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

setGlobalOptions({ maxInstances: 10 });

const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
    cors(req, res, async() => {
        try{
            const bookCollection = admin.firestore().collection("books");
            const snapshot = await bookCollection.get();
            const count = snapshot.size;
            res.status(200).json({count});

        } catch (error){
            console.error("Error when counting books:", error.message);
            res.status(500).send("Error when counting books");
        }
    })
})

exports.getAllBooks = onRequest((req, res) => {
    cors(req, res, async() => {
        try{
            const bookCollection = admin.firestore().collection("books");
            const snapshot = await bookCollection.get();
            const books = snapshot.docs.map(doc => doc.data());
            res.status(200).json({books});
        } catch (error){
            console.error("Error when getting books:", error.message);
            res.status(500).send("Error when getting books");
        }
    })
})

exports.addBook = onDocumentCreated("books/{bookId}", async(event) => {
    try{
        const snapshot = event.data;
        const book = snapshot.data();
        const newData = {}

        for (const [field, value] of Object.entries(book)) {
            if (typeof value === 'string') {
                newData[field] = value.toUpperCase()
            } else {
                newData[field] = value
            }

        }

        newData.capitalised = true;

        await snapshot.ref.update(newData);

        console.log(`Book id ${event.params.bookId} is capitalised`)

    } catch (error){
        console.error("Error when counting books:", error.message);
        throw error
    }
})
