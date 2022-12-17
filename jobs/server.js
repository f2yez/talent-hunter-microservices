const app = require("./app");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 5009;

const server = app.listen(
  PORT,
  console.log(`Server Of Jops running on PORT ${PORT}...`)
);

const io = socketIo(server, {
  cors: { origin: "*" },
});
var users = [];
var newData = [];
var zData = [];

io.on("connection", (socket) => {
  socket.on("userData", (userData) => {
    users.push({ ...userData });
  });

  //data
  socket.on("data", (data) => {
    for (let i = 0; i < users.length; i++) {
      const userY = data[i]?.profileId;
      for (let j = 0; j < data.length; j++) {
        if (users[j]?.profileId == userY) {
          newData.push(users[j]?.id);
        }
      }
    }

    //newData

    io.to(newData).emit(
      "test",
      `There is a new Job ,
     The ${data[0].JobTitle} is good for user skills`
    );
  });
});
