
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import Method from '../../../lib/httpmethods';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let { uid } = req.query;

	let userId: string;

	if (Array.isArray(uid))
		userId = uid[0];
	else 
		userId = uid;

	if (req.method?.toLocaleLowerCase() === 'get') {
		const user = await prisma.user.findUnique({
			where: {
				id: userId.length === 0 ? '' : userId  
			},
			include: {
				Order: true,
				Agent: true,
				Customer: true
			}
		})
		res.json(user);
	}
	else {
		if (req.method == Method.DELETE) {
			let updated = await prisma.user.update({
				where: {
					id: userId
				},
				data: {
					active: false
				}
			})
		}
		else if (req.method == Method.PATCH) {
			let updated = await prisma.user.update({
				where: {
					id: userId
				},
				data: {
					roleRoleId: req.body.role
				}
			})
		}
		else if (req.method == Method.PUT) {
			let updated = await prisma.user.update({
				where: {
					id: userId
				},
				data: {
					active: true
				}
			})
		}
	}

}
