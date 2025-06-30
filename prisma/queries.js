const prisma = require('./client');

const createAdmin = await prisma.user.create({
	data: {
		username: 'admin',
		password: 'admin',
		role: 'admin',
	}
})

const createUser = async (values) => {
	await prisma.user.create({
		data: {
			username: values.username,
			password: values.password,
		}
	})
}

module.exports = {
	createUser
}