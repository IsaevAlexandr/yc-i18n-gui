import React from "react";
import { KeyPayload, Lang } from "shared/types";
import { DEFAULT_KEYSET_KEY_PAYLOAD } from "shared/constants";
import { useOutsideClick } from "client/hooks/useOutsideClick";
import { TableRow } from "./TableRow";
import { StyledTable } from "./StyledTable";

interface KeysetTableProps {
  data: KeyPayload[];
  addKey: boolean;
  toggleAddKey(v: boolean): void;
  onEditRow(p: KeyPayload): void;
  onDeleteRow(p: KeyPayload): void;
  onCreateRow(p: KeyPayload): void;
}

export const KeysetTable: React.FC<KeysetTableProps> = ({
  data,
  toggleAddKey,
  addKey,
  onCreateRow,
  onDeleteRow,
  onEditRow,
}) => {
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
            onKeyEdit={onEditRow}
            onKeyCreate={onCreateRow}
            onKeyDelete={onDeleteRow}
            isNew
            focus
            setFocus={toggleAddKey}
            keyPayload={DEFAULT_KEYSET_KEY_PAYLOAD}
          />
        )}
        {data.map((item, i) => (
          <TableRow
            onKeyEdit={onEditRow}
            onKeyCreate={onCreateRow}
            onKeyDelete={onDeleteRow}
            key={i}
            keyPayload={item}
            setFocus={handleSetRowFocus(i)}
            focus={activeRow === i}
          />
        ))}
      </tbody>
    </StyledTable>
  );
};
