import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            authorization:{
                params: {
                    prompt:'consent',
                    access_type:'offline',
                    response_type:'code'
                }
            }
        })
    ],
    //secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        //Invoked on successfull sign in
        async signIn({profile}) {
            //1. Connectto the database
            await connectDB();

            //2. Check if user exists

            const userExists = await User.findOne({emal:profile.email});

            //3. If not, create user
            if(!userExists) {
                //Truncate if username is too long
                const username = profile.name.slice(0, 20);

                await User.create({
                    email:profile.email,
                    username, 
                    image:profile.picture
                });

            }
            //4. Return true to allow sign in

            return true;
        },
        //Session callback function that modifies the session object
        async session({session}) {
            //1. Get the user from the database
            const user = await User.findOne({email:session.user.email});
        
            //2. Sign the user id from the session
            session.user.id = user._id.toString();
            //3. Return session
            return session;
        }
    }
};