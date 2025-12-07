import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { memberLoginFormSchema } from "./form-schema";
import { useEffect, useState } from "react";

export const useLoginForm = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof memberLoginFormSchema>>;
}) => {
  const { watch } = form;
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] = useState<
    string | null
  >(null);

  // When input changes, reset the credentials error message
  useEffect(() => {
    const { unsubscribe } = watch(() => {
      setInvalidCredentialsMessage(null);
    });
    return () => unsubscribe();
  }, [watch]);

  return {
    invalidCredentialsMessage,
    setInvalidCredentialsMessage,
  };
};
