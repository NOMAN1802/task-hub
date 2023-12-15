const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bduz0qc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // collections

    const tasksCollection = client.db("taskDB").collection("tasks");
    const usersCollection = client.db("taskDB").collection("users");
    // routes

    app.get('/tasks', async (req, res) => {
      try {
        const tasks = await tasksCollection.find({}).toArray();
        res.json(tasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    app.post('/tasks', async (req, res) => {
      const newTask = req.body;

      try {
        const result = await tasksCollection.insertOne(newTask);
        res.status(201).json(result);
      } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });



    app.delete('/tasks/:id',async (req,res) =>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await tasksCollection.deleteOne(query)
      res.send(result)

    })
    app.patch('/tasks/:id', async (req, res) => {
      const taskId = req.params.id;
      const updatedTaskData = req.body;

      try {
        const result = await tasksCollection.updateOne(
          { _id: new ObjectId(taskId) },
          { $set: updatedTaskData }
        );

        if (result.matchedCount === 0) {
          res.status(404).json({ error: 'Task not found' });
        } else {
          res.json({ message: 'Task updated successfully' });
        }
      } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

      // search API
    app.get("/findTasksByName/:text", async (req, res) => {
      const text = req.params.text;
      const result = await tasksCollection
        .find({
          $and: [
            { title: { $regex: text, $options: "i" } },
            
          ],
        })
        .toArray();
      res.send(result);
    });

    app.get('/register', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    //  user data  save api 

    app.put('/register', async (req, res) => {
      const user = req.body;
      const query = { email: user.email }
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'User already exist' })
      }
      const result = await usersCollection.insertOne(user);
      res.send(result)
    })

    app.put('/users/:email', async (req, res) => {
      const email = req.params.email;
      const updatedUserData = req.body;
      const filter = { email: email }
      const updateDoc = {
        $set: updatedUserData,
      }
      const result = await usersCollection.updateOne(filter, updateDoc)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Task Master Server is running')
})

app.listen(port, () => {
  console.log(`Task master Server is running on port: ${port}`);
})

