import { SessionStorage } from '@Config/constants';
import { gqlIdToUuid } from '@Utils/helpers';
import { getFromSessionStorage } from '@Utils/sessionStorage';

interface EventProperties {
  event_location: string;
  [key: string]: unknown;
}

const cachedEvents: { name: string; properties: EventProperties }[] = [];

const removeFalsyValues = (obj: Record<string, string | null>) => {
  return Object.keys(obj).reduce<Record<string, string>>((acc, key: string) => {
    const value = obj[key as keyof typeof obj];
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

const getUtmParams = () => {
  const utm_source = getFromSessionStorage(SessionStorage.UtmSource);
  const utm_medium = getFromSessionStorage(SessionStorage.UtmMedium);
  const utm_campaign = getFromSessionStorage(SessionStorage.UtmCampaign);
  const utm_term = getFromSessionStorage(SessionStorage.UtmTerm);
  const utm_content = getFromSessionStorage(SessionStorage.UtmContent);

  return removeFalsyValues({ utm_source, utm_medium, utm_campaign, utm_term, utm_content });
};

const track = (name: string, properties: EventProperties) => {
  const activeOrgId = getFromSessionStorage(SessionStorage.OrganizationId);
  window.analytics.track(name, {
    ...properties,
    ...getUtmParams(),
    organization_id: activeOrgId && gqlIdToUuid(activeOrgId),
  });
};

const cacheTrackEvent = (name: string, properties: EventProperties) => {
  cachedEvents.push({ name, properties });
};

const sendCachedEvents = () => {
  cachedEvents.forEach((event) => {
    track(event.name, event.properties);
  });
  cachedEvents.length = 0;
};

const analytics = {
  track,
  cacheTrackEvent: cacheTrackEvent,
  sendCachedEvents,
  alias: window.analytics.alias,
  group: window.analytics.group,
  identify: window.analytics.identify,
} as const;

export default analytics;
