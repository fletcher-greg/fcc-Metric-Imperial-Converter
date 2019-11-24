const formula = (req, res) => {
  let userInput = req.body.data;
  //   if (!req.body.data || req.body.data === "object" || req.body.data === {})
  //     return res.json({ error: "invalid format" });

  let conversion;
  const symbols = {
    mi: "mile",
    km: "kilometer",
    cm: "centimeter",
    in: "inches",
    gal: "gallons",
    L: "liters",
    lbs: "pounds",
    kg: "kilograms"
  };

  let userNumber = userInput.match(/\d+/g);

  let userSymbol = userInput.match(/[a-zA-Z]+/g);
  if (userSymbol === null || userNumber === null)
    return res.json({ error: "please enter a valid number and symbol" });

  let unit = symbols[userSymbol.toString()];

  if (!userNumber)
    return res.json({ error: "Please enter a number. Example 55km" });
  if (!unit)
    return res.json({ error: "Invalid unit, please follow format above" });

  conversion = convert(unit, Number(userNumber));

  return res.json(conversion);
};

module.exports = formula;

function convert(unit, number) {
  let returnUnit;
  let string;
  let result;
  let unitUnit;
  switch (unit) {
    case "mile":
      result = (number * 1.60934).toFixed(4);
      unitUnit = "mi";
      returnUnit = "km";
      break;
    case "kilometer":
      result = (number * 0.621371).toFixed(4);
      unitUnit = "km";
      returnUnit = "mi";
      break;
    case "centimeter":
      result = (number * 0.393701).toFixed(4);
      unitUnit = "cm";
      returnUnit = "in";
      break;
    case "inches":
      result = (number * 2.54).toFixed(4);
      unitUnit = "in";
      returnUnit = "cm";
      break;
    case "gallons":
      result = (number * 3.78541).toFixed(4);
      unitUnit = "gal";
      returnUnit = "L";
      break;
    case "liters":
      result = (number * 0.264172).toFixed(4);
      unitUnit = "L";
      returnUnit = "gal";
      break;
    case "pounds":
      result = (number * 0.453592).toFixed(4);
      unitUnit = "lb";
      returnUnit = "kg";
      break;
    case "kilograms":
      result = (number * 2.20462).toFixed(4);
      unitUnit = "kg";

      returnUnit = "lbs";
      break;
    default:
      return { error: "Unknown input, please follow format above" };
  }

  string = `${number}${unitUnit} converts to ${result}${returnUnit}`;
  return {
    unitNum: number,
    unitUnit,
    returnNum: result,
    returnUnit,
    string
  };
}
