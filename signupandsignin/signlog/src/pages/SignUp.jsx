import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { signup } from '../services/api';
import { routeHandler } from '../services/routerHandler';

export default function SignUp() {
    const navigateTo = useNavigate();
    const [formInput, setFormInput] = React.useState({
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        termsAccepted: false // Add termsAccepted to state
    });
    const { auth } = useContext(AuthContext);
    const [jwt, setJwt] = auth;

    const handleForm = (e) => {
        e.preventDefault();
        if (!formInput.termsAccepted) {
            alert("You must accept the terms and conditions to proceed.");
            return;
        }
        signup({
            userName: formInput.userName,
            email: formInput.email,
            phoneNumber: formInput.phoneNumber,
            password: formInput.password
        })
            .then(res => {
                setFormInput({
                    userName: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    termsAccepted: false // Reset termsAccepted
                });
                setJwt(res.data);
                navigateTo("/home");
            })
            .catch(error => {
                alert(error.message);
            });
    };

    useEffect(() => {
        routeHandler(navigateTo, jwt);
    }, [navigateTo, jwt]);

    return (
        <div className="bg-gray-100 relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md ring ring-2 ring-purple-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
                    Sign up
                </h1>
                <form className="mt-6" onSubmit={handleForm}>
                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            User Name
                        </label>
                        <input
                            onChange={(e) => setFormInput({ ...formInput, userName: e.target.value })}
                            value={formInput.userName}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                            value={formInput.email}
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="number"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone Number
                        </label>
                        <input
                            onChange={(e) => setFormInput({ ...formInput, phoneNumber: e.target.value })}
                            value={formInput.phoneNumber}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            onChange={(e) => setFormInput({ ...formInput, password: e.target.value })}
                            value={formInput.password}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={formInput.termsAccepted}
                                onChange={(e) => setFormInput({ ...formInput, termsAccepted: e.target.checked })}
                                className="form-checkbox h-5 w-5 text-purple-600"
                            />
                            <span className="ml-2 text-sm text-gray-800">I accept the terms and conditions</span>
                        </label>
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Registration
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigateTo("/")}
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
}
