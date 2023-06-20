import {MongoClient} from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(process.env.NODE_ENV_MONGODB_URI);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = await client.db();

  // Create a collection and inser data
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const database = await client.db();

  const documents = await database
    .collection(collection)
    // To find comments collection in db for that particular event
    // The default (an empty object: {}) ensures that NO filter is applied (i.e. we get ALL documents).
    .find(filter)
    .sort(sort) // sort ids in descending order
    .toArray(); // To get an array of documents

  return documents;
}
