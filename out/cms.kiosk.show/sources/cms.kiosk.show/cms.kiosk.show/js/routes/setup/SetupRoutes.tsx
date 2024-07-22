import { RouteConfig } from '@Config/routes';
import SetupOrganizationPage from '@Routes/setup/pages/SetupOrganizationPage';
import TermsAndConditionMissingPage from '@Routes/setup/pages/TermsAndConditionMissingPage';

import { RouteInfo } from '../AppRoutes';

const SetupRoutes: RouteInfo[] = [
  {
    path: RouteConfig.SetupOrganization.template,
    component: SetupOrganizationPage,
    title: 'msg_page_organization_setup',
  },
  {
    path: RouteConfig.TermsAndConditions.template,
    component: TermsAndConditionMissingPage,
    title: 'msg_page_terms_and_conditions_missing',
  },
];

export default SetupRoutes;
