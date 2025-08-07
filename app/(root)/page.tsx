import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupCardType} from "@/components/StartupCard";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { Startup } from "@/app/sanity/types";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { auth } from "@/auth";
 
export default async function Home({searchParams}:{
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query
  const params= {search:query || ""}
  const {data:posts}= await sanityFetch({query:STARTUP_QUERY,params})
  const session = await auth();
  console.log(session?.user?.id)
  return <>
  <section className="pink_container">
  <h1 className="heading">Pitch your startup. <br /> Connect with entrepreneurs.</h1>
  <p className="sub-heading !max-w-3xl">
    Submit Ideas, Vote on Pitches ,and Get Noticed
  </p>
  <SearchForm query={query || ""} />
  </section>
  <section className="section_container">
    <p className="text-30-semibold">
      {query?`Search results for "${query}"`:`All Startups`}
    </p>
    <ul className="mt-7 card_grid">
      {posts?.length>0?(
        posts.map((post:StartupCardType,index:number)=>(
          <StartupCard key={post?._id} post={post} />
        ))
      ):(
        <p className="text-16-regular">No startups found</p>
      )}

    </ul>
  </section>
  <SanityLive />
   </>
}