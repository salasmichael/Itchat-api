const { Server } = require("socket.io");
const Message = require("../models/messages.model");
const User = require("../models/user.model");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', async(socket) => {

    socket.on('set-roomId', async(room_id) => {
      try {

        const results = await Message.findAll({
          where: {
            room_id: room_id
          },
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name'],
            },
          ],
        });

         for (const message of results) {
            const messageData = {
                text: message.message,
                from: message.user.name,
                created: message.timestamp,
            };
          socket.emit('message', messageData);
          }

      } catch (error) {
      console.log(error);
      }
        
    });
    
    socket.on('add-message', async (message) => {
      const timestamp = new Date();
      const roomId = message.room_id; 
      const userId = message.user_id;
      const text = message.text;
    
      try {

        const createdMessage = await Message.create({
          room_id: roomId,
          user_id: userId,
          message: text,
          timestamp: timestamp,
        });
    
        const user = await User.findByPk(userId);
    
        io.emit('message', {
          text: createdMessage.message,
          from: user.name,
          created: createdMessage.timestamp,
        });
      } catch (error) {
        console.log(error);
      }
    });

  
  });

};