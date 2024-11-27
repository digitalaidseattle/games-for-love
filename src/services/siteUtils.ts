/**
 *  siteUtils.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

export const extractUrls = (attachments: any) => {
  return attachments ? attachments.map((att: any) => att.url) : [];
};

class SiteService {
  prodUrls = JSON.parse(import.meta.env.VITE_APP_URLS);

  DEFAULT_VIEW = {
    longitude: -122.4,
    latitude: 47.6061,
    zoom: 10,
  };

  isPreview(): boolean {
    return !this.prodUrls.includes(window.location.origin);
  }
}

const siteService = new SiteService();
export { siteService };
