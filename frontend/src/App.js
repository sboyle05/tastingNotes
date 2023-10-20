import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from "./store/session";
import Welcome from './components/welcome/welcome';
import './App.css';
import Navigation from './components/Navigation';
import Create from './components/createTastingNote/create';
import SingleNote from './components/singleTastingNote/singleNote';
import Library from './components/library/library';
import SingleNoteInLibrary from './components/SingleNoteInLibrary/singleNoteInLibrary';
import Faq from './components/FAQ/faq';

function App() {
	const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

	return (
		<>

				<Navigation isLoaded={isLoaded} />
				<div className='backgroundWrapper'>
				<div className='appBackground'>
					{isLoaded && (
				<Switch>
						<Route exact path='/' >
							<Welcome/>
						</Route>
						<Route exact path='/tastingNotes/:id'>
							<SingleNoteInLibrary/>
						</Route>
						<Route path='/create'>
							<Create/>
							</Route>
						<Route path='/singleNote'>
							<SingleNote/>
							</Route>
						<Route path='/library'>
							<Library/>
							</Route>
						<Route path='/faq'>
							<Faq/>
						</Route>
					</Switch>
					)}
				</div>
				</div>

		</>
	);
}

export default App;
