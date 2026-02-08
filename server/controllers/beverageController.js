import * as beverageModel from "../models/beverageModel.js";

export const getBeverages = async (req, res, next) => {
  try {
    const beverages = await beverageModel.getAllBeverages();

    res.json(beverages);
  } catch (err) {
    next(err);
  }
};
