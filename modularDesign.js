const local = window.localStorage;

// recipes start
local.setItem('tacos', JSON.stringify(['taco sauce', '1 lb 80/20 ground beef', 'tortillas', 'mexican blend cheese']));
local.setItem('spaghetti', JSON.stringify(['spaghetti noodles', '1 lb 80/20 ground beef', 'spaghetti sauce', 'yellow onion']));
local.setItem('jambalaya', JSON.stringify(['andouille sausage', 'chicken thighs', 'chicken broth','chicken broth',
  'crushed tomatoes', 'yellow onion', '? minced garlic']));
local.setItem('sandwiches', JSON.stringify(['bread', 'deli meat', 'deli meat', 'sandwich cheese', '? mayo']));
local.setItem('chicken pasta', JSON.stringify(['rotisserie', '? rotini', '? pesto', '? tomato sauce', '? parmesan cheese']));
local.setItem('chicken wraps', JSON.stringify(['tortillas', 'romaine', 'feta', 'rotisserie', '? ginger dressing', '? black olives']));
local.setItem('chicken teriyaki', JSON.stringify(['chicken thighs', 'broccoli', '? rice', 'sake', 'mirin', '? sugar', 'soy sauce']));
local.setItem('chili', JSON.stringify(['1 lb 80/20 ground beef', 'diced tomatoes', 'diced tomatoes', 'chicken broth', 
  'dark kidney beans', 'black beans', '? chili powder', 'yellow onion', '? red pepper flakes']));
// recipes end

const recipes = (() => {
  const _init = () => {
    _cacheDOM();
    _bindEvents();
    _render();
  }
  const _cacheDOM = () => {
    this.recipeContainer = document.querySelector('.recipe-container');
  }
  const _bindEvents = () => {

  }
  const _localToArr = () => {
    let arr = [];
    for (i = 0; i < local.length; i++) {
      arr.push(JSON.parse(local.getItem(local.key(i))));
    }
    return arr;
  }
  const _render = () => {
    for (i = 0; i < local.length; i++) {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe')
      recipeCard.innerText = local.key(i);
      this.recipeContainer.append(recipeCard);
    }
  }
  const rmvRecipe = () => {
    // local.removeItem()
  }
  let list = _localToArr();
  _init();
  return { list }
})();
