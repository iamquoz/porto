
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import { extractUser } from '../../../lib/role';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let user = await extractUser(req, res);

	console.log(user);
	let blogposts = await prisma.blogPost.findMany({
		include: {
			author: true
		}
	})
	res.json(blogposts);
}
