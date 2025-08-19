import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='max-w-7xl px-8 mx-auto h-[60vh] flex flex-col justify-center items-center'>
        <h1 className="text-3xl font-bold text-primary">Loading...</h1>
        <Loader2 className='text-primary animate-spin w-10 h-10'/>
    </div>
  )
}

export default Loading