import React from "react";
import { Form } from "react-final-form";
import styled from "@emotion/styled";
import { Button, MenuItem, Stack } from "@mui/material";
import { TextInputField } from "client/components/Form/TextInputField";
import { SelectField } from "client/components/Form/SelectField";
import { KeyPayload } from "shared/types";
import { allowedStatuses } from "shared/constants";

// TODO: you need to get this information from each keyset file
const statusSelectItems = allowedStatuses.map((status) => ({
  title: status,
  value: status,
}));

const StyledStack = styled(Stack)<{ focus: boolean }>`
  visibility: ${({ focus }) => (focus ? "visible" : "hidden")};
`;

interface TableRowProps {
  focus: boolean;
  setFocus(v: boolean): void;
  isNew?: boolean;
  keyPayload: KeyPayload;
  onKeyEdit(p: KeyPayload): void;
  onKeyCreate(p: KeyPayload): void;
  onKeyDelete(p: { name: string }): void;
}

export const TableRow: React.FC<TableRowProps> = ({
  focus,
  setFocus,
  isNew,
  onKeyEdit,
  onKeyCreate,
  onKeyDelete,
  keyPayload,
}) => {
  const { name, context, ...langs } = keyPayload;

  const handleSubmit = async (values: KeyPayload) => {
    if (isNew) {
      return onKeyCreate(values);
    } else {
      return onKeyEdit(values);
    }
  };

  const handleDelete = async () => {
    await onKeyDelete({
      name: keyPayload.name,
    });
    setFocus(false);
  };

  return (
    <Form<KeyPayload> onSubmit={handleSubmit} initialValues={keyPayload}>
      {(formProps) => (
        <tr onClick={isNew ? undefined : () => setFocus(true)}>
          <td>
            <Stack spacing={2}>
              <TextInputField
                autoComplete="off"
                name="name"
                disabled={!focus}
              />
              <StyledStack
                focus={focus}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  type="submit"
                  onClick={async () => {
                    await formProps.handleSubmit();
                    setFocus(false);
                  }}
                >
                  Submit
                </Button>
                <Button color="error" onClick={handleDelete}>
                  Delete
                </Button>
              </StyledStack>
            </Stack>
          </td>

          {Object.entries(langs).map(([lang, v], i) => (
            <td key={i}>
              <Stack spacing={2}>
                <TextInputField
                  fullWidth
                  disabled={!focus}
                  name={`${lang}.value`}
                  multiline
                />
                <SelectField
                  variant="standard"
                  fullWidth
                  size="small"
                  disabled={!focus}
                  name={`${lang}.allowedStatus`}
                  label="Status"
                >
                  {statusSelectItems.map((item) => (
                    <MenuItem value={item.value}>{item.title}</MenuItem>
                  ))}
                </SelectField>
              </Stack>
            </td>
          ))}
          <td>
            <TextInputField
              fullWidth
              disabled={!focus}
              name="context"
              multiline
            />
          </td>
        </tr>
      )}
    </Form>
  );
};
