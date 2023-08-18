const { Server } = require("socket.io");
const Message = require("../models/messages.model");

module.exports = (server) => {
  console.log('Inicio socket');

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', async(socket) => {
    socket.on('set-nickname', (nickname) => {
      socket.nickname = nickname;
  
    });
  
  //  
  
  const roomId = 1; // Obtén el roomId como desees
  
      try {
      // Consultar los mensajes de la base de datos para la sala
      const query = `SELECT * FROM messages m INNER JOIN users u ON m.user_id = u.id WHERE room_id = ?`;
      const results = await Message.findAll({
        room_id: roomId
      })
      console.log(results);
      // connection.query(query, [roomId], async (error, results) => {
      //     if (error) throw error;
  
      //     // Enviar los mensajes almacenados al cliente
          for (const message of results) {
            const messageData = {
                text: message.message,
                from: message.name,
                created: message.timestamp,
            };
          socket.emit('message', messageData);
          }
      // });

      } catch (error) {
      console.log(error);
      }
  
  
  // 
    socket.on('add-message', (message) => {
  
      const timestamp = new Date();
      const roomId = message.room_id; 
      const userId = message.user_id;
      const text   = message.text;
       
      // try{
      //   // Insert message into the database
      //   const query = `INSERT INTO messages (room_id, user_id, message, timestamp) VALUES (?, ?, ?, ?)`;
      //   connection.query(query, [roomId, userId, text, timestamp], (error, results) => {
      //     if (error) throw error;
      //     io.emit('message', {text: message.text, from: socket.nickname, created: timestamp});
      //   });
      // } catch (error) {
      //     console.log(error)
      //   res.status(500).json({ error: 'An error occurred' });
      // }
  
    });
  
  });


};