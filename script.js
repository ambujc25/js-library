let myLibrary = [];

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let books = document.querySelector('.books');

let add = document.querySelector('.add');
let body = document.querySelector('body');
let takeinput,overlay;
let container = document.querySelector('.container');
let books2 = document.querySelector('.books2');

let shouldAdd = 1;

add.addEventListener('click',function(e){
    if(shouldAdd==1){
        openInputBox();
    }
})


let close = document.querySelector('.close');   
close.addEventListener('click',function(e){
    if(shouldAdd==0){
        closeInputBox();       
    }
});

function closeInputBox(){
    takeinput.classList.remove('takeInput');
    takeinput.classList.add('hidden');
    container.style.cssText = 'z-index: 0';
    books2.style.cssText = 'z-index: 0';
    body.removeChild(overlay);
    shouldAdd=1;

    document.querySelector('.title').value = "";
    document.querySelector('.author').value = "";
    document.querySelector('.pages').value = "";
    document.querySelector('.read').value = "";
}

function openInputBox(){
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    takeinput = document.querySelector('.hidden');
    takeinput.classList.add('takeInput');
    takeinput.classList.remove('hidden');
    container.style.cssText = 'z-index: -2';
    books2.style.cssText = 'z-index: -2';
    body.appendChild(overlay);
    shouldAdd=0;

    document.querySelector('.title').value = "";
    document.querySelector('.author').value = "";
    document.querySelector('.pages').value = "";
    document.querySelector('.read').value = "";
}


let addbook = document.querySelector('.addbook');
addbook.addEventListener('click',function(e){
    let title = document.querySelector('.title').value;
    let author = document.querySelector('.author').value;
    let pages = document.querySelector('.pages').value;
    let read = document.querySelector('.read').value;

    if(isNaN(Number(pages))){
        alert('Pages should be in numbers!');
        closeInputBox();
    }else{
        pages = Number(pages);


        if(read!='yes' && read!='no'){
            alert('Answer in yes or no for read');
            closeInputBox();
        }else{
            console.log(title + ' ' + pages + ' ' + author + ' ' + read);

            if(read=='yes'){
                read = true;
            }else{
                read = false;
            }

            let newBook = new Book(title,author,pages,read);
            myLibrary.push(newBook);

            document.querySelector('.title').value = "";
            document.querySelector('.author').value = "";
            document.querySelector('.pages').value = "";
            document.querySelector('.read').value = "";
            closeInputBox();

            removeBooks();
            showBooks();
        }
    }
});


function removeBooks(){
    while(books.firstChild){
        books.removeChild(books.firstChild);
    }
}

let i;

function showBooks(){
    i = 0;
    myLibrary.forEach(function(curr_book){
        let booktag = document.createElement('div');
        booktag.classList.add('book');

        let title = document.createElement('p');
        let author = document.createElement('p');
        let pages = document.createElement('p');
        let read = document.createElement('p');
        let closebook = document.createElement('button');
        let readbook = document.createElement('button');

        readbook.innerHTML = "R";
        readbook.classList.add('read2');
        readbook.dataset.rnumber = i;

        readbook.addEventListener('click',function(e){
            let index = readbook.dataset.rnumber;
            myLibrary[index].read = !myLibrary[index].read;
            removeBooks();
            showBooks();
        })

        closebook.innerHTML = "X";
        closebook.classList.add('closeBook');
        closebook.dataset.bnumber = i;

        closebook.addEventListener('click',function(e){
            let index = closebook.dataset.bnumber;
            myLibrary.splice(index,1);
            removeBooks();
            showBooks();
        })

        title.innerText = curr_book.title;
        title.style.fontSize = "24px";
        title.style.fontWeight = "bold";

        author.innerText = "~" + curr_book.author;
        author.style.textAlign = "right";
        author.style.fontSize = "18px";
        author.style.marginBottom = "10px";

        pages.innerText = curr_book.pages + " Pages";

        if(curr_book.read)
            read.innerText = "Read";
        else
            read.innerText = "Not read";

        booktag.appendChild(title);
        booktag.appendChild(author);
        booktag.appendChild(pages);
        booktag.appendChild(read);
        booktag.appendChild(closebook);
        booktag.appendChild(readbook);

        //booktag.innerText = curr_book.title + " by " + curr_book.author + ", " + curr_book.pages + ", " + curr_book.read; 
        console.log(curr_book);
        books.appendChild(booktag);
        i++;

    })
}

