import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/resume
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Here is the resume data.' });
});

// POST /api/resume
router.post('/', (req: Request, res: Response) => {
  const newResume = req.body;
  res.status(201).json({ message: 'Resume created', data: newResume });
});

export default router;
