type CustomErrorMessageProps = {
  formHook: any;
  propertyName: string;
};

export const CustomErrorMessage = ({
  formHook,
  propertyName = "",
}: CustomErrorMessageProps) => {
  return (
    <div className="mt-2">
      {Object.entries(
        formHook.formState.errors[`${propertyName}`]?.types || {},
      ).map(([type, message]) => (
        <span key={type} className="mt-1 block text-sm text-red">
          {message as string}
        </span>
      ))}
    </div>
  );
};
