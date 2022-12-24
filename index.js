const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z9zwita.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const productCullection = client.db('woalmart').collection('products')
        const productBookings = client.db('woalmart').collection('bookings')

        app.get('/allProducts', async (req, res) => {
            const query = {}
            const result = await productCullection.find(query).toArray()
            res.send(result)
        })

        app.get('/bookings', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const result = await productBookings.find(query).toArray()
            res.send(result)
        })


        app.post('/bookings', async (req, res) => {
            const booked = req.body;
            const result = await productBookings.insertOne(booked)
            res.send(result)
        })

        app.delete('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await productBookings.deleteOne(filter)
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(err => console.error(err))



app.get('/', (req, res) => {
    res.send('woalmart portal sarvar is running')
})

app.listen(port, () => console.log(`woalmart portal running on ${port}`))