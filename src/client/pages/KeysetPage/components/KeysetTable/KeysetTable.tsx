import React from "react";
import { KeyPayload, Lang } from "shared/types";
import { Stack, Button, FormControlLabel, Checkbox } from "@mui/material";
import { AllowedStatuses, DEFAULT_KEYSET_KEY_PAYLOAD } from "shared/constants";
import { useOutsideClick } from "client/hooks/useOutsideClick";
import { KeyEditPayload } from "client/api/keyset";
import { TableRow } from "./TableRow";
import { StyledTable } from "./StyledTable";

interface KeysetTableProps {
  data: KeyPayload[];
  allowedStatuses: AllowedStatuses[];
  onEditRow: (p: KeyEditPayload) => void;
  onDeleteRow(p: KeyPayload): void;
  onCreateRow(p: KeyPayload): void;
}

export const KeysetTable: React.FC<KeysetTableProps> = ({
  data,
  allowedStatuses,
  onCreateRow,
  onDeleteRow,
  onEditRow,
}) => {
  const [addKey, toggleAddKey] = React.useState(false);
  const [showStatus, setShowStatus] = React.useState(false);

  const ref = useOutsideClick(() => {
    setActiveRow(-1);
    toggleAddKey(false);
  });

  const [activeRow, setActiveRow] = React.useState<number>(-1);

  const handleSetRowFocus = (index: number) => (v: boolean) => {
    toggleAddKey(false);
    if (v) {
      setActiveRow(index);
    } else setActiveRow(-1);
  };

  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            disabled={addKey}
            onClick={() => {
              toggleAddKey(true);
            }}
          >
            + add new key
          </Button>

          <FormControlLabel
            control={
              <Checkbox
                checked={showStatus}
                onChange={(_e, val) => setShowStatus(val)}
              />
            }
            label="show status"
          />
        </Stack>

        <StyledTable>
          <thead>
            <tr>
              <th>name</th>

              {Object.keys(Lang).map((lang) => {
                return <th key={lang}>{lang}</th>;
              })}

              <th>context</th>
            </tr>
          </thead>
          <tbody ref={ref}>
            {addKey && (
              <TableRow
                showStatus={showStatus}
                allowedStatuses={allowedStatuses}
                onKeySave={onCreateRow}
                active
                toggleActive={toggleAddKey}
                keyPayload={DEFAULT_KEYSET_KEY_PAYLOAD}
              />
            )}
            {data.map((item, i) => (
              <TableRow
                showStatus={showStatus}
                allowedStatuses={allowedStatuses}
                onKeySave={(keyData) => onEditRow({ name: item.name, keyData })}
                onKeyDelete={onDeleteRow}
                key={i}
                keyPayload={item}
                toggleActive={handleSetRowFocus(i)}
                active={activeRow === i}
              />
            ))}
          </tbody>
        </StyledTable>
      </Stack>
    </>
  );
};
