const getTextListBtn = document.getElementById('get-text-list-btn');



getTextListBtn.addEventListener('click', () => {
    const itemsList = [];
    const qtyList = [];
    const mixedList = [];
    document.querySelectorAll('.item-name')
        .forEach(item => itemsList.push(item.innerHTML));
    document.querySelectorAll('.item-qty')
        .forEach(qty => qtyList.push(parseInt(qty.innerHTML)));
    
    if (itemsList.length) {
        const longestItemName = itemsList.reduce((a,b) => a.length > b.length ? a : b);
    
        // merge lists with line breaks
        for (i = 0; i < itemsList.length; i++) {
            mixedList.push(itemsList[i])
            for (let j = 0; j < longestItemName.length - itemsList[i].length + 2; j++) {
                mixedList.push('.')
            }
            mixedList.push(qtyList[i])
            mixedList.push('\n')
        }
        const groceryListContainer = document.querySelector('.grocery-list-container');
        const textListCtr = document.createElement('p');
        textListCtr.innerText = mixedList.join('');
        textListCtr.style.fontFamily = 'monospace';
        groceryListContainer.append(textListCtr);
    } else return;
});
