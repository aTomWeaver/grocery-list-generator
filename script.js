let unfilteredList = [];
let list = [];

// factory functions
const recipeFactory = (name, ingredients, mealType) => {
    return {name, ingredients, mealType};
};

// recipes
const tacos = recipeFactory('tacos', ['taco sauce', '1 lb 80/20 ground beef', 'tortillas',
    'mexican blend cheese'], 'dinner');
const spaghetti = recipeFactory('spaghetti', ['spaghetti noodles', '1 lb 80/20 ground beef', 'spaghetti sauce',
    'yellow onion'], 'dinner');
const jambalaya = recipeFactory('jambalaya', ['andouille sausage', 'chicken thighs', 'chicken broth',
    'chicken broth', 'crushed tomatoes', 'yellow onion', '? minced garlic'], 'dinner');
const sandwiches = recipeFactory('sandwiches', ['bread', 'deli meat', 'deli meat', 'sandwich cheese',
    '? mayo'], 'lunch');
const chicken_pasta = recipeFactory('chicken pasta', ['rotisserie', '? rotini', '? pesto', '? tomato sauce',
    '? parmesan cheese'], 'dinner');
const chicken_wraps = recipeFactory('chicken wraps', ['tortillas', 'romaine', 'feta', 'rotisserie',
    '? ginger dressing', '? black olives'], 'lunch');
const teriyaki_sauce = recipeFactory('teriyaki sauce', ['sake', 'mirin', '? sugar', 'soy sauce'], 'sauce');
const chicken_teriyaki = recipeFactory('chicken teriyaki', ['chicken thighs', 'broccoli', '? rice'].concat(teriyaki_sauce.ingredients),
    'dinner');
const chili = recipeFactory('chili', ['1 lb 80/20 ground beef', 'diced tomatoes', 'diced tomatoes',
    'chicken broth', 'dark kidney beans', 'black beans', '? chili powder', 'yellow onion', '? red pepper flakes'], 'dinner');

let recipes = [tacos, spaghetti, jambalaya, sandwiches, chicken_pasta, chicken_wraps, chicken_teriyaki, chili];

// functions
function recipeAdd(obj) {
    // pushes ingredients of recipe to unfiltered list
    obj.ingredients.forEach(element => {
        unfilteredList.push(element);
    });
    /* creates an array of ingredients on the unfiltered list with no repeats 
    and an array with the quantity of each ingredient on the unfiltered list */
    let noDuplicatesList = [...new Set(unfilteredList)];
    let QuantityArray = [];
    noDuplicatesList.forEach(elm => {
        let ingredientQuantity = unfilteredList.filter(x => x == elm).length;
        QuantityArray.push(ingredientQuantity);
    })
    //combines the no-duplicates array with the quantity array and returns the final list
    for (i = 0; i < noDuplicatesList.length; i++) {
        list[i] = noDuplicatesList[i] + " x" + QuantityArray[i]; 
    }
    return list;
}

function itemAdd(item) {
    let pseudoRecipe = recipeFactory('pseudo', [item], 'added item');
    return recipeAdd(pseudoRecipe);
}

function displayModal(){
    alert('working');
}

const newRecipeBtn = document.getElementById('new-recipe-btn');

// event listeners

newRecipeBtn.addEventListener('click', displayModal)