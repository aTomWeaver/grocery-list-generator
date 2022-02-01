const local = window.localStorage;

/* convert local storage to a sorted array AND add the 
name of the recipe to the beginning of the array */
const localToArr = () => {
    let arr = [];
    for (i = 0; i < local.length; i++) {
        arr.push(JSON.parse(local[local.key(i)]));
        arr[i].unshift(local.key(i));
    }
    return arr.sort();
}

// CACHE STARTING RECIPES
local.setItem('tacos', JSON.stringify(['taco sauce', '1 lb 80/20 ground beef', 'tortillas', 'mexican blend cheese']));
local.setItem('spaghetti', JSON.stringify(['spaghetti noodles', '1 lb 80/20 ground beef', 'spaghetti sauce', 'yellow onion']));
local.setItem('jambalaya', JSON.stringify(['andouille sausage', 'chicken thighs', 'chicken broth', 'chicken broth',
    'crushed tomatoes', 'yellow onion', '? minced garlic']));
local.setItem('sandwiches', JSON.stringify(['bread', 'deli meat', 'deli meat', 'sandwich cheese', '? mayo']));
local.setItem('chicken pasta', JSON.stringify(['rotisserie', '? rotini', '? pesto', '? tomato sauce', '? parmesan cheese']));
local.setItem('chicken wraps', JSON.stringify(['tortillas', 'romaine', 'feta', 'rotisserie', '? ginger dressing', '? black olives']));
local.setItem('chicken teriyaki', JSON.stringify(['chicken thighs', 'broccoli', '? rice', 'sake', 'mirin', '? sugar', 'soy sauce']));
local.setItem('chili', JSON.stringify(['1 lb 80/20 ground beef', 'diced tomatoes', 'diced tomatoes', 'chicken broth',
    'dark kidney beans', 'black beans', '? chili powder', 'yellow onion', '? red pepper flakes']));



const recipes = (() => {
    let addedRecipes = [];
    let groceryList = [];
    let itemQuantityArray = [];
    const _init = () => {
        _cacheDOM();
        _bindEvents();
        renderOptions();
    }
    const _cacheDOM = () => {
        this.recipeContainer = document.querySelector('.recipe-container');
        this.groceryListContainer = document.querySelector('.grocery-list-container');
        this.addedRecipesContainer = document.querySelector('.recipes-added-container');
        this.addSingleItemBtn = document.getElementById('add-single-item-btn');
    }
    const _bindEvents = () => {
        this.addSingleItemBtn.addEventListener('click', addSingleItemToList);
    }

    // HELPER FUNCTIONS
    const _filterList = () => {
        itemQuantityArray = [];
        filtered = [...new Set(groceryList)];
        filtered.forEach(elm => {
            let itemQuantity = groceryList.filter(x => x == elm).length;
            itemQuantityArray.push(itemQuantity);
        })
        return {filtered, itemQuantityArray}
    }

    // ADD ITEMS

    const addSingleItemToList = () => {
        const item = prompt('Single item: ');
        if (item) {
            groceryList.push(item);
            _renderAddedRecipeList();
            _renderGroceryList();
        }
    }
    const _addRecipeToList = (options, e) => {
        const recipe = options[e.target.getAttribute('data-index')];
        // add name of recipe addedRecipes array
        addedRecipes.push(recipe[0]);
        // add ingredients to groceryList array
        for (let i = 1; i < recipe.length; i++) groceryList.push(recipe[i]);
    }

    // RENDER ITEMS

    const _renderAddedRecipeList = () => {
        this.addedRecipesContainer.innerHTML = '';
        for (let i = 0; i < addedRecipes.length; i++) {
            // render recipes-added 
            const recipeCard = document.createElement('div');
            recipeCard.innerText = addedRecipes[i];
            this.addedRecipesContainer.append(recipeCard);
        }
    }
    const _renderGroceryList = () => {
        const filteredList = _filterList().filtered;
        const qty = _filterList().itemQuantityArray;
        this.groceryListContainer.innerHTML = '';

        for (let i = 0; i < filteredList.length; i++) {
                // create elements
            const groceryCard = document.createElement('div');
                groceryCard.classList.add('grocery-card')
            const item = document.createElement('div');
            const quantity = document.createElement('div');
                quantity.classList.add('item-qty');
                // bind values
            item.innerText = filteredList[i];
            quantity.innerText = qty[i];
                // bind events
            item.addEventListener('click', () => removeGroceryItem) // ADD THIS FUNCTION
            quantity.addEventListener('click', (e) => {
                changeItemQuantity(e);
            }); // ADD THIS FUNCTION
                // append elements
            groceryCard.append(item, quantity);
            this.groceryListContainer.append(groceryCard);
        }
    }
    const renderOptions = () => {
        this.recipeContainer.innerHTML = '';
        const options = localToArr();
        for (i = 0; i < options.length; i++) {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe');
            recipeCard.setAttribute('data-index', i);
            recipeCard.innerText = options[i][0];
            recipeCard.addEventListener('click', e => {
                _addRecipeToList(options, e);
                _renderAddedRecipeList();
                _renderGroceryList();
            })
            this.recipeContainer.append(recipeCard);
        }
    }

    // REMOVE / CHANGE

    const rmvRecipe = () => {
        // THIS IS UNTESTED! TEST THIS BEFORE USING!
        const options = localToArr();
        const answer = prompt(`Type "remove" to remove recipe`);
        if (answer === "remove") local.removeItem(local[e.target.getAttribute('data-index')]);
        renderOptions();
    }

    const changeItemQuantity = (e) => {
        const item = e.target.previousElementSibling.innerText;
        const currentQty = parseInt(e.target.innerText);
        const desiredQty = parseInt(prompt('Quantity'));
        console.log(`currently ${currentQty} : desired ${desiredQty}`)
        if (desiredQty === 0) {
            for(i = 0; i < currentQty; i++) {
                groceryList.splice(groceryList.indexOf(item), 1);
            }
        } else if (desiredQty < currentQty) {
            for (i = 0; i < desiredQty; i++) {
                groceryList.splice(groceryList.indexOf(item), 1);
            }
        } else {
            for (i = 0; i < (desiredQty - currentQty) ; i++) {
                groceryList.push(item);
            }
        }
        _renderGroceryList();
    }

    _init();
    return {renderOptions, groceryList, addedRecipes}
})();



const modal = (() => {
    const _init = () => {
        _cacheDOM()
        _bindEvents();
    }
    const _cacheDOM = () => {
        this.modal = document.getElementById('modal');
        this.newRecipeBtn = document.getElementById('new-recipe-btn');
        this.closeBtn = document.getElementById('close-modal-btn');
        this.addBtn = document.getElementById('modal-add-btn');
        this.recipeName = document.getElementById('recipe-name');
        this.recipeIngredients = document.getElementById('recipe-ingredients');
    }
    const _bindEvents = () => {
        newRecipeBtn.addEventListener('click', () => this.modal.style.display = 'block');
        closeBtn.addEventListener('click', _close);
        addBtn.addEventListener('click', pushRecipe);
    }
    const _clear = () => {
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
    }
    const _close = () => this.modal.style.display = 'none';
    const pushRecipe = () => {
        const name = this.recipeName.value.toLowerCase();
        const ingredients = this.recipeIngredients.value.toLowerCase().split(', ');
        _clear();
        _close();
        local.setItem(name, JSON.stringify(ingredients));
        recipes.renderOptions();
    }
    _init();
})();


