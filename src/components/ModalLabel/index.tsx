import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Textarea } from "@chakra-ui/textarea";

type IFormLabelItem = {
  label?: string;
  itemValue?: string;
};

export function ModalLabel({ label, itemValue }: IFormLabelItem) {
  return (
    <FormControl>
      <FormLabel fontSize="sm" fontWeight="bold">
        {label}
      </FormLabel>
      <Textarea
        borderRadius="8"
        value={itemValue}
        size="sm"
        isReadOnly
        borderColor="blue.500"
      />
    </FormControl>
  );
}
