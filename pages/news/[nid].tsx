import { BlogPost } from '.prisma/client';
import { Group, Space, TextInput, Title, Box, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useRouter } from 'next/router'
import { useSetState } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { useEffect, useState } from 'react'
import RichTextEditor from '../../components/RichText';
import axios from 'axios';

export default function NewsIndiv() {
	const router = useRouter()
	const notifications = useNotifications();

	const { nid } = router.query;
	const [article, setArticle] = useSetState<BlogPost>({body: '', title: '', postId: 0, userId: '', postTime: new Date(), active: true});

	useEffect(() => {
		if (nid !== '0')
			axios.get(`/api/news/${nid}`)
				.then(res => setArticle(res.data))
				.catch(err => console.log(err));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nid]);

	function save() {
		const id = notifications.showNotification({
			title: "Подождите",
			message: "Идет загрузка",
			loading: true,
			autoClose: false,
			disallowClose: true
		})
		axios.post(`/api/news/${nid}`, article)
			.then(res => {
				notifications.updateNotification(id, {
					autoClose: 3000,
					color: 'green',
					title: "Успешно!",
					message: "Новость была успешно сохранена"
				})
			})
			.catch(err => {
				notifications.updateNotification(id, {
					autoClose: 3000,
					color: 'red',
					title: "Ошибка!",
					message: "При сохранении произошла ошибка, попробуйте снова"
				})
			});

	}

  	return (
		<div>
			<Group position = "apart">
				<Title>Редактирование статьи {article.title}</Title>
				<Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 205 }} onClick = {() => save()} size = "lg">Сохранить</Button>
			</Group>
			<Space h = "xl" />
			<Group grow direction = "column">
				<Group position = "apart" grow>
					<TextInput 
						value = {article.title}
						onChange = {e => setArticle({title: e.target.value})}
						label = "Заголовок"
						placeholder = "Заголовок"
						size = "lg"
					/>
					<DatePicker 
						label = "Дата публикации"
						value = {article.postTime} 
						onChange = {e => setArticle({postTime: (e ?? new Date())})}
						size = "lg"
						minDate = {new Date()}
					/>
				</Group>
				<Group grow>
					<RichTextEditor value = {article.body} onChange = {(e) => setArticle({body: e})} style = {{minWidth: "500px"}}></RichTextEditor>
					<div dangerouslySetInnerHTML = {{__html: article.body}}></div>
				</Group>
			</Group>
		</div>
  	)
}
