import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  // Use UTC to avoid hydration mismatches between server and client
  const d = new Date(date)
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d)
}

export function  parseServerActionResponse<T>(response:T){
  return JSON.parse(JSON.stringify(response))
}
