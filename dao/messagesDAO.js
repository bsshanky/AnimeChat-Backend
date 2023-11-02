import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let messages;

export default class MessagesDAO {
    static async injectDB(conn) {
        if (messages) {
            return; 
        } 

        try {
            messages = await conn.db(
                process.env.ANIMECHAT_COLLECTION)
                .collection('messages');
        } 
        catch (e) {
            console.error(`Unable to connect to messagesDAO: ${e}`);
        }
    } 

    static async getMessages({
        groupId,
        messagesLoaded = 0,
        messagesPerPage = 10,
     } = {}) { 

        let cursor;

        try {
            cursor = await messages.find({ groupId: groupId })
                                   .sort({ timestamp: 1 })
                                   .skip(messagesLoaded)
                                   //.limit(messagesPerPage)

             const messagesList = await cursor.toArray();
             const totalNumMessages = await messages.countDocuments({ groupId: groupId });
            return { messagesList, totalNumMessages };
        }
        catch (e) {
            console.error(`Unable to fetch messages right now, ${e}`);
            return { moviesList: [], totalNumMovies: 0};    
        }
    }

    static async addMessage(
        groupId,
        userInfo, 
        message,
        timestamp
    ) {
        try {
            const messageDoc = {
                groupId: groupId,
                senderName: userInfo.name, 
                senderId: userInfo._id,
                timestamp: timestamp, 
                message: message,
            }
            return await messages.insertOne(messageDoc);
        }
        catch (e) {
            console.error(`Unable to post message: ${e}`);
            return { error: e };
        }
    }
    
    
    static async deleteMessage(messageId, userId) {
        try {
            const deleteResponse = await messages.deleteOne({
              _id: new ObjectId(messageId),
              senderId: userId,
            });
      
            return deleteResponse

          } catch (e) {
            console.error(`Unable to delete message: ${e}`)
            return { error: e }
          }
    }
}


