import CredentialsProvider from "next-auth/providers/credentials";
import VkProvider from "next-auth/providers/vk";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from 'bcrypt'

import prisma from '../../../lib/prisma'

import NextAuth from "next-auth";

const rounds = 5;

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
		})
	],
	secret: process.env.secret,
	callbacks: {
		async session({ session, token, user }) {

			session.role = user.roleRoleId;

			return session;
		}
	}
})
