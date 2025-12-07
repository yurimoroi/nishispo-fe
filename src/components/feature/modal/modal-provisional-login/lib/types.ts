import { z } from "zod";
import { provisionalLoginFormSchema } from "./form-schema";

export type ProvisionalDataType = z.infer<typeof provisionalLoginFormSchema>;
