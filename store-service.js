const fs = require('fs');

// Global arrays
let items = [];
let categories = [];

// Exported functions
module.exports = {
  initialize: () => {
    return new Promise((resolve, reject) => {
      // Read items.json
      fs.readFile('./data/items.json', 'utf8', (err, itemsData) => {
        if (err) {
          reject('Unable to read items.json');
          return;
        }
        // Parse items data
        try {
          items = JSON.parse(itemsData);
        } catch (parseErr) {
          reject('Error parsing items.json');
          return;
        }
        
        // Read categories.json
        fs.readFile('./data/categories.json', 'utf8', (err, categoriesData) => {
          if (err) {
            reject('Unable to read categories.json');
            return;
          }
          // Parse categories data
          try {
            categories = JSON.parse(categoriesData);
          } catch (parseErr) {
            reject('Error parsing categories.json');
            return;
          }
          
          resolve(); // Resolve the promise
        });
      });
    });
  },

  getAllItems: () => {
    return new Promise((resolve, reject) => {
      if (items.length === 0) {
        reject('No items available');
        return;
      }
      resolve(items);
    });
  },

  getPublishedItems: () => {
    return new Promise((resolve, reject) => {
      const publishedItems = items.filter(item => item.published === true);
      if (publishedItems.length === 0) {
        reject('No published items available');
        return;
      }
      resolve(publishedItems);
    });
  },

  getCategories: () => {
    return new Promise((resolve, reject) => {
      if (categories.length === 0) {
        reject('No categories available');
        return;
      }
      resolve(categories);
    });
  }
};
