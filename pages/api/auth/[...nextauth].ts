import VkProvider from "next-auth/providers/vk";
import GitHubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex"
import GoogleProvider from "next-auth/providers/google"

import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from '../../../lib/prisma'

import NextAuth from "next-auth";


export default NextAuth({
	debug: true,
	adapter: PrismaAdapter(prisma),
	providers: [
		VkProvider({
			clientId: process.env.VK_CLIENT_ID,
			clientSecret: process.env.VK_CLIENT_SECRET
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET
		}),
		YandexProvider({
			clientId: process.env.YANDEX_CLIENT_ID,
			clientSecret: process.env.YANDEX_CLIENT_SECRET
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		})
	],
	secret: process.env.secret,
	callbacks: {
		async session({ session, token, user }) {

			session.role = user.roleRoleId;

			return session;
		},
		async signIn({ user, account, profile, email, credentials }) {
			// means that either it's user's first log in or user has not been disabled
			return user.active === undefined || user.active === true;
		}
	}
})
