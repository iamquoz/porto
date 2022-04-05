import { Prisma } from ".prisma/client"
import axios from 'axios'
import { useListState } from '@mantine/hooks'
import { useEffect } from 'react'
import { useRouter } from "next/router"
import { Group, Title, Button, Table, Avatar, Menu, Space } from "@mantine/core"
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { useNotifications } from '@mantine/notifications';

type BlogPostWithAuthor = Prisma.BlogPostGetPayload<{include: {author: true}}>

export default function News() {

	const router = useRouter();
	const notifications = useNotifications();

	const [news, newsHandler] = useListState<BlogPostWithAuthor>();

	useEffect(() => {
		axios.get('/api/news')
			.then(res => newsHandler.setState(res.data))
			.catch(err => console.log(err));
	// infinite loop, asks for newsHandler
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	function delPost(nid: number) {
		axios.delete(`/api/news/${nid}`)
			.then(res => {
				notifications.showNotification({
					autoClose: 3000,
					color: 'green',
					title: "Успешно!",
					message: "Новость была перенесена в корзину"
				})
				axios.get('/api/news')
					.then(res => newsHandler.setState(res.data))
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	}
 
	return (
		<div>
			<Group position = 'apart'>
				<Title>Новости и оповещения</Title>
				<Button variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }} onClick = {() => router.push('/news/0')} size = "lg">Добавить</Button>
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
								<Menu trigger = 'hover'>
									<Menu.Item icon = {<Pencil1Icon />} onClick = {() => router.push(`/news/${n.postId}`)}>Редактировать</Menu.Item>
									<Menu.Item icon = {<TrashIcon />} color = 'red' onClick = {() => delPost(n.postId)}>Удалить</Menu.Item>
								</Menu>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
  	)
}
