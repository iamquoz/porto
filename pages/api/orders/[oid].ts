
import { Order } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import Method from '../../../lib/httpmethods';
import prisma from '../../../lib/prisma';
import Role from '../../../lib/roles';
import { extractUser } from '../../../lib/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let { oid } = req.query;

	let user = await extractUser(req, res);
	let userFlag: boolean = false;
	console.log(oid);
	console.log(user);

	if (req.method == Method.GET) {
		let order = await prisma.order.findFirst({
			include: {
				SupportTicket: true,
				user: true
			},
			where: {
				OrderId: parseInt(oid as string)
			}
		});
		res.json(order);
	}
	else if (req.method == Method.POST) {
		let order: Order = req.body;
		console.log(order);
		await prisma.order.create({
			data: {
				SkuIds: order.SkuIds,
				active: order.active,
				totalPrice: order.totalPrice,
				count: order.count,
				userId: user!.id,
				startDate: order.startDate
			}
		})
		res.json(req.body);
	}
	else if (req.method == Method.PATCH) {
		await prisma.order.update({
			where: {
				OrderId: parseInt(oid as string)
			},
			data: {
				active: req.body
			}
		})

		res.json(req.body);
	}
}
