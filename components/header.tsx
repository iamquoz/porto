import { useState } from "react";
import { Header, useMantineColorScheme, Switch } from '@mantine/core';

export default function CustomHeader() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  	return (
		<Header height = {60} padding = "xs">
			<Switch offLabel = "☀️" onLabel = "🌑" size = "xl"
				onChange = {() => toggleColorScheme()}
				checked = {colorScheme === 'dark'}/>
		</Header>
  	)
}
