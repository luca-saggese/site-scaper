import { useMeQuery } from '@Graphql/graphqlTypes.generated';

const useActiveOrganization = () => {
  const { data, refetch } = useMeQuery();

  const activeOrganization = data?.me.info.activeOrganization;

  if (!activeOrganization) {
    throw new Error('useActiveOrganization hook should be used only when activeOrganization has been resolved');
  }

  return {
    activeOrganization,
    refetch,
  };
};

export default useActiveOrganization;
