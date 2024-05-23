import express, {Request, Response, Express } from "express";
import { AddressInfo } from 'net'

export interface INetworkingSettings
{
    discoveryInterval : Number
}

const settings : INetworkingSettings = {
    discoveryInterval: 10
};

export const networkingSettings = new Proxy(settings, {
    set(obj, prop, value) {
        (obj as any)[prop] = value;
        return true;
    },
    get(obj, prop, receiver) {
        return (obj as any)[prop];
    }
});

export const port = 3000;

const app : Express = express();

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
});

export const start = () => {
    const server = app.listen(port, () => {
        const addr : AddressInfo = server.address() as AddressInfo;
        console.log(`Listening on http://localhost:${addr.port}`);
    });
}

export const loadNetworkingSettings = (path: string) : INetworkingSettings => {
    return {} as INetworkingSettings;
}

export const storeNetworkingSettings = (path: string, settings : INetworkingSettings) : void => {

}