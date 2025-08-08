import { client } from '@/sanity/lib/client'
import { STARTUP_QUERY_BY_AUTHOR_ID } from '@/sanity/lib/queries'
import StartupCard from './StartupCard'
import Link from 'next/link'
import React from 'react'

const UserStartups = async ({id}:{id:string}) => {
    const startups = await client.fetch(STARTUP_QUERY_BY_AUTHOR_ID, {id})
   return <>
   {startups.length>0? startups.map((startup:any)=>(
     <StartupCard key={startup._id} post={startup} />
   )): <p className='text-center text-14-normal'>No startups found</p>}
   </>
}

export default UserStartups