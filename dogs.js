import "./randomtest";

// get reference to select element
var sel = document.getElementById('doggieList');

const BREED_URL = "https://dog.ceo/api/breeds/list/all";
const promise = fetch(BREED_URL);

promise.then(function(response){
    const processingPromise = response.json();
    return processingPromise;
}).then(function(processedResponse){

    var breedsList = Object.keys(processedResponse.message);
    
    breedsList.forEach(addToList);

    function addToList(item){
        console.log(item);
        // create new option element
        var opt = document.createElement('option');

        // create text node to add to option element (opt)
        opt.appendChild( document.createTextNode(item) );

        // set value property of opt
        opt.value = item; 

        // add opt to end of select box (sel)
        sel.appendChild(opt); 
    }

    changeDog();

})

window.changeDog = function changeDog() {
    var selectedBreed = document.getElementById("doggieList").value;
    const DOG_URL = 'https://dog.ceo/api/breed/'+ selectedBreed +'/images/random'
    const dogImages = document.querySelector(".dogImages");
    const img = document.createElement("img");
    
    img.src = 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'

    dogImages.insertBefore(img, dogImages.firstChild);

    const promise = fetch(DOG_URL);

    promise.then(function(response){
        const processingPromise = response.json();
        return processingPromise;
    }).then(function(processedResponse){
        // console.log(processedResponse);
        const img_src = processedResponse.message;
        // const img = document.createElement("img");
        img.src = img_src;
        img.alt = "cute dog";    
    })

}