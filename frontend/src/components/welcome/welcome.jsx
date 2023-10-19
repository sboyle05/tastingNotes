import React from 'react';
import './welcome.css';

const Welcome = () => {
	return (
		<>
			<section className='welcomeContainer'>
				<h2 id='welcomeTitle'>Welcome</h2>
				<p className='welcomeText1'>
					Welcome to TastingNotes. TastingNotes was made with the winemaker in
					mind. A winemaker has the skills and knowledge to create beautiful
					works of art that not only create memories but help us rediscover
					memories of the past. Not all winemakers though, have the time or
					desire to write tasting notes about their latest creation. This site
					is designed to simplify that process, a winemaker simply needs to
					provide some basic information and TastingNotes will do the heavy
					lifting or in this case the typing for you.
				</p>
				<h2 id='welcomeHistory'>A brief history of tasting notes</h2>
				<h3 className='welcomeTextTitle'>Historical Sips</h3>
				<p className='welcomeText2'>
					In the historical context of wine tasting notes, their importance has
					blossomed significantly from ancient times, where documentation of
					wine characteristics was sporadic and unsystematic, to a more rigorous
					and standardized approach in recent centuries. The 19th century,
					especially, marked a pivotal era for structured wine assessment and
					classification, with notable developments like the Bordeaux Wine
					Official Classification of 1855 in France. This classification, which
					was established for the Exposition Universelle de Paris, meticulously
					ranked wines, particularly from the Bordeaux region, into categories
					based on their quality and market price, naturally necessitating
					detailed tasting notes to validate these classifications. In these
					earlier times, tasting notes were fundamental in communicating the
					sensory and quality aspects of different wines and vintages to
					potential consumers and traders, often aiding them in making informed
					purchasing decisions, even in the absence of direct tasting
					experiences.
				</p>
				<h3 className='welcomeTextTitle'>Modern Pours</h3>
				<p className='welcomeText3'>
					Fast forwarding to the late 20th century, the concept and practice of
					curating wine tasting notes were further popularized and systematized
					by influential wine critics like Robert Parker. His introduction of
					the 100-point scoring system for evaluating wines, accompanied by
					detailed tasting notes, transformed the wine industry by providing a
					standardized, albeit somewhat controversial, framework for critiquing
					and communicating wine quality. These notes, which detailed everything
					from the visual aspects and nose of the wine to its palate and
					potential aging capacity, provided consumers, producers, and traders
					with a common language and understanding. In the present day, tasting
					notes have evolved beyond a mere evaluative tool, becoming a
					significant marketing and educational mechanism, which, while still
					holding true to their original purpose of documenting and
					communicating sensory experiences, also serve to guide consumer
					preferences and purchasing behaviors in the expansive and diverse
					world of wines.
				</p>
			</section>
		</>
	);
};

export default Welcome;
