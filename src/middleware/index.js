import { Router } from 'express';
import auth from './auth'
export default ({ config, db }) => {
	let routes = Router();

	// add middleware here
	routes.use(auth);
	// todo: add auth middleware here

	return routes;
}
