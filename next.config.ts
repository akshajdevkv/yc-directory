import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    dangerouslyAllowSVG:true,
     remotePatterns:[
      {
        protocol:'https',
        hostname:'*'
      },
      { 
        protocol: 'https', 
        hostname: 'yt3.googleusercontent.com' 
      },
      { 
        protocol: 'https', 
        hostname: 'i.ytimg.com' 
      }
    ]
  },
  devIndicators:{
    position:'bottom-right',
  }
};

export default nextConfig;
