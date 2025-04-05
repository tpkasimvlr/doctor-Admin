import { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const { setAToken } = useContext(DoctorContext)
    const {setDToken,dToken} = useContext(AdminContext)

    const onsubmitHandler = async (event) => {
        event.preventDefault() 

        try {
            if (state === 'Admin') {
                const { data } = await axios.post('http://localhost:4000/api/admin/login', { email, password })
                
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    // setAToken(data.token)
                    console.log(data.token)
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post('http://localhost:4000/api/doctor/login', { email, password })
                
                if (data.success) {
                    localStorage.setItem('dToken', data.token)
                    // setDToken(data.token)
                    console.log(data.token)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) { 
            console.error("Login error:", error.response?.data || error.message)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div>
            <form onSubmit={onsubmitHandler} className='min-h-[80vh] flex items-center'>
                <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                    <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>

                    <div className='w-full'>
                        <p>Email</p>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='border border-[#DADADA] rounded w-full p-2 mt-1' 
                            type="email"  
                            required 
                        />
                    </div>
                    <div className='w-full'>
                        <p>Password</p>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password}  
                            className='border border-[#DADADA] w-full rounded p-2 mt-1' 
                            type="password" 
                            required 
                        />
                    </div>
                    <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>

                    {state === 'Admin' ? (
                        <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
                    ) : (
                        <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Login
