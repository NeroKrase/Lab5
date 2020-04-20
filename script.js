getImage("https://randomuser.me/api/?results=50 ")
    .then(
        response=>alert("Successfully loaded!"),
        error=>alert(`Something went wrong: ${error}`)
    );

window.addEventListener("scroll", function(){
    let block = document.querySelector("#imgBlock");
    let contentHeight = block.offsetHeight;
    let yOffset = window.pageYOffset;
    let window_height = window.innerHeight;
    let y = yOffset + window_height;

    if(y >= contentHeight)
    {
        getImage("https://randomuser.me/api/?results=10");
    }
});


function getImage(url) {
    return new Promise( (resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.responseType = "json";
        xhttp.open("GET", url, true);

        xhttp.onload = () => {
            if (xhttp.status === 200){
                resolve(this.response);
                let images = xhttp.response.results;
                images.forEach((img) => drawImage(img));
            }
            else{
                reject(new Error(xhttp.response));
            }
        };
        xhttp.send();
    });
}

function drawImage(img) {
    let imgSource = img.picture.large;
    const imgHtml = document.createElement("img");
    imgHtml.classList.add("picture");
    imgHtml.setAttribute("src", imgSource);
    document.querySelector('#imgBlock').appendChild(imgHtml);
}