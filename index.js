const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


//middleware

app.use(cors());
app.use(express.json());


//NewgeniusUser
//OUIKXl5xPyZnyd1G

const verifyjwt = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    //console.log('Inside verified token', authHeader);
    if(!authHeader){
       return res.status(401).send({message: 'unauthorizd'});
    }
    const token = authHeader.split(' ')[1];
    // console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            return res.status(403).send({message:'forbidden'});
        }
        req.decoded = decoded;
        next();
    })
}



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cypwp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("DB connected");
//   client.close();
// });

async function run(){
    try{
        await client.connect();
        const serviceCollection = client.db('NewgeniusCar').collection('service');
        const orderCollection = client.db('NewgeniusCar').collection('order');
        
        // Auth
        app.post('/login', async(req, res) =>{
            const user = req.body;
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
            res.send({success:true, accessToken:accessToken});
            // console.log(user);
        })
        // Service Api
        app.get('/service', async(req, res) =>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray()
            res.send(services);
        })

        app.get('/service/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        //POST
        app.post('/service', async(req, res) =>{
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        })

        //Delete
        app.delete('/service/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        })

        //Order collection API
        app.post('/order', async(req, res) =>{
            // const authHeader = req.headers.authorization;
            // console.log(authHeader);
            const order = req.body;
            const result= await orderCollection.insertOne(order);
            res.send(result);
        })


        //Get all orders
        app.get('/orders', verifyjwt, async(req, res) =>{
            const authHeader = req.headers.authorization;
            //console.log(authHeader);
            const email = req.query.email;
            const query = {email: email};
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray()
            res.send(orders);
        })
    }
    finally{

    }
}

run().catch(console.dir());



app.get('/', (req, res) =>{
    res.send('Running genius server');
})


app.listen(port, ()=>{
    console.log('Listening to port 5000');
})