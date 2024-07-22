import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   * 
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  /**
   * The upload of a file.
   * 
   * Variables of this type must be set to null in mutations. They will be
   * replaced with a filename from a following multipart part containing a
   * binary file.
   * 
   * See: https://github.com/jaydenseric/graphql-multipart-request-spec
   */
  UploadType: any;
  SocialCamelJSON: any;
};

/** Root (top level) query. */
export type Query = {
  /** The ID of the object */
  layout?: Maybe<LayoutNode>;
  layouts?: Maybe<Array<Maybe<LayoutNode>>>;
  networkTransversalCredential?: Maybe<NetworkTransversalCredential>;
  youtubeVideo?: Maybe<YoutubeDetails>;
  apiTwitterSearch?: Maybe<Scalars['JSONString']>;
  apiTwitterGetImages?: Maybe<ApiTwitterResponse>;
  apiMediaSearch?: Maybe<Scalars['JSONString']>;
  /** The ID of the object */
  mediaLibraryImage?: Maybe<MediaLibraryImageNode>;
  mediaLibraryImages: MediaLibraryImageNodeConnection;
  dropboxFolderLinks: Array<Scalars['String']>;
  channels: ChannelNodeConnection;
  /** The ID of the object */
  channel?: Maybe<ChannelNode>;
  channelPublic?: Maybe<ChannelPublicNode>;
  slideTemplate?: Maybe<SlideTemplateDetailNode>;
  slideTemplates: Array<SlideTemplateListNode>;
  /** The ID of the object */
  openShow?: Maybe<OpenShowNode>;
  shows: ShowNodeConnection;
  /** The ID of the object */
  show?: Maybe<ShowNode>;
  showPublic?: Maybe<ShowPublicNode>;
  showHistory?: Maybe<Array<Maybe<ShowHistory>>>;
  /** The ID of the object */
  slide?: Maybe<ShowSlideNode>;
  screens: ScreenNodeConnection;
  /** The ID of the object */
  screen?: Maybe<ScreenNode>;
  /** The ID of the object */
  device?: Maybe<DeviceNode>;
  /** The ID of the object */
  organization?: Maybe<OrganizationNode>;
  verifyInvitationKey: InvitationKeyNode;
  me: UserNodeDetails;
  appConfig: AppConfigViewNode;
};


/** Root (top level) query. */
export type QueryLayoutArgs = {
  id: Scalars['ID'];
};


/** Root (top level) query. */
export type QueryLayoutsArgs = {
  templateId: Scalars['String'];
};


/** Root (top level) query. */
export type QueryYoutubeVideoArgs = {
  url: Scalars['String'];
};


/** Root (top level) query. */
export type QueryApiTwitterSearchArgs = {
  url: Scalars['String'];
};


/** Root (top level) query. */
export type QueryApiTwitterGetImagesArgs = {
  screenName: Scalars['String'];
};


/** Root (top level) query. */
export type QueryApiMediaSearchArgs = {
  source: SourceType;
  query: Scalars['String'];
};


/** Root (top level) query. */
export type QueryMediaLibraryImageArgs = {
  id: Scalars['ID'];
};


/** Root (top level) query. */
export type QueryMediaLibraryImagesArgs = {
  orderby: Maybe<Array<Maybe<Scalars['String']>>>;
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  fileName: Maybe<Scalars['String']>;
};


/** Root (top level) query. */
export type QueryDropboxFolderLinksArgs = {
  slideId: Scalars['ID'];
  fullhd?: Maybe<Scalars['Boolean']>;
};


/** Root (top level) query. */
export type QueryChannelsArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['UUID']>;
  name: Maybe<Scalars['String']>;
  organization: Maybe<Scalars['ID']>;
};


/** Root (top level) query. */
export type QueryChannelArgs = {
  id: Scalars['ID'];
};


/** Root (top level) query. */
export type QueryChannelPublicArgs = {
  publicId: Scalars['String'];
};


/** Root (top level) query. */
export type QuerySlideTemplateArgs = {
  id: Scalars['String'];
};


/** Root (top level) query. */
export type QueryOpenShowArgs = {
  id: Scalars['ID'];
};


/** Root (top level) query. */
export type QueryShowsArgs = {
  channelIds: Maybe<Array<Scalars['ID']>>;
  orderby: Maybe<Array<Maybe<Scalars['String']>>>;
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  templateId: Maybe<Scalars['String']>;
  createdBy: Maybe<Scalars['ID']>;
  updatedBy: Maybe<Scalars['ID']>;
  onScreen: Maybe<Scalars['Boolean']>;
  isPublic: Maybe<Scalars['Boolean']>;
};


/** Root (top level) query. */
export type QueryShowArgs = {
  id: Scalars['ID'];
};


/** Root (top level) query. */
export type QueryShowPublicArgs = {
  publicId: Scalars['String'];
};


/** Root (top level) query. */
export type QueryShowHistoryArgs = {
  showId: Scalars['ID'];
};


/** Root (top level) query. */
export type QuerySlideArgs = {
  id: Scalars['ID'];
};


/** Root (top level) query. */
export type QueryScreensArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['UUID']>;
  name: Maybe<Scalars['String']>;
  subscribedChannel: Maybe<Scalars['ID']>;
  subscribedShow: Maybe<Scalars['ID']>;
};


/** Root (top level) query. */
export type QueryScreenArgs = {
  id: Scalars['ID'];
};


/** Root (top level) query. */
export type QueryDeviceArgs = {
  id: Scalars['ID'];
};


/** Root (top level) query. */
export type QueryOrganizationArgs = {
  id: Scalars['ID'];
};


/** Root (top level) query. */
export type QueryVerifyInvitationKeyArgs = {
  invitationKey: Scalars['String'];
};

export type LayoutNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  templateId: Scalars['String'];
  category: Scalars['String'];
  data?: Maybe<Scalars['JSONString']>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};


export type NetworkTransversalCredential = {
  username?: Maybe<Scalars['String']>;
  iceServers?: Maybe<Array<Maybe<IceServer>>>;
  dateUpdated?: Maybe<Scalars['String']>;
  accountSid?: Maybe<Scalars['String']>;
  ttl?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type IceServer = {
  username?: Maybe<Scalars['String']>;
  credential?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  urls?: Maybe<Scalars['String']>;
};

export type YoutubeDetails = {
  duration?: Maybe<Scalars['String']>;
  dimension?: Maybe<Scalars['String']>;
};

export type ApiTwitterResponse = {
  profileBannerUrl?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
};

export enum SourceType {
  Giphy = 'GIPHY',
  Unsplash = 'UNSPLASH'
}

export type MediaLibraryImageNode = Node & {
  image: Scalars['String'];
  imageType: MediaLibraryImageImageType;
  fileName: Scalars['String'];
  source: Scalars['String'];
  author: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  slides: Scalars['Int'];
};

/** An enumeration. */
export enum MediaLibraryImageImageType {
  /** ORGANIZATION */
  Organization = 'ORGANIZATION'
}

export type MediaLibraryImageNodeConnection = {
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<MediaLibraryImageNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

/** A Relay edge containing a `MediaLibraryImageNode` and its cursor. */
export type MediaLibraryImageNodeEdge = {
  /** The item at the end of the edge */
  node?: Maybe<MediaLibraryImageNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ChannelNodeConnection = {
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ChannelNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `ChannelNode` and its cursor. */
export type ChannelNodeEdge = {
  /** The item at the end of the edge */
  node?: Maybe<ChannelNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ChannelNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  organization: OrganizationNode;
  publicId: Scalars['String'];
  isPublic: Scalars['Boolean'];
  emojiCode: Scalars['String'];
  emojiBackgroundColor: Scalars['String'];
  shows: Array<ShowsAndChannelsNode>;
  totalDuration: Scalars['Int'];
};

export type OrganizationNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  avatar: Scalars['String'];
  /** Hex colour for the companies' brand color. */
  brandColor: Scalars['String'];
  users: Array<OrganizationUserNode>;
  registeredCredentials: Array<ExternalCredentialNode>;
  pendingInvitations: Array<PendingInvitationsNode>;
};

/** Dedicated to be used only within OrganizationNode  */
export type OrganizationUserNode = Node & {
  name: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  organizationPermission?: Maybe<OrganizationXGroupNode>;
};

export type OrganizationXGroupNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  organization: OrganizationNode;
  groupType: OrganizationXGroupGroupType;
  permissions: Array<Scalars['String']>;
};

/** An enumeration. */
export enum OrganizationXGroupGroupType {
  /** OWNER */
  Owner = 'OWNER',
  /** ADMIN */
  Admin = 'ADMIN',
  /** EDITOR */
  Editor = 'EDITOR'
}

/** Dedicated to be used only within OrganizationNode  */
export type ExternalCredentialNode = Node & {
  credentialType: ExternalCredentialCredentialType;
  createdBy?: Maybe<OrganizationUserNode>;
  /** integration user account in case we can get it */
  integrationUser: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
};

/** An enumeration. */
export enum ExternalCredentialCredentialType {
  /** DROPBOX */
  Dropbox = 'DROPBOX',
  /** SLACK */
  Slack = 'SLACK'
}

export type PendingInvitationsNode = Node & {
  sender: UserNode;
  emailTo: Scalars['String'];
  groupType: InvitationKeyGroupType;
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type UserNode = Node & {
  name: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
  dateJoined: Scalars['DateTime'];
  acceptTermsAndConditions?: Maybe<Scalars['Boolean']>;
  acceptTermsAndConditionsUpdatedAt?: Maybe<Scalars['DateTime']>;
  newsletterOptIn?: Maybe<Scalars['Boolean']>;
  newsletterOptInUpdatedAt?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  activeOrganization?: Maybe<OrganizationXGroupNode>;
  permissions?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** An enumeration. */
export enum InvitationKeyGroupType {
  /** OWNER */
  Owner = 'OWNER',
  /** ADMIN */
  Admin = 'ADMIN',
  /** EDITOR */
  Editor = 'EDITOR'
}

export type ShowsAndChannelsNode = Node & {
  show: ShowNode;
  sortOrder: Scalars['Int'];
  channel: ChannelNode;
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type ShowNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  createdBy?: Maybe<UserNode>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  updatedBy?: Maybe<UserNode>;
  organization: OrganizationNode;
  publicId: Scalars['String'];
  isPublic: Scalars['Boolean'];
  channels: Array<ChannelNode>;
  slides: Array<ShowSlideNode>;
  duration: Scalars['Int'];
  previewImage: Scalars['String'];
  previewImageVertical: Scalars['String'];
  previewImageState: Scalars['String'];
  previewImageVerticalState: Scalars['String'];
  updatedByHistory: Array<Maybe<UserNode>>;
};

export type ShowSlideNode = Node & {
  renderedHtml: Scalars['String'];
  duration: Scalars['Int'];
  sortOrder: Scalars['Int'];
  previewImage: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  data?: Maybe<Scalars['JSONString']>;
  show: ShowNode;
  previewImageState: ShowSlidePreviewImageState;
  contentFile: Scalars['String'];
  templateId: Scalars['String'];
  templateSchema: Scalars['JSONString'];
  templateName: Scalars['String'];
  templateHtml: Scalars['String'];
  /** Show template's version */
  templateVersion: Scalars['Int'];
};

/** An enumeration. */
export enum ShowSlidePreviewImageState {
  /** RENDERED */
  Rendered = 'RENDERED',
  /** RENDERING */
  Rendering = 'RENDERING',
  /** ERROR */
  Error = 'ERROR'
}


export type ChannelPublicNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  createdBy: UserPublicNode;
  name: Scalars['String'];
  organization: OrganizationPublicNode;
  publicId: Scalars['String'];
  publicViewCount: Scalars['Int'];
  isPublic: Scalars['Boolean'];
  shows: Array<ShowsAndChannelsPublicNode>;
  totalDuration: Scalars['Int'];
};

export type UserPublicNode = Node & {
  name: Scalars['String'];
  avatar: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type OrganizationPublicNode = Node & {
  name: Scalars['String'];
  avatar: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type ShowsAndChannelsPublicNode = Node & {
  show: ChannelShowPublicNode;
  sortOrder: Scalars['Int'];
  /** The ID of the object. */
  id: Scalars['ID'];
};

/**
 * Publicly accessible version of the show node.
 * Only returns a limited number of show properties
 */
export type ChannelShowPublicNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  slides: Array<ChannelShowSlidePublicNode>;
};

/**
 * Publicly accessible version of the slide node.
 * Only returns a limited number of slide properties
 */
export type ChannelShowSlidePublicNode = Node & {
  renderedHtml: Scalars['String'];
  duration: Scalars['Int'];
  sortOrder: Scalars['Int'];
  previewImage: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type SlideTemplateDetailNode = SlideTemplateInterface & {
  id: Scalars['String'];
  name: Scalars['String'];
  version: Scalars['Int'];
  isActive: Scalars['Boolean'];
  cover: Scalars['String'];
  organizationSlidesCount: Scalars['Int'];
  previewUrl: Scalars['String'];
  schema: Scalars['JSONString'];
  html: Scalars['String'];
  defaultData: Scalars['JSONString'];
};

export type SlideTemplateInterface = {
  id: Scalars['String'];
  name: Scalars['String'];
  version: Scalars['Int'];
  isActive: Scalars['Boolean'];
  cover: Scalars['String'];
  organizationSlidesCount: Scalars['Int'];
  previewUrl: Scalars['String'];
};

export type SlideTemplateListNode = SlideTemplateInterface & {
  id: Scalars['String'];
  name: Scalars['String'];
  version: Scalars['Int'];
  isActive: Scalars['Boolean'];
  cover: Scalars['String'];
  organizationSlidesCount: Scalars['Int'];
  previewUrl: Scalars['String'];
};

export type OpenShowNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  slides: Array<OpenShowSlideNode>;
  duration: Scalars['Int'];
  isEditable: Scalars['Boolean'];
};

export type OpenShowSlideNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  data?: Maybe<Scalars['JSONString']>;
  renderedHtml: Scalars['String'];
  duration: Scalars['Int'];
  sortOrder: Scalars['Int'];
  show: OpenShowNode;
  templateId: Scalars['String'];
  templateSchema: Scalars['JSONString'];
  templateName: Scalars['String'];
  templateHtml: Scalars['String'];
  /** Show template's version */
  templateVersion: Scalars['Int'];
};

export type ShowNodeConnection = {
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ShowNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `ShowNode` and its cursor. */
export type ShowNodeEdge = {
  /** The item at the end of the edge */
  node?: Maybe<ShowNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/**
 * Publicly accessible version of the show node.
 * Only returns a limited number of show properties
 */
export type ShowPublicNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  slides: Array<ShowSlidePublicNode>;
  createdBy: UserPublicNode;
  organization: OrganizationPublicNode;
  publicId: Scalars['String'];
  isPublic: Scalars['Boolean'];
  publicViewCount: Scalars['Int'];
};

/**
 * Publicly accessible version of the slide node.
 * Only returns a limited number of slide properties
 */
export type ShowSlidePublicNode = Node & {
  renderedHtml: Scalars['String'];
  duration: Scalars['Int'];
  sortOrder: Scalars['Int'];
  previewImage: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type ShowHistory = {
  updatedBy?: Maybe<UserNode>;
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  createdBy: UserNode;
  historyType: ShowHistoryType;
};

export enum ShowHistoryType {
  Show = 'show',
  Slide = 'slide'
}

export type ScreenNodeConnection = {
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ScreenNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `ScreenNode` and its cursor. */
export type ScreenNodeEdge = {
  /** The item at the end of the edge */
  node?: Maybe<ScreenNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ScreenNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  uniqueMachineId: Scalars['String'];
  subscribedChannel?: Maybe<ChannelNode>;
  subscribedShow?: Maybe<ShowNode>;
  deviceType: ScreenDeviceType;
  /** Is overscan enabled on RPi */
  overscanEnabled: Scalars['Boolean'];
  userAgent: Scalars['String'];
  osInfo: Scalars['String'];
  browserInfo: Scalars['String'];
  ipAddr: Scalars['String'];
  lastHandshake: Scalars['DateTime'];
  name: Scalars['String'];
  organization?: Maybe<OrganizationNode>;
  rotation: ScreenRotation;
  /** Is the screen blocked for usage */
  isBlocked: Scalars['Boolean'];
  /** Is the screen online (this value is controlled by pusher listener service) */
  isOnline: Scalars['Boolean'];
  /** Is the screen compatible with WebRTC? */
  screensharing: Scalars['Boolean'];
  /** Is the screen name visible on the tv screen? */
  isScreenInfoVisible: Scalars['Boolean'];
};

/** An enumeration. */
export enum ScreenDeviceType {
  /** ELECTRON */
  Electron = 'ELECTRON',
  /** BROWSER */
  Browser = 'BROWSER',
  /** CHROMECAST */
  Chromecast = 'CHROMECAST',
  /** ANDROID */
  Android = 'ANDROID',
  /** FIRETV */
  Firetv = 'FIRETV'
}

/** An enumeration. */
export enum ScreenRotation {
  /** ROTATION_0 */
  Rotation_0 = 'ROTATION_0',
  /** ROTATION_90 */
  Rotation_90 = 'ROTATION_90',
  /** ROTATION_180 */
  Rotation_180 = 'ROTATION_180',
  /** ROTATION_270 */
  Rotation_270 = 'ROTATION_270'
}

/** A type dedicated for device (RPi) entities to get their info and status  */
export type DeviceNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  uniqueMachineId: Scalars['String'];
  subscribedChannel?: Maybe<ChannelNode>;
  subscribedShow?: Maybe<ShowNode>;
  /** Is overscan enabled on RPi */
  overscanEnabled: Scalars['Boolean'];
  name: Scalars['String'];
  organization?: Maybe<OrganizationPublicNode>;
  rotation: ScreenRotation;
  /** Is the screen blocked for usage */
  isBlocked: Scalars['Boolean'];
  /** Is the screen name visible on the tv screen? */
  isScreenInfoVisible: Scalars['Boolean'];
  electronReleaseChannel: ScreenElectronReleaseChannel;
};

/** An enumeration. */
export enum ScreenElectronReleaseChannel {
  /** LATEST */
  Latest = 'LATEST',
  /** BETA */
  Beta = 'BETA',
  /** ALPHA */
  Alpha = 'ALPHA'
}

export type InvitationKeyNode = Node & {
  sender: UserNode;
  organization: OrganizationNode;
  invitationKey: Scalars['UUID'];
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type UserNodeDetails = {
  info: UserNode;
  organizations: OrganizationXGroupNodeConnection;
};


export type UserNodeDetailsOrganizationsArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['ID']>;
  groupType: Maybe<Scalars['String']>;
};

export type OrganizationXGroupNodeConnection = {
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrganizationXGroupNodeEdge>>;
};

/** A Relay edge containing a `OrganizationXGroupNode` and its cursor. */
export type OrganizationXGroupNodeEdge = {
  /** The item at the end of the edge */
  node?: Maybe<OrganizationXGroupNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** Config query dedicated for CMS web  */
export type AppConfigViewNode = {
  version: Scalars['String'];
  translations: Scalars['GenericScalar'];
  enabledLanguages: Scalars['GenericScalar'];
  defaultLanguage: Scalars['GenericScalar'];
  googleClientId: Scalars['String'];
  googleClientProvider: Scalars['String'];
  dropboxClientId: Scalars['String'];
  slackClientId: Scalars['String'];
};


/** Root (top level) mutation. */
export type Mutation = {
  createLayout: LayoutCreateMutationPayload;
  deleteLayout: LayoutDeleteMutationPayload;
  sendPusherMessage: SendPusherMessageMutationPayload;
  createPublicImage?: Maybe<PublicImageCreateMutationPayload>;
  createMediaLibraryImage?: Maybe<MediaLibraryImageCreatePayload>;
  deleteMediaLibraryImage: MediaLibraryImageDeleteMutationPayload;
  createChannel: ChannelCreateMutationPayload;
  updateChannel: ChannelUpdateMutationPayload;
  deleteChannel: DeleteChannelMutationPayload;
  duplicateChannel: DuplicateChannelMutationPayload;
  publishChannel: ChannelPublishMutationPayload;
  duplicatePublicChannel: DuplicatePublicChannelMutationPayload;
  createOpenShow: OpenShowCreateMutationPayload;
  updateOpenShow: OpenShowUpdateMutationPayload;
  duplicateOpenShow: OpenShowDuplicateMutationPayload;
  createOpenShowSlide: OpenShowSlideCreateMutationPayload;
  updateOpenShowSlide: OpenShowSlideUpdateMutationPayload;
  deleteOpenShowSlide: OpenShowSlideDeleteMutationPayload;
  duplicateOpenShowSlide: OpenShowSlideDuplicateMutationPayload;
  orderOpenShowSlides: OpenShowSlidesOrderMutationPayload;
  createShow: ShowCreateMutationPayload;
  updateShow: ShowUpdateMutationPayload;
  deleteShow: DeleteShowMutationPayload;
  duplicateShow: DuplicateShowMutationPayload;
  duplicatePublicShow: DuplicatePublicShowMutationPayload;
  createShowSlide: ShowSlideCreateMutationPayload;
  updateShowSlide: ShowSlideUpdateMutationPayload;
  deleteShowSlide: DeleteShowSlideMutationPayload;
  duplicateShowSlide: DuplicateShowSlideMutationPayload;
  orderShowSlides: OrderShowSlidesMutationPayload;
  addScreen: ScreenAddMutationPayload;
  updateScreen: ScreenUpdateMutationPayload;
  deleteScreen: DeleteScreenMutationPayload;
  changeChannel: ScreenChangeChannelMutationPayload;
  changeShow: ScreenChangeShowMutationPayload;
  registerDevice: RegisterDeviceMutationPayload;
  createOrganization: OrganizationCreateMutationPayload;
  updateOrganization: OrganizationUpdateMutationPayload;
  deleteOrganization: DeleteOrganizationMutationPayload;
  updateOrganizationAvatar?: Maybe<OrganizationAvatarUpdatePayload>;
  inviteUser: InviteUserPayload;
  userJoinOrganization: UserJoinOrganizationPayload;
  cancelInviteUser: CancelInviteUserPayload;
  removeUserFromOrganization: RemoveUserFromOrganizationPayload;
  userLeaveOrganization: UserLeaveOrganizationPayload;
  transferOrganizationOwnership: TransferOrganizationOwnershipPayload;
  changeOrganizationMemberRole: ChangeOrganizationMemberRolePayload;
  registerExternalCredentials: RegisterExternalCredentialsPayload;
  deleteExternalCredentials: DeleteExternalCredentialsPayload;
  cleanupOrganization: CleanupOrgDataMutationPayload;
  /** We override mutation since it returns not a fully descriptive error */
  tokenAuth: ObtainJsonWebToken;
  verifyToken: VerifyPayload;
  refreshToken: Refresh;
  /** Social Auth for JSON Web Token (JWT) */
  socialAuth: SocialAuthJwt;
  registerUser: RegisterUserPayload;
  updateUser: UpdateUserPayload;
  deleteUser: DeleteUserPayload;
  userAvatarUpload: UserAvatarUploadPayload;
  changeActiveOrganization: ChangeActiveOrganizationPayload;
  verifyUserEmail: VerifyUserEmailPayload;
  requestPasswordReset: RequestPasswordResetPayload;
  verifyPasswordResetKey: VerifyPasswordResetKeyPayload;
  changePassword: ChangePasswordPayload;
  resendVerification: ResendVerificationPayload;
};


/** Root (top level) mutation. */
export type MutationCreateLayoutArgs = {
  input: LayoutCreateMutationInput;
};


/** Root (top level) mutation. */
export type MutationDeleteLayoutArgs = {
  input: LayoutDeleteMutationInput;
};


/** Root (top level) mutation. */
export type MutationSendPusherMessageArgs = {
  input: SendPusherMessageMutationInput;
};


/** Root (top level) mutation. */
export type MutationCreatePublicImageArgs = {
  input: PublicImageCreateMutationInput;
};


/** Root (top level) mutation. */
export type MutationCreateMediaLibraryImageArgs = {
  input: MediaLibraryImageCreateInput;
};


/** Root (top level) mutation. */
export type MutationDeleteMediaLibraryImageArgs = {
  input: MediaLibraryImageDeleteMutationInput;
};


/** Root (top level) mutation. */
export type MutationCreateChannelArgs = {
  input: ChannelCreateMutationInput;
};


/** Root (top level) mutation. */
export type MutationUpdateChannelArgs = {
  input: ChannelUpdateMutationInput;
};


/** Root (top level) mutation. */
export type MutationDeleteChannelArgs = {
  input: DeleteChannelMutationInput;
};


/** Root (top level) mutation. */
export type MutationDuplicateChannelArgs = {
  input: DuplicateChannelMutationInput;
};


/** Root (top level) mutation. */
export type MutationPublishChannelArgs = {
  input: ChannelPublishMutationInput;
};


/** Root (top level) mutation. */
export type MutationDuplicatePublicChannelArgs = {
  input: DuplicatePublicChannelMutationInput;
};


/** Root (top level) mutation. */
export type MutationCreateOpenShowArgs = {
  input: OpenShowCreateMutationInput;
};


/** Root (top level) mutation. */
export type MutationUpdateOpenShowArgs = {
  input: OpenShowUpdateMutationInput;
};


/** Root (top level) mutation. */
export type MutationDuplicateOpenShowArgs = {
  input: OpenShowDuplicateMutationInput;
};


/** Root (top level) mutation. */
export type MutationCreateOpenShowSlideArgs = {
  input: OpenShowSlideCreateMutationInput;
};


/** Root (top level) mutation. */
export type MutationUpdateOpenShowSlideArgs = {
  input: OpenShowSlideUpdateMutationInput;
};


/** Root (top level) mutation. */
export type MutationDeleteOpenShowSlideArgs = {
  input: OpenShowSlideDeleteMutationInput;
};


/** Root (top level) mutation. */
export type MutationDuplicateOpenShowSlideArgs = {
  input: OpenShowSlideDuplicateMutationInput;
};


/** Root (top level) mutation. */
export type MutationOrderOpenShowSlidesArgs = {
  input: OpenShowSlidesOrderMutationInput;
};


/** Root (top level) mutation. */
export type MutationCreateShowArgs = {
  input: ShowCreateMutationInput;
};


/** Root (top level) mutation. */
export type MutationUpdateShowArgs = {
  input: ShowUpdateMutationInput;
};


/** Root (top level) mutation. */
export type MutationDeleteShowArgs = {
  input: DeleteShowMutationInput;
};


/** Root (top level) mutation. */
export type MutationDuplicateShowArgs = {
  input: DuplicateShowMutationInput;
};


/** Root (top level) mutation. */
export type MutationDuplicatePublicShowArgs = {
  input: DuplicatePublicShowMutationInput;
};


/** Root (top level) mutation. */
export type MutationCreateShowSlideArgs = {
  input: ShowSlideCreateMutationInput;
};


/** Root (top level) mutation. */
export type MutationUpdateShowSlideArgs = {
  input: ShowSlideUpdateMutationInput;
};


/** Root (top level) mutation. */
export type MutationDeleteShowSlideArgs = {
  input: DeleteShowSlideMutationInput;
};


/** Root (top level) mutation. */
export type MutationDuplicateShowSlideArgs = {
  input: DuplicateShowSlideMutationInput;
};


/** Root (top level) mutation. */
export type MutationOrderShowSlidesArgs = {
  input: OrderShowSlidesMutationInput;
};


/** Root (top level) mutation. */
export type MutationAddScreenArgs = {
  input: ScreenAddMutationInput;
};


/** Root (top level) mutation. */
export type MutationUpdateScreenArgs = {
  input: ScreenUpdateMutationInput;
};


/** Root (top level) mutation. */
export type MutationDeleteScreenArgs = {
  input: DeleteScreenMutationInput;
};


/** Root (top level) mutation. */
export type MutationChangeChannelArgs = {
  input: ScreenChangeChannelMutationInput;
};


/** Root (top level) mutation. */
export type MutationChangeShowArgs = {
  input: ScreenChangeShowMutationInput;
};


/** Root (top level) mutation. */
export type MutationRegisterDeviceArgs = {
  input: RegisterDeviceMutationInput;
};


/** Root (top level) mutation. */
export type MutationCreateOrganizationArgs = {
  input: OrganizationCreateMutationInput;
};


/** Root (top level) mutation. */
export type MutationUpdateOrganizationArgs = {
  input: OrganizationUpdateMutationInput;
};


/** Root (top level) mutation. */
export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationMutationInput;
};


/** Root (top level) mutation. */
export type MutationUpdateOrganizationAvatarArgs = {
  input: OrganizationAvatarUpdateInput;
};


/** Root (top level) mutation. */
export type MutationInviteUserArgs = {
  input: InviteUserInput;
};


/** Root (top level) mutation. */
export type MutationUserJoinOrganizationArgs = {
  input: UserJoinOrganizationInput;
};


/** Root (top level) mutation. */
export type MutationCancelInviteUserArgs = {
  input: CancelInviteUserInput;
};


/** Root (top level) mutation. */
export type MutationRemoveUserFromOrganizationArgs = {
  input: RemoveUserFromOrganizationInput;
};


/** Root (top level) mutation. */
export type MutationUserLeaveOrganizationArgs = {
  input: UserLeaveOrganizationInput;
};


/** Root (top level) mutation. */
export type MutationTransferOrganizationOwnershipArgs = {
  input: TransferOrganizationOwnershipInput;
};


/** Root (top level) mutation. */
export type MutationChangeOrganizationMemberRoleArgs = {
  input: ChangeOrganizationMemberRoleInput;
};


/** Root (top level) mutation. */
export type MutationRegisterExternalCredentialsArgs = {
  input: RegisterExternalCredentialsInput;
};


/** Root (top level) mutation. */
export type MutationDeleteExternalCredentialsArgs = {
  input: DeleteExternalCredentialsInput;
};


/** Root (top level) mutation. */
export type MutationCleanupOrganizationArgs = {
  input: CleanupOrgDataMutationInput;
};


/** Root (top level) mutation. */
export type MutationTokenAuthArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


/** Root (top level) mutation. */
export type MutationVerifyTokenArgs = {
  input: VerifyInput;
};


/** Root (top level) mutation. */
export type MutationRefreshTokenArgs = {
  token: Maybe<Scalars['String']>;
};


/** Root (top level) mutation. */
export type MutationSocialAuthArgs = {
  accessToken: Scalars['String'];
  provider: Scalars['String'];
};


/** Root (top level) mutation. */
export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


/** Root (top level) mutation. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** Root (top level) mutation. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** Root (top level) mutation. */
export type MutationUserAvatarUploadArgs = {
  input: UserAvatarUploadInput;
};


/** Root (top level) mutation. */
export type MutationChangeActiveOrganizationArgs = {
  input: ChangeActiveOrganizationInput;
};


/** Root (top level) mutation. */
export type MutationVerifyUserEmailArgs = {
  input: VerifyUserEmailInput;
};


/** Root (top level) mutation. */
export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


/** Root (top level) mutation. */
export type MutationVerifyPasswordResetKeyArgs = {
  input: VerifyPasswordResetKeyInput;
};


/** Root (top level) mutation. */
export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


/** Root (top level) mutation. */
export type MutationResendVerificationArgs = {
  input: ResendVerificationInput;
};

export type LayoutCreateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  layout?: Maybe<LayoutNode>;
};

/** An error that happened in a mutation. */
export type MutationErrorType = {
  /** The field that caused the error, or `null` if it isn't associated with any particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

export type LayoutCreateMutationInput = {
  name: Scalars['String'];
  templateId?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSONString']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type LayoutDeleteMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  layout?: Maybe<LayoutNode>;
};

export type LayoutDeleteMutationInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type SendPusherMessageMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type SendPusherMessageMutationInput = {
  screenId: Scalars['ID'];
  messageType: Scalars['String'];
  payload: Scalars['JSONString'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type PublicImageCreateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  publicImage?: Maybe<PublicImageNode>;
};

export type PublicImageNode = Node & {
  image: Scalars['String'];
  fileName: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type PublicImageCreateMutationInput = {
  image: Scalars['UploadType'];
  clientMutationId?: Maybe<Scalars['String']>;
};


export type MediaLibraryImageCreatePayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  mediaLibraryImage?: Maybe<MediaLibraryImageNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type MediaLibraryImageCreateInput = {
  image: Scalars['UploadType'];
  source: Scalars['String'];
  author: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type MediaLibraryImageDeleteMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  mediaLibraryImage?: Maybe<MediaLibraryImageNode>;
};

export type MediaLibraryImageDeleteMutationInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ChannelCreateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  channel?: Maybe<ChannelNode>;
};

export type ChannelCreateMutationInput = {
  name: Scalars['String'];
  emojiCode?: Maybe<Scalars['String']>;
  emojiBackgroundColor?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ChannelUpdateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  channel?: Maybe<ChannelNode>;
};

export type ChannelUpdateMutationInput = {
  shows?: Maybe<Array<Scalars['ID']>>;
  name: Scalars['String'];
  emojiCode?: Maybe<Scalars['String']>;
  emojiBackgroundColor?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteChannelMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  channel?: Maybe<ChannelNode>;
};

export type DeleteChannelMutationInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DuplicateChannelMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  channel?: Maybe<ChannelNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DuplicateChannelMutationInput = {
  channelId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ChannelPublishMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  channel?: Maybe<ChannelNode>;
};

export type ChannelPublishMutationInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DuplicatePublicChannelMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  channel?: Maybe<ChannelNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DuplicatePublicChannelMutationInput = {
  publicId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OpenShowCreateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  openShow?: Maybe<OpenShowNode>;
};

export type OpenShowCreateMutationInput = {
  name: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OpenShowUpdateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  openShow?: Maybe<OpenShowNode>;
};

export type OpenShowUpdateMutationInput = {
  name?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OpenShowDuplicateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  openShow?: Maybe<OpenShowNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OpenShowDuplicateMutationInput = {
  openShowId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OpenShowSlideCreateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  openShowSlide?: Maybe<OpenShowSlideNode>;
};

export type OpenShowSlideCreateMutationInput = {
  templateId: Scalars['String'];
  sortOrder: Scalars['Int'];
  show: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OpenShowSlideUpdateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  openShowSlide?: Maybe<OpenShowSlideNode>;
};

export type OpenShowSlideUpdateMutationInput = {
  data?: Maybe<Scalars['JSONString']>;
  duration?: Maybe<Scalars['Int']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OpenShowSlideDeleteMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  openShowSlide?: Maybe<OpenShowSlideNode>;
};

export type OpenShowSlideDeleteMutationInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OpenShowSlideDuplicateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  openShowSlide?: Maybe<OpenShowSlideNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OpenShowSlideDuplicateMutationInput = {
  slideId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OpenShowSlidesOrderMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  openShow?: Maybe<OpenShowNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OpenShowSlidesOrderMutationInput = {
  slides: Array<Scalars['ID']>;
  openShowId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ShowCreateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  show?: Maybe<ShowNode>;
};

export type ShowCreateMutationInput = {
  channels?: Maybe<Array<Scalars['ID']>>;
  name: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ShowUpdateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  show?: Maybe<ShowNode>;
};

export type ShowUpdateMutationInput = {
  name: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  isPublic?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteShowMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  show?: Maybe<ShowNode>;
};

export type DeleteShowMutationInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DuplicateShowMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  show?: Maybe<ShowNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DuplicateShowMutationInput = {
  showId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DuplicatePublicShowMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  show?: Maybe<ShowNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DuplicatePublicShowMutationInput = {
  publicId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ShowSlideCreateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  showSlide?: Maybe<ShowSlideNode>;
};

export type ShowSlideCreateMutationInput = {
  templateId: Scalars['String'];
  sortOrder: Scalars['Int'];
  show: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ShowSlideUpdateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  showSlide?: Maybe<ShowSlideNode>;
};

export type ShowSlideUpdateMutationInput = {
  duration: Scalars['Int'];
  data: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteShowSlideMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  showSlide?: Maybe<ShowSlideNode>;
};

export type DeleteShowSlideMutationInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DuplicateShowSlideMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  showSlide?: Maybe<ShowSlideNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DuplicateShowSlideMutationInput = {
  slideId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OrderShowSlidesMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  show?: Maybe<ShowNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OrderShowSlidesMutationInput = {
  slides: Array<Scalars['ID']>;
  showId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ScreenAddMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  screen?: Maybe<ScreenNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ScreenAddMutationInput = {
  registrationCode: Scalars['Int'];
  organization: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ScreenUpdateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  screen?: Maybe<ScreenNode>;
};

export type ScreenUpdateMutationInput = {
  uniqueMachineId?: Maybe<Scalars['String']>;
  deviceType?: Maybe<ScreenDeviceType>;
  userAgent?: Maybe<Scalars['String']>;
  osInfo?: Maybe<Scalars['String']>;
  browserInfo?: Maybe<Scalars['String']>;
  ipAddr?: Maybe<Scalars['String']>;
  lastHandshake?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  rotation: ScreenRotation;
  electronReleaseChannel?: Maybe<ScreenElectronReleaseChannel>;
  registrationCode?: Maybe<Scalars['Int']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  isActive?: Maybe<Scalars['Boolean']>;
  createdBy?: Maybe<Scalars['ID']>;
  updatedBy?: Maybe<Scalars['ID']>;
  subscribedChannel?: Maybe<Scalars['ID']>;
  subscribedShow?: Maybe<Scalars['ID']>;
  /** Is overscan enabled on RPi */
  overscanEnabled: Scalars['Boolean'];
  appVersion?: Maybe<Scalars['String']>;
  tvAppVersion?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['DateTime']>;
  organization?: Maybe<Scalars['ID']>;
  /** Is the screen blocked for usage */
  isBlocked?: Maybe<Scalars['Boolean']>;
  /** Is the screen online (this value is controlled by pusher listener service) */
  isOnline?: Maybe<Scalars['Boolean']>;
  /** Has the TV app been paired with an org */
  isPaired?: Maybe<Scalars['Boolean']>;
  /** Is the screen compatible with WebRTC? */
  screensharing?: Maybe<Scalars['Boolean']>;
  /** Is the screen name visible on the tv screen? */
  isScreenInfoVisible: Scalars['Boolean'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteScreenMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  screen?: Maybe<ScreenNode>;
};

export type DeleteScreenMutationInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ScreenChangeChannelMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  screen?: Maybe<ScreenNode>;
};

export type ScreenChangeChannelMutationInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  subscribedChannel?: Maybe<Scalars['ID']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ScreenChangeShowMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  screen?: Maybe<ScreenNode>;
};

export type ScreenChangeShowMutationInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  subscribedShow?: Maybe<Scalars['ID']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RegisterDeviceMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  device?: Maybe<PublicScreenNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type PublicScreenNode = Node & {
  /** The ID of the object. */
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  registrationCode: Scalars['Int'];
  deviceNodeId: Scalars['String'];
};

export type RegisterDeviceMutationInput = {
  uniqueMachineId?: Maybe<Scalars['String']>;
  deviceType: AvailableDeviceTypes;
  deviceId?: Maybe<Scalars['ID']>;
  appVersion?: Maybe<Scalars['String']>;
  tvAppVersion?: Maybe<Scalars['String']>;
  osInfo?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export enum AvailableDeviceTypes {
  Electron = 'ELECTRON',
  Browser = 'BROWSER',
  Chromecast = 'CHROMECAST',
  Android = 'ANDROID',
  Firetv = 'FIRETV'
}

export type OrganizationCreateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  organization?: Maybe<OrganizationNode>;
};

export type OrganizationCreateMutationInput = {
  name: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OrganizationUpdateMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  organization?: Maybe<OrganizationNode>;
};

export type OrganizationUpdateMutationInput = {
  name?: Maybe<Scalars['String']>;
  /** Hex colour for the companies' brand color. */
  brandColor?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  customAvatar?: Maybe<Scalars['Boolean']>;
  lastActionDate?: Maybe<Scalars['DateTime']>;
  lastActionBy?: Maybe<Scalars['ID']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteOrganizationMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  organization?: Maybe<OrganizationNode>;
};

export type DeleteOrganizationMutationInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OrganizationAvatarUpdatePayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  message?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OrganizationAvatarUpdateInput = {
  avatar: Scalars['UploadType'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type InviteUserPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type InviteUserInput = {
  email: Scalars['String'];
  invitationRole: AvailableRoleTypes;
  clientMutationId?: Maybe<Scalars['String']>;
};

export enum AvailableRoleTypes {
  Admin = 'ADMIN',
  Editor = 'EDITOR'
}

export type UserJoinOrganizationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserJoinOrganizationInput = {
  invitationKey: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CancelInviteUserPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CancelInviteUserInput = {
  email: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RemoveUserFromOrganizationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RemoveUserFromOrganizationInput = {
  userId: Scalars['ID'];
  organizationId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserLeaveOrganizationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  user?: Maybe<UserNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserLeaveOrganizationInput = {
  organizationId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TransferOrganizationOwnershipPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  organization?: Maybe<OrganizationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TransferOrganizationOwnershipInput = {
  userId: Scalars['ID'];
  organizationId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ChangeOrganizationMemberRolePayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  organization?: Maybe<OrganizationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ChangeOrganizationMemberRoleInput = {
  userId: Scalars['ID'];
  organizationId: Scalars['ID'];
  newRole: AvailableRoleTypes;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RegisterExternalCredentialsPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RegisterExternalCredentialsInput = {
  accessToken?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  credentialType: AvailableCredentialTypes;
  clientMutationId?: Maybe<Scalars['String']>;
};

export enum AvailableCredentialTypes {
  Dropbox = 'DROPBOX',
  Slack = 'SLACK'
}

export type DeleteExternalCredentialsPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteExternalCredentialsInput = {
  credentialType: AvailableCredentialTypes;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CleanupOrgDataMutationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  cleaned?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CleanupOrgDataMutationInput = {
  areYouSure: Scalars['Boolean'];
  clientMutationId?: Maybe<Scalars['String']>;
};

/** We override mutation since it returns not a fully descriptive error */
export type ObtainJsonWebToken = {
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
};

export type VerifyPayload = {
  payload: Scalars['GenericScalar'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type VerifyInput = {
  token: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Refresh = {
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
};

/** Social Auth for JSON Web Token (JWT) */
export type SocialAuthJwt = {
  social?: Maybe<SocialType>;
  token?: Maybe<Scalars['String']>;
};

export type SocialType = {
  id: Scalars['ID'];
  user: UserNode;
  provider: Scalars['String'];
  uid: Scalars['String'];
  extraData?: Maybe<Scalars['SocialCamelJSON']>;
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
};


export type RegisterUserPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RegisterUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  acceptTermsAndConditions?: Maybe<Scalars['Boolean']>;
  newsletterOptIn?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateUserPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  user?: Maybe<UserNode>;
};

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  acceptTermsAndConditions?: Maybe<Scalars['Boolean']>;
  newsletterOptIn?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteUserPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteUserInput = {
  conditionsAccepted: Scalars['Boolean'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserAvatarUploadPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  user?: Maybe<UserNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserAvatarUploadInput = {
  avatar: Scalars['UploadType'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ChangeActiveOrganizationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  user?: Maybe<UserNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ChangeActiveOrganizationInput = {
  orgXGroup: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type VerifyUserEmailPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  activationKey?: Maybe<ActivationKeyNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ActivationKeyNode = Node & {
  user: UserNode;
  activationKey: Scalars['UUID'];
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type VerifyUserEmailInput = {
  activationKey: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RequestPasswordResetPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RequestPasswordResetInput = {
  email: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type VerifyPasswordResetKeyPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type VerifyPasswordResetKeyInput = {
  passwordKey: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ChangePasswordPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ChangePasswordInput = {
  passwordKey: Scalars['String'];
  newPassword: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ResendVerificationPayload = {
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<MutationErrorType>>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ResendVerificationInput = {
  userId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Root (top level) subscription. */
export type Subscription = {
  slidePreviewImage?: Maybe<ShowSlideNode>;
};


/** Root (top level) subscription. */
export type SubscriptionSlidePreviewImageArgs = {
  input: Maybe<ShowSlideSubscriptionsInput>;
};

export type ShowSlideSubscriptionsInput = {
  token: Scalars['String'];
};

export type DeviceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeviceQuery = { device?: Maybe<DeviceFragment> };

export type DeviceFragment = { id: string, name: string, isScreenInfoVisible: boolean, rotation: ScreenRotation, overscanEnabled: boolean, electronReleaseChannel: ScreenElectronReleaseChannel, organization?: Maybe<{ id: string, avatar: string }>, subscribedChannel?: Maybe<{ id: string }>, subscribedShow?: Maybe<{ id: string }> };

export type DeviceContentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeviceContentQuery = { device?: Maybe<DeviceContentFragment> };

export type DeviceContentFragment = { id: string, subscribedChannel?: Maybe<ChannelFragment>, subscribedShow?: Maybe<ShowFragment> };

export type ChannelFragment = { id: string, name: string, shows: Array<{ sortOrder: number, show: ShowFragment }> };

export type ShowFragment = { id: string, slides: Array<{ duration: number, renderedHtml: string }> };

export type NetworkTransversalCredentialQueryVariables = Exact<{ [key: string]: never; }>;


export type NetworkTransversalCredentialQuery = { networkTransversalCredential?: Maybe<{ username?: Maybe<string>, dateUpdated?: Maybe<string>, accountSid?: Maybe<string>, ttl?: Maybe<string>, dateCreated?: Maybe<string>, password?: Maybe<string>, iceServers?: Maybe<Array<Maybe<{ username?: Maybe<string>, credential?: Maybe<string>, url?: Maybe<string>, urls?: Maybe<string> }>>> }> };

export type RegisterDeviceMutationVariables = Exact<{
  input: RegisterDeviceMutationInput;
}>;


export type RegisterDeviceMutation = { registerDevice: { device?: Maybe<PublicScreenFragment> } };

export type PublicScreenFragment = { id: string, createdAt: any, deviceNodeId: string, registrationCode: number };

export const DeviceFragmentDoc = gql`
    fragment Device on DeviceNode {
  id
  name
  organization {
    id
    avatar
  }
  isScreenInfoVisible
  rotation
  overscanEnabled
  electronReleaseChannel
  subscribedChannel {
    id
  }
  subscribedShow {
    id
  }
}
    `;
export const ShowFragmentDoc = gql`
    fragment Show on ShowNode {
  id
  slides {
    duration
    renderedHtml
  }
}
    `;
export const ChannelFragmentDoc = gql`
    fragment Channel on ChannelNode {
  id
  name
  shows {
    sortOrder
    show {
      ...Show
    }
  }
}
    ${ShowFragmentDoc}`;
export const DeviceContentFragmentDoc = gql`
    fragment DeviceContent on DeviceNode {
  id
  subscribedChannel {
    ...Channel
  }
  subscribedShow {
    ...Show
  }
}
    ${ChannelFragmentDoc}
${ShowFragmentDoc}`;
export const PublicScreenFragmentDoc = gql`
    fragment PublicScreen on PublicScreenNode {
  id
  createdAt
  deviceNodeId
  registrationCode
}
    `;
export const DeviceDocument = gql`
    query device($id: ID!) {
  device(id: $id) {
    ...Device
  }
}
    ${DeviceFragmentDoc}`;
export function useDeviceQuery(baseOptions?: Apollo.QueryHookOptions<DeviceQuery, DeviceQueryVariables>) {
        return Apollo.useQuery<DeviceQuery, DeviceQueryVariables>(DeviceDocument, baseOptions);
      }
export function useDeviceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeviceQuery, DeviceQueryVariables>) {
          return Apollo.useLazyQuery<DeviceQuery, DeviceQueryVariables>(DeviceDocument, baseOptions);
        }
export type DeviceQueryHookResult = ReturnType<typeof useDeviceQuery>;
export type DeviceLazyQueryHookResult = ReturnType<typeof useDeviceLazyQuery>;
export const DeviceContentDocument = gql`
    query deviceContent($id: ID!) {
  device(id: $id) {
    ...DeviceContent
  }
}
    ${DeviceContentFragmentDoc}`;
export function useDeviceContentQuery(baseOptions?: Apollo.QueryHookOptions<DeviceContentQuery, DeviceContentQueryVariables>) {
        return Apollo.useQuery<DeviceContentQuery, DeviceContentQueryVariables>(DeviceContentDocument, baseOptions);
      }
export function useDeviceContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeviceContentQuery, DeviceContentQueryVariables>) {
          return Apollo.useLazyQuery<DeviceContentQuery, DeviceContentQueryVariables>(DeviceContentDocument, baseOptions);
        }
export type DeviceContentQueryHookResult = ReturnType<typeof useDeviceContentQuery>;
export type DeviceContentLazyQueryHookResult = ReturnType<typeof useDeviceContentLazyQuery>;
export const NetworkTransversalCredentialDocument = gql`
    query networkTransversalCredential {
  networkTransversalCredential {
    username
    iceServers {
      username
      credential
      url
      urls
    }
    dateUpdated
    accountSid
    ttl
    dateCreated
    password
  }
}
    `;
export function useNetworkTransversalCredentialQuery(baseOptions?: Apollo.QueryHookOptions<NetworkTransversalCredentialQuery, NetworkTransversalCredentialQueryVariables>) {
        return Apollo.useQuery<NetworkTransversalCredentialQuery, NetworkTransversalCredentialQueryVariables>(NetworkTransversalCredentialDocument, baseOptions);
      }
export function useNetworkTransversalCredentialLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NetworkTransversalCredentialQuery, NetworkTransversalCredentialQueryVariables>) {
          return Apollo.useLazyQuery<NetworkTransversalCredentialQuery, NetworkTransversalCredentialQueryVariables>(NetworkTransversalCredentialDocument, baseOptions);
        }
export type NetworkTransversalCredentialQueryHookResult = ReturnType<typeof useNetworkTransversalCredentialQuery>;
export type NetworkTransversalCredentialLazyQueryHookResult = ReturnType<typeof useNetworkTransversalCredentialLazyQuery>;
export const RegisterDeviceDocument = gql`
    mutation registerDevice($input: RegisterDeviceMutationInput!) {
  registerDevice(input: $input) {
    device {
      ...PublicScreen
    }
  }
}
    ${PublicScreenFragmentDoc}`;
export type RegisterDeviceMutationFn = Apollo.MutationFunction<RegisterDeviceMutation, RegisterDeviceMutationVariables>;
export function useRegisterDeviceMutation(baseOptions?: Apollo.MutationHookOptions<RegisterDeviceMutation, RegisterDeviceMutationVariables>) {
        return Apollo.useMutation<RegisterDeviceMutation, RegisterDeviceMutationVariables>(RegisterDeviceDocument, baseOptions);
      }
export type RegisterDeviceMutationHookResult = ReturnType<typeof useRegisterDeviceMutation>;