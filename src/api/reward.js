import * as dotenv from 'dotenv'
dotenv.config({ path: 'development.env' })
import config from '../config.json';

const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');  // development only
const fetch = (url, body) => import('node-fetch').then(({ default: fetch }) => fetch(url, body));
const { TextDecoder, TextEncoder } = require('util'); //node only

const privateKeys = process.env.USER_PRIVATE_KEY; //private active key of blockchain22

const signatureProvider = new JsSignatureProvider([privateKeys]);
const rpc = new JsonRpc(config.chainAddressRewardRpc, { fetch }); //required to read blockchain state
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); //required to submit transactions




const reward = {}

reward.createReward = async (req, res) => {
    try {


        const result = await api.transact({
            // actions: actions
            actions: [{
                account: 'atomicassets',
                name: 'mintasset',
                authorization: [{
                    actor: 'blockchain22',
                    permission: 'active',
                }],
                data: {
                    authorized_minter: 'blockchain22',
                    collection_name: 'godsuniverse',
                    schema_name: 'religion',
                    template_id: '518786',
                    new_asset_owner: 'blockchain22',
                    immutable_data: [{ "key": "name", "value": ["string", "krishna"] }],
                    mutable_data: [],
                    tokens_to_back: []
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log(result);
        //mint here
        res.json({ success: "true" });
    }
    catch (e) {
        console.log(e)
        res.status(401).json({
            success: false,
            message: "error while transaction",
            exception: e
        });
    }
};
export default reward;