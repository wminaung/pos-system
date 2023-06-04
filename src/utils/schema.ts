import joi from "joi";

export const schema = {
  menu: {
    payload: {
      create: joi.object({
        name: joi.string().min(2).required(),
        price: joi.number().min(0).required(),
        description: joi.string().min(4).required(),
        menuCatIds: joi.array().items(joi.number()).required(),
        image_url: joi.string().required(),
        isRequired: joi.bool().required(),
      }),
    },
  },
};
