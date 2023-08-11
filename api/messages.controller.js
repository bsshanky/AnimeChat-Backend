import MessagesDAO from '../dao/messagesDAO.js';

export default class MessagesController {

    static async apiGetMessages(req, res) {

        // TODO:
        try {
            const groupId = req.body.groupId;
            const messagesPerPage = 10;
            const messagesLoaded = req.body.messagesLoaded ? parseInt(req.body.messagesLoaded) : 0;

            const messageListResponse = await
            MessagesDAO.getMessages({ groupId, messagesLoaded, messagesPerPage });   

            var { error } = messageListResponse;

            if (error) {
                res.status(500).json({ error: "Unable to fetch messages." });
            } else {
                res.json({
                    messages: messageListResponse.messagesList,
                    total_results: messageListResponse.totalNumMessages
                });
            }
        } 
        catch (e) {
            res.status(500).json({ error: e });
        }
    }

    static async apiPostMessage(req, res) {
        // TODO:
        try {
            const groupId = req.body.groupId;
            const message = req.body.message;
            const userInfo = {
                name: req.body.senderName,
                _id: req.body.senderId
            }

            const timestamp = new Date();

            const messageResponse = await MessagesDAO.addMessage(
                groupId,
                userInfo, 
                message,
                timestamp
            );

            var { error } = messageResponse;

            if (error) {
                res.status(500).json({ error: "Unable to post review." });
            } else {
                res.json({
                    status: "success",
                    response: messageResponse
                });
            }
        } 
        catch (e) {
            res.status(500).json({ error: e });
        }
    }

    static async apiDeleteMessage(req, res) {
        // TODO:
        try {
            const messageId = req.body.messageId;
            
            const messageResponse = await MessagesDAO.deleteMessage(messageId);

            var { error } = messageResponse;

            if (error) {
                res.status(500).json({ error: "Unable to delete message." });
            } else {
                res.json({
                    status: "success",
                    response: messageResponse
                });
            }
        } 
        catch (e) {
            res.status(500).json({ error: e });
        }
    }
}

