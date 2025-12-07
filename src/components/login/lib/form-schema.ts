import {
  JP_ERROR_MESSAGE,
  JP_ERROR_MESSAGE_ALT,
} from "@/components/feature/form/lib/error-messages-map";
import { z } from "zod";

export const memberLoginFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.LOGIN_ID_REQUIRED })
    .max(100, { message: JP_ERROR_MESSAGE["login_id.max"] }),
  password: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.LOGIN_PASSWORD_REQUIRED }),
  keepMeLoggedIn: z.boolean(),
});
