const itemForm=document.querySelector('#item-form');
const itemInput=document.querySelector('#item-input');
const itemList=document.querySelector('#item-list');
const clear=document.querySelector('#clear');
let isEditMode=false;

function displayItems(){
    const items=getItemFromStorage();
    items.forEach((item) => {
        addItemToDOM(item);
    });
    checkUI();
}
//creating list element and adding items to the ul
function onSubmit(e){
    e.preventDefault();
    if(itemInput.value===''){
        alert('Please add an Item !');
        return;
    }

    // check for edit mode
    if(isEditMode) {
        const itemToEdit= itemList.querySelector('.edit-mode');

        removeFromStorage(itemToEdit.innerText);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode=false;
    }else{
        if(checkDublicate(itemInput.value)){
            alert('That item already Exits !');
            return ;
        }
    }

    addItemToDOM(itemInput.value);

    // Add item to localStorage
    addItemToStorage(itemInput.value);
    itemInput.value='';
    checkUI();
}

function addItemToDOM(item){
    const newItem=document.createElement('li');
    newItem.appendChild(document.createTextNode(item));
    const button=createButton('remove-item btn-link text-red');
    newItem.appendChild(button);
    document.querySelector('#item-list').appendChild(newItem);
}

itemForm.addEventListener('submit', onSubmit);
//creating button element to append it in the li element
function createButton(classes){
    const button=document.createElement('button');
    button.setAttribute('class', classes);
    const icon=createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
//creating icon element to append it in button element
function createIcon(classes){
    const icon=document.createElement('i');
    icon.setAttribute('class', classes);
    return icon;
}

function addItemToStorage(item){
    const itemsFromStorage=getItemFromStorage();
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemFromStorage(){
    let itemsFromStorage;
    if(localStorage.getItem('items')===null){
        itemsFromStorage=[];
    }
    else{
        itemsFromStorage=JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function clearAll(e){
    const list=Array.from(itemList.children);
    list.forEach((item) => item.remove());
    localStorage.removeItem('items');
    checkUI();
}
clear.addEventListener('click', clearAll);

function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        remove(e.target.parentElement.parentElement);
    }
    else{
        setItemToEdit(e.target);
    }
}

function checkDublicate(item){
    item=item.toLowerCase();
    const itemsFromStorage=getItemFromStorage();
    let i=0;
    while(i<itemsFromStorage.length){
        itemsFromStorage[i]=itemsFromStorage[i].toLowerCase();
        i=i+1;
    }
    return itemsFromStorage.includes(item);
}

function setItemToEdit(item){
    isEditMode=true;
    itemList.querySelectorAll('li').forEach((li) => li.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    const formBtn=itemForm.querySelector('button');
    formBtn.innerHTML='<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor='#228B22';
    itemInput.value=item.innerText;
}

function remove(item){
    if(window.confirm('Are you sure you want to DELETE this item?')===true){
        item.remove();
        }

removeFromStorage(item.innerText);
    
    checkUI();
   
    //below is the alternative of the above for removing the element 
    // if(e.target.tagName==='I'){
    //     ((e.target.parentElement).parentElement).remove();
    // }
}

itemList.addEventListener('click', onClickItem);

function removeFromStorage(itemToRemove){
    let itemsFromStorage=getItemFromStorage();
    itemsFromStorage=itemsFromStorage.filter((item) => item!==itemToRemove);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function checkUI(){
    itemInput.value='';

    if(itemList.querySelectorAll('li').length===0){
        clear.style.display='none';
        document.querySelector('.filter').style.display='none';
    }
    else{
        clear.style.display='block';
        document.querySelector('.filter').style.display='block';
    }

        const formBtn=itemForm.querySelector('button');
        formBtn.innerHTML='<i class="fa-solid fa-plus"></i> Add Item';
        formBtn.style.backgroundColor='#333';

        isEditMode=false;
}

//this check the ul if it has no child then it removes the Fliter and the Clear All
checkUI();

function onInput(e){
    const value=e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach((list) => list.style.display='block');
    let i=0;
    while(i<itemList.children.length){
        if(itemList.children[i].innerText.slice(0,e.target.value.length).toLowerCase()===value){
            i=i+1;
            continue;
        }
        itemList.children[i].style.display='none';
        i=i+1;
    }
}
document.querySelector('#filter').addEventListener('input', onInput);

document.addEventListener('DOMContentLoaded', displayItems);