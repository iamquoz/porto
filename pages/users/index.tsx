import { Prisma, User } from '.prisma/client';
import { Space, Table, Title, Avatar, Menu, ActionIcon, Skeleton, Badge, Select } from '@mantine/core'
import { useId, useListState } from '@mantine/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Roles, { RolesStrings } from "../../lib/roles"
import { TrashIcon, EyeOpenIcon, EyeClosedIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { Router, useRouter } from 'next/router';
import Role from '../../lib/roles';

type UserWithProvider = Prisma.UserGetPayload<{include: {accounts: true}}>

export default function Users() {
	const router = useRouter();
	const [viewEmail, setviewEmail] = useState(false);
	const [users, userHandler] = useListState<UserWithProvider>();

	useEffect(() => {
		axios.get('/api/users')
			.then(res => userHandler.setState(res.data))
			.catch(err => console.log(err));
	// infinite loop, asks for userHandler
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onChangeRole = (uid: string, role: string) => {
		let chosenRole: Role = RolesStrings.findIndex(e => e == role) + 1;
		console.log(uid, role, chosenRole);

		if (chosenRole == Roles.admin && !confirm('Вы уверены, что хотите изменить роль этого пользователя на Администратор?'))
			return;
	}

	return (
		<div>
			<Title>Все пользователи рекламного агентства</Title>
			<Space h = "xl"/>
			<Table highlightOnHover>
				<thead>
					<tr>
						<th>{/*image*/}</th>
						<th>Имя</th>
						<th>
							<span style = {{display: 'inline-flex'}}>
								Почта 
								<ActionIcon component = 'span' onClick = {() => setviewEmail(!viewEmail)}>
									{viewEmail ? <EyeClosedIcon /> : <EyeOpenIcon />}
								</ActionIcon>
							</span>
						</th>
						<th>Провайдер</th>
						<th>Роль</th>
						<th>Статус</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{users.map(e => (
						<tr key = {e.id}>
							<td><Avatar src = {e.image ?? ""} alt = "" radius = "xl"/></td>
							<td>{e.name}</td>
							<td><Skeleton visible = {!viewEmail} animate = {false}>{e.email}</Skeleton></td>
							<td>{e.accounts.map(acc => acc.provider).join(', ')}</td>
							<td>
								<Select variant='unstyled'
								 data = {RolesStrings}
								 maxDropdownHeight = {300}
								 disabled = {e.roleRoleId === Roles.admin}
								 defaultValue = {RolesStrings[e.roleRoleId - 1]} 
								 onChange = {(role) => onChangeRole(e.id, role!)}/>
							</td>
							<td>{e.active 
								? <Badge variant='dot' color = "green">Активен</Badge> 
								: <Badge variant='dot' color = "red">Деактивирован</Badge>}</td>
							<td>
								<Menu trigger='hover'>
									<Menu.Item icon = {<Pencil1Icon />} onClick = {() => router.push(`/users/${e.id}`)}>Редактировать</Menu.Item>
									<Menu.Item color="red" icon={<TrashIcon />} disabled = {e.roleRoleId === Roles.admin}>Деактивировать аккаунт</Menu.Item>
								</Menu>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
  )
}
