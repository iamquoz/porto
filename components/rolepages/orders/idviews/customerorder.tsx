import { useEffect, useState } from 'react'
import { useSetState } from '@mantine/hooks';
import { Center, Stepper, Button, Group } from '@mantine/core';

export default function CustomerOrder({id}: {id: string}) {

	const [active, setActive] = useState<number>(1);
	const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

	useEffect(() => {
		if (id !== '0')
			console.log(id)

	}, [id]);

	return (
		<div>
			<div>
				<Stepper active={active} onStepClick={setActive} breakpoint="sm" orientation='vertical'>
					<Stepper.Step label="Первый шаг" description="Выберите услуги" allowStepSelect={active > 0}>
						Step 1 content: Create an account
					</Stepper.Step>
					<Stepper.Step label="Второй шаг" description="Ознакомьтесь с вашим выбором" allowStepSelect={active > 1}>
						Step 2 content: Verify email
					</Stepper.Step>
					<Stepper.Step label="Последний шаг" description="Оплата заказа" allowStepSelect={active > 2}>
						Step 3 content: Get full access
					</Stepper.Step>
					<Stepper.Completed>
						Поздравляем с покупкой!
					</Stepper.Completed>
				</Stepper>

				<Group position="center" mt="xl">
					<Button variant="default" onClick={prevStep}>Back</Button>
					<Button onClick={nextStep}>Next step</Button>
				</Group>
			</div>
		</div>
	)
}
