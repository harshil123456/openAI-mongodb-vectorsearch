
import { MongoClient } from "mongodb";
import { createEmbedding } from "../openaijs/openai.js";


const mongodbConfig = {

    collectionName: 'movies',
    dbName: 'sample_mflix',
    uri: "mongodb+srv://xxxxxxxxx:xxxxxxxxxxxxxxx@cluster0.xxxx.xxxx.xxx/?retryWrites=true&w=majority"

}
//searcintest
let findSimilarDocuments = async (embedding) => {
    const client = new MongoClient(mongodbConfig.uri, { useUnifiedTopology: true });
    await client.connect();

    const collection = client.db(mongodbConfig.dbName).collection(mongodbConfig.collectionName);
    // searchindex name : searchgenious
    try {
        const documents = await collection
            .aggregate([
                {
                    "$search": {
                        "index": "moviesearchindex",
                        "knnBeta": {
                            "vector": embedding,
                            "path": "embedding",
                            "k": 5
                        }
                    }
                },
                {
                    $project: {
                        score: { $meta: 'searchScore' },
                        title: 1,
                        languages: 1,
                        awards: 1,
                        imdb: 1,
                        year:1,
                        cast:1,
                        

                    },
                },
            ])
            .toArray()

        const highestScoreDoc = documents.reduce((highest, current) => {
            return highest.score > current.score ? highest : current
        })
        return documents;

    } catch (err) {
        return err.message;
    }
}

let searchmoviecollection = async (searchtext) => {
  
    try {
        console.log("search text : ", searchtext);
        const embedding = await createEmbedding(searchtext);
        if (embedding.status == 200) {
            let embedcode = embedding.message;
           
            const documents = await findSimilarDocuments(embedcode);
          
            return documents;
        } else {
            return "error"
        }


    } catch (err) {
        console.error(err);
        return err.message;
    }
}

export { searchmoviecollection }