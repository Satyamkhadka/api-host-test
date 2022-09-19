
const { Api, JsonRpc } = require('eosjs');
const fetch = (url, body) => import('node-fetch').then(({ default: fetch }) => fetch(url, body));
const rpc = new JsonRpc('https://testnet.wax.eosdetroit.io', { fetch }); //required to read blockchain state


const payment = {};

payment.verifyPayment = async (req, res) => {
    // console.log(req.body)
    let body = req.body;
    if (!(body.transaction_id && body.address_from && body.address_to && body.amount_sent)) {
        return res.status(400).json({
            success: false,
            match: false,
            message: "Incomplete data provided from user",
        });
    }
    else {
        try {
            let data = await rpc.history_get_transaction(body.transaction_id);
            // console.log(data.trx.trx);
            if (
                data.id === body.transaction_id &&
                data.trx.receipt.status === 'executed' &&
                data.trx.trx.actions[0].data.from === body.address_from &&
                data.trx.trx.actions[0].data.to === body.address_to &&
                data.trx.trx.actions[0].data.quantity === body.amount_sent
            ) {
                let response = {
                    success: true,
                    match: true,
                    id: data.id,
                    message: '',
                    raw_data: data.trx.trx
                }
                res.json(response);
            } else {
                return res.status(400).json({
                    success: true,
                    match: false,
                    message: "Transaction doesnot match the chain data",
                });
            }

        } catch (e) {
            console.log(e)
            return res.status(504).json({
                success: false,
                match: false,
                message: "Fetching transaction failed.",
                error_dump: e
            });
        }
    }
};

export default payment;