import type { NextApiRequest, NextApiResponse } from 'next'
import { extractUser } from '../../../lib/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let tokenCheck = await extractUser(req, res);

	console.log(tokenCheck);
	let users = await prisma?.user.findMany({
		include: {
			accounts: true
		}
	})
	res.json(users);
}
