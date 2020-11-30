const { Chat } = require("../models");

class ChatControllers {
  static GetAllChats(req, res) {
    Chat.findAll()
      .then((chat) => {
        console.log(chat, "chat from chat controllers");
        res.status(200).json(chat);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  static GetChatFromUserId(req, res) {
    Chat.findAll({
      where: { id: +req.params.id },
    })
      .then((chats) => {
        res.status(200).json(chats);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  static SendMessages(req, res) {
    console.log(req.userData, "ini userdataaa");
    let chatMessages = {
      messages: req.body.messages,
      UserId: req.userData.id,
    };
    Chat.create(chatMessages)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  static deleteMessage(req, res) {
    Chat.destroy({
      where: {
        id: +req.params.id,
      },
    })
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  }
}

module.exports = ChatControllers;
