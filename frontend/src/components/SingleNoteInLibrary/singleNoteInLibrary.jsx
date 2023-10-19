import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './singleNoteInLibrary.css'
import { fetchSingleTastingNote } from '../../store/tastingNotes';
import { update_Tasting_Note, delete_Tasting_Note } from '../../store/tastingNotes';



const SingleNoteInLibrary = () => {
  const currentTastingNote = useSelector((state) => state.tastingNotes.singleTastingNote)
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
      name: currentTastingNote.name,
      text: currentTastingNote.text
  });

  const handleInputChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};


const handleSave = useCallback(() => {
  dispatch(update_Tasting_Note(id, formData));
  setIsEditing(false);
}, [dispatch, id, formData]);


const handleDelete = () => {
  dispatch(delete_Tasting_Note(id));
  history.push('/library')
};



  useEffect(() => {
    dispatch(fetchSingleTastingNote(id))
  },[dispatch, id])


  return (
    <>
    <section className='noteInLibraryContainer'>
    <section className='noteDisplay'>
    {isEditing ? (
        <>
            <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className='noteTitleInput'
            />
            <textarea
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                className='noteTextArea'
            />
            <button onClick={handleSave}>Save</button>
        </>
    ) : (
        <>
            <h1>{currentTastingNote.name}</h1>
            <p>{currentTastingNote.text}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </>
    )}
</section>
    </section>
    </>
  )
}

export default SingleNoteInLibrary
