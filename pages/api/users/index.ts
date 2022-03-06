
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkForRole } from '../../../lib/authcheck';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let tokenCheck = await checkForRole(req, res, [1]);

	console.log(tokenCheck);
	let users = await prisma?.user.findMany({
		include: {
			accounts: true
		}
	})
	res.json(users);
}
