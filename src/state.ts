import IConfig from "./config";

export interface IState
{
    config : IConfig
}


const state : IState = {
    config: {
        http_port : 3000
    }
};

export default state;