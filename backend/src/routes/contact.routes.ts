import { Router } from 'express';
import { submitInquiry, getInquiries, updateInquiryStatus } from '../controllers/contactController';
import { protect, adminOnly } from '../middleware/auth.middleware';

const router = Router();

// 🚀 Public Entrance Hub: Transmit Packet
router.post('/submit', submitInquiry);

// 🛡️ Administrative Console: Inquiry Review
router.get('/', protect, adminOnly, getInquiries);
router.patch('/:id', protect, adminOnly, updateInquiryStatus);

export default router;
