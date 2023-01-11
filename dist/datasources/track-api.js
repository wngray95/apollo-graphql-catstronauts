"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackAPI = void 0;
const datasource_rest_1 = require("@apollo/datasource-rest");
class TrackAPI extends datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/';
    }
    getTracksForHome() {
        return this.get('tracks');
    }
    getAuthor(authorId) {
        return this.get(`author/${authorId}`);
    }
    getTrack(trackId) {
        return this.get(`track/${trackId}`);
    }
    getTrackModules(trackId) {
        return this.get(`track/${trackId}/modules`);
    }
    getModule(moduleId) {
        return this.get(`module/${moduleId}`);
    }
    incrementTrackViews(trackId) {
        return this.patch(`track/${trackId}/numberOfViews`);
    }
}
exports.TrackAPI = TrackAPI;
