
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractUser } from '../../../lib/role';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log(req.method);
	res.end();
}
