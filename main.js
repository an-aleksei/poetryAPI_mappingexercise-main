//let url = 'https://poetrydb.org/random,linecount/1;10/title,author,lines.json'
//let url = 'https://poetrydb.org/author,title/Shakespeare;Sonnet'
let url2 = 'https://poetrydb.org/authors'

const button = document.getElementById('button');
const poemZone = document.getElementById('poem');
let poemHolder = [];
let authorHolder = [];




async function requestPoem(author) {


    
    //REQUEST POEMS FROM API
    const response = await fetch(`https://poetrydb.org/author/${author}`);
    const data = await response.json();
    console.log(data);

    poemHolder = data;

    poemLister(data);


}

async function requestAuthors() {
    //REQUEST AUTHORS FROM API
    const response = await fetch(url2);
    const data = await response.json();
    console.log(data.authors);

    authorHolder = data.authors;

    authorLister(data.authors);



}




// REPLACE RANDOM POEM WITH A DIFFERENT RANDOM POEM
function newPoem(data) {

    const randomIndex = Math.floor(Math.random() * data.length);
    const poem = data[randomIndex]["lines"].join(' <br> ');
    poemZone.innerHTML = poem;
}



function selectPoem(data, index) {
    const poem = data[index]["lines"].join(' <br> ');
    poemZone.innerHTML = poem;
    console.log(index);
}




//LIST ALL THE POEMS
function poemLister(data) {
const listOfTitles = data.map((poem, index) => {
   // console.log(poem.title);
    const node = document.createElement("option");
    node.innerHTML = `${poem.title}`;
   node.value = index;
   // node.innerText = poem.title;
   //node.setAttribute("onclick", "")
document.getElementById('poem-picker').appendChild(node);
})
//console.log(listOfTitles);
document.getElementById('poem-count').innerText= `${listOfTitles.length} poems available`
}

function authorLister(data) {
    const listOfAuthors = data.map((author) => {
       // console.log(poem.title);
        const node = document.createElement("option");
        node.innerHTML = `${author}`;
        node.value = author;
        document.getElementById('author-picker').appendChild(node);
    
    })
    //console.log(listOfTitles);
    document.getElementById('author-count').innerText= `${listOfAuthors.length} authors available`
}

document.getElementById('author-picker').addEventListener('change', function() {
    if (this.value !== 'Pick an author') {
        const poemPicker = document.getElementById('poem-picker');
        poemPicker.innerHTML = "<option selected>Pick a poem</option>";
        requestPoem(this.value);
    }
});

document.getElementById('poem-picker').addEventListener('change', function() {
    if (this.value !== 'Pick a poem') {
        selectPoem(poemHolder, this.value);
    }
});


requestPoem();
requestAuthors();
    


