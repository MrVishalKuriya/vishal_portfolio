import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ContactService } from '../services/contactService';

export const submitInquiry = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Incomplete inquiry manifest: Missing required fields');
  }
  
  const inquiry = await ContactService.submitInquiry({ name, email, message });
  
  res.status(201).json({
    success: true,
    data: inquiry,
    message: 'Architecture Exploration Inquiry Registered Successfully'
  });
});

export const getInquiries = asyncHandler(async (req: Request, res: Response) => {
  const inquiries = await ContactService.getAllInquiries();
  res.status(200).json({
    success: true,
    data: inquiries
  });
});

export const updateInquiryStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const inquiry = await ContactService.markAsRead(id);
  
  if (!inquiry) {
    res.status(404);
    throw new Error('Inquiry terminal not found');
  }
  
  res.status(200).json({
    success: true,
    data: inquiry,
    message: 'Inquiry status officially committed'
  });
});
