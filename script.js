// arrays
let unfilteredList = [];
let finalShoppingList = [];
let addedRecipesArray = [];

// factory functions
const recipeFactory = (name, ingredients, mealType) => {
    return {name, ingredients, mealType};
};

// element bindings
const newRecipeBtn = document.getElementById('new-recipe-btn');
const addSingleItemBtn = document.getElementById('add-single-item-btn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalAddBtn = document.getElementById('modal-add-btn');
const recipeContainer = document.querySelector('.recipe-container');
const recipesAddedContainer = document.querySelector('.recipes-added-container');
const grocerListContainer = document.querySelector('.grocery-list-container');


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

let recipes = [tacos, spaghetti, jambalaya, sandwiches, chicken_pasta, 
    chicken_wraps, chicken_teriyaki, chili];

// helper functions
function displayModal(){
    modal.style.display = 'block';
}

function refreshRecipeOptions() {
    recipeContainer.innerHTML = '';
    displayRecipeOptions()
}

function clearModal() {
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('meal-type').value = '';
    modal.style.display = 'none';
}

// functions
function addNewRecipe() {
    const name = document.getElementById('recipe-name').value.toLowerCase();
    const ingr = document.getElementById('recipe-ingredients').value.toLowerCase().split(', ');
    const type = document.getElementById('meal-type').value.toLowerCase();
    const newRecipe = recipeFactory(name, ingr, type);
    recipes.push(newRecipe);
    refreshRecipeOptions();
    clearModal();

}

function addRecipeToList(obj) {
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
    //combines the no-duplicates array with the quantity array and returns the finalShoppingList
    for (i = 0; i < noDuplicatesList.length; i++) {
        finalShoppingList[i] = noDuplicatesList[i] + " x" + QuantityArray[i]; 
    }
    return finalShoppingList;
}

function addSingleItem(item) {
    if (item === null) {
        return;
    } else {
        let pseudoRecipe = recipeFactory('pseudo', [item], 'added item');
        addRecipeToList(pseudoRecipe);
        refreshGroceryList();
    }
}

function refreshRecipesAdded() {
    recipesAddedContainer.innerHTML = '';
    for (elm in addedRecipesArray) {
        const item = document.createElement('div');
        item.innerText = addedRecipesArray[elm].name;
        recipesAddedContainer.appendChild(item);
    }
}

function refreshGroceryList() {
    grocerListContainer.innerHTML = '';
    for (elm in finalShoppingList) {
        const item = document.createElement('div');
        item.innerText = finalShoppingList[elm];
        item.classList.add('grocery-list-item');
        item.setAttribute('data-listNum', elm);
        grocerListContainer.appendChild(item);
    }
}



// event finalShoppingListeners
newRecipeBtn.addEventListener('click', displayModal);
closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
modalAddBtn.addEventListener('click', addNewRecipe);
addSingleItemBtn.addEventListener('click',() => {
    const item = prompt('Item:');
    addSingleItem(item);
})




function add(num) {
    addedRecipesArray.push(num)
    addRecipeToList(num)
    refreshGroceryList();
}

function displayRecipeOptions() {
    for (elm in recipes) {
        const recipeOption = document.createElement('div');
        recipeOption.classList.add('recipe');
        recipeOption.setAttribute('data-recipe-num', elm);
        recipeOption.innerText = recipes[elm].name;
        recipeOption.addEventListener('click', (e) => {
            const recipeNum = recipes[e.target.dataset.recipeNum];
            add(recipeNum);
            refreshRecipesAdded();
        })
        recipeContainer.appendChild(recipeOption);
    }
}
displayRecipeOptions();

const groceryListItems = document.getElementsByClassName('grocery-list-item');
// groceryListItems.forEach( item => {
//     item.addEventListener('click', () => alert('working'))
// });
