
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_QUERY } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  })],
  callbacks:{
        async signIn({user,account,profile}){
          
      const githubId = Number(profile?.id); // Convert to number
      const existingUser = await client.fetch(AUTHOR_BY_GITHUB_QUERY,{id:githubId})
       if(!existingUser){
        await writeClient.create({
          _type:"author",
          id:githubId, // Store as number
          name:user?.name,
          username:profile?.login,
          email:user?.email,
          image:profile?.avatar_url,
          bio:profile?.bio || "",
        })
       }
       return true
    },
    async jwt({token,account,profile}){
      if(account && profile){
        const githubId = Number(profile?.id); // Convert to number
        const user = await client.fetch(AUTHOR_BY_GITHUB_QUERY,{id:githubId})
        
        if(user){
          token.id = user._id;  // ← This line is critical!
        }
      }
      return token;
    },
    async session({ session, token }) {
     
      // Explicitly merge custom fields into the returned session object
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id ,
           
        },
      } as typeof session & { user: { id?: string } };
    }
  } 


}) 