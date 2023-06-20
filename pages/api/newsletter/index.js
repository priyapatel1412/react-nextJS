import {connectDatabase, insertDocument} from '@/helpers/db-utils';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    // Check for a valid email address
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({message: 'Invalid email address'});
      return;
    }

    let client;

    try {
      //Connect to Database
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({message: 'Connecting to Database failed'});
      return; // If Connecting to Database fails return here, no need to further execution of code
    }

    try {
      //Insert to data
      await insertDocument(client, 'newsletter', {email: userEmail});
      res.status(201).json({message: 'Signed Up!'});
    } catch (error) {
      res.status(500).json({message: 'Inserting Data Failed!'});
      return;
    }
    // finally {
    //   await client.close();
    // }
  }
};

export default handler;
