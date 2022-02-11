import { FetchData } from "./base";
import { EspnHelper } from "../espn";

class EspnApis extends FetchData {

  constructor() {
    super();
  }

  siteApi() {
    return this
      .respSetup('SITE')
      .domain('site', 'api', 'espn', 'com')
      .uri('apis', 'site', 'v2', 'sports', 'football', 'nfl');
  }
  webApi() {
    return this
      .respSetup('WEB')
      .domain('site', 'web', 'api', 'espn', 'com')
      .uri('apis', 'common', 'v3', 'sports', 'football', 'nfl');
  }

  coreApi() {
    return this
      .respSetup('CORE')
      .domain('sports', 'core', 'api', 'espn', 'com')
      .uri('v2', 'sports', 'football', 'leagues', 'nfl');
  }

  isObject(variable) {
    return _.isObject(variable);
  }

  async toJson(noCall) {
    this.response.url = this.url;

    if(noCall !== undefined) {
      this.response('url', this.url)
        .response('ESPN', noCall);
    } else {
      let json = await this.getJSON();
      this.response('ESPN', json)
        .response('url', this.url);
    }

    return new EspnHelper(this.resp);
  }

  respSetup(apiTitle) {
    return this
      .reset()
      .response('time', new Date().getTime())
      .response('API', apiTitle)
  }
}

export { EspnApis }
