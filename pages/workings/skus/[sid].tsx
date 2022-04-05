import { Sku } from '.prisma/client';
import { Group, Space, TextInput, Title, Box, Button, NativeSelect, NumberInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useRouter } from 'next/router'
import { useSetState } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { useEffect, useState } from 'react'
import axios from 'axios';
import AdTypes, { AdTypesStrings } from '../../../lib/adtypes';

export default function SkusIndiv() {
	const router = useRouter()
	const notifications = useNotifications();

	const { sid } = router.query;
	const [sku, setsku] = useSetState<Partial<Sku>>({name: '', adTypeAdTypeId: 0, price: 0, latitude: 0, longitude: 0});

	useEffect(() => {
		if (sid !== '0')
			axios.get(`/api/news/${sid}`)
				.then(res => setsku(res.data))
				.catch(err => console.log(err));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sid]);

	function setAdType(sid: number, type: string) {
		setsku({adTypeAdTypeId: AdTypesStrings.findIndex(e => e == type) + 1})
	}

	function save() {

	}

	return (
		<div>
			<Group position = "apart">
				<Title>Редактирование товара {sku.name}</Title>
				<Button disabled = {sku.name?.length === 0}
				 variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 205 }} 
				 onClick = {() => save()} size = "lg">Сохранить</Button>
			</Group>
			<Space h = "xl" />
			<Group grow direction = "column">
				<TextInput 
					value = {sku.name}
					onChange = {e => setsku({name: e.target.value})}
					label = "Название"
					size = "lg"
					required
					error = {sku.name?.length === 0 ? "Название не может быть пустым" : false}
				/>
				<NativeSelect 
					size = "lg"
					data = {AdTypesStrings}
					onChange = {e => setAdType(sku.SkuId ?? 0, e.target.value)}
					placeholder = "Выберите тип рекламы"
					label = "Тип рекламы"
					description = "Оффлайн типы открывают новые опции"
					required
				/>
				<NumberInput 
					size = "lg"
					value = {sku.price}
					onChange = {e => setsku({price: e})}
					label = 'Цена'
					parser={(value) => value?.replace(/\₽\s?|(,*)/g, '')}
					formatter={(value) =>
						!Number.isNaN(parseFloat(value ?? ''))
						? `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						: '₽ '
					}
					hideControls
					required
					error = {(sku.price ?? 0) <= 0}
				/>

				{[AdTypes.Billboard, AdTypes.Mall].includes(sku.adTypeAdTypeId ?? 0) &&
				<div>
					map
				</div>
				}
			</Group>
		</div>
	)
}
