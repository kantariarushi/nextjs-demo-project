import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://rushikantaria:TfXkYarzsmM7aTUI@cluster0.yjqon.mongodb.net/my-site?retryWrites=true&w=majority`;

let client;

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials.password) {
                    throw new Error("Missing email or password");
                }

                try {
                    // Connect to MongoDB
                    client = await MongoClient.connect(connectionString);
                    const db = client.db();
                    const messagesCollection = db.collection("messages");

                    // Find the user by email
                    const user = await messagesCollection.findOne({ email: credentials.username });
                    if (!user) {
                        throw new Error("No user found with the given email");
                    }

                    // Check if the password matches
                    // const isValidPassword = await bcrypt.compare(credentials.password, user.name); // Use the correct field
                    if (credentials.password !== user.name) {
                        throw new Error("Invalid password");
                    }

                    // Return the user object if authentication is successful
                    return { id: user._id, email: user.email };
                } catch (error) {
                    throw new Error(error.message);
                } finally {
                    if (client) {
                        await client.close();
                    }
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
