import { MongoClient } from 'mongodb';

export async function POST(req) {
    const { email, name, message } = await req.json();

    // Input validation
    if (
        !email ||
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !message ||
        message.trim() === ''
    ) {
        return new Response(
            JSON.stringify({ message: 'Invalid input.' }),
            { status: 422 }
        );
    }

    const newMessage = {
        email,
        name,
        message,
    };

    // MongoDB connection string
    const connectionString = `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_USER_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.yjqon.mongodb.net/my-site?retryWrites=true&w=majority`;

    let client;

    try {
        // Connect to MongoDB
        client = await MongoClient.connect(connectionString);
    } catch (error) {
        console.log('error -=-=-=-=-=->', error);
        return new Response(
            JSON.stringify({ message: 'Could not connect to database.' }),
            { status: 500 }
        );
    }

    const db = client.db();

    try {
        // Insert the message into the database
        const result = await db.collection('messages').insertOne(newMessage);
        newMessage.id = result.insertedId;
    } catch (error) {
        client.close();
        return new Response(
            JSON.stringify({ message: 'Storing message failed!' }),
            { status: 500 }
        );
    }

    client.close();

    // Success response
    return new Response(
        JSON.stringify({
            message: 'Successfully stored message!',
            message: newMessage,
        }),
        { status: 201 }
    );
}
