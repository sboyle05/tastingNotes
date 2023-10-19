import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	generateNoteFromAPI,
	clearTastingNote,
} from '../../store/tastingNotes';
import './create.css';

const Create = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isNonVintage, setIsNonVintage] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		style: 'red',
		vintage: '',
		varietal: '',
		blend: '',
		location: '',
		elevation: '',
		vineyard: '',
		palateNotes: '',
		noseNotes: '',
		foodPairings: 'notIncluded',
		desiredLength: '3',
		writingStyle: '',
	});
	const isFormValid = formData.name.trim() !== '' && formData.style !== '';
	const handleCheckboxChange = (e) => {
		const isNonVintageValue = e.target.value === 'yes'; // Will be true if "yes", false otherwise
		setIsNonVintage(isNonVintageValue);
		if (isNonVintageValue) {
			// if changing to non-vintage, clear the vintage input
			setFormData({
				...formData,
				vintage: '',
			});
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const generatePrompt = (formData) => {
		let prompt = `Generate a ${formData.desiredLength} sentence long tasting note for a wine with the following characteristics: `;
		if (formData.name) prompt += `Name: ${formData.name}, `;
		if (formData.style) {
			prompt += `Style: ${formData.style}, `;
			if (formData.style.toLowerCase() === 'fortified') {
				prompt += `This is a port/fortified/dessert wine. `;
			}
		}
		if (!isNonVintage && formData.vintage)
			prompt += `Vintage: ${formData.vintage}, `;
		if (formData.varietal) prompt += `Varietal: ${formData.varietal}, `;
		if (formData.blend) prompt += `Blend: ${formData.blend}, `;
		if (formData.location) prompt += `Location: ${formData.location}, `;
		if (formData.elevation) prompt += `Elevation: ${formData.elevation}, `;
		if (formData.vineyard) prompt += `Vineyard Type: ${formData.vineyard}, `;
		if (formData.palateNotes)
			prompt += `Palate Notes: ${formData.palateNotes}, `;
		if (formData.noseNotes) prompt += `Nose Notes: ${formData.noseNotes}, `;
		if (formData.foodPairings === 'included')
			prompt += `Please include food pairings. `;
		if (formData.writingStyle)
			prompt += `Writing style should be ${formData.writingStyle}.`;

		return prompt;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const prompt = generatePrompt(formData);
		dispatch(clearTastingNote());
		dispatch(generateNoteFromAPI(prompt, formData.name));

		history.push('/singleNote');
		console.log(formData);
	};

	return (
		<>
			<section className='formPage'>
				<section className='formContainer'>
					<form id='tastingNoteForm' onSubmit={handleSubmit}>
						<h1 id='formTitle'>Create A Tasting Note</h1>
						<section className='formInputs'>
							<section className='formColumn'>
								{/* Name */}
								<label>Name:</label>
								<input
									type='text'
									name='name'
									value={formData.name}
									onChange={handleChange}
									placeholder='2019 Sagemoor Red Blend'
								/>
								{/* Style */}
								<label>
									Style:
									<select
										name='style'
										value={formData.style}
										onChange={handleChange}
									>
										<option value='red'>Red</option>
										<option value='white'>White</option>
										<option value='rose'>Rose</option>
										<option value='sparkling'>Sparkling</option>
										<option value='fortified'>Fortified</option>
									</select>
								</label>

								{/* Vintage */}

								<label>Non-vintage:</label>
								<section className='radioGroup'>
									<section className='radioItem'>
										<input
											type='radio'
											name='isNonVintage'
											value='yes'
											onChange={handleCheckboxChange}
										/>
										<label>Yes</label>
									</section>
									<section className='radioItem'>
										<input
											type='radio'
											name='isNonVintage'
											value='no'
											defaultChecked
											onChange={handleCheckboxChange}
										/>
										<label>No</label>
									</section>
								</section>
								<label>
									Vintage:
									<input
										type='number'
										name='vintage'
										value={formData.vintage}
										onChange={handleChange}
										disabled={isNonVintage}
										placeholder='2019'
									/>
								</label>

								{/* Varietal */}
								<label>
									Varietal:
									<input
										type='text'
										name='varietal'
										value={formData.varietal}
										onChange={handleChange}
										placeholder='Cab Sauv'
									/>
								</label>

								{/* Blend */}
								<label>
									Blend:
									<input
										type='text'
										name='blend'
										value={formData.blend}
										onChange={handleChange}
										placeholder='80% cab sauv, 20% merlot'
									/>
								</label>

								{/* Location */}
								<label>
									Geographical Location:
									<input
										type='text'
										name='location'
										value={formData.location}
										onChange={handleChange}
										placeholder='Walla Walla, WA'
									/>
								</label>
							</section>
							<section className='formColumn'>
								{/* Elevation */}
								<label>
									Elevation:
									<input
										type='text'
										name='elevation'
										value={formData.elevation}
										onChange={handleChange}
										placeholder='optional'
									/>
								</label>
								{/* Vineyard */}
								<label>
									Vineyard:
									<select
										name='vineyard'
										value={formData.vineyard}
										onChange={handleChange}
									>
										<option value='dryFarmed'>Dry Farmed</option>
										<option value='irrigated'>Irrigated</option>
									</select>
								</label>

								{/* Palate Notes */}
								<label>
									Palate Notes:
									<input
										type='text'
										name='palateNotes'
										value={formData.palateNotes}
										onChange={handleChange}
										placeholder='ex: buttery, tannic, licorice'
									/>
								</label>

								{/* Nose Notes */}
								<label>
									Nose Notes:
									<input
										type='text'
										name='noseNotes'
										value={formData.noseNotes}
										onChange={handleChange}
										placeholder='ex: citrus zest, cedar, vanilla'
									/>
								</label>

								{/* Food Pairings */}
								<label>
									Food Pairings:
									<select
										name='foodPairings'
										value={formData.foodPairings}
										onChange={handleChange}
									>
										<option value='included'>Included</option>
										<option value='notIncluded'>Not Included</option>
									</select>
								</label>

								{/* Length */}
								<label>
									Desired Length:
									<select
										name='desiredLength'
										value={formData.desiredLength}
										onChange={handleChange}
									>
										<option value='1'>1 Sentence</option>
										<option value='2'>2 Sentences</option>
										<option value='3'>3 Sentences</option>
										<option value='4'>4 Sentences</option>
										<option value='5'>5 Sentences</option>
										<option value='6'>6 Sentences</option>
										<option value='7'>7 Sentences</option>
										<option value='8'>8 Sentences</option>
										<option value='9'>9 Sentences</option>
									</select>
								</label>

								{/* Writing Style */}
								<label>
									Desired Writing Style:
									<select
										name='writingStyle'
										value={formData.writingStyle}
										onChange={handleChange}
									>
										<option value='classic'>Classic</option>
										<option value='humorous'>Humorous</option>
										<option value='story'>Tells A Story</option>
									</select>
								</label>
							</section>
						</section>
						<button
							id='submitTastingNoteForm'
							form='tastingNoteForm'
							type='submit'
							disabled={!isFormValid}
						>
							Submit
						</button>
					</form>
				</section>
			</section>
		</>
	);
};

export default Create;
