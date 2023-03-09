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
      "You've selected a donut, select from the options if you want to order more",
    saveToDb: "Donut x1",
  },
  {
    type: 3,
    response:
      "You've selected a serving of Pepper Soup, select from the options if you want to order more",
    saveToDb: "Pepper Soup x1",
  },
  {
    type: 4,
    response:
      "You've selected a pack of Yoghurt, select from the options if you want to order more",
    saveToDb: "Yoghurt x1",
  },
  {
    type: 5,
    response:
      "You've selected a pack of Ice Cream, select from the options if you want to order more",
    saveToDb: "Ice Cream x1",
  },
  {
    type: 6,
    response:
      "You've selected a bottle of soda, select from the options if you want to order more",
    saveToDb: "Soda x1",
  },
  {
    type: 7,
    response:
      "You've selected a serving of chicken, select from the options if you want to order more",
    saveToDb: "Chicken x1",
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
  const res = response.filter((el) => el.type === Number(inputType));
  return {
    response: res[0].response,
    saveToDb: res[0].saveToDb,
  };
}

module.exports = getResponse;
