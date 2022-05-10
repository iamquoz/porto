import { Table, Group, Title, Button, Space, Badge, Menu } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { Prisma } from ".prisma/client"
import { useEffect } from 'react'
import axios from 'axios'
import { AdTypesStrings } from '../../../lib/adtypes'
import { Pencil1Icon } from '@radix-ui/react-icons'

type SkuWithType = Prisma.SkuGetPayload<{include: {type: true}}>

export default function Skus() {
	const router = useRouter();

	const [skus, skusHandler] = useListState<SkuWithType>([]);

	useEffect(() => {
		axios.get('/api/skus')
			.then(res => skusHandler.setState(res.data))
			.catch(err => console.log(err));

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Group position = 'apart'>
				<Title>Листинг товаров</Title>
				<Button variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }} onClick = {() => router.push('/workings/skus/0')} size = "lg">Добавить</Button>
			</Group>
			<Space h = "xl"/>
			<Table highlightOnHover>
				<thead>
					<tr>
						<th>Название</th>
						<th>Цена</th>
						<th>Тип</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{skus.map(e => 
						<tr key = {e.SkuId}>
							<td>{e.name}</td>
							<td>₽ {e.price}</td>
							<td><Badge variant='dot'>{AdTypesStrings[e.adTypeAdTypeId - 1]}</Badge></td>
							<Menu trigger='hover'>
									<Menu.Item icon = {<Pencil1Icon />} onClick = {() => router.push(`/workings/skus/${e.SkuId}`)}>Редактировать</Menu.Item>
							</Menu>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}
