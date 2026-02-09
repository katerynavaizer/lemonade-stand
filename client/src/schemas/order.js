import { z } from "zod";

const itemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.coerce.number().positive(),
  quantity: z.number().int().positive(),
});

export const orderSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email format"),
  total: z.number().nonnegative(),
  items: z.array(itemSchema).nonempty("Cart cannot be empty"),
});
