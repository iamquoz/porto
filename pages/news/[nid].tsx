import { BlogPost } from '.prisma/client';
import { Group, Space, TextInput, Title, Box } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useRouter } from 'next/router'
import { useSetState } from '@mantine/hooks';

import { useEffect, useState } from 'react'
import RichTextEditor from '../../components/RichText';

export default function NewsIndiv() {
	const router = useRouter()
	const { nid } = router.query;
	const [article, setArticle] = useSetState<BlogPost>({body: '', title: '', postId: 0, userId: '', postTime: new Date()});

	const [articleBody, setArticleBody] = useState('');
	useEffect(() => {

	}, [nid]);

	useEffect(() => {
		setArticle({body: articleBody});
	}, [articleBody]);
	
  	return (
		<div>
			<Title>Редактирование статьи {article.title}</Title>
			<Space h = "xl" />
			<Group grow direction = "column">
				<Group position = "apart">
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
				<RichTextEditor value = {articleBody} onChange = {setArticleBody} style = {{minWidth: "500px"}}></RichTextEditor>
				<div dangerouslySetInnerHTML = {{__html: article.body}}></div>
			</Group>
		</div>
  	)
}
