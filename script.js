const itemForm=document.querySelector('#item-form');
const itemInput=document.querySelector('#item-input');
const itemList=document.querySelector('#item-list');
const clear=document.querySelector('#clear');
checkUI();

function onSubmit(e){
    e.preventDefault();
    const newItem=document.createElement('li');
    newItem.appendChild(document.createTextNode(itemInput.value));
    const button=document.createElement('buttton');
    button.setAttribute('class', 'remove-item btn-link text-red');
    const icon=document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-xmark');
    button.appendChild(icon);
    newItem.appendChild(button);
    document.querySelector('#item-list').appendChild(newItem);
    itemInput.value='';
    checkUI();
}
itemForm.addEventListener('submit', onSubmit);

function clearAll(e){
    const list=Array.from(itemList.children);
    list.forEach((item) => item.remove());
    checkUI();
}
clear.addEventListener('click', clearAll);

function remove(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        if(window.confirm('Are you sure you want to DELETE this item?')===true){
        e.target.parentElement.parentElement.remove();
        }
    }
    checkUI();
    // if(e.target.tagName==='I'){
    //     ((e.target.parentElement).parentElement).remove();
    // }
}
itemList.addEventListener('click', remove);

function checkUI(){
    if(itemList.querySelectorAll('li').length===0){
        clear.style.display='none';
        document.querySelector('.filter').style.display='none';
    }
    else{
        clear.style.display='block';
        document.querySelector('.filter').style.display='block';
    }
}

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