import { z } from 'zod';

export const productInputSchema = z.object({    
    productName: z.string().min(3).max(255),
    productQty: z.number().min(0),
    productRate: z.number(),
});