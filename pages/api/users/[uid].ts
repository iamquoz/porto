
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let { uid } = req.query;

	if (Array.isArray(uid))
		uid = uid[0];

	if (req.method?.toLocaleLowerCase() === 'get') {
		const user = await prisma.user.findUnique({
			where: {
				id: uid.length === 0 ? '' : uid  
			}
		})
		res.json(user);
	}
	else {
		
	}

}
