'use strict';

const STORE = { 
  items : [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  hideCompleted: false,
};


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
    <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
    </div>
  </li>`; 
}

function generateShoppingItemsString(shoppingList){
  console.log('Generating shopping list element');

  const items = shoppingList.items.map((item, index) => generateItemElement(item,index));
  return items.join('');
}

function handleEditingListItem(event) {
  let itemName = event.target.innerHTML; 
  event.target.innerHTML = `<form> <input placeholder=${itemName} type="text">  </form>`; //input and form
  //on enter, trigger event 
  //event should be able to send it through pressing return
  //put in itemName with an event 
  //innerHTML will become new name
  // $('.submit_on_enter').keydown(function(event) {
  //   // enter has keyCode = 13, change it if you want to use another button
  //   if (event.keyCode == 13) {
  //     this.form.submit();
  //     return false;
  //   }
  // }); like a dis 
}

function renderShoppingList(){
  console.log('renderShoppingList ran');
  const shoppingListItemsString= generateShoppingItemsString(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
  $('.js-shopping-list').on('click', '.js-shopping-item', function(event) {
    handleEditingListItem(event);
  })
}

function renderShoppingListParm(items) {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(items);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}

function handleNewItemSubmit(){
  $('#js-shopping-list-form').submit(function (event){
    event.preventDefault();
    console.log('`handleItemCheckClicked` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}


function toggleCheckedForListItem(itemIndex){
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

function getItemIndexFromElement(item){
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked(){
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteItem(itemIndex){
  STORE.splice(itemIndex, 1);
}

function handleDeleteItemClicked(){
  $('.js-shopping-list').on('click', '.js-item-delete', event =>{
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItem(itemIndex);
    renderShoppingList();
    console.log('`handleDeleteItemClicked` ran');
  });
}

function hideCheckedItems() {
  const filteredCheckedItems = STORE.items.filter( item => !item.checked);
  const shoppingListItemsString = generateShoppingItemsString(filteredCheckedItems);
  $('.js-shopping-list').html(shoppingListItemsString);

  console.log(filteredCheckedItems);
}

function handleHideCompletedItems () {
  console.log('handleHideCompleted ran');
  $('#check_selection').change(function() {
    if( $('input[type=checkbox]').prop('checked')) {
      console.log('check');
      hideCheckedItems();
    } else {
      console.log('unchecked');
      renderShoppingList();
    }
  });
}

function searchForItems(word) {
  const searching = STORE.items.filter( str => str.name.startsWith(word));
  const newHtmlString = generateShoppingItemsString(searching);
  $('.js-shopping-list').html(newHtmlString);
 
 }
 
 function handleSearchedForItems() {
  $('.js-shopping-list-entry').keyup(function() {
    const searchWord = $('.js-shopping-list-entry').val();
    if(searchWord === '') {
      renderShoppingList();
    } else {
     searchForItems(searchWord);
    }
  });
 }

function handleShoppingList(){
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked(); 
  handleHideCompletedItems();
  handleSearchedForItems();
     
}

$(handleShoppingList);

