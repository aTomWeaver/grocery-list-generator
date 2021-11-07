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
const MexicanCheese = ingredientFactory('mexican blend cheese', 'dairy', true);
const tacoSauce = ingredientFactory('taco sauce', 'dry', false);
const tortillas = ingredientFactory('tortillas', 'dry', false);
const spaghettiNoodles = ingredientFactory('spaghetti noodles', 'dry', false);
const spaghettiSauce = ingredientFactory('spaghetti sauce', 'dry', false);

// recipes
const tacos = recipeFactory('tacos', [tacoSauce, groundBeef80, tortillas, MexicanCheese], 'dinner');
const spaghetti = recipeFactory('spaghetti', [spaghettiNoodles, groundBeef80, spaghettiSauce, onion], 'dinner');

let recipes = [tacos, ];


function pushRecipeToShoppingList(obj) {
    obj.ingredients.forEach(element => {
        shoppingList.push(element.name);
    });
    let reducedList = [...new Set(shoppingList)];
    let qtyArray = [];
    reducedList.forEach(elm => {
        let qty = shoppingList.filter(x => x == elm).length;
        qtyArray.push(qty);
    })
    for (i = 0; i < reducedList.length; i++) {
        reducedList[i] = reducedList[i] + " x" + qtyArray[i]; 
    }
    return reducedList;
    // get selected recipe from user and return the ingredients list 
    // push ingredients to shoppingList 
}

function addSingleItemToShoppingList() {
    // get user input and push it onto the shoppingList
}

