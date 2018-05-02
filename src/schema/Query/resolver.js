import {ObjectID} from 'mongodb';

const checkScopeAndResolve = (scope, context, controller) => {
  const hasScope = !!context.user && !!context.user._id;
  if(hasScope) {
    return controller.apply(this);
  } else {
    throw new Error('Unauthorized action.')
  }
};

const buildMenu = (products, menuCategories, categoryInFocus) => {
  function convertToMenuCategory(category, _subMenuCategoriesDictionary, _productDictionary, _categoryInFocus) {
    let children = category.children ? category.children.map((id) => _subMenuCategoriesDictionary[id]) : null;

    if(_categoryInFocus && (_categoryInFocus.toString() !== category._id.toString()))
      return { "category": category, "products": [], "subcategories": children };

    let products = _productDictionary[category._id] || [];
    return { "category": category, "products": products, "subcategories": children };
  };

  let menu = [];
  let subMenuCategoriesDictionary = {};
  let productDictionary = {};

  products.forEach((product) => {
    let cat = product.category[product.category.length - 1];
    if(productDictionary[cat])
      productDictionary[cat] = productDictionary[cat].concat(product);
    else
      productDictionary[cat] = [product];
  });

  let rootMenuCategories = menuCategories.filter((cat) => cat.taxonomicRank === 0);
  let firstLevelMenuCategories = menuCategories.filter((cat) => cat.taxonomicRank === 1);
  let secondLevelMenuCategories = menuCategories.filter((cat) => cat.taxonomicRank === 2);


  let _secondLevelMenuCategories = secondLevelMenuCategories.map((c)=> convertToMenuCategory(c, subMenuCategoriesDictionary, productDictionary, categoryInFocus))
    .forEach((cat) => subMenuCategoriesDictionary[cat.category._id] = cat);
  let _firstLevelMenuCategories = firstLevelMenuCategories.map((c)=> convertToMenuCategory(c, subMenuCategoriesDictionary, productDictionary, categoryInFocus))
    .forEach((cat) => subMenuCategoriesDictionary[cat.category._id] = cat);

  let allMenuCatDictionary = { ...subMenuCategoriesDictionary };

  menu = rootMenuCategories.map((c)=> convertToMenuCategory(c, subMenuCategoriesDictionary, productDictionary, categoryInFocus));

  let primaryCategory = null;

  menu.forEach((cat) => {
    if(cat.category.importId === 1) primaryCategory = cat;
    allMenuCatDictionary[cat.category._id] = cat
  });

  let selectedCategory = categoryInFocus ? allMenuCatDictionary[categoryInFocus] : primaryCategory;

  return { selected: selectedCategory, menu};
}

const Query = {
  Query: {
    allUsers: async (root, data, {mongo: {Users}}) => { // 1
      return await Users.find({}).toArray(); // 2
    }
  }
};

export {Query};
