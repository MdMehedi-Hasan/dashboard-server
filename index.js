const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const port =process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.zvb4m.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("dashboard").collection("student-dashboard");

async function run() {
    try {
        await client.connect();

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })
        app.post('/newStudent', async(req, res) => {
            const newStudent = req.body;
            const result = await collection.insertOne(newStudent)
            // console.log(req.body);
            res.send(result)
        })
        app.get('/newStudent', async(req, res) => {
            const query = {}
            const cursor = await collection.find(query).toArray()
            res.send(cursor)
        })
    } finally {

    }
}

run().catch(console.dir);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})