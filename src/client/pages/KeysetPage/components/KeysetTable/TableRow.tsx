import React from "react";
import { Form } from "react-final-form";
import styled from "@emotion/styled";
import {
  Button,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
} from "@mui/material";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { TextInputField } from "client/components/Form/TextInputField";
import { SelectField } from "client/components/Form/SelectField";
import { KeyPayload, Lang, LangPayload } from "shared/types";
import { AllowedStatuses } from "shared/constants";

interface TableRowProps {
  active: boolean;
  keyPayload: KeyPayload;
  allowedStatuses: AllowedStatuses[];
  showStatus: boolean;
  toggleActive(v: boolean): void;
  onKeySave(p: KeyPayload): void;
  onKeyDelete?(p: { name: string }): void;
}

const CollapsedRow = styled.tr<{ active: boolean }>(({ active }) => ({
  display: "block",
  transition: "height .3s",
  height: active ? 54 : 0,
  overflow: "hidden",
}));

export const TableRow: React.FC<TableRowProps> = ({
  active,
  allowedStatuses,
  keyPayload,
  showStatus,
  toggleActive,
  onKeySave,
  onKeyDelete,
}) => {
  const { name, context, ...langs } = keyPayload;
  const langsEntries = Object.entries(langs as Record<Lang, LangPayload>);
  const [isPlural, setPlural] = React.useState(
    Array.isArray(langsEntries?.[0]?.[1]?.value)
  );

  const handleSubmit = async (values: KeyPayload) => {
    onKeySave(values);
    toggleActive(false);
  };

  return (
    <Form<KeyPayload>
      mutators={{
        ...arrayMutators,
      }}
      onSubmit={handleSubmit}
      initialValues={keyPayload}
    >
      {(formProps) => {
        const formApi = formProps.form;

        const changePlural = (v: boolean) => {
          formApi.batch(() => {
            if (v) {
              langsEntries.forEach(([lang, v]) => {
                formApi.change(lang as Lang, {
                  ...v,
                  value: [formProps.values[lang].value || "", "", "", "", ""],
                });
              });
            } else {
              langsEntries.forEach(([lang, v]) => {
                formApi.change(lang as Lang, {
                  ...v,
                  value: formProps.values[lang].value?.[0] || "",
                });
              });
            }
          });
          setPlural(v);
        };

        return (
          <>
            <tr onClick={() => toggleActive(true)}>
              <td>
                <TextInputField
                  fullWidth
                  autoComplete="off"
                  name="name"
                  disabled={!active}
                  withCopyButton
                />
              </td>

              {langsEntries.map(([lang, v], i) => (
                <td key={i}>
                  <Stack spacing={2}>
                    {isPlural ? (
                      <FieldArray name={`${lang}.value`}>
                        {({ fields }) =>
                          fields.map((name, i) => (
                            <TextInputField
                              key={i}
                              fullWidth
                              disabled={!active}
                              name={name}
                              multiline
                            />
                          ))
                        }
                      </FieldArray>
                    ) : (
                      <TextInputField
                        fullWidth
                        disabled={!active}
                        name={`${lang}.value`}
                        multiline
                      />
                    )}
                    {showStatus && (
                      <SelectField
                        variant="standard"
                        fullWidth
                        size="small"
                        disabled={!active}
                        name={`${lang}.allowedStatus`}
                        label="Status"
                      >
                        {allowedStatuses.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </SelectField>
                    )}
                  </Stack>
                </td>
              ))}
              <td>
                <TextInputField
                  fullWidth
                  disabled={!active}
                  name="context"
                  multiline
                />
              </td>
            </tr>
            <CollapsedRow active={active}>
              <Stack
                sx={{ p: [2, 1] }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  type="submit"
                  onClick={async () => {
                    await formProps.handleSubmit();
                    toggleActive(false);
                  }}
                >
                  Save
                </Button>
                {onKeyDelete && (
                  <Button
                    color="error"
                    onClick={async () => {
                      await onKeyDelete({
                        name: keyPayload.name,
                      });
                      toggleActive(false);
                    }}
                  >
                    Delete
                  </Button>
                )}

                <FormControlLabel
                  control={
                    <Switch
                      checked={isPlural}
                      onChange={(e, nextValue) => {
                        changePlural(nextValue);
                      }}
                    />
                  }
                  label="Pluralize"
                />
              </Stack>
            </CollapsedRow>
          </>
        );
      }}
    </Form>
  );
};
