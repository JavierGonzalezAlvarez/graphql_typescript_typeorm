import "reflect-metadata";
import { connect } from "./config/typeorm";
import { startServer } from "./server"
const port = 3000;

async function main() {
    connect();
    const app = await startServer();
    app.listen(port);
    console.log(`Server on port ${port} - http://localhost:${port}/graphql/`);
}

main();