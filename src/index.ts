/*import express, {Request, Response, Express } from "express";
import { AddressInfo } from 'net'
import { port } from "./networking";

const app : Express = express();

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
});

const server = app.listen(port, () => {
    const addr : AddressInfo = server.address() as AddressInfo;
    console.log(`Listening on http://localhost:${addr.port}`);
});*/

import { start } from "./networking";

start();