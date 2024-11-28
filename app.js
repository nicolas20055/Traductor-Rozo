import { dictionary } from './dictionary.js'; 

console.log(dictionary);

const wordInput = document.getElementById('wordInput');
const translateButton = document.getElementById('translateButton');
const translatedWord = document.getElementById('translatedWord');
const translationExample = document.getElementById('translationExample');
const languageSelect = document.getElementById('languageSelect');
const categorySelect = document.getElementById('categorySelect');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const sortSelect = document.getElementById('sortSelect');
const showAllWordsButton = document.getElementById('showAllWordsButton');
const addWordForm = document.getElementById('addWordForm');
const newSpanishInput = document.getElementById('newSpanish');
const newEnglishInput = document.getElementById('newEnglish');
const newExampleInput = document.getElementById('newExample');

// Función para llenar el selector de categorías
const populateCategorySelect = () => {
  const categories = Object.keys(dictionary.categories);
  categorySelect.innerHTML = ''; 
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
};

// Clonación del diccionario para filtros y ordenación
let filtersDictionary = Object.values(dictionary.categories).flat();

// Mostrar todas las palabras con ejemplos
const displayAllWords = () => {
  searchResults.innerHTML = ''; 
  filtersDictionary.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.spanish} - ${item.english} | Example: ${item.example}`;
    searchResults.appendChild(li);
  });
};

//Mostrar todas las palabras
showAllWordsButton.addEventListener('click', () => {
  displayAllWords();
});

//traducir palabras
translateButton.addEventListener('click', () => {
  const word = wordInput.value.trim().toLowerCase();
  const language = languageSelect.value;
  let found = false;

  if (language === 'Español a Inglés') {
    for (const category in dictionary.categories) {
      const items = dictionary.categories[category];
      const item = items.find(
        (item) => item.spanish.toLowerCase() === word
      );

      if (item) {
        translatedWord.textContent = item.english;
        translationExample.textContent = `Example: ${item.example}`;
        found = true;
        break;
      }
    }
  } else if (language === 'Inglés a Español') {
    for (const category in dictionary.categories) {
      const items = dictionary.categories[category];
      const item = items.find(
        (item) => item.english.toLowerCase() === word
      );

      if (item) {
        translatedWord.textContent = item.spanish;
        translationExample.textContent = `Example: ${item.example}`;
        found = true;
        break;
      }
    }
  }

  if (!found) {
    translatedWord.textContent = 'Translation not found';
    translationExample.textContent = '';
  }
});

//añadir nuevas palabras  
addWordForm.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const newSpanish = newSpanishInput.value.trim();
  const newEnglish = newEnglishInput.value.trim();
  const newExample = newExampleInput.value.trim();

  if (newSpanish && newEnglish && newExample) {
    const newWord = {
      spanish: newSpanish,
      english: newEnglish,
      example: newExample
    };

    filtersDictionary.push(newWord);
    newSpanishInput.value = '';
    newEnglishInput.value = '';
    newExampleInput.value = '';
    displayAllWords();
  } else {
    alert('Por favor, complete todos los campos.');
  }
});

const sortDictionary = (sortOption) => {
  filtersDictionary.sort((a, b) => {
    if (sortOption === 'A-Z') {
      return a.english.localeCompare(b.english);
    } else if (sortOption === 'Z-A') {
      return b.english.localeCompare(a.english);
    }
    return 0;
  });

  displaySortedDictionary();
};

//mostrar el diccionario ordenado
const displaySortedDictionary = () => {
  searchResults.innerHTML = ''; 
  filtersDictionary.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.spanish} - ${item.english}`;
    searchResults .appendChild(li);
  });
};

// Buscar por categoría
searchButton.addEventListener('click', () => {
  const category = categorySelect.value;
  searchResults.innerHTML = ''; 
  const results = dictionary.categories[category] || [];

  results.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.spanish} - ${item.english}`;
    searchResults.appendChild(li);
  });
});

// Para cambios de orden
sortSelect.addEventListener('change', (e) => {
  const sortOption = e.target.value;
  sortDictionary(sortOption);
});

// Carga la página 
document.addEventListener('DOMContentLoaded', () => {
  populateCategorySelect();
  displayAllWords(); // Muestra todas las palabras al cargar la página
});