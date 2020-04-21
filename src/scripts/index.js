const hamburguer    = document.querySelector(".hamburguer");
const navLinks      = document.querySelector(".nav-links");
const factsUl       = document.querySelector(".facts-ul"); 
const catContainer  = document.querySelector(".cat-container");  
const catImgBtn     = document.querySelector("#cat-img-btn");

const unirest       = require("unirest");

/* event listener */
hamburguer.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});


/* function that fetches cat facts */
const getFact = async () => {    

    try{
        var req = unirest("GET", "https://catfact.ninja/facts?limit=10");
        req.headers({
            "x-rapidapi-host": "brianiswu-cat-facts-v1.p.rapidapi.com",
            "x-rapidapi-key": "6ecd5f2c3emshd8043e16a4f97bbp1792dejsnccbddd4f6216"
        });
           
        req.end(function (res) {
            if (res.error) throw new Error(res.error);

             /* a fragment improves the appending time */		
            var factsContent = document.createDocumentFragment();

            /* appending the li to the fragment, to later append him to the body */
            for(var i = 0; i < res.body.data.length; i++){
                 // Create a <paragraph> element
                var li = document.createElement("li"); 
                 // Insert text 
                var fact = document.createTextNode(res.body.data[i].fact);         
                li.appendChild(fact);                     
                // Append <button> to <body>
                factsContent.appendChild(li);
            };

            factsUl.appendChild(factsContent);
        });
    } catch(error){
        console.log("Wild bug appears! We'll catch it, so, please try again. " + error); 
    }       
};

getFact();

/* function that creates the img elements */

const createImgElement = () => {

    /* a fragment improves the appending time */		     
    var content = document.createDocumentFragment();

    /* appending the images to the fragment, to later append him to the body */
    for(i = 0; i < 6; i++){
        var img = document.createElement("img");
        img.classList.add("random-cat-img");
        content.appendChild(img);
    }
    catContainer.appendChild(content);
}

createImgElement();

/* function that fetches cat images */
const getImage = async () => {    
    const catImagesArr  = document.querySelectorAll(".random-cat-img");
    const apiKey = "5d85bb8f-fdac-4b78-821a-44e6cef3483d";
        
    try{	
        var req = unirest("GET", "https://api.thecatapi.com/v1/images/search?limit=6");
        req.headers({"x-api-key": apiKey});
        
        req.end(function(res){
            if (res.error) throw new Error(res.error);  
            for(var i = 0; i < catImagesArr.length; i++){
                catImagesArr[i].setAttribute("src", res.body[i].url);
            };       
        });        
    } catch(error){
        console.log("Wild bug appears! We'll catch it, so, please try again. " + error); 
    }
};

/* event listener */
catImgBtn.addEventListener("click", getImage);

getImage();
