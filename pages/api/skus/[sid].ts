import { Sku } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import Method from '../../../lib/httpmethods';
import prisma from '../../../lib/prisma';
import Role from '../../../lib/roles';
import { extractUser } from '../../../lib/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let { sid } = req.query;

	let skuId: number;

	if (Array.isArray(sid))
		skuId = parseInt(sid[0]);
	else 
		skuId = parseInt(sid);

	if (req.method?.toLocaleLowerCase() === 'get') {
		const sku = await prisma.sku.findUnique({
			where: {
				SkuId: isNaN(skuId) ? 0 : skuId 
			},
			include: {
				type: true
			}
		})
		res.json(sku);
	}
	else {
		const sku: Sku = req.body;
		
		let user = await extractUser(req, res);

		if (!user || ![Role.admin, Role.manager, Role.writer].includes(user.roleRoleId)) {
			res.status(403).end();
		}
		else {
			let id = await upsBlogPost(skuId, sku);
			res.json({sid: id});

		}
	}
}


async function upsBlogPost(sid: number, sku: Sku) {
	// @ts-ignore
	delete sku.author;
	// @ts-ignore
	delete sku.postId;
	let upserted = await prisma.sku.upsert({
		where: {
			SkuId: sid === 0 ? -1 : sid
		},
		update: sku,
		create: sku
	})
	return upserted.SkuId;
}
