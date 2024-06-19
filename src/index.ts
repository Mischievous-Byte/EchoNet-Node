import express, {Request, Response, Express } from "express";
import { AddressInfo } from 'net'
import * as dgram from 'dgram';
import { settings as network_settings, onChange } from "./networking"

const port = 3000;

const app : Express = express();
const server = app.listen(port, () => {
    const addr : AddressInfo = server.address() as AddressInfo;
    console.log(`Listening on http://localhost:${addr.port}`);
});

app.get("/ping", (req: Request, res: Response) => {
    res.send(network_settings.ping_message);
});


const udpServer : dgram.Socket = dgram.createSocket("udp4");

udpServer.on('listening', () => {
    udpServer.setBroadcast(true);
    
    let interval : NodeJS.Timeout | null = null;

    const updateInterval = () => {
        if(interval !== null)
            clearInterval(interval);

        interval = setInterval(() => {
            sendDiscoveryPacket();
        }, network_settings.discovery_interval);
    }

    updateInterval();

    onChange.bind(updateInterval);
});





function sendDiscoveryPacket() {}

/*import express, {Request, Response, Express } from "express";
import { AddressInfo } from 'net'
import * as dgram from 'dgram';;

const peerPort = process.env.NETWORK_ACCESS_PORT;
console.log(peerPort);


const port = 3000;

const app : Express = express();

const server = app.listen(port, () => {
    const addr : AddressInfo = server.address() as AddressInfo;
    console.log(`Listening on http://localhost:${addr.port}`);
});


const udpServer : dgram.Socket = dgram.createSocket("udp4");

udpServer.on('message', (msg : Buffer, rinfo : dgram.RemoteInfo) => {
    const cmd = msg.at(0);
    
    
    if(cmd == 0)
    {
        console.log("Received discovery request packet from " + rinfo.address);
        const response : Uint8Array = new Uint8Array(1);
        response[0] = 1;

        udpServer.send(response, rinfo.port, rinfo.address, (err) => {
            if (err) {
                console.error('Error sending response:', err);
            } else {
                console.log('Response sent');
            }
        });
    } else
    {
        console.log(cmd);
    }
});

// Event listener for server startup
udpServer.on('listening', () => {

    udpServer.setBroadcast(true);

    console.log("Discovery socket open");

    setInterval(() => {
        const response : Uint8Array = new Uint8Array(1);
        response[0] = 0;
        udpServer.send(response, 0, response.length, 3000, "10.0.0.255", (err) => {
            if (err) {
                console.error('Error sending discovery request:', err);
            } else {
                console.log('Send discovery request');
            }});
    },5000);
});

// Event listener for errors
udpServer.on('error', (err) => {
    console.error(`Server error:\n${err.stack}`);
    server.close();
});


udpServer.bind(port, "10.0.0.200");

const peers : string[] = [];

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
});


app.get("/peers", (req: Request, res: Response) => {
    res.json({peers});
});*/