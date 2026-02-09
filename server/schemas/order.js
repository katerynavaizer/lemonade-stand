import { z } from "zod";

//Validate a single item in the cart
const itemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.coerce.number().positive(),
  quantity: z.number().int().positive(),
});

//Validate the main order object
export const orderSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email format"),
  total: z.number().nonnegative(),
  items: z.array(itemSchema).nonempty("Cart cannot be empty"),
});
