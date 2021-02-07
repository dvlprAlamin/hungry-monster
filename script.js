

function searchMeal() {
    const mealName = document.getElementById('inputMealName');
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=' + mealName.value)
    .then(res => res.json())
    .then(data => foodItem(data.meals))
    

}

function foodItem(meals) {
    const mealContainer = document.getElementById('mealContainer');
    if(mealContainer.innerHTML !== null){
        mealContainer.innerHTML = '';
        meals.forEach(meal => {        
        
            // const mealDiv = document.createElement('div');
            // mealDiv.setAttribute('class', 'mealItem');
            mealContainer.innerHTML += `
                <div onclick="mealInfo('${meal.strMeal}')" class="mealItem">
                    <img src='${meal.strMealThumb}'>
                    <h4>${meal.strMeal}</h4>
                </div>
                `
            // mealContainer.appendChild(mealDiv);
        });
    }
    
};

function mealInfo(mealName) {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + mealName)
    .then(res => res.json())
    .then(data => mealDetails(data.meals[0]))
}

function mealDetails(meal) {
    const mealDetails = document.getElementById('mealDetails');
    
    // make an array with values from object
    const propertyValues = Object.values(meal);
    // slice ingredient part from the array
    const ingredientsArray = propertyValues.slice(9, 29);
    // remove empty and null value from array
    const ingredients = ingredientsArray.filter(item => item);
    mealDetails.innerHTML = `
    <img src='${meal.strMealThumb}'>
    <h2>${meal.strMeal}</h2>
    <ul id="ingredientsContainer"></ul>
    ` 
    const ingredientsContainer = document.getElementById('ingredientsContainer');
        if(ingredientsContainer.innerHTML !== ''){
            ingredientsContainer.innerHTML = '';
        }
    ingredients.forEach(ingredient => {
        
        ingredientsContainer.innerHTML += `
            <li>${ingredient}</li>
            `
            
    });
    //   console.log(ingredients);
    
    
    
    // mealDetails.appendChild(ingredientsContainer)
    mealDetails.style.display = 'block';
    
    
    
}

/*
if(mealDetails.innerHTML !== null){
        mealDetails.innerHTML = '';
        mealDetails.innerHTML += `
    <img src='${meal.strMealThumb}'>
    <h2>${meal.strMeal}</h2>
    ` 
    }
    */