import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler=NextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"email"},
                password:{label:"Password",tpe:"password"},
            },
            async authorize(credentials){
                const{email,password}=credentials;
                if(email==="admin@company.com" && password==="admin123"){
                    return {
                        id:"1",
                        name:"John Admin",
                        email:"admin@company.com",
                        role:"Administrator",
                    };
                }
                return null;
            },
        })
    ],
    pages:{
        signIn:"/auth",
    },
    callbacks:{
        async session({session,token}){
            session.user.role=token.role;
            return session;
        },
        async jwt({token,user}){
            if (user) token.role=user.role;
            return token;
        },
    },
    session:{
        strategy:"jwt",
    },
    secret:process.env.NEXTAUTH_SECRET,
});

export {handler as GET , handler as POST};