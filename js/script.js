


// const search = document.querySelector('.search')


// search.addEventListener("input",(event) => {
//   const value = event.target.value;


//   if(value === "Alex") {
//     console.log("exsist Alex")
//   } else if ( value === "Boots") {
//     console.log("Boots")
//   }

// })


// const select = document.querySelector('.select')

// select.addEventListener("change", (event) => {
//   const value = event.target.value;
//   const body = document.body;
  
//   if(value === "dark") {
//     body.style.background = "black"
//   } else {
//     body.style.background = "gold"
//   }

// })



// const localDB = localStorage.getItem ("Surprice")


// document.write(localDB)


// localStorage.setItem("name","Alex")

// const name = localStorage.getItem("name")

// console.log(name)


// const data = {
//   {
//     name:"Alex",
//     age:15
//   },
//   {
//     name:"Alex",
//     age:15
//   },
// }


// localStorage.setItem("name", JSON,stringify (data))

// const name = localStorage.getItem("name")

// console.log(name)


window.addEventListener("load", () => {
  if(localStorage.getItem("isAuth") === "false") {
    window.open("../register.html", "_self")
  }
})


const signOut = document.querySelector(".signOut") 


signOut.addEventListener("click", () => {
  localStorage.setItem("isAuth","false")
  window.open("../register.html", "_self")
})


const title = document.querySelector(".title")
const description = document.querySelector(".description")
const image = document.querySelector(".image")
const addTodo = document.querySelector(".addTodo")
const error = document.querySelector(".error")
const row = document.querySelector(".row")

window.addEventListener("load", () => {
  if(!localStorage.getItem("todo")) {
    localStorage.setItem("todo", JSON.stringify([]))
  } else {
    const todo = JSON.parse(localStorage.getItem("todo"))
    
    const todoWithID = todo.map((item, index) => {
      return {...item, id: index}
    })
    localStorage.setItem("todo", JSON.stringify(todoWithID))

    const newTodo = JSON.parse(localStorage.getItem("todo"))

    card(newTodo)

  }
})


addTodo.addEventListener("click", (event) => {
  event.preventDefult();

  if(title.value !== "" && description.value !== "" && image.value !== "") {
   const data = {
    title:title.value,
    description:description.value,
    image:image.value
   }
   const todo = JSON.parse(localStorage.getItem("todo"))
   localStorage.getItem("todo", JSON.stringify(
    [
      ...todo,
      data
    ]
   ))
   window.location.reload()

  } else {
    error.innerHTML = "?????? ???????? ???????????? ???????? ??????????????????"
  }
})


function card(base) {
  const template = base.map(({title, description, image}) => {
    return `
    <div class="boxes">
    <h4>${title}</h4>
  
    <img src=${image} alt="">
  
    <p>
      ${description}
    </p>
  

  <div class="btn_inline">
  <button onclick="deleteTodo($(id))">
  Delete
  </button>
  <button onclick="editTodo($(id))">
  Edit
  </button>
  </div>
  </div>
`
  }).join(" ")

  row.innerHTML = template
}

function deleteTodo(id) {
  const todo = JSON.parse(localStorage.getItem("todo"))

  const filtered = todo.filtered(item => item.id !== id)

  localStorage.setItem('todo', JSON.stringify(filtered))

  window.localStorage.reload()
}


function editTodo(id) {
  const todo = JSON.parse(localStorage.getItem("todo"))

  const changes = todo.map(item => {
    if(item.id === id) {
      return {
        title: prompt("Title", item.title),
        description: prompt("Description", item.description),
        image:prompt("Image", item.image)
      }
    } else {
      return item
    }
  })


  localStorage.setItem("todo", JSON.stringify(changes))
  window.location.reload()
} 