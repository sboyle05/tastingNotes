import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  NavLink } from 'react-router-dom';
import { fetchTastingNotes } from '../../store/tastingNotes';
import './library.css';


const Library = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const tastingNotes = useSelector((state) => state.tastingNotes.allTastingNotes)
  const userTastingNotes = Object.values(tastingNotes)


  useEffect(() => {
    dispatch(fetchTastingNotes());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
return (
  <>
  <section className='libraryContainer'>
    <section className='libraryNotes'>
  <h1>{sessionUser.firstName}'s Library</h1>
  <section className='tastingNoteSection'>
    <ul className='tastingNotesInLibrary'>
      {userTastingNotes.map(({name, id, user_id, createdAt}) => (
        <li id='mappedTastingNotes' key={id}>
        <NavLink exact to={`/tastingNotes/${id}`}>
         Name: {name} <br/>

       Created: {formatDate(createdAt)}
       </NavLink></li>
      ))}
    </ul>
    <p className='libraryMSG'>click on note to view and edit</p>
  </section>
  </section>
  </section>
  </>
)
}

export default Library
