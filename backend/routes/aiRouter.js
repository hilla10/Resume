import { Router } from 'express';
import protect from '../middlewares/authMiddleware.js';
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from '../controllers/aiController.js';

const aiRouter = Router();

aiRouter.post('/enhance-pro-summary', protect, enhanceProfessionalSummary);
aiRouter.post('/enhance-job-description', protect, enhanceJobDescription);
aiRouter.post('/upload-resume', protect, uploadResume);

export default aiRouter;
