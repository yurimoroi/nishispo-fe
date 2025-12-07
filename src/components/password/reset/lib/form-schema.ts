import {
  attachPasswordValidation,
} from "@/components/feature/form";
import { z } from "zod";

export const resetPasswordFormSchema = z.object({
  password: attachPasswordValidation(),
  confirmPassword: attachPasswordValidation(),
});
