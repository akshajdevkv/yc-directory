import React from 'react'
import Link from 'next/link'
import { formatDate } from '@/sanity/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Startup, Author } from '@/app/sanity/types'
export type StartupCardType =  Omit<Startup,"author">&{author?:Author}

const StartupCard = ({post}:{post:StartupCardType}) => {
  const {
    _createdAt,
    views,
    author,
    _id,
    description,
    image,
    category,
    title
  } = post;
  const authorId = author?._id;
  const authorName = author?.name;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">
          {formatDate(_createdAt)}
        </p>
        <div className="flex-center gap-1.5">
          <EyeIcon className="size-4 text-primary" />
          <span className="text-16-medium "> {views} </span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
            <Link href={`/user/${authorId}`}>
           <p className="text-16-medium line-clamp-1">{authorName}</p>
           </Link>
           <Link href={`/startup/${_id}`}>
            <p className="text-20-semibold line-clamp-1">{title}</p>
           </Link>
        <Link href={`/user/${authorId}`}>
          <Image unoptimized src="https://placehold.co/48x48" alt="placeholder" className="rounded-full" width={48} height={48} />
        </Link>
        </div>

      </div>
      <Link href={`/startup/${_id}`}>
      <p className="startup-card_desc">
        {description}
      </p>
      <Image 
        src={image || ""} 
        alt={title || ""} 
        className="startup-card_img" 
        width={300} 
        height={200}
        unoptimized
      />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
        <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>
          Details
          </Link>
        </Button>
      </div>
    </li>
  )
}

export default StartupCard