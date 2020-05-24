const btnShow = document.querySelector("#btnShow");
const btnDog = document.querySelector("#btnDog");
const btnCat = document.querySelector("#btnCat");
const btnParrots = document.querySelector("#btnParrot");


const url = new URL("http://localhost:9090/vote/stats");

const header = new Headers({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
})


const ES = new EventSource(url, header);



let data = {}


function spliter(string) {
    let newString = ""

    for (i in string) {
        newString += string[i].replace("{", " ").replace("}", " ").replace("\'", " ").replace(" ", "").replace(",", ":");
    };

    newString = newString.split(":");

    const convertedToDict = dictAssembly(newString);

    return convertedToDict
};

function dictAssembly(list) {

    obj = {
        [list[0]]: Number(list[1]),
        [list[2]]: Number(list[3]),
        [list[4]]: Number(list[5])
    };

    return obj
};



ES.addEventListener("message", function (message) {

    data = spliter(message.data);



    const sum = data["dogs"] + data["cats"] + data["parrots"]


    progressDog.style.cssText =`width: ${data["dogs"]*100/sum}%`;
    progressDog.innerHTML = `${Math.floor(data["dogs"]*100/sum)}%`

    progressCat.style.cssText =`width: ${data["cats"]*100/sum}%`;
    progressCat.innerHTML = `${Math.floor(data["cats"]*100/sum)}%`

    progressParrots.style.cssText =`width: ${data["parrots"]*100/sum}%`;
    progressParrots.innerHTML = `${Math.floor(data["parrots"]*100/sum)}%`



});

btnShow.addEventListener("click", function () {
    const progressBars = document.querySelector("#progBars");
    const showerProgress = document.querySelector("#showerProgress");
    progressBars.style.cssText = "display: flex";
    showerProgress.style.cssText = "display: none";
});
btnDog.addEventListener("click", function() {
    fetch("http://localhost:9090/vote/dogs", {
        method: "post"
    })
});
btnCat.addEventListener("click", function() {
    fetch("http://localhost:9090/vote/cats", {
        method: "post"
    })
});
btnParrots.addEventListener("click", function() {
    fetch("http://localhost:9090/vote/parrots", {
        method: "post"
    })
});