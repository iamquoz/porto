import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useColorScheme, useHotkeys } from '@mantine/hooks'
import { SessionProvider } from "next-auth/react";

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useHotkeys([['mod+J', () => toggleColorScheme()]])	
	return (
		<>
			<Head>
				<title>Page title</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<SessionProvider session = {pageProps.session} >
				<ColorSchemeProvider colorScheme = {colorScheme} toggleColorScheme = {toggleColorScheme}>
					<MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme}}>
						<Component {...pageProps} />
					</MantineProvider>
				</ColorSchemeProvider>
			</SessionProvider>
		</>
	);
}
