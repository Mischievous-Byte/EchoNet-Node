import express, {Request, Response, Express } from "express";
import { AddressInfo } from 'net'
import state from "./state";

console.log(state);
const app : Express = express();
const SERVICE_PORT = 3000;

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
});

const server = app.listen(SERVICE_PORT, () => {
    const addr : AddressInfo = server.address() as AddressInfo;
    console.log(`Listening on http://localhost:${addr.port}`);
});