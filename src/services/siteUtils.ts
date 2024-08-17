/**
 *  siteUtils.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

class SiteService {
    prodUrls = JSON.parse(import.meta.env.VITE_APP_URLS);


    isPreview(): boolean {
        return !this.prodUrls.includes(window.location.origin)
    }
}

const siteService = new SiteService();
export { siteService }
