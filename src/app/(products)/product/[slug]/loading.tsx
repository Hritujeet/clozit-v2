import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[60vh] gap-2'>
        <h1 className='text-3xl font-bold text-primary'>Loading...</h1>
        <Loader2 className='text-primary animate-spin w-10 h-10'/>
    </div>
  )
}

export default loading