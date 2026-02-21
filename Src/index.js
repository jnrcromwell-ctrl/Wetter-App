function submitBox(event){
    event.preventDefault();

    let searchElement=document.querySelector("#search-Input");
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=searchElement.value;
}

let searchformElemnt=document.querySelector("#search-form");
searchformElemnt.addEventListener("submit",submitBox);