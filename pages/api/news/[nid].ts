
import { BlogPost } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import Method from '../../../lib/httpmethods';
import prisma from '../../../lib/prisma';
import { extractUser } from '../../../lib/user';
import Role from '../../../lib/roles';

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '5mb'
		}
	}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let { nid } = req.query;

	let newsId: number;

	if (Array.isArray(nid))
		newsId = parseInt(nid[0]);
	else 
		newsId = parseInt(nid);

	if (req.method?.toLocaleLowerCase() === 'get') {
		const blogpost = await prisma.blogPost.findUnique({
			where: {
				postId: isNaN(newsId) ? 0 : newsId 
			},
			include: {
				author: true
			}
		})
		res.json(blogpost);
	}
	else {
		const article: BlogPost = req.body;
		
		let user = await extractUser(req, res);

		if (!user || ![Role.admin, Role.manager, Role.writer].includes(user.roleRoleId)) {
			res.status(403).end();
		}
		else if (req.method === Method.DELETE) {
			let id = await delBlogPost(newsId);	
			res.json({nid: id});
		}
		else {
			article.userId = user.id;
			article.active = true;
			let id = await upsBlogPost(newsId, article);
			res.json({nid: id});

		}
	}
}


async function delBlogPost(nid: number) : Promise<number> {
	let updated = await prisma.blogPost.update({
		where: {
			postId: nid
		},
		data: {
			active: false
		}	
	})
	return nid;
}


async function upsBlogPost(nid: number, article: BlogPost) {
	// @ts-ignore
	delete article.author;
	// @ts-ignore
	delete article.postId;
	let upserted = await prisma.blogPost.upsert({
		where: {
			postId: nid === 0 ? -1 : nid
		},
		update: article,
		create: article
	})
	return upserted.postId;
}
