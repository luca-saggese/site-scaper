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
  orderby?: Maybe<Array<Maybe<Scalars['String']>>>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  fileName?: Maybe<Scalars['String']>;
};


/** Root (top level) query. */
export type QueryDropboxFolderLinksArgs = {
  slideId: Scalars['ID'];
  fullhd?: Maybe<Scalars['Boolean']>;
};


/** Root (top level) query. */
export type QueryChannelsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Scalars['ID']>;
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
  channelIds?: Maybe<Array<Scalars['ID']>>;
  orderby?: Maybe<Array<Maybe<Scalars['String']>>>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  templateId?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['ID']>;
  updatedBy?: Maybe<Scalars['ID']>;
  onScreen?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
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
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  subscribedChannel?: Maybe<Scalars['ID']>;
  subscribedShow?: Maybe<Scalars['ID']>;
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
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  groupType?: Maybe<Scalars['String']>;
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
  token?: Maybe<Scalars['String']>;
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
  input?: Maybe<ShowSlideSubscriptionsInput>;
};

export type ShowSlideSubscriptionsInput = {
  token: Scalars['String'];
};

export type AnalyticsQueryVariables = Exact<{ [key: string]: never; }>;


export type AnalyticsQuery = { screens: { totalCount?: Maybe<number> }, channels: { totalCount?: Maybe<number> }, shows: { totalCount?: Maybe<number> } };

export type ScreenChannelsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  organization?: Maybe<Scalars['ID']>;
}>;


export type ScreenChannelsQuery = { channels: { totalCount?: Maybe<number>, pageInfo: PageInfoFragment, edges: Array<Maybe<{ cursor: string, node?: Maybe<ChannelListItemFragment> }>> } };

export type ShowPreviewQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ShowPreviewQuery = { show?: Maybe<{ id: string, slides: Array<{ renderedHtml: string, duration: number }> }> };

export type ShowFiltersChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowFiltersChannelsQuery = { channels: { totalCount?: Maybe<number>, edges: Array<Maybe<{ cursor: string, node?: Maybe<{ id: string, name: string }> }>> } };

export type ApiMediaSearchQueryVariables = Exact<{
  source: SourceType;
  query: Scalars['String'];
}>;


export type ApiMediaSearchQuery = { apiMediaSearch?: Maybe<any> };

export type AppConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type AppConfigQuery = { appConfig: { version: string, googleClientId: string, dropboxClientId: string } };

export type CreateChannelMutationVariables = Exact<{
  input: ChannelCreateMutationInput;
}>;


export type CreateChannelMutation = { createChannel: { errors?: Maybe<Array<ErrorFragment>>, channel?: Maybe<{ id: string }> } };

export type DeleteChannelMutationVariables = Exact<{
  input: DeleteChannelMutationInput;
}>;


export type DeleteChannelMutation = { deleteChannel: { errors?: Maybe<Array<ErrorFragment>> } };

export type DuplicateChannelMutationVariables = Exact<{
  input: DuplicateChannelMutationInput;
}>;


export type DuplicateChannelMutation = { duplicateChannel: { errors?: Maybe<Array<ErrorFragment>>, channel?: Maybe<{ id: string }> } };

export type DuplicatePublicChannelMutationVariables = Exact<{
  input: DuplicatePublicChannelMutationInput;
}>;


export type DuplicatePublicChannelMutation = { duplicatePublicChannel: { errors?: Maybe<Array<ErrorFragment>>, channel?: Maybe<{ id: string }> } };

export type PublishChannelMutationVariables = Exact<{
  input: ChannelPublishMutationInput;
}>;


export type PublishChannelMutation = { publishChannel: { errors?: Maybe<Array<ErrorFragment>>, channel?: Maybe<ChannelFragment> } };

export type UpdateChannelMutationVariables = Exact<{
  input: ChannelUpdateMutationInput;
}>;


export type UpdateChannelMutation = { updateChannel: { errors?: Maybe<Array<ErrorFragment>>, channel?: Maybe<{ id: string, shows: Array<{ id: string, show: { id: string } }> }> } };

export type CreateLayoutMutationVariables = Exact<{
  input: LayoutCreateMutationInput;
}>;


export type CreateLayoutMutation = { createLayout: { errors?: Maybe<Array<ErrorFragment>>, layout?: Maybe<{ id: string, category: string, name: string, data?: Maybe<any> }> } };

export type DeleteLayoutMutationVariables = Exact<{
  input: LayoutDeleteMutationInput;
}>;


export type DeleteLayoutMutation = { deleteLayout: { errors?: Maybe<Array<ErrorFragment>>, layout?: Maybe<{ id: string }> } };

export type MediaLibraryImageFragment = { id: string, image: string, fileName: string, slides: number, imageType: MediaLibraryImageImageType };

export type CreateMediaLibraryImageMutationVariables = Exact<{
  input: MediaLibraryImageCreateInput;
}>;


export type CreateMediaLibraryImageMutation = { createMediaLibraryImage?: Maybe<{ mediaLibraryImage?: Maybe<MediaLibraryImageFragment> }> };

export type CreatePublicImageMutationVariables = Exact<{
  input: PublicImageCreateMutationInput;
}>;


export type CreatePublicImageMutation = { createPublicImage?: Maybe<{ publicImage?: Maybe<{ image: string }> }> };

export type DeleteMediaLibraryImageMutationVariables = Exact<{
  input: MediaLibraryImageDeleteMutationInput;
}>;


export type DeleteMediaLibraryImageMutation = { deleteMediaLibraryImage: { errors?: Maybe<Array<ErrorFragment>> } };

export type MediaLibraryImageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MediaLibraryImageQuery = { mediaLibraryImage?: Maybe<MediaLibraryImageFragment> };

export type MediaLibraryImagesQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
}>;


export type MediaLibraryImagesQuery = { mediaLibraryImages: { totalCount?: Maybe<number>, pageInfo: PageInfoFragment, edges: Array<Maybe<{ cursor: string, node?: Maybe<MediaLibraryImageFragment> }>> } };

export type CreateOpenShowMutationVariables = Exact<{
  input: OpenShowCreateMutationInput;
}>;


export type CreateOpenShowMutation = { createOpenShow: { errors?: Maybe<Array<ErrorFragment>>, openShow?: Maybe<{ id: string }> } };

export type CreateOpenShowSlideMutationVariables = Exact<{
  input: OpenShowSlideCreateMutationInput;
}>;


export type CreateOpenShowSlideMutation = { createOpenShowSlide: { errors?: Maybe<Array<ErrorFragment>>, openShowSlide?: Maybe<{ id: string, duration: number, data?: Maybe<any>, templateId: string, templateName: string, templateHtml: string, templateSchema: any }> } };

export type DeleteOpenShowSlideMutationVariables = Exact<{
  input: OpenShowSlideDeleteMutationInput;
}>;


export type DeleteOpenShowSlideMutation = { deleteOpenShowSlide: { errors?: Maybe<Array<ErrorFragment>>, openShowSlide?: Maybe<{ id: string }> } };

export type DuplicateOpenShowSlideMutationVariables = Exact<{
  input: OpenShowSlideDuplicateMutationInput;
}>;


export type DuplicateOpenShowSlideMutation = { duplicateOpenShowSlide: { errors?: Maybe<Array<ErrorFragment>>, openShowSlide?: Maybe<{ id: string, duration: number, data?: Maybe<any>, templateId: string, templateName: string, templateHtml: string, templateSchema: any }> } };

export type OrderOpenShowSlidesMutationVariables = Exact<{
  input: OpenShowSlidesOrderMutationInput;
}>;


export type OrderOpenShowSlidesMutation = { orderOpenShowSlides: { openShow?: Maybe<{ id: string }> } };

export type UpdateOpenShowSlideMutationVariables = Exact<{
  input: OpenShowSlideUpdateMutationInput;
}>;


export type UpdateOpenShowSlideMutation = { updateOpenShowSlide: { errors?: Maybe<Array<ErrorFragment>>, openShowSlide?: Maybe<{ id: string }> } };

export type ActiveOrganizationFragment = { id: string, name: string, avatar: string, registeredCredentials: Array<{ credentialType: ExternalCredentialCredentialType, integrationUser: string }>, users: Array<OrganizationUserFragment>, pendingInvitations: Array<PendingInvitationFragment> };

export type OrganizationFragment = { id: string, name: string, avatar: string };

export type PendingInvitationFragment = { id: string, emailTo: string };

export type OrganizationPermissionFragment = { id: string, groupType: OrganizationXGroupGroupType, permissions: Array<string> };

export type OrganizationUserFragment = { id: string, name: string, avatar: string, email: string, organizationPermission?: Maybe<OrganizationPermissionFragment> };

export type CreateOrganizationMutationVariables = Exact<{
  input: OrganizationCreateMutationInput;
}>;


export type CreateOrganizationMutation = { createOrganization: { errors?: Maybe<Array<ErrorFragment>>, organization?: Maybe<OrganizationFragment> } };

export type DeleteExternalCredentialsMutationVariables = Exact<{
  input: DeleteExternalCredentialsInput;
}>;


export type DeleteExternalCredentialsMutation = { deleteExternalCredentials: { errors?: Maybe<Array<ErrorFragment>> } };

export type RegisterExternalCredentialsMutationVariables = Exact<{
  input: RegisterExternalCredentialsInput;
}>;


export type RegisterExternalCredentialsMutation = { registerExternalCredentials: { errors?: Maybe<Array<ErrorFragment>> } };

export type RemoveUserFromOrganizationMutationVariables = Exact<{
  input: RemoveUserFromOrganizationInput;
}>;


export type RemoveUserFromOrganizationMutation = { removeUserFromOrganization: { message?: Maybe<string>, errors?: Maybe<Array<ErrorFragment>> } };

export type UpdateOrganizationMutationVariables = Exact<{
  input: OrganizationUpdateMutationInput;
}>;


export type UpdateOrganizationMutation = { updateOrganization: { errors?: Maybe<Array<ErrorFragment>>, organization?: Maybe<OrganizationFragment> } };

export type UpdateOrganizationAvatarMutationVariables = Exact<{
  input: OrganizationAvatarUpdateInput;
}>;


export type UpdateOrganizationAvatarMutation = { updateOrganizationAvatar?: Maybe<{ errors?: Maybe<Array<ErrorFragment>> }> };

export type AddScreenMutationVariables = Exact<{
  input: ScreenAddMutationInput;
}>;


export type AddScreenMutation = { addScreen: { errors?: Maybe<Array<ErrorFragment>>, screen?: Maybe<ScreenFragment> } };

export type ScreenFragment = { id: string, name: string, rotation: ScreenRotation, overscanEnabled: boolean, deviceType: ScreenDeviceType, isScreenInfoVisible: boolean, organization?: Maybe<{ id: string }> };

export type DeleteScreenMutationVariables = Exact<{
  input: DeleteScreenMutationInput;
}>;


export type DeleteScreenMutation = { deleteScreen: { errors?: Maybe<Array<ErrorFragment>>, screen?: Maybe<{ id: string }> } };

export type ScreenChangeChannelMutationVariables = Exact<{
  input: ScreenChangeChannelMutationInput;
}>;


export type ScreenChangeChannelMutation = { changeChannel: { errors?: Maybe<Array<ErrorFragment>>, screen?: Maybe<{ id: string, name: string, subscribedChannel?: Maybe<{ id: string, name: string, emojiCode: string, shows: Array<{ show: ScreenChannelShowFragment }> }>, subscribedShow?: Maybe<ScreenChannelShowFragment> }> } };

export type ScreenChangeShowMutationVariables = Exact<{
  input: ScreenChangeShowMutationInput;
}>;


export type ScreenChangeShowMutation = { changeShow: { errors?: Maybe<Array<ErrorFragment>>, screen?: Maybe<{ id: string, name: string, subscribedChannel?: Maybe<{ id: string, name: string, emojiCode: string, shows: Array<{ show: ScreenChannelShowFragment }> }>, subscribedShow?: Maybe<ScreenChannelShowFragment> }> } };

export type SendPusherMessageMutationVariables = Exact<{
  input: SendPusherMessageMutationInput;
}>;


export type SendPusherMessageMutation = { sendPusherMessage: { __typename: 'SendPusherMessageMutationPayload' } };

export type UpdateScreenMutationVariables = Exact<{
  input: ScreenUpdateMutationInput;
}>;


export type UpdateScreenMutation = { updateScreen: { errors?: Maybe<Array<ErrorFragment>>, screen?: Maybe<{ id: string, name: string, rotation: ScreenRotation, isScreenInfoVisible: boolean }> } };

export type ErrorFragment = { field?: Maybe<string>, message?: Maybe<string> };

export type PageInfoFragment = { hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: Maybe<string>, endCursor?: Maybe<string> };

export type ChannelDropdownQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type ChannelDropdownQuery = { channels: { totalCount?: Maybe<number>, pageInfo: PageInfoFragment, edges: Array<Maybe<{ cursor: string, node?: Maybe<ChannelDropdownItemFragment> }>> } };

export type ChannelDropdownItemFragment = { id: string, name: string, emojiCode: string, shows: Array<{ id: string, show: { id: string } }> };

export type ScreenDropdownQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type ScreenDropdownQuery = { screens: { totalCount?: Maybe<number>, pageInfo: PageInfoFragment, edges: Array<Maybe<{ cursor: string, node?: Maybe<ScreenDropdownItemFragment> }>> } };

export type ScreenDropdownItemFragment = { id: string, name: string, subscribedShow?: Maybe<{ id: string }> };

export type ShowDropdownQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type ShowDropdownQuery = { shows: { totalCount?: Maybe<number>, pageInfo: PageInfoFragment, edges: Array<Maybe<{ cursor: string, node?: Maybe<ShowDropdownItemFragment> }>> } };

export type ShowDropdownItemFragment = { id: string, name: string };

export type CreateShowMutationVariables = Exact<{
  input: ShowCreateMutationInput;
}>;


export type CreateShowMutation = { createShow: { errors?: Maybe<Array<ErrorFragment>>, show?: Maybe<{ id: string }> } };

export type CreateShowSlideMutationVariables = Exact<{
  input: ShowSlideCreateMutationInput;
}>;


export type CreateShowSlideMutation = { createShowSlide: { errors?: Maybe<Array<ErrorFragment>>, showSlide?: Maybe<{ id: string, duration: number, data?: Maybe<any>, templateId: string, templateName: string, templateHtml: string, templateSchema: any }> } };

export type DeleteShowMutationVariables = Exact<{
  input: DeleteShowMutationInput;
}>;


export type DeleteShowMutation = { deleteShow: { errors?: Maybe<Array<ErrorFragment>>, show?: Maybe<{ id: string, name: string }> } };

export type DeleteShowSlideMutationVariables = Exact<{
  input: DeleteShowSlideMutationInput;
}>;


export type DeleteShowSlideMutation = { deleteShowSlide: { errors?: Maybe<Array<ErrorFragment>>, showSlide?: Maybe<{ id: string }> } };

export type DuplicatePublicShowMutationVariables = Exact<{
  input: DuplicatePublicShowMutationInput;
}>;


export type DuplicatePublicShowMutation = { duplicatePublicShow: { errors?: Maybe<Array<ErrorFragment>>, show?: Maybe<{ id: string }> } };

export type DuplicateShowMutationVariables = Exact<{
  input: DuplicateShowMutationInput;
}>;


export type DuplicateShowMutation = { duplicateShow: { errors?: Maybe<Array<ErrorFragment>>, show?: Maybe<{ id: string, name: string, duration: number, previewImage: string, previewImageState: string }> } };

export type DuplicateShowSlideMutationVariables = Exact<{
  input: DuplicateShowSlideMutationInput;
}>;


export type DuplicateShowSlideMutation = { duplicateShowSlide: { errors?: Maybe<Array<ErrorFragment>>, showSlide?: Maybe<{ id: string, duration: number, data?: Maybe<any>, templateId: string, templateName: string, templateHtml: string, templateSchema: any }> } };

export type OrderShowSlidesMutationVariables = Exact<{
  input: OrderShowSlidesMutationInput;
}>;


export type OrderShowSlidesMutation = { orderShowSlides: { show?: Maybe<{ id: string }> } };

export type UpdateShowMutationVariables = Exact<{
  input: ShowUpdateMutationInput;
}>;


export type UpdateShowMutation = { updateShow: { errors?: Maybe<Array<ErrorFragment>>, show?: Maybe<{ id: string, name: string, isPublic: boolean, publicId: string, channels: Array<{ id: string }> }> } };

export type UpdateShowSlideMutationVariables = Exact<{
  input: ShowSlideUpdateMutationInput;
}>;


export type UpdateShowSlideMutation = { updateShowSlide: { errors?: Maybe<Array<ErrorFragment>>, showSlide?: Maybe<{ id: string }> } };

export type SlidePreviewImageSubscriptionVariables = Exact<{
  input: ShowSlideSubscriptionsInput;
}>;


export type SlidePreviewImageSubscription = { slidePreviewImage?: Maybe<{ id: string, previewImage: string, previewImageState: ShowSlidePreviewImageState, show: { id: string, previewImage: string, previewImageState: string } }> };

export type ActivationKeyFragment = { activationKey: any, id: string, user: UserInfoFragment };

export type ActiveOrganizationInfoFragment = { id: string, groupType: OrganizationXGroupGroupType, permissions: Array<string>, organization: ActiveOrganizationFragment };

export type UserInfoFragment = { id: string, email: string, name: string, avatar: string, dateJoined: any, acceptTermsAndConditions?: Maybe<boolean>, acceptTermsAndConditionsUpdatedAt?: Maybe<any>, newsletterOptIn?: Maybe<boolean>, newsletterOptInUpdatedAt?: Maybe<any>, permissions?: Maybe<Array<Maybe<string>>>, activeOrganization?: Maybe<ActiveOrganizationInfoFragment> };

export type AuthMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthMutation = { tokenAuth: { token: string } };

export type CancelInviteUserMutationVariables = Exact<{
  input: CancelInviteUserInput;
}>;


export type CancelInviteUserMutation = { cancelInviteUser: { errors?: Maybe<Array<ErrorFragment>> } };

export type ChangeActiveOrganizationMutationVariables = Exact<{
  input: ChangeActiveOrganizationInput;
}>;


export type ChangeActiveOrganizationMutation = { changeActiveOrganization: { errors?: Maybe<Array<ErrorFragment>> } };

export type ChangeOrganizationMemberRoleMutationVariables = Exact<{
  input: ChangeOrganizationMemberRoleInput;
}>;


export type ChangeOrganizationMemberRoleMutation = { changeOrganizationMemberRole: { errors?: Maybe<Array<ErrorFragment>>, organization?: Maybe<OrganizationFragment> } };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { changePassword: { message?: Maybe<string>, errors?: Maybe<Array<ErrorFragment>> } };

export type InviteUserMutationVariables = Exact<{
  input: InviteUserInput;
}>;


export type InviteUserMutation = { inviteUser: { message?: Maybe<string> } };

export type UserJoinOrganizationMutationVariables = Exact<{
  input: UserJoinOrganizationInput;
}>;


export type UserJoinOrganizationMutation = { userJoinOrganization: { message?: Maybe<string> } };

export type UserLeaveOrganizationMutationVariables = Exact<{
  input: UserLeaveOrganizationInput;
}>;


export type UserLeaveOrganizationMutation = { userLeaveOrganization: { user?: Maybe<UserInfoFragment> } };

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type RefreshTokenMutation = { refreshToken: { token: string, payload: any } };

export type RegisterMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterMutation = { registerUser: { message?: Maybe<string>, errors?: Maybe<Array<{ field?: Maybe<string>, message?: Maybe<string> }>> } };

export type ResetPasswordMutationVariables = Exact<{
  input: RequestPasswordResetInput;
}>;


export type ResetPasswordMutation = { requestPasswordReset: { message?: Maybe<string>, errors?: Maybe<Array<ErrorFragment>> } };

export type SocialAuthMutationVariables = Exact<{
  accessToken: Scalars['String'];
  provider: Scalars['String'];
}>;


export type SocialAuthMutation = { socialAuth: { token?: Maybe<string>, social?: Maybe<{ id: string, user: { id: string, dateJoined: any } }> } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { updateUser: { user?: Maybe<UserInfoFragment> } };

export type UserAvatarUploadMutationVariables = Exact<{
  input: UserAvatarUploadInput;
}>;


export type UserAvatarUploadMutation = { userAvatarUpload: { user?: Maybe<UserInfoFragment>, errors?: Maybe<Array<ErrorFragment>> } };

export type VerifyPasswordResetMutationVariables = Exact<{
  input: VerifyPasswordResetKeyInput;
}>;


export type VerifyPasswordResetMutation = { verifyPasswordResetKey: { message?: Maybe<string>, errors?: Maybe<Array<ErrorFragment>> } };

export type VerifyTokenMutationVariables = Exact<{
  input: VerifyInput;
}>;


export type VerifyTokenMutation = { verifyToken: { payload: any } };

export type VerifyUserEmailMutationVariables = Exact<{
  input: VerifyUserEmailInput;
}>;


export type VerifyUserEmailMutation = { verifyUserEmail: { activationKey?: Maybe<ActivationKeyFragment> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: MeFragment };

export type MeFragment = { info: UserInfoFragment, organizations: { edges: Array<Maybe<{ node?: Maybe<OrganizationInfoFragment> }>> } };

export type OrganizationInfoFragment = { id: string, organization: OrganizationFragment };

export type VerifyInvitationKeyQueryVariables = Exact<{
  invitationKey: Scalars['String'];
}>;


export type VerifyInvitationKeyQuery = { verifyInvitationKey: { invitationKey: any, organization: { name: string, avatar: string }, sender: { name: string } } };

export type ShowingOnScreensListQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowingOnScreensListQuery = { screens: { totalCount?: Maybe<number>, pageInfo: PageInfoFragment, edges: Array<Maybe<{ cursor: string, node?: Maybe<ShowingOnScreensListItemFragment> }>> } };

export type ShowingOnScreensListItemFragment = { id: string, name: string, subscribedChannel?: Maybe<{ id: string, name: string }> };

export type AddShowViewToChannelQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orderby?: Maybe<Array<Maybe<Scalars['String']>>>;
  channelIds?: Maybe<Array<Scalars['ID']>>;
  onScreen?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  createdBy?: Maybe<Scalars['ID']>;
  updatedBy?: Maybe<Scalars['ID']>;
}>;


export type AddShowViewToChannelQuery = { shows: { totalCount?: Maybe<number>, pageInfo: PageInfoFragment, edges: Array<Maybe<{ cursor: string, node?: Maybe<AddShowToChannelListItemFragment> }>> } };

export type AddShowToChannelListItemFragment = { id: string, name: string, duration: number, previewImage: string, previewImageState: string };

export type ChannelQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ChannelQuery = { channel?: Maybe<ChannelFragment> };

export type ChannelFragment = { id: string, name: string, isPublic: boolean, publicId: string, emojiBackgroundColor: string, emojiCode: string, totalDuration: number, shows: Array<{ show: ChannelShowFragment }> };

export type ChannelShowFragment = { id: string, name: string, duration: number, previewImage: string, previewImageState: string };

export type ChannelPreviewQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ChannelPreviewQuery = { channel?: Maybe<{ id: string, shows: Array<{ show: { id: string, slides: Array<{ renderedHtml: string, duration: number }> } }> }> };

export type ChannelsListQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type ChannelsListQuery = { channels: { totalCount?: Maybe<number>, pageInfo: PageInfoFragment, edges: Array<Maybe<{ cursor: string, node?: Maybe<ChannelListItemFragment> }>> } };

export type ChannelListItemFragment = { id: string, name: string, emojiBackgroundColor: string, emojiCode: string, totalDuration: number, shows: Array<{ show: ChannelListItemShowFragment }> };

export type ChannelListItemShowFragment = { id: string, name: string, duration: number, previewImage: string, previewImageState: string };

export type DuplicateOpenShowMutationVariables = Exact<{
  input: OpenShowDuplicateMutationInput;
}>;


export type DuplicateOpenShowMutation = { duplicateOpenShow: { openShow?: Maybe<{ id: string, name: string, slides: Array<{ id: string }> }> } };

export type OpenShowHtmlQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OpenShowHtmlQuery = { show?: Maybe<{ id: string, name: string, isEditable: boolean, slides: Array<{ renderedHtml: string }> }> };

export type OpenShowDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OpenShowDetailsQuery = { openShow?: Maybe<OpenShowDetailsFragment> };

export type OpenShowDetailsFragment = { id: string, name: string, isEditable: boolean, slides: Array<OpenShowDetailsSlideFragment> };

export type OpenShowDetailsSlideFragment = { id: string, data?: Maybe<any>, duration: number, templateId: string, templateName: string, templateSchema: any, templateHtml: string };

export type PublicChannelQueryVariables = Exact<{
  publicId: Scalars['String'];
}>;


export type PublicChannelQuery = { channelPublic?: Maybe<ChannelPublicFragment> };

export type ChannelPublicFragment = { id: string, name: string, publicId: string, publicViewCount: number, shows: Array<{ show: { id: string, slides: Array<{ renderedHtml: string, duration: number }> } }>, createdBy: { name: string, avatar: string }, organization: { name: string, avatar: string } };

export type PublicShowQueryVariables = Exact<{
  publicId: Scalars['String'];
}>;


export type PublicShowQuery = { showPublic?: Maybe<ShowPublicFragment> };

export type ShowPublicFragment = { id: string, name: string, publicId: string, publicViewCount: number, slides: Array<{ renderedHtml: string, duration: number }>, createdBy: { name: string, avatar: string }, organization: { name: string, avatar: string } };

export type ScreensListQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type ScreensListQuery = { screens: { totalCount?: Maybe<number>, pageInfo: PageInfoFragment, edges: Array<Maybe<{ cursor: string, node?: Maybe<ScreenListItemFragment> }>> } };

export type ScreenListItemFragment = { id: string, name: string, isBlocked: boolean, rotation: ScreenRotation, overscanEnabled: boolean, isOnline: boolean, deviceType: ScreenDeviceType, isScreenInfoVisible: boolean, screensharing: boolean, subscribedChannel?: Maybe<{ id: string, name: string, emojiCode: string, shows: Array<{ show: ScreenChannelShowFragment }> }>, subscribedShow?: Maybe<ScreenChannelShowFragment> };

export type ScreenChannelShowFragment = { id: string, name: string, previewImage: string, previewImageVertical: string, previewImageState: string };

export type ScreenPreviewQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ScreenPreviewQuery = { screen?: Maybe<{ id: string, rotation: ScreenRotation, subscribedChannel?: Maybe<{ id: string, shows: Array<{ show: { id: string, slides: Array<{ renderedHtml: string, duration: number }> } }> }>, subscribedShow?: Maybe<{ id: string, slides: Array<{ renderedHtml: string, duration: number }> }> }> };

export type NetworkTransversalCredentialQueryVariables = Exact<{ [key: string]: never; }>;


export type NetworkTransversalCredentialQuery = { networkTransversalCredential?: Maybe<{ username?: Maybe<string>, dateUpdated?: Maybe<string>, accountSid?: Maybe<string>, ttl?: Maybe<string>, dateCreated?: Maybe<string>, password?: Maybe<string>, iceServers?: Maybe<Array<Maybe<{ username?: Maybe<string>, credential?: Maybe<string>, url?: Maybe<string>, urls?: Maybe<string> }>>> }> };

export type LayoutsQueryVariables = Exact<{
  templateId: Scalars['String'];
}>;


export type LayoutsQuery = { layouts?: Maybe<Array<Maybe<LayoutFragment>>> };

export type LayoutFragment = { id: string, name: string, category: string, data?: Maybe<any> };

export type YoutubeVideoQueryVariables = Exact<{
  url: Scalars['String'];
}>;


export type YoutubeVideoQuery = { youtubeVideo?: Maybe<{ duration?: Maybe<string> }> };

export type ShowDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ShowDetailsQuery = { show?: Maybe<ShowDetailsFragment> };

export type ShowDetailsFragment = { id: string, name: string, isPublic: boolean, publicId: string, updatedAt: any, createdAt: any, slides: Array<ShowDetailsSlideFragment> };

export type ShowDetailsSlideFragment = { id: string, data?: Maybe<any>, duration: number, templateId: string, templateName: string, templateSchema: any, templateHtml: string };

export type ShowHistoryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ShowHistoryQuery = { showHistory?: Maybe<Array<Maybe<{ createdAt: any, updatedAt: any, createdBy: { id: string, name: string, avatar: string }, updatedBy?: Maybe<{ id: string, name: string, avatar: string }> }>>> };

export type ShowEditorPreviewQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ShowEditorPreviewQuery = { show?: Maybe<{ id: string, slides: Array<{ renderedHtml: string, duration: number }> }> };

export type SlideTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type SlideTemplatesQuery = { slideTemplates: Array<SlideTemplateFragment> };

export type SlideTemplateFragment = { id: string, name: string, cover: string, previewUrl: string };

export type ShowHtmlQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ShowHtmlQuery = { show?: Maybe<{ id: string, name: string, slides: Array<{ renderedHtml: string }> }> };

export type ShowsListQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orderby?: Maybe<Array<Maybe<Scalars['String']>>>;
  channelIds?: Maybe<Array<Scalars['ID']>>;
  onScreen?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  createdBy?: Maybe<Scalars['ID']>;
  updatedBy?: Maybe<Scalars['ID']>;
}>;


export type ShowsListQuery = { shows: { totalCount?: Maybe<number>, pageInfo: PageInfoFragment, edges: Array<Maybe<{ cursor: string, node?: Maybe<ShowListItemFragment> }>> } };

export type ShowListItemFragment = { id: string, name: string, duration: number, previewImage: string, previewImageState: string };

export const MediaLibraryImageFragmentDoc = gql`
    fragment MediaLibraryImage on MediaLibraryImageNode {
  id
  image
  fileName
  slides
  imageType
}
    `;
export const ScreenFragmentDoc = gql`
    fragment Screen on ScreenNode {
  id
  name
  rotation
  overscanEnabled
  deviceType
  isScreenInfoVisible
  organization {
    id
  }
}
    `;
export const ErrorFragmentDoc = gql`
    fragment Error on MutationErrorType {
  field
  message
}
    `;
export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  hasNextPage
  hasPreviousPage
  startCursor
  endCursor
}
    `;
export const ChannelDropdownItemFragmentDoc = gql`
    fragment ChannelDropdownItem on ChannelNode {
  id
  name
  emojiCode
  shows {
    id
    show {
      id
    }
  }
}
    `;
export const ScreenDropdownItemFragmentDoc = gql`
    fragment ScreenDropdownItem on ScreenNode {
  id
  name
  subscribedShow {
    id
  }
}
    `;
export const ShowDropdownItemFragmentDoc = gql`
    fragment ShowDropdownItem on ShowNode {
  id
  name
}
    `;
export const OrganizationPermissionFragmentDoc = gql`
    fragment OrganizationPermission on OrganizationXGroupNode {
  id
  groupType
  permissions
}
    `;
export const OrganizationUserFragmentDoc = gql`
    fragment OrganizationUser on OrganizationUserNode {
  id
  name
  avatar
  email
  organizationPermission {
    ...OrganizationPermission
  }
}
    ${OrganizationPermissionFragmentDoc}`;
export const PendingInvitationFragmentDoc = gql`
    fragment PendingInvitation on PendingInvitationsNode {
  id
  emailTo
}
    `;
export const ActiveOrganizationFragmentDoc = gql`
    fragment ActiveOrganization on OrganizationNode {
  id
  name
  avatar
  registeredCredentials {
    credentialType
    integrationUser
  }
  users {
    ...OrganizationUser
  }
  pendingInvitations {
    ...PendingInvitation
  }
}
    ${OrganizationUserFragmentDoc}
${PendingInvitationFragmentDoc}`;
export const ActiveOrganizationInfoFragmentDoc = gql`
    fragment ActiveOrganizationInfo on OrganizationXGroupNode {
  id
  organization {
    ...ActiveOrganization
  }
  groupType
  permissions
}
    ${ActiveOrganizationFragmentDoc}`;
export const UserInfoFragmentDoc = gql`
    fragment UserInfo on UserNode {
  id
  email
  name
  avatar
  dateJoined
  acceptTermsAndConditions
  acceptTermsAndConditionsUpdatedAt
  newsletterOptIn
  newsletterOptInUpdatedAt
  permissions
  activeOrganization {
    ...ActiveOrganizationInfo
  }
}
    ${ActiveOrganizationInfoFragmentDoc}`;
export const ActivationKeyFragmentDoc = gql`
    fragment ActivationKey on ActivationKeyNode {
  user {
    ...UserInfo
  }
  activationKey
  id
}
    ${UserInfoFragmentDoc}`;
export const OrganizationFragmentDoc = gql`
    fragment Organization on OrganizationNode {
  id
  name
  avatar
}
    `;
export const OrganizationInfoFragmentDoc = gql`
    fragment OrganizationInfo on OrganizationXGroupNode {
  id
  organization {
    ...Organization
  }
}
    ${OrganizationFragmentDoc}`;
export const MeFragmentDoc = gql`
    fragment Me on UserNodeDetails {
  info {
    ...UserInfo
  }
  organizations {
    edges {
      node {
        ...OrganizationInfo
      }
    }
  }
}
    ${UserInfoFragmentDoc}
${OrganizationInfoFragmentDoc}`;
export const ShowingOnScreensListItemFragmentDoc = gql`
    fragment ShowingOnScreensListItem on ScreenNode {
  id
  name
  subscribedChannel {
    id
    name
  }
}
    `;
export const AddShowToChannelListItemFragmentDoc = gql`
    fragment AddShowToChannelListItem on ShowNode {
  id
  name
  duration
  previewImage
  previewImageState
}
    `;
export const ChannelShowFragmentDoc = gql`
    fragment ChannelShow on ShowNode {
  id
  name
  duration
  previewImage
  previewImageState
}
    `;
export const ChannelFragmentDoc = gql`
    fragment Channel on ChannelNode {
  id
  name
  isPublic
  publicId
  emojiBackgroundColor
  emojiCode
  totalDuration
  shows {
    show {
      ...ChannelShow
    }
  }
}
    ${ChannelShowFragmentDoc}`;
export const ChannelListItemShowFragmentDoc = gql`
    fragment ChannelListItemShow on ShowNode {
  id
  name
  duration
  previewImage
  previewImageState
}
    `;
export const ChannelListItemFragmentDoc = gql`
    fragment ChannelListItem on ChannelNode {
  id
  name
  emojiBackgroundColor
  emojiCode
  totalDuration
  shows {
    show {
      ...ChannelListItemShow
    }
  }
}
    ${ChannelListItemShowFragmentDoc}`;
export const OpenShowDetailsSlideFragmentDoc = gql`
    fragment OpenShowDetailsSlide on OpenShowSlideNode {
  id
  data
  duration
  templateId
  templateName
  templateSchema
  templateHtml
}
    `;
export const OpenShowDetailsFragmentDoc = gql`
    fragment OpenShowDetails on OpenShowNode {
  id
  name
  isEditable
  slides {
    ...OpenShowDetailsSlide
  }
}
    ${OpenShowDetailsSlideFragmentDoc}`;
export const ChannelPublicFragmentDoc = gql`
    fragment ChannelPublic on ChannelPublicNode {
  id
  name
  publicId
  publicViewCount
  shows {
    show {
      id
      slides {
        renderedHtml
        duration
      }
    }
  }
  createdBy {
    name
    avatar
  }
  organization {
    name
    avatar
  }
}
    `;
export const ShowPublicFragmentDoc = gql`
    fragment ShowPublic on ShowPublicNode {
  id
  name
  publicId
  publicViewCount
  slides {
    renderedHtml
    duration
  }
  createdBy {
    name
    avatar
  }
  organization {
    name
    avatar
  }
}
    `;
export const ScreenChannelShowFragmentDoc = gql`
    fragment ScreenChannelShow on ShowNode {
  id
  name
  previewImage
  previewImageVertical
  previewImageState
}
    `;
export const ScreenListItemFragmentDoc = gql`
    fragment ScreenListItem on ScreenNode {
  id
  name
  isBlocked
  rotation
  overscanEnabled
  isOnline
  deviceType
  isScreenInfoVisible
  subscribedChannel {
    id
    name
    emojiCode
    shows {
      show {
        ...ScreenChannelShow
      }
    }
  }
  subscribedShow {
    ...ScreenChannelShow
  }
  screensharing
}
    ${ScreenChannelShowFragmentDoc}`;
export const LayoutFragmentDoc = gql`
    fragment Layout on LayoutNode {
  id
  name
  category
  data
}
    `;
export const ShowDetailsSlideFragmentDoc = gql`
    fragment ShowDetailsSlide on ShowSlideNode {
  id
  data
  duration
  templateId
  templateName
  templateSchema
  templateHtml
}
    `;
export const ShowDetailsFragmentDoc = gql`
    fragment ShowDetails on ShowNode {
  id
  name
  isPublic
  publicId
  updatedAt
  createdAt
  slides {
    ...ShowDetailsSlide
  }
}
    ${ShowDetailsSlideFragmentDoc}`;
export const SlideTemplateFragmentDoc = gql`
    fragment SlideTemplate on SlideTemplateListNode {
  id
  name
  cover
  previewUrl
}
    `;
export const ShowListItemFragmentDoc = gql`
    fragment ShowListItem on ShowNode {
  id
  name
  duration
  previewImage
  previewImageState
}
    `;
export const AnalyticsDocument = gql`
    query analytics {
  screens {
    totalCount
  }
  channels {
    totalCount
  }
  shows {
    totalCount
  }
}
    `;
export function useAnalyticsQuery(baseOptions?: Apollo.QueryHookOptions<AnalyticsQuery, AnalyticsQueryVariables>) {
        return Apollo.useQuery<AnalyticsQuery, AnalyticsQueryVariables>(AnalyticsDocument, baseOptions);
      }
export function useAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnalyticsQuery, AnalyticsQueryVariables>) {
          return Apollo.useLazyQuery<AnalyticsQuery, AnalyticsQueryVariables>(AnalyticsDocument, baseOptions);
        }
export type AnalyticsQueryHookResult = ReturnType<typeof useAnalyticsQuery>;
export type AnalyticsLazyQueryHookResult = ReturnType<typeof useAnalyticsLazyQuery>;
export const ScreenChannelsDocument = gql`
    query screenChannels($first: Int, $after: String, $organization: ID) {
  channels(first: $first, after: $after, organization: $organization) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...ChannelListItem
      }
      cursor
    }
    totalCount
  }
}
    ${PageInfoFragmentDoc}
${ChannelListItemFragmentDoc}`;
export function useScreenChannelsQuery(baseOptions?: Apollo.QueryHookOptions<ScreenChannelsQuery, ScreenChannelsQueryVariables>) {
        return Apollo.useQuery<ScreenChannelsQuery, ScreenChannelsQueryVariables>(ScreenChannelsDocument, baseOptions);
      }
export function useScreenChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScreenChannelsQuery, ScreenChannelsQueryVariables>) {
          return Apollo.useLazyQuery<ScreenChannelsQuery, ScreenChannelsQueryVariables>(ScreenChannelsDocument, baseOptions);
        }
export type ScreenChannelsQueryHookResult = ReturnType<typeof useScreenChannelsQuery>;
export type ScreenChannelsLazyQueryHookResult = ReturnType<typeof useScreenChannelsLazyQuery>;
export const ShowPreviewDocument = gql`
    query showPreview($id: ID!) {
  show(id: $id) {
    id
    slides {
      renderedHtml
      duration
    }
  }
}
    `;
export function useShowPreviewQuery(baseOptions: Apollo.QueryHookOptions<ShowPreviewQuery, ShowPreviewQueryVariables>) {
        return Apollo.useQuery<ShowPreviewQuery, ShowPreviewQueryVariables>(ShowPreviewDocument, baseOptions);
      }
export function useShowPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowPreviewQuery, ShowPreviewQueryVariables>) {
          return Apollo.useLazyQuery<ShowPreviewQuery, ShowPreviewQueryVariables>(ShowPreviewDocument, baseOptions);
        }
export type ShowPreviewQueryHookResult = ReturnType<typeof useShowPreviewQuery>;
export type ShowPreviewLazyQueryHookResult = ReturnType<typeof useShowPreviewLazyQuery>;
export const ShowFiltersChannelsDocument = gql`
    query showFiltersChannels {
  channels {
    edges {
      node {
        id
        name
      }
      cursor
    }
    totalCount
  }
}
    `;
export function useShowFiltersChannelsQuery(baseOptions?: Apollo.QueryHookOptions<ShowFiltersChannelsQuery, ShowFiltersChannelsQueryVariables>) {
        return Apollo.useQuery<ShowFiltersChannelsQuery, ShowFiltersChannelsQueryVariables>(ShowFiltersChannelsDocument, baseOptions);
      }
export function useShowFiltersChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowFiltersChannelsQuery, ShowFiltersChannelsQueryVariables>) {
          return Apollo.useLazyQuery<ShowFiltersChannelsQuery, ShowFiltersChannelsQueryVariables>(ShowFiltersChannelsDocument, baseOptions);
        }
export type ShowFiltersChannelsQueryHookResult = ReturnType<typeof useShowFiltersChannelsQuery>;
export type ShowFiltersChannelsLazyQueryHookResult = ReturnType<typeof useShowFiltersChannelsLazyQuery>;
export const ApiMediaSearchDocument = gql`
    query apiMediaSearch($source: SourceType!, $query: String!) {
  apiMediaSearch(source: $source, query: $query)
}
    `;
export function useApiMediaSearchQuery(baseOptions: Apollo.QueryHookOptions<ApiMediaSearchQuery, ApiMediaSearchQueryVariables>) {
        return Apollo.useQuery<ApiMediaSearchQuery, ApiMediaSearchQueryVariables>(ApiMediaSearchDocument, baseOptions);
      }
export function useApiMediaSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApiMediaSearchQuery, ApiMediaSearchQueryVariables>) {
          return Apollo.useLazyQuery<ApiMediaSearchQuery, ApiMediaSearchQueryVariables>(ApiMediaSearchDocument, baseOptions);
        }
export type ApiMediaSearchQueryHookResult = ReturnType<typeof useApiMediaSearchQuery>;
export type ApiMediaSearchLazyQueryHookResult = ReturnType<typeof useApiMediaSearchLazyQuery>;
export const AppConfigDocument = gql`
    query appConfig {
  appConfig {
    version
    googleClientId
    dropboxClientId
  }
}
    `;
export function useAppConfigQuery(baseOptions?: Apollo.QueryHookOptions<AppConfigQuery, AppConfigQueryVariables>) {
        return Apollo.useQuery<AppConfigQuery, AppConfigQueryVariables>(AppConfigDocument, baseOptions);
      }
export function useAppConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppConfigQuery, AppConfigQueryVariables>) {
          return Apollo.useLazyQuery<AppConfigQuery, AppConfigQueryVariables>(AppConfigDocument, baseOptions);
        }
export type AppConfigQueryHookResult = ReturnType<typeof useAppConfigQuery>;
export type AppConfigLazyQueryHookResult = ReturnType<typeof useAppConfigLazyQuery>;
export const CreateChannelDocument = gql`
    mutation createChannel($input: ChannelCreateMutationInput!) {
  createChannel(input: $input) {
    errors {
      ...Error
    }
    channel {
      id
    }
  }
}
    ${ErrorFragmentDoc}`;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, baseOptions);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export const DeleteChannelDocument = gql`
    mutation deleteChannel($input: DeleteChannelMutationInput!) {
  deleteChannel(input: $input) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DeleteChannelMutationFn = Apollo.MutationFunction<DeleteChannelMutation, DeleteChannelMutationVariables>;
export function useDeleteChannelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChannelMutation, DeleteChannelMutationVariables>) {
        return Apollo.useMutation<DeleteChannelMutation, DeleteChannelMutationVariables>(DeleteChannelDocument, baseOptions);
      }
export type DeleteChannelMutationHookResult = ReturnType<typeof useDeleteChannelMutation>;
export const DuplicateChannelDocument = gql`
    mutation duplicateChannel($input: DuplicateChannelMutationInput!) {
  duplicateChannel(input: $input) {
    errors {
      ...Error
    }
    channel {
      id
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DuplicateChannelMutationFn = Apollo.MutationFunction<DuplicateChannelMutation, DuplicateChannelMutationVariables>;
export function useDuplicateChannelMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateChannelMutation, DuplicateChannelMutationVariables>) {
        return Apollo.useMutation<DuplicateChannelMutation, DuplicateChannelMutationVariables>(DuplicateChannelDocument, baseOptions);
      }
export type DuplicateChannelMutationHookResult = ReturnType<typeof useDuplicateChannelMutation>;
export const DuplicatePublicChannelDocument = gql`
    mutation duplicatePublicChannel($input: DuplicatePublicChannelMutationInput!) {
  duplicatePublicChannel(input: $input) {
    errors {
      ...Error
    }
    channel {
      id
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DuplicatePublicChannelMutationFn = Apollo.MutationFunction<DuplicatePublicChannelMutation, DuplicatePublicChannelMutationVariables>;
export function useDuplicatePublicChannelMutation(baseOptions?: Apollo.MutationHookOptions<DuplicatePublicChannelMutation, DuplicatePublicChannelMutationVariables>) {
        return Apollo.useMutation<DuplicatePublicChannelMutation, DuplicatePublicChannelMutationVariables>(DuplicatePublicChannelDocument, baseOptions);
      }
export type DuplicatePublicChannelMutationHookResult = ReturnType<typeof useDuplicatePublicChannelMutation>;
export const PublishChannelDocument = gql`
    mutation publishChannel($input: ChannelPublishMutationInput!) {
  publishChannel(input: $input) {
    errors {
      ...Error
    }
    channel {
      ...Channel
    }
  }
}
    ${ErrorFragmentDoc}
${ChannelFragmentDoc}`;
export type PublishChannelMutationFn = Apollo.MutationFunction<PublishChannelMutation, PublishChannelMutationVariables>;
export function usePublishChannelMutation(baseOptions?: Apollo.MutationHookOptions<PublishChannelMutation, PublishChannelMutationVariables>) {
        return Apollo.useMutation<PublishChannelMutation, PublishChannelMutationVariables>(PublishChannelDocument, baseOptions);
      }
export type PublishChannelMutationHookResult = ReturnType<typeof usePublishChannelMutation>;
export const UpdateChannelDocument = gql`
    mutation updateChannel($input: ChannelUpdateMutationInput!) {
  updateChannel(input: $input) {
    errors {
      ...Error
    }
    channel {
      id
      shows {
        id
        show {
          id
        }
      }
    }
  }
}
    ${ErrorFragmentDoc}`;
export type UpdateChannelMutationFn = Apollo.MutationFunction<UpdateChannelMutation, UpdateChannelMutationVariables>;
export function useUpdateChannelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChannelMutation, UpdateChannelMutationVariables>) {
        return Apollo.useMutation<UpdateChannelMutation, UpdateChannelMutationVariables>(UpdateChannelDocument, baseOptions);
      }
export type UpdateChannelMutationHookResult = ReturnType<typeof useUpdateChannelMutation>;
export const CreateLayoutDocument = gql`
    mutation createLayout($input: LayoutCreateMutationInput!) {
  createLayout(input: $input) {
    errors {
      ...Error
    }
    layout {
      id
      category
      name
      data
    }
  }
}
    ${ErrorFragmentDoc}`;
export type CreateLayoutMutationFn = Apollo.MutationFunction<CreateLayoutMutation, CreateLayoutMutationVariables>;
export function useCreateLayoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateLayoutMutation, CreateLayoutMutationVariables>) {
        return Apollo.useMutation<CreateLayoutMutation, CreateLayoutMutationVariables>(CreateLayoutDocument, baseOptions);
      }
export type CreateLayoutMutationHookResult = ReturnType<typeof useCreateLayoutMutation>;
export const DeleteLayoutDocument = gql`
    mutation deleteLayout($input: LayoutDeleteMutationInput!) {
  deleteLayout(input: $input) {
    errors {
      ...Error
    }
    layout {
      id
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DeleteLayoutMutationFn = Apollo.MutationFunction<DeleteLayoutMutation, DeleteLayoutMutationVariables>;
export function useDeleteLayoutMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLayoutMutation, DeleteLayoutMutationVariables>) {
        return Apollo.useMutation<DeleteLayoutMutation, DeleteLayoutMutationVariables>(DeleteLayoutDocument, baseOptions);
      }
export type DeleteLayoutMutationHookResult = ReturnType<typeof useDeleteLayoutMutation>;
export const CreateMediaLibraryImageDocument = gql`
    mutation createMediaLibraryImage($input: MediaLibraryImageCreateInput!) {
  createMediaLibraryImage(input: $input) {
    mediaLibraryImage {
      ...MediaLibraryImage
    }
  }
}
    ${MediaLibraryImageFragmentDoc}`;
export type CreateMediaLibraryImageMutationFn = Apollo.MutationFunction<CreateMediaLibraryImageMutation, CreateMediaLibraryImageMutationVariables>;
export function useCreateMediaLibraryImageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMediaLibraryImageMutation, CreateMediaLibraryImageMutationVariables>) {
        return Apollo.useMutation<CreateMediaLibraryImageMutation, CreateMediaLibraryImageMutationVariables>(CreateMediaLibraryImageDocument, baseOptions);
      }
export type CreateMediaLibraryImageMutationHookResult = ReturnType<typeof useCreateMediaLibraryImageMutation>;
export const CreatePublicImageDocument = gql`
    mutation createPublicImage($input: PublicImageCreateMutationInput!) {
  createPublicImage(input: $input) {
    publicImage {
      image
    }
  }
}
    `;
export type CreatePublicImageMutationFn = Apollo.MutationFunction<CreatePublicImageMutation, CreatePublicImageMutationVariables>;
export function useCreatePublicImageMutation(baseOptions?: Apollo.MutationHookOptions<CreatePublicImageMutation, CreatePublicImageMutationVariables>) {
        return Apollo.useMutation<CreatePublicImageMutation, CreatePublicImageMutationVariables>(CreatePublicImageDocument, baseOptions);
      }
export type CreatePublicImageMutationHookResult = ReturnType<typeof useCreatePublicImageMutation>;
export const DeleteMediaLibraryImageDocument = gql`
    mutation deleteMediaLibraryImage($input: MediaLibraryImageDeleteMutationInput!) {
  deleteMediaLibraryImage(input: $input) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DeleteMediaLibraryImageMutationFn = Apollo.MutationFunction<DeleteMediaLibraryImageMutation, DeleteMediaLibraryImageMutationVariables>;
export function useDeleteMediaLibraryImageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMediaLibraryImageMutation, DeleteMediaLibraryImageMutationVariables>) {
        return Apollo.useMutation<DeleteMediaLibraryImageMutation, DeleteMediaLibraryImageMutationVariables>(DeleteMediaLibraryImageDocument, baseOptions);
      }
export type DeleteMediaLibraryImageMutationHookResult = ReturnType<typeof useDeleteMediaLibraryImageMutation>;
export const MediaLibraryImageDocument = gql`
    query mediaLibraryImage($id: ID!) {
  mediaLibraryImage(id: $id) {
    ...MediaLibraryImage
  }
}
    ${MediaLibraryImageFragmentDoc}`;
export function useMediaLibraryImageQuery(baseOptions: Apollo.QueryHookOptions<MediaLibraryImageQuery, MediaLibraryImageQueryVariables>) {
        return Apollo.useQuery<MediaLibraryImageQuery, MediaLibraryImageQueryVariables>(MediaLibraryImageDocument, baseOptions);
      }
export function useMediaLibraryImageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MediaLibraryImageQuery, MediaLibraryImageQueryVariables>) {
          return Apollo.useLazyQuery<MediaLibraryImageQuery, MediaLibraryImageQueryVariables>(MediaLibraryImageDocument, baseOptions);
        }
export type MediaLibraryImageQueryHookResult = ReturnType<typeof useMediaLibraryImageQuery>;
export type MediaLibraryImageLazyQueryHookResult = ReturnType<typeof useMediaLibraryImageLazyQuery>;
export const MediaLibraryImagesDocument = gql`
    query mediaLibraryImages($first: Int, $after: String, $fileName: String) {
  mediaLibraryImages(first: $first, after: $after, fileName: $fileName) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...MediaLibraryImage
      }
      cursor
    }
    totalCount
  }
}
    ${PageInfoFragmentDoc}
${MediaLibraryImageFragmentDoc}`;
export function useMediaLibraryImagesQuery(baseOptions?: Apollo.QueryHookOptions<MediaLibraryImagesQuery, MediaLibraryImagesQueryVariables>) {
        return Apollo.useQuery<MediaLibraryImagesQuery, MediaLibraryImagesQueryVariables>(MediaLibraryImagesDocument, baseOptions);
      }
export function useMediaLibraryImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MediaLibraryImagesQuery, MediaLibraryImagesQueryVariables>) {
          return Apollo.useLazyQuery<MediaLibraryImagesQuery, MediaLibraryImagesQueryVariables>(MediaLibraryImagesDocument, baseOptions);
        }
export type MediaLibraryImagesQueryHookResult = ReturnType<typeof useMediaLibraryImagesQuery>;
export type MediaLibraryImagesLazyQueryHookResult = ReturnType<typeof useMediaLibraryImagesLazyQuery>;
export const CreateOpenShowDocument = gql`
    mutation createOpenShow($input: OpenShowCreateMutationInput!) {
  createOpenShow(input: $input) {
    errors {
      ...Error
    }
    openShow {
      id
    }
  }
}
    ${ErrorFragmentDoc}`;
export type CreateOpenShowMutationFn = Apollo.MutationFunction<CreateOpenShowMutation, CreateOpenShowMutationVariables>;
export function useCreateOpenShowMutation(baseOptions?: Apollo.MutationHookOptions<CreateOpenShowMutation, CreateOpenShowMutationVariables>) {
        return Apollo.useMutation<CreateOpenShowMutation, CreateOpenShowMutationVariables>(CreateOpenShowDocument, baseOptions);
      }
export type CreateOpenShowMutationHookResult = ReturnType<typeof useCreateOpenShowMutation>;
export const CreateOpenShowSlideDocument = gql`
    mutation createOpenShowSlide($input: OpenShowSlideCreateMutationInput!) {
  createOpenShowSlide(input: $input) {
    errors {
      ...Error
    }
    openShowSlide {
      id
      duration
      data
      templateId
      templateName
      templateHtml
      templateSchema
    }
  }
}
    ${ErrorFragmentDoc}`;
export type CreateOpenShowSlideMutationFn = Apollo.MutationFunction<CreateOpenShowSlideMutation, CreateOpenShowSlideMutationVariables>;
export function useCreateOpenShowSlideMutation(baseOptions?: Apollo.MutationHookOptions<CreateOpenShowSlideMutation, CreateOpenShowSlideMutationVariables>) {
        return Apollo.useMutation<CreateOpenShowSlideMutation, CreateOpenShowSlideMutationVariables>(CreateOpenShowSlideDocument, baseOptions);
      }
export type CreateOpenShowSlideMutationHookResult = ReturnType<typeof useCreateOpenShowSlideMutation>;
export const DeleteOpenShowSlideDocument = gql`
    mutation deleteOpenShowSlide($input: OpenShowSlideDeleteMutationInput!) {
  deleteOpenShowSlide(input: $input) {
    errors {
      ...Error
    }
    openShowSlide {
      id
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DeleteOpenShowSlideMutationFn = Apollo.MutationFunction<DeleteOpenShowSlideMutation, DeleteOpenShowSlideMutationVariables>;
export function useDeleteOpenShowSlideMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOpenShowSlideMutation, DeleteOpenShowSlideMutationVariables>) {
        return Apollo.useMutation<DeleteOpenShowSlideMutation, DeleteOpenShowSlideMutationVariables>(DeleteOpenShowSlideDocument, baseOptions);
      }
export type DeleteOpenShowSlideMutationHookResult = ReturnType<typeof useDeleteOpenShowSlideMutation>;
export const DuplicateOpenShowSlideDocument = gql`
    mutation duplicateOpenShowSlide($input: OpenShowSlideDuplicateMutationInput!) {
  duplicateOpenShowSlide(input: $input) {
    errors {
      ...Error
    }
    openShowSlide {
      id
      duration
      data
      templateId
      templateName
      templateHtml
      templateSchema
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DuplicateOpenShowSlideMutationFn = Apollo.MutationFunction<DuplicateOpenShowSlideMutation, DuplicateOpenShowSlideMutationVariables>;
export function useDuplicateOpenShowSlideMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateOpenShowSlideMutation, DuplicateOpenShowSlideMutationVariables>) {
        return Apollo.useMutation<DuplicateOpenShowSlideMutation, DuplicateOpenShowSlideMutationVariables>(DuplicateOpenShowSlideDocument, baseOptions);
      }
export type DuplicateOpenShowSlideMutationHookResult = ReturnType<typeof useDuplicateOpenShowSlideMutation>;
export const OrderOpenShowSlidesDocument = gql`
    mutation orderOpenShowSlides($input: OpenShowSlidesOrderMutationInput!) {
  orderOpenShowSlides(input: $input) {
    openShow {
      id
    }
  }
}
    `;
export type OrderOpenShowSlidesMutationFn = Apollo.MutationFunction<OrderOpenShowSlidesMutation, OrderOpenShowSlidesMutationVariables>;
export function useOrderOpenShowSlidesMutation(baseOptions?: Apollo.MutationHookOptions<OrderOpenShowSlidesMutation, OrderOpenShowSlidesMutationVariables>) {
        return Apollo.useMutation<OrderOpenShowSlidesMutation, OrderOpenShowSlidesMutationVariables>(OrderOpenShowSlidesDocument, baseOptions);
      }
export type OrderOpenShowSlidesMutationHookResult = ReturnType<typeof useOrderOpenShowSlidesMutation>;
export const UpdateOpenShowSlideDocument = gql`
    mutation updateOpenShowSlide($input: OpenShowSlideUpdateMutationInput!) {
  updateOpenShowSlide(input: $input) {
    errors {
      ...Error
    }
    openShowSlide {
      id
    }
  }
}
    ${ErrorFragmentDoc}`;
export type UpdateOpenShowSlideMutationFn = Apollo.MutationFunction<UpdateOpenShowSlideMutation, UpdateOpenShowSlideMutationVariables>;
export function useUpdateOpenShowSlideMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOpenShowSlideMutation, UpdateOpenShowSlideMutationVariables>) {
        return Apollo.useMutation<UpdateOpenShowSlideMutation, UpdateOpenShowSlideMutationVariables>(UpdateOpenShowSlideDocument, baseOptions);
      }
export type UpdateOpenShowSlideMutationHookResult = ReturnType<typeof useUpdateOpenShowSlideMutation>;
export const CreateOrganizationDocument = gql`
    mutation createOrganization($input: OrganizationCreateMutationInput!) {
  createOrganization(input: $input) {
    errors {
      ...Error
    }
    organization {
      ...Organization
    }
  }
}
    ${ErrorFragmentDoc}
${OrganizationFragmentDoc}`;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, baseOptions);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export const DeleteExternalCredentialsDocument = gql`
    mutation deleteExternalCredentials($input: DeleteExternalCredentialsInput!) {
  deleteExternalCredentials(input: $input) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DeleteExternalCredentialsMutationFn = Apollo.MutationFunction<DeleteExternalCredentialsMutation, DeleteExternalCredentialsMutationVariables>;
export function useDeleteExternalCredentialsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExternalCredentialsMutation, DeleteExternalCredentialsMutationVariables>) {
        return Apollo.useMutation<DeleteExternalCredentialsMutation, DeleteExternalCredentialsMutationVariables>(DeleteExternalCredentialsDocument, baseOptions);
      }
export type DeleteExternalCredentialsMutationHookResult = ReturnType<typeof useDeleteExternalCredentialsMutation>;
export const RegisterExternalCredentialsDocument = gql`
    mutation registerExternalCredentials($input: RegisterExternalCredentialsInput!) {
  registerExternalCredentials(input: $input) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type RegisterExternalCredentialsMutationFn = Apollo.MutationFunction<RegisterExternalCredentialsMutation, RegisterExternalCredentialsMutationVariables>;
export function useRegisterExternalCredentialsMutation(baseOptions?: Apollo.MutationHookOptions<RegisterExternalCredentialsMutation, RegisterExternalCredentialsMutationVariables>) {
        return Apollo.useMutation<RegisterExternalCredentialsMutation, RegisterExternalCredentialsMutationVariables>(RegisterExternalCredentialsDocument, baseOptions);
      }
export type RegisterExternalCredentialsMutationHookResult = ReturnType<typeof useRegisterExternalCredentialsMutation>;
export const RemoveUserFromOrganizationDocument = gql`
    mutation removeUserFromOrganization($input: RemoveUserFromOrganizationInput!) {
  removeUserFromOrganization(input: $input) {
    errors {
      ...Error
    }
    message
  }
}
    ${ErrorFragmentDoc}`;
export type RemoveUserFromOrganizationMutationFn = Apollo.MutationFunction<RemoveUserFromOrganizationMutation, RemoveUserFromOrganizationMutationVariables>;
export function useRemoveUserFromOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserFromOrganizationMutation, RemoveUserFromOrganizationMutationVariables>) {
        return Apollo.useMutation<RemoveUserFromOrganizationMutation, RemoveUserFromOrganizationMutationVariables>(RemoveUserFromOrganizationDocument, baseOptions);
      }
export type RemoveUserFromOrganizationMutationHookResult = ReturnType<typeof useRemoveUserFromOrganizationMutation>;
export const UpdateOrganizationDocument = gql`
    mutation updateOrganization($input: OrganizationUpdateMutationInput!) {
  updateOrganization(input: $input) {
    errors {
      ...Error
    }
    organization {
      ...Organization
    }
  }
}
    ${ErrorFragmentDoc}
${OrganizationFragmentDoc}`;
export type UpdateOrganizationMutationFn = Apollo.MutationFunction<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export function useUpdateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>) {
        return Apollo.useMutation<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, baseOptions);
      }
export type UpdateOrganizationMutationHookResult = ReturnType<typeof useUpdateOrganizationMutation>;
export const UpdateOrganizationAvatarDocument = gql`
    mutation updateOrganizationAvatar($input: OrganizationAvatarUpdateInput!) {
  updateOrganizationAvatar(input: $input) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type UpdateOrganizationAvatarMutationFn = Apollo.MutationFunction<UpdateOrganizationAvatarMutation, UpdateOrganizationAvatarMutationVariables>;
export function useUpdateOrganizationAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationAvatarMutation, UpdateOrganizationAvatarMutationVariables>) {
        return Apollo.useMutation<UpdateOrganizationAvatarMutation, UpdateOrganizationAvatarMutationVariables>(UpdateOrganizationAvatarDocument, baseOptions);
      }
export type UpdateOrganizationAvatarMutationHookResult = ReturnType<typeof useUpdateOrganizationAvatarMutation>;
export const AddScreenDocument = gql`
    mutation addScreen($input: ScreenAddMutationInput!) {
  addScreen(input: $input) {
    errors {
      ...Error
    }
    screen {
      ...Screen
    }
  }
}
    ${ErrorFragmentDoc}
${ScreenFragmentDoc}`;
export type AddScreenMutationFn = Apollo.MutationFunction<AddScreenMutation, AddScreenMutationVariables>;
export function useAddScreenMutation(baseOptions?: Apollo.MutationHookOptions<AddScreenMutation, AddScreenMutationVariables>) {
        return Apollo.useMutation<AddScreenMutation, AddScreenMutationVariables>(AddScreenDocument, baseOptions);
      }
export type AddScreenMutationHookResult = ReturnType<typeof useAddScreenMutation>;
export const DeleteScreenDocument = gql`
    mutation deleteScreen($input: DeleteScreenMutationInput!) {
  deleteScreen(input: $input) {
    errors {
      ...Error
    }
    screen {
      id
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DeleteScreenMutationFn = Apollo.MutationFunction<DeleteScreenMutation, DeleteScreenMutationVariables>;
export function useDeleteScreenMutation(baseOptions?: Apollo.MutationHookOptions<DeleteScreenMutation, DeleteScreenMutationVariables>) {
        return Apollo.useMutation<DeleteScreenMutation, DeleteScreenMutationVariables>(DeleteScreenDocument, baseOptions);
      }
export type DeleteScreenMutationHookResult = ReturnType<typeof useDeleteScreenMutation>;
export const ScreenChangeChannelDocument = gql`
    mutation screenChangeChannel($input: ScreenChangeChannelMutationInput!) {
  changeChannel(input: $input) {
    errors {
      ...Error
    }
    screen {
      id
      name
      subscribedChannel {
        id
        name
        emojiCode
        shows {
          show {
            ...ScreenChannelShow
          }
        }
      }
      subscribedShow {
        ...ScreenChannelShow
      }
    }
  }
}
    ${ErrorFragmentDoc}
${ScreenChannelShowFragmentDoc}`;
export type ScreenChangeChannelMutationFn = Apollo.MutationFunction<ScreenChangeChannelMutation, ScreenChangeChannelMutationVariables>;
export function useScreenChangeChannelMutation(baseOptions?: Apollo.MutationHookOptions<ScreenChangeChannelMutation, ScreenChangeChannelMutationVariables>) {
        return Apollo.useMutation<ScreenChangeChannelMutation, ScreenChangeChannelMutationVariables>(ScreenChangeChannelDocument, baseOptions);
      }
export type ScreenChangeChannelMutationHookResult = ReturnType<typeof useScreenChangeChannelMutation>;
export const ScreenChangeShowDocument = gql`
    mutation screenChangeShow($input: ScreenChangeShowMutationInput!) {
  changeShow(input: $input) {
    errors {
      ...Error
    }
    screen {
      id
      name
      subscribedChannel {
        id
        name
        emojiCode
        shows {
          show {
            ...ScreenChannelShow
          }
        }
      }
      subscribedShow {
        ...ScreenChannelShow
      }
    }
  }
}
    ${ErrorFragmentDoc}
${ScreenChannelShowFragmentDoc}`;
export type ScreenChangeShowMutationFn = Apollo.MutationFunction<ScreenChangeShowMutation, ScreenChangeShowMutationVariables>;
export function useScreenChangeShowMutation(baseOptions?: Apollo.MutationHookOptions<ScreenChangeShowMutation, ScreenChangeShowMutationVariables>) {
        return Apollo.useMutation<ScreenChangeShowMutation, ScreenChangeShowMutationVariables>(ScreenChangeShowDocument, baseOptions);
      }
export type ScreenChangeShowMutationHookResult = ReturnType<typeof useScreenChangeShowMutation>;
export const SendPusherMessageDocument = gql`
    mutation sendPusherMessage($input: SendPusherMessageMutationInput!) {
  sendPusherMessage(input: $input) {
    __typename
  }
}
    `;
export type SendPusherMessageMutationFn = Apollo.MutationFunction<SendPusherMessageMutation, SendPusherMessageMutationVariables>;
export function useSendPusherMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendPusherMessageMutation, SendPusherMessageMutationVariables>) {
        return Apollo.useMutation<SendPusherMessageMutation, SendPusherMessageMutationVariables>(SendPusherMessageDocument, baseOptions);
      }
export type SendPusherMessageMutationHookResult = ReturnType<typeof useSendPusherMessageMutation>;
export const UpdateScreenDocument = gql`
    mutation updateScreen($input: ScreenUpdateMutationInput!) {
  updateScreen(input: $input) {
    errors {
      ...Error
    }
    screen {
      id
      name
      rotation
      isScreenInfoVisible
    }
  }
}
    ${ErrorFragmentDoc}`;
export type UpdateScreenMutationFn = Apollo.MutationFunction<UpdateScreenMutation, UpdateScreenMutationVariables>;
export function useUpdateScreenMutation(baseOptions?: Apollo.MutationHookOptions<UpdateScreenMutation, UpdateScreenMutationVariables>) {
        return Apollo.useMutation<UpdateScreenMutation, UpdateScreenMutationVariables>(UpdateScreenDocument, baseOptions);
      }
export type UpdateScreenMutationHookResult = ReturnType<typeof useUpdateScreenMutation>;
export const ChannelDropdownDocument = gql`
    query channelDropdown($first: Int, $after: String) {
  channels(first: $first, after: $after) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...ChannelDropdownItem
      }
      cursor
    }
    totalCount
  }
}
    ${PageInfoFragmentDoc}
${ChannelDropdownItemFragmentDoc}`;
export function useChannelDropdownQuery(baseOptions?: Apollo.QueryHookOptions<ChannelDropdownQuery, ChannelDropdownQueryVariables>) {
        return Apollo.useQuery<ChannelDropdownQuery, ChannelDropdownQueryVariables>(ChannelDropdownDocument, baseOptions);
      }
export function useChannelDropdownLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelDropdownQuery, ChannelDropdownQueryVariables>) {
          return Apollo.useLazyQuery<ChannelDropdownQuery, ChannelDropdownQueryVariables>(ChannelDropdownDocument, baseOptions);
        }
export type ChannelDropdownQueryHookResult = ReturnType<typeof useChannelDropdownQuery>;
export type ChannelDropdownLazyQueryHookResult = ReturnType<typeof useChannelDropdownLazyQuery>;
export const ScreenDropdownDocument = gql`
    query screenDropdown($first: Int, $after: String) {
  screens(first: $first, after: $after) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...ScreenDropdownItem
      }
      cursor
    }
    totalCount
  }
}
    ${PageInfoFragmentDoc}
${ScreenDropdownItemFragmentDoc}`;
export function useScreenDropdownQuery(baseOptions?: Apollo.QueryHookOptions<ScreenDropdownQuery, ScreenDropdownQueryVariables>) {
        return Apollo.useQuery<ScreenDropdownQuery, ScreenDropdownQueryVariables>(ScreenDropdownDocument, baseOptions);
      }
export function useScreenDropdownLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScreenDropdownQuery, ScreenDropdownQueryVariables>) {
          return Apollo.useLazyQuery<ScreenDropdownQuery, ScreenDropdownQueryVariables>(ScreenDropdownDocument, baseOptions);
        }
export type ScreenDropdownQueryHookResult = ReturnType<typeof useScreenDropdownQuery>;
export type ScreenDropdownLazyQueryHookResult = ReturnType<typeof useScreenDropdownLazyQuery>;
export const ShowDropdownDocument = gql`
    query showDropdown($first: Int, $after: String) {
  shows(first: $first, after: $after) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...ShowDropdownItem
      }
      cursor
    }
    totalCount
  }
}
    ${PageInfoFragmentDoc}
${ShowDropdownItemFragmentDoc}`;
export function useShowDropdownQuery(baseOptions?: Apollo.QueryHookOptions<ShowDropdownQuery, ShowDropdownQueryVariables>) {
        return Apollo.useQuery<ShowDropdownQuery, ShowDropdownQueryVariables>(ShowDropdownDocument, baseOptions);
      }
export function useShowDropdownLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowDropdownQuery, ShowDropdownQueryVariables>) {
          return Apollo.useLazyQuery<ShowDropdownQuery, ShowDropdownQueryVariables>(ShowDropdownDocument, baseOptions);
        }
export type ShowDropdownQueryHookResult = ReturnType<typeof useShowDropdownQuery>;
export type ShowDropdownLazyQueryHookResult = ReturnType<typeof useShowDropdownLazyQuery>;
export const CreateShowDocument = gql`
    mutation createShow($input: ShowCreateMutationInput!) {
  createShow(input: $input) {
    errors {
      ...Error
    }
    show {
      id
    }
  }
}
    ${ErrorFragmentDoc}`;
export type CreateShowMutationFn = Apollo.MutationFunction<CreateShowMutation, CreateShowMutationVariables>;
export function useCreateShowMutation(baseOptions?: Apollo.MutationHookOptions<CreateShowMutation, CreateShowMutationVariables>) {
        return Apollo.useMutation<CreateShowMutation, CreateShowMutationVariables>(CreateShowDocument, baseOptions);
      }
export type CreateShowMutationHookResult = ReturnType<typeof useCreateShowMutation>;
export const CreateShowSlideDocument = gql`
    mutation createShowSlide($input: ShowSlideCreateMutationInput!) {
  createShowSlide(input: $input) {
    errors {
      ...Error
    }
    showSlide {
      id
      duration
      data
      templateId
      templateName
      templateHtml
      templateSchema
    }
  }
}
    ${ErrorFragmentDoc}`;
export type CreateShowSlideMutationFn = Apollo.MutationFunction<CreateShowSlideMutation, CreateShowSlideMutationVariables>;
export function useCreateShowSlideMutation(baseOptions?: Apollo.MutationHookOptions<CreateShowSlideMutation, CreateShowSlideMutationVariables>) {
        return Apollo.useMutation<CreateShowSlideMutation, CreateShowSlideMutationVariables>(CreateShowSlideDocument, baseOptions);
      }
export type CreateShowSlideMutationHookResult = ReturnType<typeof useCreateShowSlideMutation>;
export const DeleteShowDocument = gql`
    mutation deleteShow($input: DeleteShowMutationInput!) {
  deleteShow(input: $input) {
    errors {
      ...Error
    }
    show {
      id
      name
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DeleteShowMutationFn = Apollo.MutationFunction<DeleteShowMutation, DeleteShowMutationVariables>;
export function useDeleteShowMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShowMutation, DeleteShowMutationVariables>) {
        return Apollo.useMutation<DeleteShowMutation, DeleteShowMutationVariables>(DeleteShowDocument, baseOptions);
      }
export type DeleteShowMutationHookResult = ReturnType<typeof useDeleteShowMutation>;
export const DeleteShowSlideDocument = gql`
    mutation deleteShowSlide($input: DeleteShowSlideMutationInput!) {
  deleteShowSlide(input: $input) {
    errors {
      ...Error
    }
    showSlide {
      id
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DeleteShowSlideMutationFn = Apollo.MutationFunction<DeleteShowSlideMutation, DeleteShowSlideMutationVariables>;
export function useDeleteShowSlideMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShowSlideMutation, DeleteShowSlideMutationVariables>) {
        return Apollo.useMutation<DeleteShowSlideMutation, DeleteShowSlideMutationVariables>(DeleteShowSlideDocument, baseOptions);
      }
export type DeleteShowSlideMutationHookResult = ReturnType<typeof useDeleteShowSlideMutation>;
export const DuplicatePublicShowDocument = gql`
    mutation duplicatePublicShow($input: DuplicatePublicShowMutationInput!) {
  duplicatePublicShow(input: $input) {
    errors {
      ...Error
    }
    show {
      id
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DuplicatePublicShowMutationFn = Apollo.MutationFunction<DuplicatePublicShowMutation, DuplicatePublicShowMutationVariables>;
export function useDuplicatePublicShowMutation(baseOptions?: Apollo.MutationHookOptions<DuplicatePublicShowMutation, DuplicatePublicShowMutationVariables>) {
        return Apollo.useMutation<DuplicatePublicShowMutation, DuplicatePublicShowMutationVariables>(DuplicatePublicShowDocument, baseOptions);
      }
export type DuplicatePublicShowMutationHookResult = ReturnType<typeof useDuplicatePublicShowMutation>;
export const DuplicateShowDocument = gql`
    mutation duplicateShow($input: DuplicateShowMutationInput!) {
  duplicateShow(input: $input) {
    errors {
      ...Error
    }
    show {
      id
      name
      duration
      previewImage
      previewImageState
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DuplicateShowMutationFn = Apollo.MutationFunction<DuplicateShowMutation, DuplicateShowMutationVariables>;
export function useDuplicateShowMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateShowMutation, DuplicateShowMutationVariables>) {
        return Apollo.useMutation<DuplicateShowMutation, DuplicateShowMutationVariables>(DuplicateShowDocument, baseOptions);
      }
export type DuplicateShowMutationHookResult = ReturnType<typeof useDuplicateShowMutation>;
export const DuplicateShowSlideDocument = gql`
    mutation duplicateShowSlide($input: DuplicateShowSlideMutationInput!) {
  duplicateShowSlide(input: $input) {
    errors {
      ...Error
    }
    showSlide {
      id
      duration
      data
      templateId
      templateName
      templateHtml
      templateSchema
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DuplicateShowSlideMutationFn = Apollo.MutationFunction<DuplicateShowSlideMutation, DuplicateShowSlideMutationVariables>;
export function useDuplicateShowSlideMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateShowSlideMutation, DuplicateShowSlideMutationVariables>) {
        return Apollo.useMutation<DuplicateShowSlideMutation, DuplicateShowSlideMutationVariables>(DuplicateShowSlideDocument, baseOptions);
      }
export type DuplicateShowSlideMutationHookResult = ReturnType<typeof useDuplicateShowSlideMutation>;
export const OrderShowSlidesDocument = gql`
    mutation orderShowSlides($input: OrderShowSlidesMutationInput!) {
  orderShowSlides(input: $input) {
    show {
      id
    }
  }
}
    `;
export type OrderShowSlidesMutationFn = Apollo.MutationFunction<OrderShowSlidesMutation, OrderShowSlidesMutationVariables>;
export function useOrderShowSlidesMutation(baseOptions?: Apollo.MutationHookOptions<OrderShowSlidesMutation, OrderShowSlidesMutationVariables>) {
        return Apollo.useMutation<OrderShowSlidesMutation, OrderShowSlidesMutationVariables>(OrderShowSlidesDocument, baseOptions);
      }
export type OrderShowSlidesMutationHookResult = ReturnType<typeof useOrderShowSlidesMutation>;
export const UpdateShowDocument = gql`
    mutation updateShow($input: ShowUpdateMutationInput!) {
  updateShow(input: $input) {
    errors {
      ...Error
    }
    show {
      id
      name
      isPublic
      publicId
      channels {
        id
      }
    }
  }
}
    ${ErrorFragmentDoc}`;
export type UpdateShowMutationFn = Apollo.MutationFunction<UpdateShowMutation, UpdateShowMutationVariables>;
export function useUpdateShowMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShowMutation, UpdateShowMutationVariables>) {
        return Apollo.useMutation<UpdateShowMutation, UpdateShowMutationVariables>(UpdateShowDocument, baseOptions);
      }
export type UpdateShowMutationHookResult = ReturnType<typeof useUpdateShowMutation>;
export const UpdateShowSlideDocument = gql`
    mutation updateShowSlide($input: ShowSlideUpdateMutationInput!) {
  updateShowSlide(input: $input) {
    errors {
      ...Error
    }
    showSlide {
      id
    }
  }
}
    ${ErrorFragmentDoc}`;
export type UpdateShowSlideMutationFn = Apollo.MutationFunction<UpdateShowSlideMutation, UpdateShowSlideMutationVariables>;
export function useUpdateShowSlideMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShowSlideMutation, UpdateShowSlideMutationVariables>) {
        return Apollo.useMutation<UpdateShowSlideMutation, UpdateShowSlideMutationVariables>(UpdateShowSlideDocument, baseOptions);
      }
export type UpdateShowSlideMutationHookResult = ReturnType<typeof useUpdateShowSlideMutation>;
export const SlidePreviewImageDocument = gql`
    subscription slidePreviewImage($input: ShowSlideSubscriptionsInput!) {
  slidePreviewImage(input: $input) {
    id
    previewImage
    previewImageState
    show {
      id
      previewImage
      previewImageState
    }
  }
}
    `;
export function useSlidePreviewImageSubscription(baseOptions: Apollo.SubscriptionHookOptions<SlidePreviewImageSubscription, SlidePreviewImageSubscriptionVariables>) {
        return Apollo.useSubscription<SlidePreviewImageSubscription, SlidePreviewImageSubscriptionVariables>(SlidePreviewImageDocument, baseOptions);
      }
export type SlidePreviewImageSubscriptionHookResult = ReturnType<typeof useSlidePreviewImageSubscription>;
export const AuthDocument = gql`
    mutation auth($email: String!, $password: String!) {
  tokenAuth(email: $email, password: $password) {
    token
  }
}
    `;
export type AuthMutationFn = Apollo.MutationFunction<AuthMutation, AuthMutationVariables>;
export function useAuthMutation(baseOptions?: Apollo.MutationHookOptions<AuthMutation, AuthMutationVariables>) {
        return Apollo.useMutation<AuthMutation, AuthMutationVariables>(AuthDocument, baseOptions);
      }
export type AuthMutationHookResult = ReturnType<typeof useAuthMutation>;
export const CancelInviteUserDocument = gql`
    mutation cancelInviteUser($input: CancelInviteUserInput!) {
  cancelInviteUser(input: $input) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type CancelInviteUserMutationFn = Apollo.MutationFunction<CancelInviteUserMutation, CancelInviteUserMutationVariables>;
export function useCancelInviteUserMutation(baseOptions?: Apollo.MutationHookOptions<CancelInviteUserMutation, CancelInviteUserMutationVariables>) {
        return Apollo.useMutation<CancelInviteUserMutation, CancelInviteUserMutationVariables>(CancelInviteUserDocument, baseOptions);
      }
export type CancelInviteUserMutationHookResult = ReturnType<typeof useCancelInviteUserMutation>;
export const ChangeActiveOrganizationDocument = gql`
    mutation changeActiveOrganization($input: ChangeActiveOrganizationInput!) {
  changeActiveOrganization(input: $input) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type ChangeActiveOrganizationMutationFn = Apollo.MutationFunction<ChangeActiveOrganizationMutation, ChangeActiveOrganizationMutationVariables>;
export function useChangeActiveOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<ChangeActiveOrganizationMutation, ChangeActiveOrganizationMutationVariables>) {
        return Apollo.useMutation<ChangeActiveOrganizationMutation, ChangeActiveOrganizationMutationVariables>(ChangeActiveOrganizationDocument, baseOptions);
      }
export type ChangeActiveOrganizationMutationHookResult = ReturnType<typeof useChangeActiveOrganizationMutation>;
export const ChangeOrganizationMemberRoleDocument = gql`
    mutation changeOrganizationMemberRole($input: ChangeOrganizationMemberRoleInput!) {
  changeOrganizationMemberRole(input: $input) {
    errors {
      ...Error
    }
    organization {
      ...Organization
    }
  }
}
    ${ErrorFragmentDoc}
${OrganizationFragmentDoc}`;
export type ChangeOrganizationMemberRoleMutationFn = Apollo.MutationFunction<ChangeOrganizationMemberRoleMutation, ChangeOrganizationMemberRoleMutationVariables>;
export function useChangeOrganizationMemberRoleMutation(baseOptions?: Apollo.MutationHookOptions<ChangeOrganizationMemberRoleMutation, ChangeOrganizationMemberRoleMutationVariables>) {
        return Apollo.useMutation<ChangeOrganizationMemberRoleMutation, ChangeOrganizationMemberRoleMutationVariables>(ChangeOrganizationMemberRoleDocument, baseOptions);
      }
export type ChangeOrganizationMemberRoleMutationHookResult = ReturnType<typeof useChangeOrganizationMemberRoleMutation>;
export const ChangePasswordDocument = gql`
    mutation changePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    message
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export const InviteUserDocument = gql`
    mutation inviteUser($input: InviteUserInput!) {
  inviteUser(input: $input) {
    message
  }
}
    `;
export type InviteUserMutationFn = Apollo.MutationFunction<InviteUserMutation, InviteUserMutationVariables>;
export function useInviteUserMutation(baseOptions?: Apollo.MutationHookOptions<InviteUserMutation, InviteUserMutationVariables>) {
        return Apollo.useMutation<InviteUserMutation, InviteUserMutationVariables>(InviteUserDocument, baseOptions);
      }
export type InviteUserMutationHookResult = ReturnType<typeof useInviteUserMutation>;
export const UserJoinOrganizationDocument = gql`
    mutation userJoinOrganization($input: UserJoinOrganizationInput!) {
  userJoinOrganization(input: $input) {
    message
  }
}
    `;
export type UserJoinOrganizationMutationFn = Apollo.MutationFunction<UserJoinOrganizationMutation, UserJoinOrganizationMutationVariables>;
export function useUserJoinOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<UserJoinOrganizationMutation, UserJoinOrganizationMutationVariables>) {
        return Apollo.useMutation<UserJoinOrganizationMutation, UserJoinOrganizationMutationVariables>(UserJoinOrganizationDocument, baseOptions);
      }
export type UserJoinOrganizationMutationHookResult = ReturnType<typeof useUserJoinOrganizationMutation>;
export const UserLeaveOrganizationDocument = gql`
    mutation userLeaveOrganization($input: UserLeaveOrganizationInput!) {
  userLeaveOrganization(input: $input) {
    user {
      ...UserInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type UserLeaveOrganizationMutationFn = Apollo.MutationFunction<UserLeaveOrganizationMutation, UserLeaveOrganizationMutationVariables>;
export function useUserLeaveOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<UserLeaveOrganizationMutation, UserLeaveOrganizationMutationVariables>) {
        return Apollo.useMutation<UserLeaveOrganizationMutation, UserLeaveOrganizationMutationVariables>(UserLeaveOrganizationDocument, baseOptions);
      }
export type UserLeaveOrganizationMutationHookResult = ReturnType<typeof useUserLeaveOrganizationMutation>;
export const RefreshTokenDocument = gql`
    mutation refreshToken($token: String!) {
  refreshToken(token: $token) {
    token
    payload
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, baseOptions);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export const RegisterDocument = gql`
    mutation register($input: RegisterUserInput!) {
  registerUser(input: $input) {
    errors {
      field
      message
    }
    message
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($input: RequestPasswordResetInput!) {
  requestPasswordReset(input: $input) {
    message
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export const SocialAuthDocument = gql`
    mutation socialAuth($accessToken: String!, $provider: String!) {
  socialAuth(accessToken: $accessToken, provider: $provider) {
    social {
      id
      user {
        id
        dateJoined
      }
    }
    token
  }
}
    `;
export type SocialAuthMutationFn = Apollo.MutationFunction<SocialAuthMutation, SocialAuthMutationVariables>;
export function useSocialAuthMutation(baseOptions?: Apollo.MutationHookOptions<SocialAuthMutation, SocialAuthMutationVariables>) {
        return Apollo.useMutation<SocialAuthMutation, SocialAuthMutationVariables>(SocialAuthDocument, baseOptions);
      }
export type SocialAuthMutationHookResult = ReturnType<typeof useSocialAuthMutation>;
export const UpdateUserDocument = gql`
    mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    user {
      ...UserInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export const UserAvatarUploadDocument = gql`
    mutation userAvatarUpload($input: UserAvatarUploadInput!) {
  userAvatarUpload(input: $input) {
    user {
      ...UserInfo
    }
    errors {
      ...Error
    }
  }
}
    ${UserInfoFragmentDoc}
${ErrorFragmentDoc}`;
export type UserAvatarUploadMutationFn = Apollo.MutationFunction<UserAvatarUploadMutation, UserAvatarUploadMutationVariables>;
export function useUserAvatarUploadMutation(baseOptions?: Apollo.MutationHookOptions<UserAvatarUploadMutation, UserAvatarUploadMutationVariables>) {
        return Apollo.useMutation<UserAvatarUploadMutation, UserAvatarUploadMutationVariables>(UserAvatarUploadDocument, baseOptions);
      }
export type UserAvatarUploadMutationHookResult = ReturnType<typeof useUserAvatarUploadMutation>;
export const VerifyPasswordResetDocument = gql`
    mutation verifyPasswordReset($input: VerifyPasswordResetKeyInput!) {
  verifyPasswordResetKey(input: $input) {
    message
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type VerifyPasswordResetMutationFn = Apollo.MutationFunction<VerifyPasswordResetMutation, VerifyPasswordResetMutationVariables>;
export function useVerifyPasswordResetMutation(baseOptions?: Apollo.MutationHookOptions<VerifyPasswordResetMutation, VerifyPasswordResetMutationVariables>) {
        return Apollo.useMutation<VerifyPasswordResetMutation, VerifyPasswordResetMutationVariables>(VerifyPasswordResetDocument, baseOptions);
      }
export type VerifyPasswordResetMutationHookResult = ReturnType<typeof useVerifyPasswordResetMutation>;
export const VerifyTokenDocument = gql`
    mutation verifyToken($input: VerifyInput!) {
  verifyToken(input: $input) {
    payload
  }
}
    `;
export type VerifyTokenMutationFn = Apollo.MutationFunction<VerifyTokenMutation, VerifyTokenMutationVariables>;
export function useVerifyTokenMutation(baseOptions?: Apollo.MutationHookOptions<VerifyTokenMutation, VerifyTokenMutationVariables>) {
        return Apollo.useMutation<VerifyTokenMutation, VerifyTokenMutationVariables>(VerifyTokenDocument, baseOptions);
      }
export type VerifyTokenMutationHookResult = ReturnType<typeof useVerifyTokenMutation>;
export const VerifyUserEmailDocument = gql`
    mutation verifyUserEmail($input: VerifyUserEmailInput!) {
  verifyUserEmail(input: $input) {
    activationKey {
      ...ActivationKey
    }
  }
}
    ${ActivationKeyFragmentDoc}`;
export type VerifyUserEmailMutationFn = Apollo.MutationFunction<VerifyUserEmailMutation, VerifyUserEmailMutationVariables>;
export function useVerifyUserEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyUserEmailMutation, VerifyUserEmailMutationVariables>) {
        return Apollo.useMutation<VerifyUserEmailMutation, VerifyUserEmailMutationVariables>(VerifyUserEmailDocument, baseOptions);
      }
export type VerifyUserEmailMutationHookResult = ReturnType<typeof useVerifyUserEmailMutation>;
export const MeDocument = gql`
    query me {
  me {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export const VerifyInvitationKeyDocument = gql`
    query verifyInvitationKey($invitationKey: String!) {
  verifyInvitationKey(invitationKey: $invitationKey) {
    invitationKey
    organization {
      name
      avatar
    }
    sender {
      name
    }
  }
}
    `;
export function useVerifyInvitationKeyQuery(baseOptions: Apollo.QueryHookOptions<VerifyInvitationKeyQuery, VerifyInvitationKeyQueryVariables>) {
        return Apollo.useQuery<VerifyInvitationKeyQuery, VerifyInvitationKeyQueryVariables>(VerifyInvitationKeyDocument, baseOptions);
      }
export function useVerifyInvitationKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyInvitationKeyQuery, VerifyInvitationKeyQueryVariables>) {
          return Apollo.useLazyQuery<VerifyInvitationKeyQuery, VerifyInvitationKeyQueryVariables>(VerifyInvitationKeyDocument, baseOptions);
        }
export type VerifyInvitationKeyQueryHookResult = ReturnType<typeof useVerifyInvitationKeyQuery>;
export type VerifyInvitationKeyLazyQueryHookResult = ReturnType<typeof useVerifyInvitationKeyLazyQuery>;
export const ShowingOnScreensListDocument = gql`
    query showingOnScreensList {
  screens {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...ShowingOnScreensListItem
      }
      cursor
    }
    totalCount
  }
}
    ${PageInfoFragmentDoc}
${ShowingOnScreensListItemFragmentDoc}`;
export function useShowingOnScreensListQuery(baseOptions?: Apollo.QueryHookOptions<ShowingOnScreensListQuery, ShowingOnScreensListQueryVariables>) {
        return Apollo.useQuery<ShowingOnScreensListQuery, ShowingOnScreensListQueryVariables>(ShowingOnScreensListDocument, baseOptions);
      }
export function useShowingOnScreensListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowingOnScreensListQuery, ShowingOnScreensListQueryVariables>) {
          return Apollo.useLazyQuery<ShowingOnScreensListQuery, ShowingOnScreensListQueryVariables>(ShowingOnScreensListDocument, baseOptions);
        }
export type ShowingOnScreensListQueryHookResult = ReturnType<typeof useShowingOnScreensListQuery>;
export type ShowingOnScreensListLazyQueryHookResult = ReturnType<typeof useShowingOnScreensListLazyQuery>;
export const AddShowViewToChannelDocument = gql`
    query addShowViewToChannel($first: Int, $after: String, $name: String, $orderby: [String], $channelIds: [ID!], $onScreen: Boolean, $isPublic: Boolean, $createdBy: ID, $updatedBy: ID) {
  shows(
    first: $first
    after: $after
    name: $name
    orderby: $orderby
    channelIds: $channelIds
    onScreen: $onScreen
    isPublic: $isPublic
    createdBy: $createdBy
    updatedBy: $updatedBy
  ) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...AddShowToChannelListItem
      }
      cursor
    }
    totalCount
  }
}
    ${PageInfoFragmentDoc}
${AddShowToChannelListItemFragmentDoc}`;
export function useAddShowViewToChannelQuery(baseOptions?: Apollo.QueryHookOptions<AddShowViewToChannelQuery, AddShowViewToChannelQueryVariables>) {
        return Apollo.useQuery<AddShowViewToChannelQuery, AddShowViewToChannelQueryVariables>(AddShowViewToChannelDocument, baseOptions);
      }
export function useAddShowViewToChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddShowViewToChannelQuery, AddShowViewToChannelQueryVariables>) {
          return Apollo.useLazyQuery<AddShowViewToChannelQuery, AddShowViewToChannelQueryVariables>(AddShowViewToChannelDocument, baseOptions);
        }
export type AddShowViewToChannelQueryHookResult = ReturnType<typeof useAddShowViewToChannelQuery>;
export type AddShowViewToChannelLazyQueryHookResult = ReturnType<typeof useAddShowViewToChannelLazyQuery>;
export const ChannelDocument = gql`
    query channel($id: ID!) {
  channel(id: $id) {
    ...Channel
  }
}
    ${ChannelFragmentDoc}`;
export function useChannelQuery(baseOptions: Apollo.QueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
        return Apollo.useQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, baseOptions);
      }
export function useChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
          return Apollo.useLazyQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, baseOptions);
        }
export type ChannelQueryHookResult = ReturnType<typeof useChannelQuery>;
export type ChannelLazyQueryHookResult = ReturnType<typeof useChannelLazyQuery>;
export const ChannelPreviewDocument = gql`
    query channelPreview($id: ID!) {
  channel(id: $id) {
    id
    shows {
      show {
        id
        slides {
          renderedHtml
          duration
        }
      }
    }
  }
}
    `;
export function useChannelPreviewQuery(baseOptions: Apollo.QueryHookOptions<ChannelPreviewQuery, ChannelPreviewQueryVariables>) {
        return Apollo.useQuery<ChannelPreviewQuery, ChannelPreviewQueryVariables>(ChannelPreviewDocument, baseOptions);
      }
export function useChannelPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelPreviewQuery, ChannelPreviewQueryVariables>) {
          return Apollo.useLazyQuery<ChannelPreviewQuery, ChannelPreviewQueryVariables>(ChannelPreviewDocument, baseOptions);
        }
export type ChannelPreviewQueryHookResult = ReturnType<typeof useChannelPreviewQuery>;
export type ChannelPreviewLazyQueryHookResult = ReturnType<typeof useChannelPreviewLazyQuery>;
export const ChannelsListDocument = gql`
    query channelsList($first: Int, $after: String) {
  channels(first: $first, after: $after) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...ChannelListItem
      }
      cursor
    }
    totalCount
  }
}
    ${PageInfoFragmentDoc}
${ChannelListItemFragmentDoc}`;
export function useChannelsListQuery(baseOptions?: Apollo.QueryHookOptions<ChannelsListQuery, ChannelsListQueryVariables>) {
        return Apollo.useQuery<ChannelsListQuery, ChannelsListQueryVariables>(ChannelsListDocument, baseOptions);
      }
export function useChannelsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelsListQuery, ChannelsListQueryVariables>) {
          return Apollo.useLazyQuery<ChannelsListQuery, ChannelsListQueryVariables>(ChannelsListDocument, baseOptions);
        }
export type ChannelsListQueryHookResult = ReturnType<typeof useChannelsListQuery>;
export type ChannelsListLazyQueryHookResult = ReturnType<typeof useChannelsListLazyQuery>;
export const DuplicateOpenShowDocument = gql`
    mutation duplicateOpenShow($input: OpenShowDuplicateMutationInput!) {
  duplicateOpenShow(input: $input) {
    openShow {
      id
      name
      slides {
        id
      }
    }
  }
}
    `;
export type DuplicateOpenShowMutationFn = Apollo.MutationFunction<DuplicateOpenShowMutation, DuplicateOpenShowMutationVariables>;
export function useDuplicateOpenShowMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateOpenShowMutation, DuplicateOpenShowMutationVariables>) {
        return Apollo.useMutation<DuplicateOpenShowMutation, DuplicateOpenShowMutationVariables>(DuplicateOpenShowDocument, baseOptions);
      }
export type DuplicateOpenShowMutationHookResult = ReturnType<typeof useDuplicateOpenShowMutation>;
export const OpenShowHtmlDocument = gql`
    query openShowHtml($id: ID!) {
  show: openShow(id: $id) {
    id
    name
    isEditable
    slides {
      renderedHtml
    }
  }
}
    `;
export function useOpenShowHtmlQuery(baseOptions: Apollo.QueryHookOptions<OpenShowHtmlQuery, OpenShowHtmlQueryVariables>) {
        return Apollo.useQuery<OpenShowHtmlQuery, OpenShowHtmlQueryVariables>(OpenShowHtmlDocument, baseOptions);
      }
export function useOpenShowHtmlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpenShowHtmlQuery, OpenShowHtmlQueryVariables>) {
          return Apollo.useLazyQuery<OpenShowHtmlQuery, OpenShowHtmlQueryVariables>(OpenShowHtmlDocument, baseOptions);
        }
export type OpenShowHtmlQueryHookResult = ReturnType<typeof useOpenShowHtmlQuery>;
export type OpenShowHtmlLazyQueryHookResult = ReturnType<typeof useOpenShowHtmlLazyQuery>;
export const OpenShowDetailsDocument = gql`
    query openShowDetails($id: ID!) {
  openShow(id: $id) {
    ...OpenShowDetails
  }
}
    ${OpenShowDetailsFragmentDoc}`;
export function useOpenShowDetailsQuery(baseOptions: Apollo.QueryHookOptions<OpenShowDetailsQuery, OpenShowDetailsQueryVariables>) {
        return Apollo.useQuery<OpenShowDetailsQuery, OpenShowDetailsQueryVariables>(OpenShowDetailsDocument, baseOptions);
      }
export function useOpenShowDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpenShowDetailsQuery, OpenShowDetailsQueryVariables>) {
          return Apollo.useLazyQuery<OpenShowDetailsQuery, OpenShowDetailsQueryVariables>(OpenShowDetailsDocument, baseOptions);
        }
export type OpenShowDetailsQueryHookResult = ReturnType<typeof useOpenShowDetailsQuery>;
export type OpenShowDetailsLazyQueryHookResult = ReturnType<typeof useOpenShowDetailsLazyQuery>;
export const PublicChannelDocument = gql`
    query publicChannel($publicId: String!) {
  channelPublic(publicId: $publicId) {
    ...ChannelPublic
  }
}
    ${ChannelPublicFragmentDoc}`;
export function usePublicChannelQuery(baseOptions: Apollo.QueryHookOptions<PublicChannelQuery, PublicChannelQueryVariables>) {
        return Apollo.useQuery<PublicChannelQuery, PublicChannelQueryVariables>(PublicChannelDocument, baseOptions);
      }
export function usePublicChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicChannelQuery, PublicChannelQueryVariables>) {
          return Apollo.useLazyQuery<PublicChannelQuery, PublicChannelQueryVariables>(PublicChannelDocument, baseOptions);
        }
export type PublicChannelQueryHookResult = ReturnType<typeof usePublicChannelQuery>;
export type PublicChannelLazyQueryHookResult = ReturnType<typeof usePublicChannelLazyQuery>;
export const PublicShowDocument = gql`
    query publicShow($publicId: String!) {
  showPublic(publicId: $publicId) {
    ...ShowPublic
  }
}
    ${ShowPublicFragmentDoc}`;
export function usePublicShowQuery(baseOptions: Apollo.QueryHookOptions<PublicShowQuery, PublicShowQueryVariables>) {
        return Apollo.useQuery<PublicShowQuery, PublicShowQueryVariables>(PublicShowDocument, baseOptions);
      }
export function usePublicShowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicShowQuery, PublicShowQueryVariables>) {
          return Apollo.useLazyQuery<PublicShowQuery, PublicShowQueryVariables>(PublicShowDocument, baseOptions);
        }
export type PublicShowQueryHookResult = ReturnType<typeof usePublicShowQuery>;
export type PublicShowLazyQueryHookResult = ReturnType<typeof usePublicShowLazyQuery>;
export const ScreensListDocument = gql`
    query screensList($first: Int, $after: String) {
  screens(first: $first, after: $after) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...ScreenListItem
      }
      cursor
    }
    totalCount
  }
}
    ${PageInfoFragmentDoc}
${ScreenListItemFragmentDoc}`;
export function useScreensListQuery(baseOptions?: Apollo.QueryHookOptions<ScreensListQuery, ScreensListQueryVariables>) {
        return Apollo.useQuery<ScreensListQuery, ScreensListQueryVariables>(ScreensListDocument, baseOptions);
      }
export function useScreensListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScreensListQuery, ScreensListQueryVariables>) {
          return Apollo.useLazyQuery<ScreensListQuery, ScreensListQueryVariables>(ScreensListDocument, baseOptions);
        }
export type ScreensListQueryHookResult = ReturnType<typeof useScreensListQuery>;
export type ScreensListLazyQueryHookResult = ReturnType<typeof useScreensListLazyQuery>;
export const ScreenPreviewDocument = gql`
    query screenPreview($id: ID!) {
  screen(id: $id) {
    id
    rotation
    subscribedChannel {
      id
      shows {
        show {
          id
          slides {
            renderedHtml
            duration
          }
        }
      }
    }
    subscribedShow {
      id
      slides {
        renderedHtml
        duration
      }
    }
  }
}
    `;
export function useScreenPreviewQuery(baseOptions: Apollo.QueryHookOptions<ScreenPreviewQuery, ScreenPreviewQueryVariables>) {
        return Apollo.useQuery<ScreenPreviewQuery, ScreenPreviewQueryVariables>(ScreenPreviewDocument, baseOptions);
      }
export function useScreenPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScreenPreviewQuery, ScreenPreviewQueryVariables>) {
          return Apollo.useLazyQuery<ScreenPreviewQuery, ScreenPreviewQueryVariables>(ScreenPreviewDocument, baseOptions);
        }
export type ScreenPreviewQueryHookResult = ReturnType<typeof useScreenPreviewQuery>;
export type ScreenPreviewLazyQueryHookResult = ReturnType<typeof useScreenPreviewLazyQuery>;
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
export const LayoutsDocument = gql`
    query layouts($templateId: String!) {
  layouts(templateId: $templateId) {
    ...Layout
  }
}
    ${LayoutFragmentDoc}`;
export function useLayoutsQuery(baseOptions: Apollo.QueryHookOptions<LayoutsQuery, LayoutsQueryVariables>) {
        return Apollo.useQuery<LayoutsQuery, LayoutsQueryVariables>(LayoutsDocument, baseOptions);
      }
export function useLayoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LayoutsQuery, LayoutsQueryVariables>) {
          return Apollo.useLazyQuery<LayoutsQuery, LayoutsQueryVariables>(LayoutsDocument, baseOptions);
        }
export type LayoutsQueryHookResult = ReturnType<typeof useLayoutsQuery>;
export type LayoutsLazyQueryHookResult = ReturnType<typeof useLayoutsLazyQuery>;
export const YoutubeVideoDocument = gql`
    query youtubeVideo($url: String!) {
  youtubeVideo(url: $url) {
    duration
  }
}
    `;
export function useYoutubeVideoQuery(baseOptions: Apollo.QueryHookOptions<YoutubeVideoQuery, YoutubeVideoQueryVariables>) {
        return Apollo.useQuery<YoutubeVideoQuery, YoutubeVideoQueryVariables>(YoutubeVideoDocument, baseOptions);
      }
export function useYoutubeVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<YoutubeVideoQuery, YoutubeVideoQueryVariables>) {
          return Apollo.useLazyQuery<YoutubeVideoQuery, YoutubeVideoQueryVariables>(YoutubeVideoDocument, baseOptions);
        }
export type YoutubeVideoQueryHookResult = ReturnType<typeof useYoutubeVideoQuery>;
export type YoutubeVideoLazyQueryHookResult = ReturnType<typeof useYoutubeVideoLazyQuery>;
export const ShowDetailsDocument = gql`
    query showDetails($id: ID!) {
  show(id: $id) {
    ...ShowDetails
  }
}
    ${ShowDetailsFragmentDoc}`;
export function useShowDetailsQuery(baseOptions: Apollo.QueryHookOptions<ShowDetailsQuery, ShowDetailsQueryVariables>) {
        return Apollo.useQuery<ShowDetailsQuery, ShowDetailsQueryVariables>(ShowDetailsDocument, baseOptions);
      }
export function useShowDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowDetailsQuery, ShowDetailsQueryVariables>) {
          return Apollo.useLazyQuery<ShowDetailsQuery, ShowDetailsQueryVariables>(ShowDetailsDocument, baseOptions);
        }
export type ShowDetailsQueryHookResult = ReturnType<typeof useShowDetailsQuery>;
export type ShowDetailsLazyQueryHookResult = ReturnType<typeof useShowDetailsLazyQuery>;
export const ShowHistoryDocument = gql`
    query showHistory($id: ID!) {
  showHistory(showId: $id) {
    createdAt
    createdBy {
      id
      name
      avatar
    }
    updatedAt
    updatedBy {
      id
      name
      avatar
    }
  }
}
    `;
export function useShowHistoryQuery(baseOptions: Apollo.QueryHookOptions<ShowHistoryQuery, ShowHistoryQueryVariables>) {
        return Apollo.useQuery<ShowHistoryQuery, ShowHistoryQueryVariables>(ShowHistoryDocument, baseOptions);
      }
export function useShowHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowHistoryQuery, ShowHistoryQueryVariables>) {
          return Apollo.useLazyQuery<ShowHistoryQuery, ShowHistoryQueryVariables>(ShowHistoryDocument, baseOptions);
        }
export type ShowHistoryQueryHookResult = ReturnType<typeof useShowHistoryQuery>;
export type ShowHistoryLazyQueryHookResult = ReturnType<typeof useShowHistoryLazyQuery>;
export const ShowEditorPreviewDocument = gql`
    query showEditorPreview($id: ID!) {
  show(id: $id) {
    id
    slides {
      renderedHtml
      duration
    }
  }
}
    `;
export function useShowEditorPreviewQuery(baseOptions: Apollo.QueryHookOptions<ShowEditorPreviewQuery, ShowEditorPreviewQueryVariables>) {
        return Apollo.useQuery<ShowEditorPreviewQuery, ShowEditorPreviewQueryVariables>(ShowEditorPreviewDocument, baseOptions);
      }
export function useShowEditorPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowEditorPreviewQuery, ShowEditorPreviewQueryVariables>) {
          return Apollo.useLazyQuery<ShowEditorPreviewQuery, ShowEditorPreviewQueryVariables>(ShowEditorPreviewDocument, baseOptions);
        }
export type ShowEditorPreviewQueryHookResult = ReturnType<typeof useShowEditorPreviewQuery>;
export type ShowEditorPreviewLazyQueryHookResult = ReturnType<typeof useShowEditorPreviewLazyQuery>;
export const SlideTemplatesDocument = gql`
    query slideTemplates {
  slideTemplates {
    ...SlideTemplate
  }
}
    ${SlideTemplateFragmentDoc}`;
export function useSlideTemplatesQuery(baseOptions?: Apollo.QueryHookOptions<SlideTemplatesQuery, SlideTemplatesQueryVariables>) {
        return Apollo.useQuery<SlideTemplatesQuery, SlideTemplatesQueryVariables>(SlideTemplatesDocument, baseOptions);
      }
export function useSlideTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SlideTemplatesQuery, SlideTemplatesQueryVariables>) {
          return Apollo.useLazyQuery<SlideTemplatesQuery, SlideTemplatesQueryVariables>(SlideTemplatesDocument, baseOptions);
        }
export type SlideTemplatesQueryHookResult = ReturnType<typeof useSlideTemplatesQuery>;
export type SlideTemplatesLazyQueryHookResult = ReturnType<typeof useSlideTemplatesLazyQuery>;
export const ShowHtmlDocument = gql`
    query showHtml($id: ID!) {
  show(id: $id) {
    id
    name
    slides {
      renderedHtml
    }
  }
}
    `;
export function useShowHtmlQuery(baseOptions: Apollo.QueryHookOptions<ShowHtmlQuery, ShowHtmlQueryVariables>) {
        return Apollo.useQuery<ShowHtmlQuery, ShowHtmlQueryVariables>(ShowHtmlDocument, baseOptions);
      }
export function useShowHtmlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowHtmlQuery, ShowHtmlQueryVariables>) {
          return Apollo.useLazyQuery<ShowHtmlQuery, ShowHtmlQueryVariables>(ShowHtmlDocument, baseOptions);
        }
export type ShowHtmlQueryHookResult = ReturnType<typeof useShowHtmlQuery>;
export type ShowHtmlLazyQueryHookResult = ReturnType<typeof useShowHtmlLazyQuery>;
export const ShowsListDocument = gql`
    query showsList($first: Int, $after: String, $name: String, $orderby: [String], $channelIds: [ID!], $onScreen: Boolean, $isPublic: Boolean, $createdBy: ID, $updatedBy: ID) {
  shows(
    first: $first
    after: $after
    name: $name
    orderby: $orderby
    channelIds: $channelIds
    onScreen: $onScreen
    isPublic: $isPublic
    createdBy: $createdBy
    updatedBy: $updatedBy
  ) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...ShowListItem
      }
      cursor
    }
    totalCount
  }
}
    ${PageInfoFragmentDoc}
${ShowListItemFragmentDoc}`;
export function useShowsListQuery(baseOptions?: Apollo.QueryHookOptions<ShowsListQuery, ShowsListQueryVariables>) {
        return Apollo.useQuery<ShowsListQuery, ShowsListQueryVariables>(ShowsListDocument, baseOptions);
      }
export function useShowsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowsListQuery, ShowsListQueryVariables>) {
          return Apollo.useLazyQuery<ShowsListQuery, ShowsListQueryVariables>(ShowsListDocument, baseOptions);
        }
export type ShowsListQueryHookResult = ReturnType<typeof useShowsListQuery>;
export type ShowsListLazyQueryHookResult = ReturnType<typeof useShowsListLazyQuery>;