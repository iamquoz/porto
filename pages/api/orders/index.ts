
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import Role from '../../../lib/roles';
import { extractUser } from '../../../lib/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let user = await extractUser(req, res);
	let userFlag: boolean = false;

	console.log(user);

	if (user?.roleRoleId === Role.customer)
		userFlag = true;

	let orders = await prisma.order.findMany({
		include: {
			SupportTicket: true,
			user: true
		}
	});

	res.json(
		userFlag 
		? orders.filter(x => x.userId === user?.id) 
		: orders);
}
