type FormMessageGeneratorProps = {
  formStateField: { [key: string]: any };
};

const getAllErrors = (formStateField: { [key: string]: any }) => {
  const types: { [key: string]: string } | undefined = formStateField?.types;

  if (types) {
    return Object.keys(types).map((type) => types[type] as string);
  }

  return [];
};
export const FormMessageGenerator = ({
  formStateField,
}: FormMessageGeneratorProps) => {
  const errorMessage = getAllErrors(formStateField);
  return (
    <div className="mt-2 flex flex-col gap-2">
      {errorMessage.map((message, index) => {
        return (
          <p
            key={`${index}_${Math.random()}`}
            className="flex flex-col gap-2 font-open text-sm text-red"
          >
            {message}
          </p>
        );
      })}
    </div>
  );
};
