import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import DualPurposeModal from '../dualPurposeModal';

import './Navigation.css';
import { useModal } from '../../context/Modal';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
	const { setModalContent } = useModal();

    const handleLibraryClick = (e) => {
        if (!sessionUser) {
            e.preventDefault();
            setModalContent(<DualPurposeModal />);
        } else {
            history.push('/library');
        }
    };

	return (
		<>
			<section className='navigationContainer'>
				<section className='navButtonContainer'>
					<ul className='navList'>
						<li>
							<NavLink exact to='/'>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink exact to='/create'>
								Create TastingNote
							</NavLink>
						</li>
						<li>
							<NavLink
								exact
								to='/library'
								onClick={(e) => handleLibraryClick(e)}
							>
								Library
							</NavLink>
						</li>

						<li>
							<NavLink exact to='/faq'>
								FAQ
							</NavLink>
						</li>

						<li>
							<ProfileButton user={sessionUser} />
						</li>

					</ul>
				</section>
			</section>
		</>
	);
}

export default Navigation;
