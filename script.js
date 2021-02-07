// search button event handler
function searchMeal() {
    const mealName = document.getElementById('inputMealName');
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=' + mealName.value)
        .then(res => res.json())
        .then(data => foodItem(data.meals))
};

// showing search result function
function foodItem(meals) {
    const mealContainer = document.getElementById('mealContainer');
    if (mealContainer.innerHTML !== null) {
        mealContainer.innerHTML = '';
        meals.forEach(meal => {
            mealContainer.innerHTML += `
                <div onclick="mealInfo('${meal.strMeal}')" class="mealItem">
                    <img src='${meal.strMealThumb}'>
                    <h4>${meal.strMeal}</h4>
                </div>
                `
        });
    };
};


// fetch single meal info with ingredients 
function mealInfo(mealName) {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + mealName)
        .then(res => res.json())
        .then(data => mealDetails(data.meals[0]))
}


// showing meal details function
function mealDetails(meal) {
    const mealDetails = document.getElementById('mealDetails');
    mealDetails.innerHTML = `
    <button title="Close" id="close-btn" onclick="closeDetails()">✖</button>
    <img src='${meal.strMealThumb}'>
    <h1>${meal.strMeal}</h1>
    <h3>Ingredients</h3>
    <ul id="ingredientsContainer"></ul>
    `
    // make an array by values from object
    const propertyValues = Object.values(meal);
    // slice ingredient part from the array
    const ingredientsArray = propertyValues.slice(9, 29);
    // remove empty and null value from array
    const ingredients = ingredientsArray.filter(item => item);
    const ingredientsContainer = document.getElementById('ingredientsContainer');
    ingredients.forEach(ingredient => {
        ingredientsContainer.innerHTML += `
            <li>${ingredient}</li>
            `
    });
    mealDetails.style.display = 'block';
};


// close button event handler function
function closeDetails(){
    document.getElementById('mealDetails').style.display = 'none';
};