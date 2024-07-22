import { useEffect } from 'react';

import { useAnalyticsQuery, useMeQuery } from '@Graphql/graphqlTypes.generated';
import { useAuth } from '@Hooks/useAuth';
import analytics from '@Utils/analytics';
import { gqlIdToUuid, logError } from '@Utils/helpers';

const Analytics = () => {
  const { isLoggedIn } = useAuth();
  const meQuery = useMeQuery({ skip: !isLoggedIn });

  const user = meQuery.data?.me;

  const { data } = useAnalyticsQuery({ fetchPolicy: 'network-only', skip: !user?.info.activeOrganization });

  useEffect(() => {
    if (!user) {
      return;
    }

    try {
      const { activeOrganization } = user.info;
      const uuid = gqlIdToUuid(user.info.id);
      analytics.alias(uuid);
      analytics.identify(uuid, {
        name: user.info.name,
        email: user.info.email,
        company: {
          id: activeOrganization?.organization.id ? gqlIdToUuid(activeOrganization?.organization.id) : null,
          name: activeOrganization?.organization.name,
        },
        createdAt: new Date(user.info.dateJoined).toISOString(),
        role: activeOrganization?.groupType,
        accept_terms_and_conditions: user.info.acceptTermsAndConditions,
        accept_terms_and_conditions_updated_at: user.info.acceptTermsAndConditionsUpdatedAt,
        newsletter_opt_in: user.info.newsletterOptIn,
        newsletter_opt_in_updated_at: user.info.newsletterOptInUpdatedAt,
      });
      if (activeOrganization && data) {
        analytics.group(gqlIdToUuid(activeOrganization.organization.id), {
          name: activeOrganization.organization.name,
          users: activeOrganization.organization.users.length,
          screens: data.screens.totalCount,
          shows: data.shows.totalCount,
          channels: data.channels.totalCount,
          organization_id: gqlIdToUuid(activeOrganization.organization.id),
        });
      }
    } catch (error) {
      logError('Unable to process user data');
    }
  }, [data, user]);

  return null;
};

export default Analytics;
