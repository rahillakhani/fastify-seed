import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = 8080;

app.listen(port, '0.0.0.0', function (err, address) {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    app.log.info(`server listening on ${address}`)
});