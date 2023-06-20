import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '@/helpers/db-utils';

// Set Dynamic route '/api/comments/[eventId]

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({message: 'Connecting to the database failed!'});
    return;
  }

  if (req.method === 'POST') {
    const userEmail = req.body.email;
    const userName = req.body.name;
    const comment = req.body.comment;

    if (
      !userEmail ||
      !userEmail.includes('@') ||
      userName.trim() === '' ||
      comment.trim() === ''
    ) {
      res.status(422).json({message: 'Invalid Credentials'});
      return;
    }

    const newComment = {
      eventId: eventId,
      email: userEmail,
      name: userName,
      comment: comment,
    };

    let result;

    try {
      //Insert to data
      result = await insertDocument(client, 'comments', newComment);
      console.log('result', result);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({message: 'Comment Added successfully', comment: newComment});
    } catch (error) {
      res.status(500).json({message: 'Inserting Data Failed!'});
    }
  }

  if (req.method === 'GET') {
    try {
      client = await connectDatabase();
      const documents = await getAllDocuments(
        client,
        'comments',
        {_id: -1},
        {eventId: eventId}
      );
      res.status(200).json({comments: documents});
    } catch (error) {
      res.status(500).json({message: 'Getting Comments failed'});
    }
    // finally {
    //   await client.close();
    // }
  }
};

export default handler;
