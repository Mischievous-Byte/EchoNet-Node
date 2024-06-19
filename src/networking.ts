
/*
const settings : INetworkingSettings = {
    discoveryInterval: 10
};*/

/*
*/
/*
export const loadNetworkingSettings = (path: string) : INetworkingSettings => {
    return {} as INetworkingSettings;
}

export const storeNetworkingSettings = (path: string, settings : INetworkingSettings) : void => {


    discoveryInterval : Number //Number of seconds to wait between pinging the network
}
}*/



export interface INetworkingSettings
{
    ping_message : string,
    discovery_interval : number
}

const listeners : Function[] = [];

export const onChange = {
    bind : (listener : Function) => { listeners.push(listener); },
    unbind : (listener : Function) => { 
        const index = listeners.indexOf(listener);

        if(index !== -1)
            listeners.splice(index, 1);
    }
};

const _settings : INetworkingSettings = {
    ping_message : "Hello World!",
    discovery_interval : 10
}

export const settings = new Proxy(_settings, {
    set(obj, prop, value) {
        (obj as any)[prop] = value;
        listeners.forEach(listener => listener());
        return true;
    },
    get(obj, prop, receiver) {
        return (obj as any)[prop];
    }
});