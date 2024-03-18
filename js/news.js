function saveDataNews() {
    // Получение значений полей формы
    var name = document.getElementById('name').value;
    var text = document.getElementById('text').value;

    // Проверка наличия значений
    if (name && text) {
      // Создание объекта с данными
      var data = {
        name: name,
        text: text
      };

      // Создание уникального ключа на основе текущего времени
      var key = 'formData_' + Date.now();
      // Сохранение данных в localStorage
      localStorage.setItem(key, JSON.stringify(data));

      // Очистка полей формы
      document.getElementById('name').value = '';
      document.getElementById('text').value = '';

      // Оповещение пользователя об успешном сохранении
      alert('Данные сохранены в localStorage!');
    } else {
      // Оповещение пользователя о незаполненных полях
      alert('Пожалуйста, заполните все поля формы!');
    }
  }

  // Функция для вывода данных из localStorage
  function showData() {
    console.log('Функция showData вызвана при открытии страницы');
    // Проверка поддержки localStorage в браузере
    if (typeof localStorage !== 'undefined') {
      // Получение всех ключей из localStorage
      var keys = Object.keys(localStorage);

      // Перебор ключей и вывод данных
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var data = localStorage.getItem(key);

        // Проверка наличия данных
        if (data) {
          // Распарсивание JSON-строки в объект
          var parsedData = JSON.parse(data);

          // Вывод данных на страницу
          var container = document.getElementById('list');
          var article = document.createElement('article');
          article.classList.add('python');
          var h2 = document.createElement('h2');
          var p = document.createElement('p');
          h2.textContent = 'Название: ' + parsedData.name
          p.textContent = 'Новость: ' + parsedData.text;
          var deleteButton = document.createElement('button');
          deleteButton.classList.add('button');
          deleteButton.addEventListener('click', function() {
            var parent = this.parentNode;
            var grandparent = parent.parentNode;
            var index = Array.prototype.indexOf.call(grandparent.children, parent);
            removeItemFromLocalStorage(index);
            grandparent.removeChild(parent);
          });
          deleteButton.textContent = 'Удалить';
          article.appendChild(h2);
          article.appendChild(p);
          article.appendChild(deleteButton);
          container.appendChild(article);
        }
      }
    }
}

// Функция для удаления элемента из LocalStorage
function removeItemFromLocalStorage(index) {
  var items = getAllItemsFromLocalStorage();
  if (index >= 0 && index < items.length) {
    items.splice(index, 1);
    localStorage.clear();
    for (var i=0; i < items.length; i++){
      localStorage.setItem(items[i].key,JSON.stringify(items[i].value));
    }
  }
}

// получение всех элементов
function getAllItemsFromLocalStorage() {
  var items = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    var parsedValue = JSON.parse(value);
    items.push({ key: key, value: parsedValue });
  }
  return items;
}

// поиск новости
// function searchLocalStorage() {
//   var searchName = document.getElementById('searchName').value;
//   var items = getAllItemsFromLocalStorage();

//   var foundItems = items.filter(function(item) {
//       return item.value.name && item.value.name.toLowerCase().includes(searchName.toLowerCase());
//     });

//   var resultDiv = document.getElementById('result');
//   resultDiv.innerHTML = '';

//   if (foundItems.length > 0) {
//     resultDiv.innerHTML = 'Найдены элементы:<br>' + JSON.stringify(foundItems);
//   } else {
//     resultDiv.innerHTML = 'Элементы с указанным значением не найдены в LocalStorage.';
//   }
// }

function searchNews() {
  var searchQuery = document.getElementById('searchName').value.toLowerCase();
  var newsItems = document.querySelectorAll('#list article');

  newsItems.forEach(function(item) {
    var newsText = item.textContent.toLowerCase();

    if (newsText.includes(searchQuery)) {
      item.style.display = 'block'; // отображаем новость
    } else {
      item.style.display = 'none'; // скрываем новость
    }
  });
}