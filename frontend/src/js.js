const url = new URL("https://sf-pyw.mosyag.in/sse/vote/stats");

const ES = new EventSource(url)
let newString = []
let list = []
let data = {}



function spliter(string) {
    for (i in string) {
        newString += string[i].replace("{", " ").replace("}", " ").replace("\"", " ").replace(" ", "").replace(",", ":");
    };

    list = newString.split(":");
    newString = [];

    return list
}

function dictAssembly(list) {
    for (i in list) {
        obj = {
            [list[0]]: Number(list[1]),
            [list[2]]: Number(list[3]),
            [list[4]]: Number(list[5])
        };
    };
    return obj
};

ES.addEventListener("message", function (message) {

    const list = spliter(message.data);
    data = dictAssembly(list);

    progressDog.style.cssText =`width: ${data["dogs"]}%`


});