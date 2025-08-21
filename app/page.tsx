import React from 'react'
import { connectToDatabase } from './lib/db'

function page() {
  connectToDatabase().then((conn) => {console.log(conn);
  }).catch((err) => {console.log(err);
  });
  return (
    <div className='w-full h-screen'>page</div>
  )
}

export default page