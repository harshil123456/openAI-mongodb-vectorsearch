# openAI-mongodb-vectorsearch
Sample for project which is explain avout the use of mongodb with openAI and vector embedding.

## Step 1: Register for the API key on openAI.
- Link https://platform.openai.com/
- Go to this link and register for you self to ge the API key for getting embedding. ( Embedding is needed for the vector search)
- Follow these stpes and get the API key.

    - ![Alt text](/Readme-images/ai-image-1.png)
    - ![Alt text](/Readme-images/ai-image-2.png)

## Step 2: Setup the node project.
- Go the following link and download the nodejs and install it. https://nodejs.org/en
- Check the node is install or not. I am using mac and using following command.
    - node -v (If it is install it will look like this)
    - ![Alt text](/Readme-images/ai-image-3.png)
- Clone this project.

## Step 3: Setup the mongodb cloud.
- Go to the link and setup the account in cloud mongodb
    - https://cloud.mongodb.com/
- As per following screenshot click on "View pricing" then select the "Shared" cluster.
    - ![Alt text](/Readme-images/ai-image-4.png)
    - ![Alt text](/Readme-images/ai-image-5.png)
- After you setup the account you have to load the sample dataset given by mongo. Use the following link to load the sample mongo dataset. (Note: There are many dataset available but I am using the movies DB)
    - https://www.mongodb.com/docs/atlas/sample-data/#std-label-load-sample-data
    - While going through these stpes make sure you choose "Atlas CLI" option in order to follow the steps.
- Once you setup the sample dataset screen will look like this.
    - ![Alt text](/Readme-images/ai-image-6.png)


### Follow these steps to make application up and running.
- Tools you need
    - Postman for API testing.
    - Studio 3T (Mongo Client to get the mongo data - Optional but useful)
    - Command line (Terminal - for mac)

- Step 1: Go the command prompt/terminal and as per the following screen shot follow these commands.
     1: check you are the root level of the project folder.
     2: Run: npm install (It will create the node_modules folder)
     3: Run: npm start
     4: Project is running on 4040 port
     5: open the bbrowser and paste following link http://localhost:4040/
     6: you will see the "Hello World!" message is application is running.

    - ![Alt text](/Readme-images/ai-image-7.png)

- Step 2: Understand the file and create the search index in mongodb.
    1: Following is the architecture of the project.

     - ![Alt text](/Readme-images/ai-image-8.png)

    2: In readlogic.js file there is a mongoconnection string. How to get that.
        - Go to you account and follow this steps.
        - When you set you account first time it will ask for password. You can choose you own or accept the system generated password. Use that password in connection string.
        - Use this connection string into the JS files.
        
        - ![Alt text](/Readme-images/ai-image-9.png)

    3: Let's create a search index in the MongoDB
        - Click on cluster0
        - Click on seach and create index.
        - click "JSON Editor" option
        - Follow the screenshot for the json object. Give the appropiate name of the index. (We will use the search index name in the searchlogic.js file at line no. 25).

        - ![Alt text](/Readme-images/ai-image-10.png)
        - ![Alt text](/Readme-images/ai-image-11.png)
        - ![Alt text](/Readme-images/ai-image-12.png)
        - ![Alt text](/Readme-images/ai-image-13.png)

        - sample json format
        ```json
        {
            "mappings": {
                "dynamic": true,
                "fields": {
                    "embedding": {
                        "dimensions": 1536,
                        "similarity": "cosine",
                        "type": "knnVector"
                    }
                }
            }
        }
        ```
        

- Step 3: Let's create the embedding.
    1: Open the postman application.
        - Let's create the embedding and store in mongodb for each documemnt.
        - The logic here is from each document read the value of certain keys and add into an array. 
        - Pass that array to the openAI embedding model and get the vector embedding.
        - ![Alt text](/Readme-images/ai-image-16.png)
        - Once you call the API from postman it will create the "embedding" as a key in each collection.
        - API URL: http://localhost:4040/createembedding (POST)
        - ![Alt text](/Readme-images/ai-image-14.png)
        - After embedding got created it will look like this. Also, in the terminal/console you will see the document status if document is updated ot not.
        - ![Alt text](/Readme-images/ai-image-17.png)

- Step 4: Let's Use the openAI to search in MongoDB.
    1: Open the postman application.
        - Use following url for search: http://localhost:4040/searchdocs (POST)
        - Important note: The search text you have to change in the app.js file at line number 49.
        - Result will be like this and it will show top 10 results.
        - ![Alt text](/Readme-images/ai-image-15.png)
    2: Let's understand the search logic.
        - Logic is written in the searchlogic.js file.
        - ![Alt text](/Readme-images/ai-image-18.png)

#### Helpful Articles
- https://www.mongodb.com/docs/atlas/atlas-search/field-types/knn-vector/
- https://dev.to/belyaev/building-a-vector-search-microservice-on-nodejs-developers-guide--39j3

Enjoy and happy Coding. :)


