
//const url = eventId ? "https://striveschool-api.herokuapp.com/api/product/" + eventId : "https://striveschool-api.herokuapp.com/api/product/"; 
const url = "https://striveschool-api.herokuapp.com/api/product/"; 
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVhNGM3NjUxNWY0MTAwMTQ2OTdhMzEiLCJpYXQiOjE2OTMwNzY1OTgsImV4cCI6MTY5NDI4NjE5OH0.aIih90mETdq1JH7CGA35ISTxmFJ7OgtfQRPI9EOYrog";
//const eventId = new URLSearchParams(window.location.search).get("eventId")

window.onload = async () => {

    const subtitle = document.getElementById("subtitle");
    const mainBtn = document.querySelector("button[type='submit']");  
    const deleteBtn = document.getElementById("deleteBtn"); 
    deleteBtn.onclick = handleDelete; 
    if(eventId) {
        subtitle.innerText = "— modifica event" 

        const resp = await fetch(url) 
        if(resp.ok) {

            const {name, brand, description, price} = await resp.json()
    
            document.getElementById("name").value = name 
            document.getElementById("description").value = description
            document.getElementById("brand").value = brand  
            document.getElementById("price").value = price

            mainBtn.innerText = "Modifica Evento"; 
            deleteBtn.classList.remove("d-none");
        }
    }else {
        subtitle.innerText = "— crea event"
    }
} 

const handleSubmit = (event) => {

    event.preventDefault(); 

    const payload = {
        name: document.getElementById("name").value, 
        description: document.getElementById("description").value, 
        brand: document.getElementById("brand").value, 
        imageUrl: document.getElementById("imageUrl").value, 
        price: document.getElementById("price").value  
    } 

    const products = document.getElementById("products"); 
    const singleProduct = document.getElementById("displayProductRow"); 
    

    fetch(url, {
        //method: eventId ? "PUT" : "POST", 
        method: "POST", 
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${authToken}` 
            //added authorization header to my list of headers 
            //this will be sent to the server "POST"
        }
    }) 
    .then(response => {
        if(response.ok){
            return response.json()
        }
    }) 
    .then(data => {
        
        const ul = document.createElement("ul"); 

        ul.innerHTML += `<li class="list-group-item">${data.name}</li>
        <li class="list-group-item">${data.description}</li>
        <li class="list-group-item">${data.brand}</li>
        <li class="list-group-item">${data.imageUrl}</li>
        <li class="list-group-item">${data.price}</li>
        <button type="button" class="btn btn-primary">Edit</button> 
        <button type="button" class="btn btn-primary">Delete</button>
        <a href="detail.html?eventId=${data._id}" class="btn btn-primary">More...</a> `; 

        products.appendChild(ul);  

        /* const singleProduct = document.createElement("div"); 
        singleProduct.innerHTML += `<img src="${data.imageUrl}" class="card-img-top" alt="...">
        <h5 class="card-title">Card title</h5>
        <p class="card-text"></p>
        <a href="detail.html" class="btn btn-primary">Details</a>` */
     
       

    })
    .catch(err => console.log(err));

    //console.log(payload);
} 

const handleDelete = async () => {

    const confirm = confirm("sure you wanna delete?")

    if(accepted) {
        const resp = await fetch(URL, {method : "DELETE"}); 

        const deleteObj = await resp.json()
        alert("you delete " + deleteObj + "with id: " + deleteObj._id)
        window.location.assign("index.html")
    }else {
        alert("operazione annullata")
    }

    
}
