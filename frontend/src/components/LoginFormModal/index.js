import React, { useState } from 'react';
import { login } from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const formattedCredential = credential.toLowerCase();
	const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(login({credential: formattedCredential, password}));


    if (data?.errors){
			const errorMessages = Object.values(data.errors);
    setErrors(errorMessages);

    } else {
        closeModal();
    }
};

	return (
		<>
			<section className='logincontainer'>
				<h1>Log In</h1>
				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<section className='loginLabelInput'>
						<label>Email or Username</label>
						<input
							type='text'
							id='emailInput'
							value={credential}
							onChange={(e) => setCredential(e.target.value)}
							required
						/>
					</section>
					<section className='loginLabelInput'>
						<label>Password</label>
						<input
							type='password'
							id='passwordInput'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</section>
					<section className='loginFormButs'>
						<section className='loginSubmitBut'>
							<button className='loginSubmit' type='submit'>
								Log In
							</button>
						</section>
					</section>
				</form>
			</section>
		</>
	);
}

export default LoginFormModal;
