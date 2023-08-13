import joi from "joi";

export const productSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().allow(""),
    currentPrice: joi.number().integer().required(),
    category: joi.string().valid("DVD", "CD", "livro").required(),
    photoUrl: joi.any().allow("")
});