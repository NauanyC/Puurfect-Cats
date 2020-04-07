const hamburguer    = document.querySelector(".hamburguer");
const navLinks      = document.querySelector("#nav-links");
const randomCats = document.querySelectorAll(".random-cat-img");   
const factsUl = document.querySelector(".facts-ul"); 

const unirest = require("unirest");


hamburguer.addEventListener("click", ()=>{
    navLinks.classList.toggle("open");
});


/* function that fetches cat facts */
const getFact = async () => {
    var req = unirest("GET", "https://catfact.ninja/facts?limit=6");
    
    req.headers({
        "x-rapidapi-host": "brianiswu-cat-facts-v1.p.rapidapi.com",
        "x-rapidapi-key": "6ecd5f2c3emshd8043e16a4f97bbp1792dejsnccbddd4f6216"
    });
    
   
    
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        for(var i = 0; i < res.body.data.length; i++){
             // Create a <paragraph> element
            var li = document.createElement("li"); 
             // Insert text 
            var fact = document.createTextNode(res.body.data[i].fact);         
            li.appendChild(fact);                     
            // Append <button> to <body>
            factsUl.appendChild(li);
        };
    });

};

getFact();

/* function that fetches cat images */
const getImage = async () => {

    /* api url */
    const url = "https://api.thecatapi.com/v1/images/search?size=full";

    await randomCats.forEach(async function(randomCat){        
        /* fetching the data */
        const response = await fetch(url);
        const data = await response.json()
            .catch(error => console.log("Error:" + error));
        randomCat.setAttribute("src", data[0].url);
    }); 
};

getImage();


 

