import React from 'react'
import {Button, Form, Input} from 'antd'
import { Link } from 'react-router-dom'
import Divider from '../../components/Divider'

const rules = [
  {
   required : true,
   message : 'required'
  }
]

const Login = () => {

  const onFinish = (values) => {
    console.log('success', values)
  }

  return (
    <div className='h-screen bg-primary flex justify-center items-center'>
         <div className='bg-white p-5 rounded w-[450px]'>
           <h1 className='text-primary text-2xl'>LOGIN HERE</h1>
             <Divider />
             <Form onFinish={onFinish} layout='vertical'>
               <Form.Item rules={rules} label="Email" name='email'>
                 <Input type='email' placeholder='Email' />
               </Form.Item>
               <Form.Item rules={rules} label="Password" name='password'>
                 <Input type='password' placeholder='Password' />
               </Form.Item>

               <Button type='primary' htmlType='submit' block className='mt-2'>
                 Login
               </Button>
               <div className='mt-5 text-center'>  
                <span className='text-gray-500'>
                 Don't have an account?{''} <Link className='text-primary' to='/register'>Register</Link>
                </span>
               </div>
             </Form>
         </div>
    </div>
  )
}

export default Login