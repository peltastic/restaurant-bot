const response = [
  {
    type: 1,
    response: [
      "Select 2 to order Donuts",
      "Select 3 to order Pepper Soup",
      "Select 4 to order Yoghurts",
      "Select 5 to order Ice Cream",
      "Select 6 to order Soda",
      "Select 7 to order Chicken",
    ],
  },
  {
    type: 2,
    response:
      "You've selected a donut, select 99 to checkout, select 97 to see your current orders or select from the options if you want to order more",
    saveToDb: "Donut",
  },
  {
    type: 3,
    response:
      "You've selected a serving of Pepper Soup, select 99 to checkout, select 97 to see your current orders or select from the options if you want to order more",
    saveToDb: "Pepper Soup",
  },
  {
    type: 4,
    response:
      "You've selected a pack of Yoghurt, select 99 to checkout, select 97 to see your current orders or select from the options if you want to order more",
    saveToDb: "Yoghurt",
  },
  {
    type: 5,
    response:
      "You've selected a pack of Ice Cream, select 99 to checkout, select 97 to see your current orders or select from the options if you want to order more",
    saveToDb: "Ice Cream",
  },
  {
    type: 6,
    response:
      "You've selected a bottle of soda, select 99 to checkout, select 97 to see your current orders or select from the options if you want to order more",
    saveToDb: "Soda",
  },
  {
    type: 7,
    response:
      "You've selected a serving of chicken, select 99 to checkout, select 97 to see your current orders or select from the options if you want to order more",
    saveToDb: "Chicken",
  },

  {
    type: 99,
    response: "Order Placed!",
  },

  {
    type: 0,
    response: "Order canceled!",
  },
];

function getResponse(inputType) {
  if (Number(inputType) === 98 || Number(inputType) === 97) {
    return;
  }
  const res = response.filter((el) => el.type === Number(inputType));
  return {
    response: res[0].response,
    saveToDb: res[0].saveToDb,
  };
}

module.exports = getResponse;
