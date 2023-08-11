import express from 'express'; 
import MessageController from './messages.controller.js';

const router = express.Router() ; // Get access to Express router

router.route('/:groupId').get(MessageController.apiGetMessages);
router.route('/:groupId').post(MessageController.apiPostMessage);
router.route('/:groupId').delete(MessageController.apiDeleteMessage);

export default router;