
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import { extractUser } from '../../../lib/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let user = await extractUser(req, res);

	console.log(user);
	let blogposts = await prisma.blogPost.findMany({
		where: {
			active: true
		},
		include: {
			author: true
		}
	})
	res.json(blogposts);
}
