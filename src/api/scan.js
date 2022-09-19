
const fetch = (url, body) => import('node-fetch').then(({ default: fetch }) => fetch(url, body));
import config from '../config.json';

const scan = {}

scan.scanWallet = async (req, res) => {
    let body = req.body;
    if (body.address == undefined) {
        console.log("address not provided")
        res.status(400).json({
            success: false,
            message: "bad input format",
        });
    } else {

        try {
            let api = config.scanWalletApi + '?owner=' + body.address;
            if (body.collection_name !== undefined || body.collection_name !== '') {
                api += '&collection_name=' + body.collection_name;
            }
            const response = await fetch(api);
            const assets = await response.json();
            return res.json(assets);
        } catch (e) {
            console.log(e)
            res.status(401).json({
                success: false,
                message: "error fetching",
                exception: e
            });
        }
    }
}

export default scan;