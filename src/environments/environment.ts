// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: `https://localhost:5001/api`,
  applicationServerPublicKey: `BK1AabF3PRWyqtFwz8-8NvCdG35Ze5GbRW6YdN1cqSsws2H3nIYNGiYnmTD45XRcul556ZUk2p8oURhVlaC4tWI`,
  mapbox_accessToken: `pk.eyJ1IjoiYWRtaW4yMTkiLCJhIjoiY2tkbjV1bGFoMDdyNjJ1cWp6OW9vYTc2cCJ9.f3iM4kZihwi3_7gKEEsZ8g`,
  mapbox_api: `https://api.mapbox.com/geocoding/v5/`,
  braincert_key: `oAQbTjuSbktWkNvVPHWY`,
  braincert_api: `https://api.braincert.com`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
