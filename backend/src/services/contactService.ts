import { Contact, IContact } from '../models/Contact';
import { logger } from '../utils/logger';

export class ContactService {
  static async submitInquiry(contactData: Partial<IContact>) {
    const inquiry = new Contact(contactData);
    await inquiry.save();
    
    logger.info(`New Architectural Inquiry Received: ${inquiry.email}`);
    return inquiry;
  }

  static async getAllInquiries() {
    return await Contact.find().sort({ createdAt: -1 });
  }

  static async markAsRead(id: string) {
    return await Contact.findByIdAndUpdate(id, { status: 'read' }, { new: true });
  }
}
