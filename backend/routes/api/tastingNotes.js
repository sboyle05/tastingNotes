const express = require('express');
const router = express.Router();
const axios = require('axios');
const { TastingNote } = require('../../db/models');
const { OpenAI } = require("openai");

const configuration = {
    apiKey: process.env.OPENAI_API_KEY
};

const openai = new OpenAI(configuration);

const extractTastingNote = (apiData, wineName) => {
    const description = apiData.choices[0].message.content.trim();

    return {
        name: wineName,
        text: description
    };
};

function requireAuth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ error: 'Authentication required.' });
    }
}

router.post('/generate-note', async (req, res) => {
    try {
        const { messages, name } = req.body;

        const openaiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: "user", content: messages[0].content }],
            temperature: 1.0,
            max_tokens: 500
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const responseData = openaiResponse.data;

        // Log the OpenAI response to debug
        console.log("OpenAI API Response:", responseData);

        if (responseData && responseData.choices && responseData.choices.length > 0) {
            const tastingNote = extractTastingNote(responseData, name);
            res.json(tastingNote);
        } else if (responseData && responseData.error) {
            // Handle OpenAI API error response
            throw new Error(responseData.error.message);
        } else {
            throw new Error('Unexpected response from OpenAI');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
});

router.post('/', requireAuth, async (req, res) => {
    try {
        const { name, text } = req.body;
        const userId = req.user.id;

        const newTastingNote = await TastingNote.create({
            userId,
            name,
            text
        });

        res.json(newTastingNote);
    } catch (error) {
        console.error('Error adding tasting note to library:', error);
        res.status(500).json({ error: 'Failed to add tasting note.' });
    }
});


router.get('/', requireAuth, async (req, res) => {
    try {
        const userId = req.user.id;
        const userTastingNotes = await TastingNote.findAll({ where: { userId: userId } });
        res.json(userTastingNotes);
    } catch (error) {
        console.error('Error fetching user tasting notes:', error);
        res.status(500).json({ error: 'Failed to fetch tasting notes.' });
    }
});


router.put('/:tastingNoteId', requireAuth, async (req, res) => {
    try {
        const tastingNoteId = req.params.tastingNoteId;
        const userId = req.user.id;

        const tastingNote = await TastingNote.findByPk(tastingNoteId);

        if (!tastingNote) {
            return res.status(404).json({ error: 'Tasting note not found.' });
        }

        if (tastingNote.userId !== userId) {
            return res.status(403).json({ error: 'You do not have permission to update this note.' });
        }

        const updatedData = req.body;
        await tastingNote.update(updatedData);
        res.json(tastingNote);
    } catch (error) {
        console.error('Error updating tasting note:', error);
        res.status(500).json({ error: 'Failed to update tasting note.' });
    }
});

router.delete('/:tastingNoteId', requireAuth, async (req, res) => {
    try {
        const tastingNoteId = req.params.tastingNoteId;
        const userId = req.user.id;

        const tastingNote = await TastingNote.findByPk(tastingNoteId);

        if (!tastingNote) {
            return res.status(404).json({ error: 'Tasting note not found.' });
        }

        if (tastingNote.userId !== userId) {
            return res.status(403).json({ error: 'You do not have permission to delete this note.' });
        }

        await tastingNote.destroy();
        res.json({ message: 'Tasting note deleted successfully.' });
    } catch (error) {
        console.error('Error deleting tasting note:', error);
        res.status(500).json({ error: 'Failed to delete tasting note.' });
    }
});

router.get('/:tastingNoteId', requireAuth, async (req, res) => {
    try {
        const tastingNoteId = req.params.tastingNoteId;
        const userId = req.user.id;

        const tastingNote = await TastingNote.findOne({ where: { id: tastingNoteId, userId: userId } });

        if (!tastingNote) {
            return res.status(404).json({ error: 'Tasting note not found.' });
        }

        res.json(tastingNote);
    } catch (error) {
        console.error('Error fetching single tasting note:', error);
        res.status(500).json({ error: 'Failed to fetch the tasting note.' });
    }
});

module.exports = router;
