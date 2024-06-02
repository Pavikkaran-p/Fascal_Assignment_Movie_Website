import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://127.0.0.1:3001/api/auth/signup', { name, email, password })
        .then(result => {
            if (result.data === "Already registered") {
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/login');
            } else {
                toast.success("Registered successfully");
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="flex justify-center items-center text-center min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-purple-700">
            <div className="bg-white p-8 rounded shadow-lg w-1/3">
                <h2 className="mb-6 text-2xl font-bold text-blue-600">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-left">
                        <label htmlFor="name" className="block font-bold mb-2">Name</label>
                        <input 
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            className="w-full px-3 py-2 border rounded"
                            onChange={(event) => setName(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="email" className="block font-bold mb-2">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Enter Email"
                            className="w-full px-3 py-2 border rounded"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="password" className="block font-bold mb-2">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            placeholder="Enter Password"
                            className="w-full px-3 py-2 border rounded"
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
                </form>
                <p className="mt-4">Already have an account?</p>
                <Link to='/login' className="inline-block bg-gray-600 text-white py-2 px-4 rounded mt-2">Login</Link>
            </div>
            <ToastContainer autoClose={4000} />
        </div>
    )
}

export default Signup