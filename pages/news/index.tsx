import { Prisma } from ".prisma/client"
import axios from 'axios'
import { useListState } from '@mantine/hooks'
import { useEffect } from 'react'
import Link from "next/link"
import { useRouter } from "next/router"
import { Group, Title, Button, Table, Avatar, Menu, Space } from "@mantine/core"


type BlogPostWithAuthor = Prisma.BlogPostGetPayload<{include: {author: true}}>

export default function News() {

	const router = useRouter();

	const [news, newsHandler] = useListState<BlogPostWithAuthor>();

	useEffect(() => {
		axios.get('/api/news')
			.then(res => newsHandler.setState(res.data))
			.catch(err => console.log(err));
	// infinite loop, asks for userHandler
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Group position = 'apart'>
				<Title>Новости и оповещения</Title>
				<Button variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }} onClick = {() => router.push('/news/0')}>Добавить</Button>
			</Group>
			<Space h = "xl"/>
			<Table highlightOnHover>
				<thead>
					<tr>
						<th></th>
						<th>Автор</th>
						<th>Заголовок</th>
						<th>Дата публикации</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{news.map(n => (
						<tr key = {n.postId}>
							<td><Avatar src = {n.author.image ?? ""} alt = "" radius = "xl"/></td>
							<td>{n.author.name}</td>
							<td>{n.title}</td>
							<td>{n.postTime}</td>
							<td>
								<Menu>
								</Menu>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
  	)
}
