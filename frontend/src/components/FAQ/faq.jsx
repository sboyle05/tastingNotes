import React from 'react';
import './faq.css';

const Faq = () => {
	return (
		<>
    <section className='faqContainer'>
      <section className='faq'>
			<h1 className='faqTitle'>Frequently Asked Questions</h1>
      <p className='question'>
				1. Can I see other projects made by the creator of this site?
			</p>
      <p className='answer'>
  Sure, head over to <a id='externalLink' href="https://www.samboyle.net/" target="_blank" rel="noopener noreferrer">https://www.samboyle.net/</a>
</p>
			<p className='question'>
				2. What is the purpose of this wine tasting note generator?
			</p>
			<p className='answer'>
				This tool assists winemakers and wine writers in crafting detailed and
				accurate tasting notes. By filling out a form with specific wine
				characteristics, our system taps into the power of OpenAI's API to
				generate a comprehensive tasting note.
			</p>
			<p className='question'>
				3. How does the wine tasting note generator work?
			</p>
			<p className='answer'>
				You simply fill out a form with details about the wine you're tasting.
				Once submitted, our system sends this information to OpenAI's API, which
				then returns a professionally crafted tasting note based on the provided
				details.
			</p>
			<p className='question'>
				4. Can I use this tool without creating an account?
			</p>
			<p className='answer'>
				Absolutely! However, without an account, you'll only be able to view the
				generated tasting notes. To enjoy additional features like saving,
				editing, and deleting notes, you'll need to log in.
			</p>
			<p className='question'>
				5. What are the benefits of creating an account?
			</p>
			<p className='answer'>
				By creating an account: You can save generated tasting notes to your
				personal library. Edit any tasting note to further customize it to your
				liking. Delete any tasting note that you no longer require.
			</p>
			<p className='question'>
				6. Is there a cost associated with using this tool?
			</p>
			<p className='answer'>
				The basic functionality of generating tasting notes is free to the user
				at this time. There is a cost for using the technology but this is
				currently being covered by the site's creator's loving partner while he
				searches for his first software engineering role.
			</p>
			<p className='question'>
				7. How accurate are the generated tasting notes?
			</p>
			<p className='answer'>
				Our system uses OpenAI's state-of-the-art API to craft tasting notes.
				While they are generated based on the details you provide, always
				remember that wine tasting is subjective. The generated notes are meant
				to be a starting point, and you're encouraged to adjust them to your
				personal taste.
			</p>
			<p className='question'>
				8. Can I use the generated tasting notes for commercial purposes?
			</p>
			<p className='answer'>
				Yes, you can. However, remember that these notes are generated and may
				require some personal touch or adjustments to perfectly fit a commercial
				narrative or branding.
			</p>
			<p className='question'>
				9. I encountered an issue while using the site. How can I get support?
			</p>
			<p className='answer'>
				We're sorry for the inconvenience. Please reach out to our support team
				at sboyle05@gmail.com, and we'll assist you as soon as possible.
			</p>
			<p className='question'>
				10. Can I suggest features or improvements for the wine tasting note
				generator?
			</p>
			<p className='answer'>
				Absolutely! We're always looking for ways to improve. Please send your
				suggestions to sboyle05@gmail.com. We appreciate your input!
			</p>


      </section>
      </section>
		</>
	);
};

export default Faq;
