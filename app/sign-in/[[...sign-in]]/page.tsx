import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignIN = () => {
  return (
    <div className='flex justify-center items-center align-middle'>
        <SignIn forceRedirectUrl="/"/>
    </div>
  )
}

export default SignIN