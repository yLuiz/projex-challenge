import express from 'express';

const router = express.Router();

router.get('/properties', (req, res) => {
    return res.json({ message: "Properties Route!"})
});

export default router;