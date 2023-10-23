import fs from "fs";
import { MongoClient } from "mongodb";
import { createEmbedding } from "../openaijs/openai.js";


// Object which is holding the mongodb connection string settins.
const mongodbConfig = {

    collectionName: 'movies',
    dbName: 'sample_mflix',
    uri: "mongodb+srv://xxxxxxxxx:xxxxxxxxxxxxxxx@cluster0.xxxx.xxxx.xxx/?retryWrites=true&w=majority"

}
const createVector = async() => {
    try {
        const client = new MongoClient(mongodbConfig.uri, { useUnifiedTopology: true });
        let connectionstatus = await client.connect(); // Establish the connection
    
        const db = client.db(mongodbConfig.dbName);
        const collection = db.collection(mongodbConfig.collectionName);
        const cursor = await collection.find();
        await cursor.forEach(async (doc) => {
            // Loop through each document and put the text in to an array. Text which we want to include in the vector search.
            if (doc.embedding && doc.embedding.length > 0) {
                console.log("Siliocn product name which has already embed code: ", doc.siliconProduct)
            } else {
                let embeddArray;
                embeddArray = [].concat(doc.countries);
               
                if (doc.rated) {
                    embeddArray = embeddArray.concat(doc.rated);
                }
                if (doc.genres) {
                    embeddArray = embeddArray.concat(doc.genres);
                }

                if (doc.cast) {
                    embeddArray = embeddArray.concat(doc.cast);
                }
                if (doc.title) {
                    embeddArray = embeddArray.concat(doc.title);
                }
                if (doc.fullplot) {
                    embeddArray = embeddArray.concat(doc.fullplot);
                }

                if (doc.languages) {
                    embeddArray = embeddArray.concat(doc.languages);
                }
                if (doc.directors) {
                    embeddArray = embeddArray.concat(doc.directors);
                }
                if (doc.type) {
                    embeddArray = embeddArray.concat(doc.type);
                }

                // embeddArray: This is the array consise of the all the proerties from the document which we want to include in search criteria.
                
                // Following function will call the function to get the embedding for each array.
                const embedding = await createEmbedding(embeddArray);
                if (embedding.status == 200) {
                    let embedcode = embedding.message;
                    doc.embedding = embedcode;

                    // Update the document in the mongodb collection with embed code.
                    let updateddocumentstatus = await collection.updateOne(
                        { _id: doc._id }, // Assuming '_id' is the unique identifier field
                        { $set: doc }
                    );
                 
                    console.log("update embedding status : ", updateddocumentstatus);
                    console.log('========================================');

                } else {
                    console.log("Embedding is not working");
                }
            }
        });
    }
    catch (err) {
        console.log("Error in adding embedding");
    }
}

export { createVector }