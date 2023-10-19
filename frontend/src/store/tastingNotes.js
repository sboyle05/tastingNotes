import { csrfFetch } from './csrf';
export const GET_SINGLE_TASTING_NOTE = 'GET_TASTING_NOTE';
export const GET_TASTING_NOTES = 'GET_TASTING_NOTES';
export const UPDATE_TASTING_NOTE = 'UPDATE_TASTING_NOTE';
export const ADD_TASTING_NOTE = 'CREATE_TASTING_NOTE';
export const DELETE_TASTING_NOTE = 'DELETE_TASTING_NOTE';
export const GENERATE_TASTING_NOTE = 'GENERATE_TASTING_NOTE';
export const CLEAR_TASTING_NOTE = 'CLEAR_TASTING_NOTE';

export const generateTastingNote = (data) => ({
	type: GENERATE_TASTING_NOTE,
	payload: data,
});

export const clearTastingNote = () => ({
	type: CLEAR_TASTING_NOTE,
});

export const getTastingNotes = (data) => ({
	type: GET_TASTING_NOTES,
	payload: data,
});

export const getSingleTastingNote = (id) => ({
	type: GET_SINGLE_TASTING_NOTE,
	payload: id,
});

export const deleteTastingNote = (id) => ({
	type: DELETE_TASTING_NOTE,
	payload: id,
});

export const updateTastingNote = (data) => ({
	type: UPDATE_TASTING_NOTE,
	payload: data,
});

export const addTastingNote = (data) => ({
	type: ADD_TASTING_NOTE,
	payload: data,
});

export const fetchSingleTastingNote = (id) => async (dispatch) => {
	try {
		const response = await fetch(`/api/tastingNotes/${id}`);
		const data = await response.json();
		dispatch(getSingleTastingNote(data));
		return data;
	} catch (error) {
		console.error('Error fetching single note:', error);
	}
};

export const generateNoteFromAPI = (prompt, name) => async (dispatch) => {
	try {
		const messages = [{ role: 'user', content: prompt }];

		const response = await csrfFetch('/api/tastingNotes/generate-note', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ messages }),
		});

		const apiData = await response.json();
		const payload = {
			...apiData,
			name: name,
		};
		dispatch(generateTastingNote(payload));
	} catch (error) {
		console.error('Error generating Tasting Note:', error);
	}
};

export const update_Tasting_Note =
	(tastingNoteId, updatedData) => async (dispatch) => {
		try {
			const response = await csrfFetch(`/api/tastingNotes/${tastingNoteId}/`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedData),
			});
			const data = await response.json();
			dispatch(updateTastingNote(data));
		} catch (error) {
			console.error('Error updating Tasting Note', error);
		}
	};

export const fetchTastingNotes = () => async (dispatch) => {
	try {
		const response = await fetch('/api/tastingNotes/');
		const data = await response.json();
		dispatch(getTastingNotes(data));
	} catch (error) {
		console.error('Error fetching Tasting Notes:', error);
	}
};

export const addTastingNoteThunk = (tastingNoteData) => async (dispatch) => {
	try {
		const response = await csrfFetch('/api/tastingNotes/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(tastingNoteData),
		});
		const data = await response.json();
		dispatch(addTastingNote(data));
	} catch (error) {
		console.error('Error adding Tasting Note to library:', error);
	}
};

export const get_Tasting_Note = () => async (dispatch) => {
	try {
		const response = await fetch('/api/tastingNotes/');
		const data = await response.json();
		dispatch(getTastingNotes(data));
	} catch (error) {
		console.error('Error fetching Tasting Notes:', error);
	}
};

export const delete_Tasting_Note = (tastingNoteId) => async (dispatch) => {
	try {
		await csrfFetch(`/api/recipebox/${tastingNoteId}/`, {
			method: 'DELETE',
		});
		dispatch(deleteTastingNote(tastingNoteId));
		dispatch(getTastingNotes());
	} catch (error) {
		console.error('Error deleting recipe from Recipe Box', error);
	}
};

const initialState = {
	allTastingNotes: {},
	singleTastingNote: {},
};

const tastingNotesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GENERATE_TASTING_NOTE:
			return { ...state, singleTastingNote: action.payload };
		case GET_SINGLE_TASTING_NOTE:
			return { ...state, singleTastingNote: action.payload };
		case GET_TASTING_NOTES:
			return { ...state, allTastingNotes: { ...action.payload } };
		case ADD_TASTING_NOTE:
			return {
				...state,
				allTastingNotes: {
					...state.allTastingNotes,
					[action.payload.id]: action.payload,
				},
			};
		case CLEAR_TASTING_NOTE:
			return { ...state, singleTastingNote: {} };
		case DELETE_TASTING_NOTE:
			const newState = { ...state.allTastingNotes };
			delete newState[action.payload];
			return { ...state, allTastingNotes: newState };
		case UPDATE_TASTING_NOTE:
			return {
				...state,
				allTastingNotes: {
					...state.allTastingNotes,
					[action.payload.id]: action.payload,
				},
				singleTastingNote: action.payload,
			};
		default:
			return state;
	}
};

export default tastingNotesReducer;
