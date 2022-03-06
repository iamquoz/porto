
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkForRole } from '../../../lib/authcheck';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let tokenCheck = await checkForRole(req, res, [1]);

	console.log(tokenCheck);
	res.status(200).json({ name: 'John Doe' })
}
