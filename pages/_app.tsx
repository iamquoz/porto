import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorSchemeProvider, ColorScheme, AppShell } from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorageValue } from '@mantine/hooks'
import { SessionProvider } from "next-auth/react";
import CustomNavbar from "../components/navbar"
import { NotificationsProvider } from '@mantine/notifications';

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
		key: 'mantine-color-scheme',
		defaultValue: preferredColorScheme,
	  });

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useHotkeys([['mod+J', () => toggleColorScheme()]])
	useHotkeys([['mod+alt+t', () => window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"]])	
	return (
		<>
			<Head>
				<title>Page title</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<SessionProvider session = {pageProps.session} >
				<ColorSchemeProvider colorScheme = {colorScheme} toggleColorScheme = {toggleColorScheme}>
					<MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme}}>
						<NotificationsProvider>
							<AppShell padding = "md" navbar = {<CustomNavbar />}>
								<Component {...pageProps} />
							</AppShell>
						</NotificationsProvider>
					</MantineProvider>
				</ColorSchemeProvider>
			</SessionProvider>
		</>
	);
}
