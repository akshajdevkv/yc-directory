import { STARTUP_QUERY_BY_ID } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import { formatDate } from '@/sanity/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import MarkdownIt from 'markdown-it'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/View'

const md = new MarkdownIt();

// Helper function to create username from name
const createUsername = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, '');
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  
  const { data: post } = await sanityFetch({
    query: STARTUP_QUERY_BY_ID,
    params: { id }
  })
  
  if (!post) {
    return <div>Startup not found</div>
  }
 const parsedContent = md.render(post?.pitch||'');
 
  return (
    <>
    <section className="pink_container min-h-[230px]">
    <p className="tag">{formatDate(post._createdAt)} </p>
    <h1 className="heading">{post.title}</h1>
    <p className="sub-heading">{post.description}</p>
    </section>
    <section className="section_container">
        <img src={post.image} alt="thumbnail" className='w-full h-auto rounded-xl object-cover'  />
        <div className="space-y-5 mt-10 max-2-4xl mx-auto">
            <div className="flex-between gap-5">
                <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
                <Image 
                src={post?.author?.image || "https://placehold.co/72x72"}
                 alt="avatar" 
                 width={72} 
                 height={72} 
                 className="rounded-full drop-shadow-lg"
                 />
                   <div>
                <p className="text-20-medium">{post?.author?.name}</p>
                <p className="text-16-medium !text-black-300">@{createUsername(post?.author?.name || "")}</p>
              </div>
            
                     </Link>
            <p className="category-tag">{post.category}</p>
   </div>
   <h3 className="text-30-bold">Pitch Details</h3>
   {parsedContent?(
    <article  className='prose max-w-4xl font-work-sans break-all' dangerouslySetInnerHTML={{__html: parsedContent}}/> 
    ):(
      <p className="no-result">No pitch available</p>
    )}
        </div>
        <hr  className='divider'/> 

                 <Suspense fallback={<Skeleton className="view-skeleton" />}>
<View id={id} />
        </Suspense>
    </section>
     
    </>
  )
}

export default page
