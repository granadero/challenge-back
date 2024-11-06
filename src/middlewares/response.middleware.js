const { getProductCategoryById } = require("../services/items/items.service");

const mappingSearch = async (req, res, next) => {
  let mapping = {
    author: res.locals.data.author,
  };
  mapping.categories = await getCategories(res.locals.data.results);
  const mappedItems = res.locals.data.results.map((item) => ({
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: Number(item.price.toFixed(0)),
      decimals:
        item.price % 1 !== 0 ? Number(item.price.toString().split(".")[1]) : 0,
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
  }));
  mapping.items = mappedItems;

  res.json(mapping);
};

const getCategories = async (itemsArray) => {
  // Paso 1: Recoger las categorías y contar su frecuencia
  const categoryCount = itemsArray.reduce((acc, item) => {
    acc[item.category_id] = (acc[item.category_id] || 0) + 1;
    return acc;
  }, {});

  // Paso 2: Convertir el objeto de conteo en un array de [categoría, frecuencia] y ordenarlo
  const categories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);
  // Paso 3: Obtener los nombres de las categorías y devolverlas
  return await getProductCategoryById(categories[0]);
};

const mappingItem = async (req, res, next) => {
  const { item, description } = res.locals.data;
  const itemCondition = item.attributes.find(
    (item) => item.id === "ITEM_CONDITION"
  );
  let mapping = {
    author: res.locals.data.author,
  };

  mapping.item = {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: Number(item.price.toFixed(0)),
      decimals:
        item.price % 1 !== 0 ? Number(item.price.toString().split(".")[1]) : 0,
    },
    picture: item.pictures.length && item.pictures[0],
    condition: itemCondition && itemCondition.value_name,
    free_shipping: item.shipping && item.shipping.free_shipping,
    sold_quantity: item.sold_quantity || 0, //al parecer ya no existe sold_quantity
    description: description.plain_text,
    category: await getProductCategoryById(item.category_id),
  };
  res.json(mapping);
};

module.exports = {
  mappingItem,
  mappingSearch,
};
