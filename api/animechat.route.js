import express from 'express'; 
import MessageController from './messages.controller.js';

const router = express.Router() ; // Get access to Express router

router.route('/').get(MessageController.apiGetMessages);
router.route('/').post(MessageController.apiPostMessage);
router.route('/').delete(MessageController.apiDeleteMessage);

export default router;