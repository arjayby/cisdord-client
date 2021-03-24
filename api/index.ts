const io = require("socket.io-client");
const feathers = require("@feathersjs/feathers");
const socketio = require("@feathersjs/socketio-client");

const socket = io("localhost:3030");
const client = feathers();

client.configure(socketio(socket));

export default {
  users: client.service("/users"),
  channels: client.service("/channels"),
  members: client.service("/members"),
  messages: client.service("/messages"),
};
