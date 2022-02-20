const generateBtn = document.getElementById('generate-btn')
const passwordList = document.getElementById('password-list')
const passwordEls = document.querySelectorAll('.password')
const popUp = document.getElementById('pop-up')

generateBtn.addEventListener('click', generatePasswords)

passwordEls.forEach(element => {
	element.addEventListener('click', copyToClipboard)
})

function generatePassword() {
	const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const lowercase = 'abcdefghijklmnopqrstuvwxyz'
	const numbers = '1234567890'
	const logograms = '#$%&@^`~'
	const mathSymbols = '<*+!?='

	let characters = uppercase + lowercase + numbers + logograms + mathSymbols
	characters = characters.split('')

	let password = ''
	for (let i = 0; i < 15; i++) {
		let randomIndex = Math.floor(Math.random() * characters.length)
		password += characters[randomIndex]
	}
	
	return password
}

function generatePasswords() {
	let passwords = []
	for (let i = 0; i < passwordEls.length; i++) {
		passwords.push(generatePassword())
	}
	
	for (let i = 0; i < passwords.length; i++) {
		passwordEls[i].value = passwords[i]
		passwordEls[i].style.display = "block"
	}
}

function copyToClipboard() {
	event.target.select()
	navigator.clipboard.writeText(event.target.value)

	// show a pop-up to notify the user
	popUp.style.zIndex = 10
	popUp.style.opacity = 0.8
	setTimeout(() => {
		popUp.style.zIndex = -1
		popUp.style.opacity = 0
	}, 3000)
}
