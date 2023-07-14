let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let discount =document.getElementById('discount');
let ads =document.getElementById('ads');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');

let mood = 'create';
let tmb;

console.log(title,total, price, ads,taxes, discount,count, category, submit);

function getTotal(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value )+ - 
            discount.value ;
        total .innerHTML = result
        total.style.background="#040";

    }
    else{
        total.innerHTML = "";
        total.style.background="#a00d02";
    }
}

let datPro;
if(localStorage.product !=null)
{
 datPro = JSON.parse(localStorage.product);
}
else{
    datPro=[];
}
submit.onclick = function(){
    let newPro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value

    }
    if(title.value!=''&& price.value!='' && category.value!='' &&newPro.count<200){
        if (mood==='create'){
      if(newPro.count>1){
        for(let i=0;i<newPro.count;i++){
          datPro.push(newPro);
        }
    }
    else{
        datPro.push(newPro);
    }
    }
    else{
        datPro[tmb]=newPro;
        mood='create';
        submit.innerHTML='create';
        count.style.display='block';
    }
    clearData()
    }
    
    
    localStorage.setItem('product',JSON.stringify(datPro));
   
    showData()

}
 function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    count.value=""; 
    category.value="";
    total.innerHTML="";
 }


function showData(){
    getTotal()
    let table='';
    for(let i=0;i<datPro.length;i++){
        table +=`
        <tr>
        <td>${i+1}</td>
        <td>${datPro[i].title}</td>
        <td>${datPro[i].price}</td>
        <td>${datPro[i].taxes}</td>
        <td>${datPro[i].ads}</td>
        <td>${datPro[i].discount}</td>
        <td>${datPro[i].total}</td>
        <td>${datPro[i].category}</td>

      
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

      </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete = document.getElementById('deleteAll');
     if (datPro.length>0){
        btnDelete.innerHTML=` <button onclick="deleteAll()">delete All(${datPro.length})</button>`
     }
     else{
        btnDelete.innerHTML=``
     }

}
showData()



function deleteData(i){
   datPro.splice(i,1);
   localStorage.product= JSON.stringify(datPro);
   showData()
}

function deleteAll() {
    localStorage.clear();
    datPro.splice(0);
    showData()
}



function updateData(i){
    
   title.value=datPro[i].title;
   price.value=datPro[i].price;
   taxes.value=datPro[i].taxes;
   ads.value=datPro[i].ads;
   discount.value=datPro[i].discount;
   count.style.display='none'
   category.value=datPro[i].category;
   getTotal()
   submit.innerHTML='update';
   mood = 'update';
   tmb=i;
   scroll({
    top:0,
    behavior:"smooth",
   })
      
}
 
let serchMood='title';
function getSearchMood(id){
    let search= document.getElementById('search');
     if(id=='searchTitle'){
        serchMood='title';
    
     }
     else{
        serchMood='category';

     }
     search.placeholder='search by '+serchMood;

     search.focus()
     search.value='';
     showData()
}


function searchData(vlue)
{
    let table='';
    for(let i=0;i<datPro.length;i++){
  if(serchMood=='title')

  {     
        if(datPro[i].title.toLowerCase().includes(vlue.toLowerCase())){
            table +=`
            <tr>
            <td>${i}</td>
            <td>${datPro[i].title}</td>
            <td>${datPro[i].price}</td>
            <td>${datPro[i].taxes}</td>
            <td>${datPro[i].ads}</td>
            <td>${datPro[i].discount}</td>
            <td>${datPro[i].total}</td>
            <td>${datPro[i].category}</td>
    
          
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    
          </tr>
            `
          
          
          
            // console.log(datPro[i].title)
            // showData()
        }
       
  }
  else{
    
        if(datPro[i].category.toLowerCase().includes(vlue.toLowerCase())){
            table +=`
            <tr>
            <td>${i}</td>
            <td>${datPro[i].title}</td>
            <td>${datPro[i].price}</td>
            <td>${datPro[i].taxes}</td>
            <td>${datPro[i].ads}</td>
            <td>${datPro[i].discount}</td>
            <td>${datPro[i].total}</td>
            <td>${datPro[i].category}</td>
    
          
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    
          </tr>
            `
          
          
          
            // console.log(datPro[i].title)
            // showData()
        }
       
  }
 }
 document.getElementById('tbody').innerHTML=table;
}










