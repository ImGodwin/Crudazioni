
const url = "https://striveschool-api.herokuapp.com/api/product/"; 
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVhNGM3NjUxNWY0MTAwMTQ2OTdhMzEiLCJpYXQiOjE2OTMwNzY1OTgsImV4cCI6MTY5NDI4NjE5OH0.aIih90mETdq1JH7CGA35ISTxmFJ7OgtfQRPI9EOYrog";

window.addEventListener("DOMContentLoaded", () => {

}) 

const handleSubmit = (event) => {

    event.preventDefault();

    
    console.log(event); 


    const payload = {
        name: document.getElementById("name").value, 
        description: document.getElementById("description").value, 
        brand: document.getElementById("brand").value, 
        imageUrl: document.getElementById("imageUrl").value, 
        price: document.getElementById("price").value  
    } 

    const products = document.getElementById("products");
    fetch(url, {
        method: "POST", 
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${authToken}` 
            //added authorization header to my list of headers 
            //this will be sent to the server "POST"
        }
    }) 
    .then(response => response.json()) 
    .then(data => {
        
        const ul = document.createElement("ul"); 

        ul.innerHTML += `<li class="list-group-item">${data.name}</li>
        <li class="list-group-item">${data.description}</li>
        <li class="list-group-item">${data.brand}</li>
        <li class="list-group-item">${data.imageUrl}</li>
        <li class="list-group-item">${data.price}</li>
        <button type="button" class="btn btn-primary">Edit</button> 
        <button type="button" class="btn btn-primary">Delete</button>`; 

        products.appendChild(ul);
    })
    .catch(err => console.log(err));

    //console.log(payload);
} 
