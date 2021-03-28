const io = require("socket.io-client");
const feathers = require("@feathersjs/feathers");
const socketio = require("@feathersjs/socketio-client");
const auth = require("@feathersjs/authentication-client");

const socket = io("http://localhost:3030");
const client = feathers();

client.configure(socketio(socket));

client.configure(
  auth({
    storageKey: "cisdord-auth",
  })
);

export default {
  app: client,
  users: client.service("/users"),
  channels: client.service("/channels"),
  members: client.service("/members"),
  messages: client.service("/messages"),
};
