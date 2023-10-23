

import cors from "cors";
import express from 'express';
import bodyParser from "body-parser"

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Set the port which you want application to be running on.
app.listen(4040, () => {
    console.log('Server is running on port 4040');
});

// To avoid the cors error and server app will allow all the origin's request.
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
);

/**
 * Following API is to create the embed code for each document.
 */
import { createVector } from "../server/logic/readlogic.js"
app.post("/createembedding", async (req, res) => {
    let exportedresults = await createVector();
   
    res.set("Content-Type", "application/json");
   
    res.status(200).send(exportedresults)

});
/**
 * Following API to search the documents in the mongodb collection.
 */
import { searchmoviecollection } from "../server/logic/searchlogic.js"
app.post("/searchdocs", async (req, res) => {
    let exportedresults = await searchmoviecollection(["sci fi french and american movies"]);
   
    res.set("Content-Type", "application/json");
   
    res.status(200).send(exportedresults)

});
