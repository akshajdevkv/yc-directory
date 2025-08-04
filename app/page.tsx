import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupCardType} from "@/components/StartupCard";
 

export default async function Home({searchParams}:{
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query
  const posts=[
    {
      _createdAt: new Date().toISOString(),
      views:55,
      author:{
        _id:1,
        name:"John Doe"
      },
      _id:1,
      description:'This is a description',
      image:'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category:"Robots",
      title:"We Robots"
        }
  ]
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
    <ul className="mt-7">
      {posts?.length>0?(
        posts.map((post:StartupCardType,index:number)=>(
          <StartupCard key={post?._id} post={post} />
        ))
      ):(
        <p className="text-16-regular">No posts found</p>
      )}

    </ul>
  </section>
  </>
}