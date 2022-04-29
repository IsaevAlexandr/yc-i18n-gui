import React from "react";
import { Button, Stack } from "@mui/material";
import { Page } from "client/components/Page/Page";
import { KeysetAutocomplete } from "./components/KeysetAutocomplete/KeysetAutocomplete";
import { KeysetTable } from "./components/KeysetTable/KeysetTable";
import { useKeysetPage } from "./useKeysetPage";

const KeysetPage = () => {
  const [showNewKeyComponent, setShowNewKeyComponent] = React.useState(false);
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
      <Stack direction="row" sx={{ mb: 2 }} spacing={2} alignItems="flex-end">
        <KeysetAutocomplete
          value={selectedKeyset}
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

        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={() => {
            setShowNewKeyComponent(true);
          }}
        >
          + add new key
        </Button>

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

      <KeysetTable
        data={keyset}
        addKey={showNewKeyComponent}
        onCreateRow={createKey}
        onDeleteRow={deleteKey}
        onEditRow={editKey}
        toggleAddKey={setShowNewKeyComponent}
      />
    </Page>
  );
};

export default KeysetPage;
