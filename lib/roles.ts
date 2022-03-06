enum Role {
	admin = 1,
	manager,
	seller,
	support,
	writer,
	customer
}

const RolesStrings: string[] = [
	"Администратор",
	"Менеджер",
	"Продавец",
	"Агент поддержки",
	"Автор",
	"Клиент"
]

export default Role;
export { RolesStrings }
