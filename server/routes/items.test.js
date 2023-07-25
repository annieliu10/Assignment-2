const request = require('supertest');
const express = require('express');
const { MongoClient } = require('mongodb');
const itemsRouter = require('./items');

const app = express();
app.use(express.json());
app.use('/items', itemsRouter);

describe('ItemForm Endpoints', () => {
  let client;
  let db;

  beforeAll(async () => {
    // Connect to the mock database
    client = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Set the MongoDB client instance in the app
    app.client = client;

    // Get the reference to the test database
    db = client.db('inventory');
  });

//   afterAll(async () => {
//     // Close the MongoDB client
//     await client.close();
//   });

  beforeEach(async () => {
    // Clear the test database before each test
    await db.collection('inventory_items').deleteMany({});
  });

  test('GET /items should return the list of items', async () => {
    // Create a mock items collection
    const itemsCollection = db.collection('inventory_items');
    const mockItems = [
      { name: 'Item 1', price: 10 },
      { name: 'Item 2', price: 20 },
    ];

    // Insert mock data into the mock collection
    await itemsCollection.insertMany(mockItems);

    // Use supertest to call the route handler function directly
    const response = await request(app).get('/items');

    // Verify the response
    expect(response.status).toBe(200);
  });

  // Add more test cases for other endpoints as needed
});
