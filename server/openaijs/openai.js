
import axios from "axios";

/**
 * Main function which is interacting with openAI and getting the vector embeding for any string.
 * data in the request: can be string or array of strings.
 * @param {*} text 
 * @returns 
 */
let createEmbedding = async (text) => {
    try {

        const apiKey = 'reaplce your API key'; // Replace with your OpenAI API key
        const sampletext = text;
        const model = 'text-embedding-ada-002'; // You can choose your own model

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        const data = {
            input: sampletext,
            model: model
        };

        try {
            let embeddata = await axios.post('https://api.openai.com/v1/embeddings', data, { headers })
                .then(response => {
                    // Response contain the embed code for each array.
                    // console.log('Embedding:', response.data.data[0].embedding);
                    return response.data.data[0].embedding;
                })
                .catch(error => {
                    console.error('Error:', error.message);
                    return error.message;
                });
            return { "status": 200, "message": embeddata }
        } catch (err) {
            return { "status": 500, "message": err.message }
        }


    } catch (err) {
        return err.message;
    }

}


export { createEmbedding }