import axios from 'axios';

export default {
    _url: "https://nominatim.openstreetmap.org/",
    search(address) {
        if (!address) return;
        return axios.get(this._url+'search/'+address+'?format=json');
    }
}