/*!
 * Tenor.js v1.0.0
 * (c) 2021 Arnav Kumar
 * https://github.com/arnav-kr/tenorjs/#readme
 * Released under the MIT License.
 */
class Tenor {
  constructor(key, options) {
    this.key = key;
    this.filter = options.filter || "high";
    this.locale = options.locale || "en_US";
    this.mediaFilter = options.mediaFilter || "minimal";
    this.limit = 50;
    if (key === undefined || typeof (key) != "string") {
      throw "TenorError: Key is required as the first argument";
    }
    // Endpoints :
    this.endpoints = {};
    this.endpoints.search = "https://g.tenor.com/v1/search";
    this.endpoints.autocomplete = "https://g.tenor.com/v1/autocomplete";
    this.endpoints.suggestion = "https://g.tenor.com/v1/search_suggestions";
    this.endpoints.trending_search = "https://g.tenor.com/v1/trending_terms";
    this.endpoints.trending = "https://g.tenor.com/v1/trending";
    this.endpoints.category = "https://g.tenor.com/v1/categories";
    this.endpoints.registerShare = "https://g.tenor.com/v1/registershare";
    this.endpoints.gif = "https://g.tenor.com/v1/gifs";
    this.endpoints.randomGif = "https://g.tenor.com/v1/random";
  }
  getGif(id, lim) {
    var text;
    var limit = lim || this.limit;
    if (typeof (id) == "object") {
      text = id.join(",");
    } else {
      text = id || "";
    }
    var fullURL = encodeURI(`${this.endpoints.gif}?ids=${text}&contentfilter=${this.filter}&limit=${limit}&key=${this.key}`);
    return new Promise((res, rej) => {
      this.#fetchData(fullURL, (d) => {
        var data = JSON.parse(d);
        res(data.results);
      });
    });
  }
  getRandomGif(str, lim) {
    var limit = lim || this.limit;
    var text = str || "";
    var fullURL = encodeURI(`${this.endpoints.randomGif}?q=${text}&contentfilter=${this.filter}&limit=${limit}&key=${this.key}`);
    return new Promise((res, rej) => {
      this.#fetchData(fullURL, (d) => {
        var data = JSON.parse(d);
        res(data.results);
      });
    });
  }
  search(str, lim) {
    var limit = lim || this.limit;
    var text = str || "";
    var fullURL = encodeURI(`${this.endpoints.search}?q=${text}&contentfilter=${this.filter}&limit=${limit}&key=${this.key}`);
    return new Promise((res, rej) => {
      this.#fetchData(fullURL, (d) => {
        var data = JSON.parse(d);
        res(data.results);
      });
    });
  }
  autocomplete(str) {
    var text = str || "";
    var fullURL = encodeURI(`${this.endpoints.autocomplete}?q=${text}&key=${this.key}`);
    return new Promise((res, rej) => {
      this.#fetchData(fullURL, (d) => {
        var data = JSON.parse(d);
        res(data.results);
      });
    });
  }
  suggestion(str, lim) {
    var limit = lim || this.limit;
    var text = str || "";
    var fullURL = encodeURI(`${this.endpoints.suggestion}?q=${text}&contentfilter=${this.filter}&limit=${limit}&key=${this.key}`);
    return new Promise((res, rej) => {
      this.#fetchData(fullURL, (d) => {
        var data = JSON.parse(d);
        res(data.results);
      });
    });
  }
  trending(lim) {
    var limit = lim || this.limit;
    var fullURL = encodeURI(`${this.endpoints.trending}?contentfilter=${this.filter}&limit=${limit}&key=${this.key}`);
    return new Promise((res, rej) => {
      this.#fetchData(fullURL, (d) => {
        var data = JSON.parse(d);
        res(data.results);
      });
    });
  }
  trending_search(lim) {
    var limit = lim || this.limit;
    var fullURL = encodeURI(`${this.endpoints.trending_search}?limit=${limit}&key=${this.key}`);
    return new Promise((res, rej) => {
      this.#fetchData(fullURL, (d) => {
        var data = JSON.parse(d);
        res(data.results);
      });
    });
  }
  category(typ) {
    var type = typ || "featured";
    var fullURL = encodeURI(`${this.endpoints.category}?type=${type}&contentfilter=${this.filter}&key=${this.key}`);
    return new Promise((res, rej) => {
      this.#fetchData(fullURL, (d) => {
        var data = JSON.parse(d);
        res(data.tags);
      });
    });
  }
  #fetchData(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
      }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
    return;
  }
}
