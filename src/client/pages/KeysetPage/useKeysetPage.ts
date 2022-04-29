import { useMutation, useQuery } from "react-query";
import { keysetApi } from "client/api";
import { useHistory, useParams } from "react-router-dom";
import { adapter } from "./utils";

export const useKeysetPage = () => {
  const history = useHistory();
  const params = useParams<{ keyset: string }>();
  const keysetsResolver = useQuery([keysetApi.getKeysetsList.name], () =>
    keysetApi.getKeysetsList()
  );
  const keysetResolver = useQuery(
    [keysetApi.getKeyset.name, params.keyset],
    () => keysetApi.getKeyset(params.keyset),
    {
      enabled: Boolean(params.keyset),
      select: adapter,
      onError: (e) => {
        history.push("/");
      },
    }
  );

  const createKeysetMutation = useMutation(keysetApi.createKeyset, {
    onSuccess: ({}, name) => {
      keysetsResolver.refetch();
      history.push(`/${name}`);
    },
  });
  const deleteKeysetMutation = useMutation(keysetApi.deleteKeyset, {
    onSuccess: () => {
      keysetsResolver.refetch();
      keysetResolver.remove();
      history.push(`/`);
    },
  });

  const editKeyMutation = useMutation(keysetApi.editKey(params.keyset), {
    onSuccess: () => keysetResolver.refetch(),
  });
  const createKeyMutation = useMutation(keysetApi.createKey(params.keyset), {
    onSuccess: () => keysetResolver.refetch(),
  });

  const deleteKeyMutation = useMutation(keysetApi.deleteKey(params.keyset), {
    onSuccess: () => keysetResolver.refetch(),
  });

  return {
    history,
    selectedKeyset: params.keyset,
    keysets: keysetsResolver.data || [],
    keyset: keysetResolver.data || [],
    createKeyset: createKeysetMutation.mutateAsync,
    deleteKeyset: deleteKeysetMutation.mutateAsync,
    editKey: editKeyMutation.mutateAsync,
    createKey: createKeyMutation.mutateAsync,
    deleteKey: deleteKeyMutation.mutateAsync,
  };
};
