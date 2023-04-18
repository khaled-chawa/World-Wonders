window.onload = () => {
    // Selecting HTML elements
    const menu_btn = document.querySelector('.hamburger')
    const nav =  document.querySelector('.nav')
    const popup = document.querySelector('.popup')
    const signedOut = document.querySelector('.okay')

    // Listen for clicks, when clicked toggle the 'is-active' class name
    menu_btn.addEventListener('click', () =>  {
        menu_btn.classList.toggle('is-active')
        nav.classList.toggle('is-active')
    })

    // Listen for clicks, when clicked remove the 'is-active' class name
    signedOut.addEventListener('click', () => {
        popup.classList.remove('is-active')
    })
}