require("dotenv").config();
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const PORT = process.env.PORT;

const gracefulShutDown = async () => {
  console.log("Shutting Down Server...");
  try {
    server.close((err) => {
      if (err) {
        console.log("Server closed with errors or abnormal condition", err);
        process.exit(1);
      }
      console.log("Server Closed...");
      process.exit(0);
    });
  } catch ({ message }) {
    console.error("Error on Shutdown..", message);
  }
};

process.on("SIGTERM", async () => {
  console.log("Recieved SIGTERM Signal...");
  await gracefulShutDown();
});
process.on("SIGINT", async () => {
  console.log("Recieved SIGINT Signal...");
  await gracefulShutDown();
});

server.listen(3000, async () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Use Ctrl+C to stop the server");
});
