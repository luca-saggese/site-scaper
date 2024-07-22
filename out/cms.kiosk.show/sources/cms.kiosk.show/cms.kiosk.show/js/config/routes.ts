const replaceParams = (template: string, params: Record<string, string> = {}) => {
  return Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, params[key]), template);
};

// Based on https://davidtimms.github.io/programming-languages/typescript/2020/11/20/exploring-template-literal-types-in-typescript-4.1.html
type PathParams<Path extends string> = Path extends `:${infer Param}/${infer Rest}`
  ? Param | PathParams<Rest>
  : Path extends `:${infer Param}`
  ? Param
  : Path extends `${infer _Prefix}:${infer Rest}`
  ? PathParams<`:${Rest}`>
  : never;

const defineRoute = <P extends string>(template: P) => {
  type Params = PathParams<P>;
  return {
    template,
    buildLink: (params: Params extends never ? void : { [K in Params]: string }) =>
      replaceParams(template, params as { [K in Params]: string } | undefined),
  } as const;
};

const ScreensRouteConfig = defineRoute('/screens');

export const RouteConfig = {
  Home: ScreensRouteConfig,
  Channels: defineRoute('/channels'),
  VerifyEmail: defineRoute('/verify/:code'),
  SetupOrganization: defineRoute('/setup/organization'),
  TermsAndConditions: defineRoute('/setup/terms-and-conditions'),
  OAuthGoogle: defineRoute('/oauth/google'),
  OAuthDropbox: defineRoute('/oauth/dropbox'),
  UserSettings: defineRoute('/settings/user'),
  OrganizationSettings: defineRoute('/settings/organization'),
  OrganizationSettingsGeneral: defineRoute('/settings/organization/general'),
  OrganizationSettingsUsers: defineRoute('/settings/organization/users'),
  OrganizationSettingsIntegrations: defineRoute('/settings/organization/integrations'),
  ErrorNotPermitted: defineRoute('/errors/not-permitted'),
  ResetPassword: defineRoute('/reset-password'),
  ChangePassword: defineRoute('/reset-password/:passwordKey'),
  Maintenance: defineRoute('/maintenance'),
  Screens: ScreensRouteConfig,
  Shows: defineRoute('/shows'),
  Login: defineRoute('/login'),
  Register: defineRoute('/register'),
  RegisterWithEmail: defineRoute('/register/email'),
  ScreenAdd: defineRoute('/add'),
  ScreenPreview: defineRoute('/screen/:id/preview'),
  ScreenChannel: defineRoute('/screen/:id/channel'),
  ScreenSharing: defineRoute('/screen/:id/screenshare'),
  ShowEditor: defineRoute('/shows/:id/edit'),
  ShowPreview: defineRoute('/shows/:id/preview'),
  ChannelShowEditor: defineRoute('/channels/:channelId/shows/:id/edit'),
  ChannelEdit: defineRoute('/channels/:id/edit'),
  ChannelPreview: defineRoute('/channels/:id/preview'),
  InvitePage: defineRoute('/invite/:invitationKey'),
  PublicShow: defineRoute('/public-show/:publicId'),
  PublicShowFork: defineRoute('/public-show/:publicId/fork'),
  PublicChannel: defineRoute('/public-channel/:publicId'),
  PublicChannelFork: defineRoute('/public-channel/:publicId/fork'),
} as const;

export const RouteConfigMeme = {
  MemeGenerator: defineRoute('/'),
  MemeGeneratorEdit: defineRoute('/:openShowId'),
  MemeGeneratorFork: defineRoute('/:openShowId/fork'),
} as const;
