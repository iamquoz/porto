import { useEffect, useState } from 'react'
import { useSetState, useListState } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { Center, Stepper, Button, Group, MultiSelect, NumberInput, Card, Text } from '@mantine/core';
import { Order, Sku } from '@prisma/client'
import axios from 'axios'
import { DatePicker } from '@mantine/dates';
import OrderMapDynamic from '../../../OrderMapDynamic';

interface OrderInput<T> {
	skuid: number;
	payload: T;
}

export default function CustomerOrder({id}: {id: string}) {

	const router = useRouter();
	const [active, setActive] = useState<number>(0);
	const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

	const [skus, skusHandler] = useListState<Sku>([]);
	const [selectSku, setSelectSku] = useState<string[]>([]);
	const [order, orderHandler] = useSetState<Partial<Order>>({});
	const [amounts, amountsHandler] = useListState<OrderInput<number>>([]);
	const [dates, datesHandler] = useListState<OrderInput<Date>>([]);

	useEffect(() => {
		if (id !== '0')
			console.log(id)

		axios.get('/api/skus')
			.then(res => skusHandler.setState(res.data))
			.catch(err => console.log(err));
	}, [id]);

	const save = () => {
		let order: Partial<Order> = {};

		order.SkuIds = selectSku.map(x => parseInt(x));
		order.active = selectSku.map(x => true);
		order.count = amounts.map(x => x.payload as number);
		order.startDate = dates.map(x => x.payload as Date);
		order.totalPrice = 0;

		for (let i = 0; i < selectSku.length; i++) {
			order.totalPrice += (skus.find(x => x.SkuId === parseInt(selectSku[i]))?.price ?? 0) * amounts[i].payload;
		}

		// axios.post('/api/orders', order)
		console.log(order);
	}

	useEffect(() => {
		console.log(selectSku);
		amountsHandler.setState(selectSku.map(e => ({skuid: parseInt(e), payload: 0})));
		datesHandler.setState(selectSku.map(e => ({skuid: parseInt(e), payload: new Date()})));
	}, [selectSku]);

	useEffect(() => {
		if (active === 3)
			save();
	}, [active]);

	return (
		<Group grow>
			<div style={{maxWidth: '1000px'}}>
				<Stepper active={active} onStepClick={setActive} breakpoint="sm" orientation='horizontal'>
					<Stepper.Step label="Первый шаг" description="Выберите услуги" allowStepSelect={active > 0}>
						<div>
							<MultiSelect data = {skus.map(e => ({label: e.name, value: e.SkuId.toString()}))} 
								clearable
								searchable
								nothingFound = 'Ничего не было найдено 😔'
								value = {selectSku}
								onChange = {setSelectSku}
								/>
						</div>
					</Stepper.Step>
					<Stepper.Step label="Второй шаг" description="Установите параметры услуг" allowStepSelect={active > 1}>
						{selectSku.map(e => <Card shadow="lg" p = 'sm' m = 'sm' withBorder key = {e}>
							<Text weight={500} size="lg">{skus.find(x => x.SkuId == parseInt(e))?.name}</Text>
							<Group direction='row' pt='xl'>
								<NumberInput 
									label = 'Количество' 
									min={1}
									value = {amounts.find(x => x.skuid == parseInt(e))?.payload}
									onChange = {event => amountsHandler.setItemProp(amounts.findIndex(x => x.skuid == parseInt(e)), 'payload', event!)}
									required/>
								<DatePicker 
									label = 'Дата начала'
									value = {dates.find(x => x.skuid == parseInt(e))?.payload}
									onChange = {event => datesHandler.setItemProp(dates.findIndex(x => x.skuid == parseInt(e)), 'payload', event!)}
									required/>
							</Group>
						</Card>)}
					</Stepper.Step>
					<Stepper.Step label="Последний шаг" description="Ознакомьтесь и оплатите заказ" allowStepSelect={active > 2}>
						<OrderMapDynamic skus={skus.filter(e => selectSku.includes(e.SkuId.toString()))}/>
					</Stepper.Step>
					<Stepper.Completed>
						Поздравляем с покупкой!
					</Stepper.Completed>
				</Stepper>

				<Group position="center" mt="xl">
					<Button variant="default" onClick={prevStep} disabled = {active === 3}>Назад</Button>
					<Button onClick={active !== 3 ? () => nextStep() : () => router.push('/orders')} disabled = {selectSku.length === 0 || (active == 1 && amounts.some(x => x.payload === 0))}>Дальше</Button>
				</Group>
			</div>
		</Group>
	)
}
