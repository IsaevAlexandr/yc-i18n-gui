import React from "react";
import { Button, Stack } from "@mui/material";
import { Page } from "client/components/Page/Page";
import { KeysetAutocomplete } from "./components/KeysetAutocomplete/KeysetAutocomplete";
import { KeysetTable } from "./components/KeysetTable/KeysetTable";
import { useKeysetPage } from "./useKeysetPage";

const KeysetPage = () => {
  const {
    history,
    selectedKeyset,
    keyset,
    keysets,
    createKeyset,
    deleteKeyset,
    deleteKey,
    editKey,
    createKey,
  } = useKeysetPage();

  return (
    <Page padding>
      <Stack direction="row" sx={{ mb: 2 }} spacing={2}>
        <KeysetAutocomplete
          value={selectedKeyset}
          onReset={() => history.push("/")}
          onUpdate={(value, isNew) => {
            if (isNew) {
              createKeyset(value);
            } else {
              history.push(value ? `/${value}` : "/");
            }
          }}
          options={keysets.map((item) => ({
            inputValue: item,
            title: item,
          }))}
        />

        {selectedKeyset && (
          <Button
            size="medium"
            variant="outlined"
            color="error"
            onClick={() => deleteKeyset(selectedKeyset)}
          >
            delete keyset
          </Button>
        )}
      </Stack>

      {selectedKeyset && (
        <KeysetTable
          data={keyset?.data || []}
          allowedStatuses={keyset?.allowedStatuses}
          onCreateRow={createKey}
          onDeleteRow={deleteKey}
          onEditRow={editKey}
        />
      )}
    </Page>
  );
};

export default KeysetPage;
