let unfilteredList = [];
let list = [];

const recipeFactory = (name, ingredients, mealType) => {
    return {name, ingredients, mealType};
};

// recipes
const tacos = recipeFactory('tacos', ['taco sauce', '80/20 ground beef', 'tortillas', 'mexican blend cheese'], 'dinner');
const spaghetti = recipeFactory('spaghetti', ['spaghetti noodles', '80/20 ground beef', 'spaghetti sauce', 'onion'], 'dinner');

let recipes = [tacos, spaghetti];

function pushRecipeToShoppingList(obj) {
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

function addSingleItemToShoppingList(item) {
    let pseudoRecipe = recipeFactory('pseudo', [item], 'added item');
    return pushRecipeToShoppingList(pseudoRecipe);
}

