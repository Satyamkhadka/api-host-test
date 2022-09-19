import { version } from '../../package.json';
import { Router } from 'express';
import payment from '../api/payment'
// import facets from './facets';
import scan from './scan'
import reward from './reward';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	// api.use('/facets', facets({ config, db }));

	api.post('/payment', payment.verifyPayment);
	api.get('/reward', reward.createReward);
	api.post('/scanWallet', scan.scanWallet)
	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
