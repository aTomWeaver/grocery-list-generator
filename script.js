let shoppingList = [];

const recipeFactory = (name, ingredients, mealType) => {
    return {name, ingredients, mealType};
};
const ingredientFactory = (name, type, isRefrigerated) => {
    return {name, type, isRefrigerated};
};

//ingredients
const onion = ingredientFactory('onion', 'vegetable', false);
const groundBeef80 = ingredientFactory('80/20 ground beef', 'meat', true);
const MexicanCheese = ingredientFactory('Mexican Blend Cheese', 'dairy', true);
// recipes
const tacos = recipeFactory('tacos', ['taco sauce', groundBeef80, 'tortillas', MexicanCheese], 'dinner');
const spaghetti = recipeFactory('spaghetti', ['spaghetti noodles', groundBeef80, 'spaghetti sauce', onion], 'dinner');

let recipes = [tacos, ];


function pushRecipeToShoppingList() {
    // get selected recipe from user and return the ingredients list 
    // push ingredients to shoppingList 
}

function addSingleItemToShoppingList() {
    // get user input and push it onto the shoppingList
}

