const search = document.getElementById('search');
const submit=document.getElementById('submit');
const mealsContainerDiv=document.getElementById('meals');
const resultText=document.getElementById('result-heading');
const mealIngredient=document.getElementById('single-meal');
const mealDiv=document.getElementById('mealDetails');

//Search meal by name
//API: https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
//Indivudul Meals
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772


//Search Meal Part
function searchMeal(){
    const searchText=search.value;    
    mealsContainerDiv.innerHTML="";
    mealIngredient.innerHTML="";
    mealDiv.innerHTML="";
    if(searchText.trim()){
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
             .then(res=>res.json())
             .then(data=>{
                resultText.innerHTML=`<h2>Search result : '${searchText}':</h2>`;
                if(data.meals===null){
                resultText.innerHTML=`<h2> No search result  found ...</h2>`; 
                }else{
                        mealsContainerDiv.innerHTML= data.meals.map(meal =>`
                        <div onClick="displayMealDetails('${meal.idMeal}')" class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <h3>${meal.strMeal}</h3>
                        </div> 
                        `).join('');
                }
             });
             searchText.value="";    

    }else{
        alert('Please enter the meal name for search....')
    }
}
submit.addEventListener('click',searchMeal);

//Single meal part

const displayMealDetails =name=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
             console.log(meal)
            renderMealInfo(meal);
        });
}
const renderMealInfo=meal=>{
    const ingridents=[];
    for(let i=1;i<20;i++){
        if (meal[`strIngredient${i}`]) {
            ingridents.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    mealDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h1> ${meal.strMeal}</h1>
        <h2>Ingredients</h2>
        <ul class="checkmark">
        ${ingridents.map(ingrident => `<li>${ingrident}</li>`).join('')}
        </ul>
    `
}