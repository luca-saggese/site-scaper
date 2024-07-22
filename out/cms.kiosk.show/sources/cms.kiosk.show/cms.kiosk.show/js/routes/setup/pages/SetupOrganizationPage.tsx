import React from 'react';
import { Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';

import Button from '@Components/Button';
import FormError from '@Components/Form/FormError/FormError';
import FormField from '@Components/Form/FormField';
import TextInput from '@Components/Form/TextInput';
import ContentBox, { ContextBoxStyle } from '@Components/Layout/ContentBox/ContentBox';
import Loader from '@Components/Loader';
import Typography from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import { useCreateOrganizationMutation, useMeQuery } from '@Graphql/graphqlTypes.generated';
import sharedAuthStyles from '@Routes/auth/shared/Auth.module.scss';
import AuthPageLayout from '@Routes/auth/shared/AuthLayout/AuthPageLayout';
import LogoHeader from '@Routes/auth/shared/LogoHeader/LogoHeader';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { required } from '@Utils/form';
import { callMutationForForm } from '@Utils/graphql';
import { gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

interface FormValues {
  name: string;
}

const SetupOrganizationPage: React.FunctionComponent = () => {
  const t = useTranslation();
  const history = useHistory();
  const meQuery = useMeQuery();

  const [createOrganization, { loading, data }] = useCreateOrganizationMutation({
    onCompleted: async (data) => {
      const newOrgId = data.createOrganization.organization?.id;
      assertIsDefined(newOrgId);
      analytics.track('org_create', {
        org_id: gqlIdToUuid(newOrgId),
        event_location: 'settings',
      });
      await meQuery.refetch();
      history.replace(
        meQuery.data?.me.organizations.edges.length
          ? RouteConfig.OrganizationSettings.buildLink()
          : RouteConfig.Home.buildLink()
      );
    },
  });

  const onSubmitHandler = (values: FormValues) => {
    return callMutationForForm(createOrganization({ variables: { input: values } }));
  };

  if (loading || data) {
    return (
      <AuthPageLayout>
        <Loader />
        <Typography>{t('msg_creating_organization')}</Typography>
      </AuthPageLayout>
    );
  }

  return (
    <AuthPageLayout>
      <LogoHeader text={t('msg_label_registration_create_organization')} />
      <ContentBox boxStyle={ContextBoxStyle.Large} className={sharedAuthStyles.content}>
        <Form<FormValues>
          onSubmit={onSubmitHandler}
          render={({ handleSubmit, submitError, dirtySinceLastSubmit }) => {
            return (
              <form onSubmit={handleSubmit} className={sharedAuthStyles.form}>
                {submitError && !dirtySinceLastSubmit && <FormError>{t(submitError)}</FormError>}
                <FormField
                  name="name"
                  component={TextInput}
                  label={t('msg_field_label_setup_organization_name')}
                  validate={required()}
                />
                <Button>{t('msg_label_registration_create')}</Button>
              </form>
            );
          }}
        />
      </ContentBox>
    </AuthPageLayout>
  );
};

export default SetupOrganizationPage;
