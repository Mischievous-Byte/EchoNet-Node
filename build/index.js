"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dgram = __importStar(require("dgram"));
;
const peerPort = process.env.NETWORK_ACCESS_PORT;
console.log(peerPort);
const port = 3000;
const app = (0, express_1.default)();
const server = app.listen(port, () => {
    const addr = server.address();
    console.log(`Listening on http://localhost:${addr.port}`);
});
const udpServer = dgram.createSocket("udp4");
udpServer.on('message', (msg, rinfo) => {
    const cmd = msg.at(0);
    if (cmd == 0) {
        console.log("Received discovery request packet from " + rinfo.address);
        const response = new Uint8Array(1);
        response[0] = 1;
        udpServer.send(response, rinfo.port, rinfo.address, (err) => {
            if (err) {
                console.error('Error sending response:', err);
            }
            else {
                console.log('Response sent');
            }
        });
    }
    else {
        console.log(cmd);
    }
});
// Event listener for server startup
udpServer.on('listening', () => {
    udpServer.setBroadcast(true);
    console.log("Discovery socket open");
    setInterval(() => {
        const response = new Uint8Array(1);
        response[0] = 0;
        udpServer.send(response, 3000, "10.0.0.255", (err) => {
            if (err) {
                console.error('Error sending discovery request:', err);
            }
            else {
                console.log('Send discovery request');
            }
        });
    }, 5000);
});
// Event listener for errors
udpServer.on('error', (err) => {
    console.error(`Server error:\n${err.stack}`);
    server.close();
});
udpServer.bind(port, "127.0.0.1");
const peers = [];
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
app.get("/peers", (req, res) => {
    res.json({ peers });
});
app.get;
