const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
require('dotenv').config();

app.get('/',(req,res)=>{
    res.send('Server is Activate Successfully');
});

//---------------------------------------------->
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.idipp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect(); 
//---------------------------------------------------------------------------->

 const serviceCollection = client.db('bh-slys').collection('service-datas');

// Services data post ------------------->
app.post('/services', async(req,res)=> {
   const datas = req.body;
   const result = await serviceCollection.insertOne(datas);
   res.send(result);
});

// Services data get ------------------->
app.get('/services', async(req,res)=> {
   const cursor = serviceCollection.find();
   const result = await cursor.toArray();
   res.send(result);
});




//---------------------------------------------------------------------------->
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

//---------------------------------------------->

app.listen(port, ()=>{
    console.log('Server is Running on Port '+ port);
});