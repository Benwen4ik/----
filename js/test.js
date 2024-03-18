function searchLocalStorage() {
    var searchName = document.getElementById('searchName').value;
    var items = getAllItemsFromLocalStorage();
  
    var foundItems = items.filter(function(item) {
        return item.value.name && item.value.name.toLowerCase().includes(searchName.toLowerCase());
      });
  
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    if (foundItems.length > 0) {
      resultDiv.innerHTML = 'Найдены элементы:<br>' + JSON.stringify(foundItems);
    } else {
      resultDiv.innerHTML = 'Элементы с указанным значением не найдены в LocalStorage.';
    }
  }
  
  function getAllItemsFromLocalStorage() {
    var items = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = JSON.parse(localStorage.getItem(key));
      items.push({ key: key, value: value });
    }
    return items;
  }