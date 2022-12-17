const cron = require("node-cron");
const { AxiosCompand } = require("./fetchCompand");

cron.schedule(
  "1 */12 * * *",
  async () => {

    await AxiosCompand.get("/cronJbos/");

    await AxiosCompand.get("/cronJbos/makeGroubing");
    console.log("ff");
  },
  {
    scheduled: true,
    timezone: "Asia/Gaza",
  }
);
