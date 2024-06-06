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

export const loadNetworkingSettings = (path: string) : INetworkingSettings => {
    return {} as INetworkingSettings;
}

export const storeNetworkingSettings = (path: string, settings : INetworkingSettings) : void => {

}