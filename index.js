const generateBtn = document.getElementById('generate')
const decrementBtn = document.getElementById('decrement')
const incrementBtn = document.getElementById('increment')
const lengthInput = document.getElementById('password-length')
const passwordEls = document.querySelectorAll('.password')
const popUp = document.getElementById('pop-up')

let passwordLength = 15
lengthInput.value = passwordLength

decrementBtn.addEventListener('click', () => updateLength(passwordLength - 1))
incrementBtn.addEventListener('click', () => updateLength(passwordLength + 1))
lengthInput.addEventListener('blur', () => updateLength(lengthInput.value))

generateBtn.addEventListener('click', generatePasswords)

passwordEls.forEach(element => {
  element.addEventListener('click', copyToClipboard)
})



function updateLength(number) {
  number = Number(number)  // make sure number is not a string

  if (number < 8 || number > 20) return
  
  passwordLength = number
  lengthInput.value = passwordLength
}

function generatePassword() {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '1234567890'
  const logograms = '#$%&@^`~'
  const mathSymbols = '<*+!?='

  let characters = uppercase + lowercase + numbers + logograms + mathSymbols
  characters = characters.split('')

  let password = ''
  for (let i = 0; i < passwordLength; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length)
    password += characters[randomIndex]
  }

  return password
}

function generatePasswords() {
  // generate a list of passwords based on the number of password elements
  let passwords = []
  for (let i = 0; i < passwordEls.length; i++) {
    const password = generatePassword()
    passwords.push(password)
  }

  // display the passwords on the page
  for (let i = 0; i < passwords.length; i++) {
    passwordEls[i].textContent = passwords[i]
    passwordEls[i].classList.remove('hidden')
  }
}

function copyToClipboard(event) {
  navigator.clipboard.writeText(event.target.textContent)

  // show a pop-up to notify the user
  popUp.style.opacity = 1
  setTimeout(() => popUp.style.opacity = '', 3000)
}
