import { app } from '../auth/firebase.js'
import { getFirestore, getDocs, collection } from 'firebase/firestore'

const db = getFirestore(app)

const colRef = collection(db, 'users', localStorage.getItem('uid'), 'history')

let history = []

await getDocs(colRef)
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            history.push({ ...doc.data() })
        })
    })
    .catch(err => {
        console.log(err.message)
    })


const list = document.getElementById('list')

for (let i = 0; i < history.length; i++) {
    const li = document.createElement('li')
    li.classList.add('list1')
    list.appendChild(li)

    const ul = document.createElement('ul')
    li.appendChild(ul)

    const location_name = document.createElement('li')
    location_name.classList.add('list2')
    ul.appendChild(location_name)
    location_name.innerHTML = `Location: ${history[i].location_name}`

    const location = document.createElement('li')
    location.classList.add('list2')
    ul.appendChild(location)
    location.innerHTML = `Location: ${history[i].location._lat.toFixed(4)}, ${history[i].location._long.toFixed(4)}`
    
    const guess = document.createElement('li')
    guess.classList.add('list2')
    ul.appendChild(guess)
    guess.innerHTML = `Guess: ${history[i].guess._lat.toFixed(4)}, ${history[i].guess._long.toFixed(4)}`

    const score = document.createElement('li')
    score.classList.add('list2')
    ul.appendChild(score)
    score.innerHTML = `Score: ${history[i].score}`
}