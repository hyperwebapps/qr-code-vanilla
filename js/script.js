const form = document.getElementById('generate-form')
const qr = document.getElementById('qrcode')
const spinner = document.getElementById('spinner')

const onGenerateSubmit = (e) => {
  e.preventDefault()

  clearUI()

  const url = document.getElementById('url').value
  const size = document.getElementById('size').value

  if (url === '') {
    alert('Please enter a URL')
  } else {
    showSpinner()
    setTimeout(() => {
      hideSpinner()
      generateQRCode(url, size)

      setTimeout(() => {
        const saveUrl = qr.querySelector('img').src
        createSaveBtn(saveUrl)
      }, 50)
    }, 1000)
  }
}

const generateQRCode = (url, size) => {
  new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
  })
}

const clearUI = () => {
  qr.innerHTML = ''
  const saveBtn = document.getElementById('save-link')
  if (saveBtn) {
    saveBtn.remove()
  }
}

const showSpinner = () => {
  spinner.classList.remove('hidden')
  spinner.classList.add('block')
}

const hideSpinner = () => {
  spinner.classList.remove('block')
  spinner.classList.add('hidden')
}

const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a')
  link.id = 'save-link'
  link.classList =
    'bg-[#3b3f65] text-white font-bold py-2 rounded w-1/3 m-auto my-5'
  link.href = saveUrl
  link.download = 'qrcode'
  link.innerHTML = 'Save Image'
  document.getElementById('generated').appendChild(link)
}

hideSpinner()

form.addEventListener('submit', onGenerateSubmit)
