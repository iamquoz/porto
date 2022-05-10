import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let skus = await prisma.sku.findMany({
		include: {
			type: true
		}
	})

	res.json(skus);
}
