import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './singleNote.css';
import {useHistory} from 'react-router-dom'
import { addTastingNoteThunk } from '../../store/tastingNotes';
import DualPurposeModal from '../dualPurposeModal';
import { useModal } from '../../context/Modal';

const SingleNote = () => {
	const history = useHistory()
	const [isLoading, setIsLoading] = useState(false);
	const { setModalContent } = useModal();
	const tastingNote = useSelector(
		(state) => state.tastingNotes.singleTastingNote
	);
	const dispatch = useDispatch();

	const [loadingDots1, setLoadingDots1] = useState('');
	const [loadingDots2, setLoadingDots2] = useState('');
	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		if (tastingNote && tastingNote.text) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [tastingNote]);

	const handleAddToLibrary = () => {
		dispatch(addTastingNoteThunk(tastingNote));
	};
	const handleButtonClick = () => {
		if (sessionUser) {
			handleAddToLibrary();
			history.push('/library')
		} else {
			setModalContent(<DualPurposeModal />);
		}
	};

	useEffect(() => {
		// Helper function to get a random duration
		const getRandomDuration = (exclude) => {
			const durations = [300, 400, 500].filter((val) => val !== exclude);
			return durations[Math.floor(Math.random() * durations.length)];
		};

		const duration1 = getRandomDuration();
		const duration2 = getRandomDuration(duration1); // This will exclude the value of duration1

		// Start typing effect for the first loadingDots
		const interval1 = setInterval(() => {
			setLoadingDots1((prevDots) =>
				prevDots.length < 9 ? prevDots + '.' : ''
			);
		}, duration1);

		// Start typing effect for the second loadingDots
		const interval2 = setInterval(() => {
			setLoadingDots2((prevDots) =>
				prevDots.length < 9 ? prevDots + '.' : ''
			);
		}, duration2);

		// Clean up intervals when component unmounts
		return () => {
			clearInterval(interval1);
			clearInterval(interval2);
		};
	}, []);

	return (
		<>
			<section className='singleNotePage'>
				<section className='singleNoteContainer'>
					<h2>{tastingNote.name ? tastingNote.name : 'Your Future Note'}</h2>
					<p>
						{isLoading ? (
							<span className='loadingMessage'>
								Your tasting note is currently going through the fermentation
								process, be patient
								<span className='loadingDots'>{loadingDots1}</span>
								<br></br>
								<span>
									Seriously... you dont want to stress the yeast too much
								</span>
								<span className='loadingDots'>{loadingDots2}</span>
								<br></br> <span>Wait</span>
							</span>
						) : (
							tastingNote.text
						)}
					</p>
					{tastingNote.name && (
						<button id='addToBut' onClick={handleButtonClick}>
							{sessionUser
								? 'Add to Library'
								: 'Login or Sign-Up to Add to the Library'}
						</button>
					)}
				</section>
			</section>
		</>
	);
};

export default SingleNote;
