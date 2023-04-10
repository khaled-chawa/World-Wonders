window.onload = () => {
    const menu_btn = document.querySelector('.hamburger')
    const nav =  document.querySelector('.nav')
    const popup = document.querySelector('.popup')
    const signedOut = document.querySelector('.okay')

    menu_btn.addEventListener('click', () =>  {
        menu_btn.classList.toggle('is-active')
        nav.classList.toggle('is-active')
    })

    signedOut.addEventListener('click', () => {
        popup.classList.remove('is-active')
    })
}