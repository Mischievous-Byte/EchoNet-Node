export interface INetworkSettings
{
    port : Number,
    ping_response : string
};

const settings : INetworkSettings = 
{
    port : 3000,
    ping_response : "Pong!"
};

export default settings;