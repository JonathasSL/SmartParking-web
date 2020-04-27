
import axios from 'axios';

export default {
    registerDriver(driver) {
        return axios.post('/drivers/', driver);
	},	
	registerParking(parking) {
		return axios.post('/parkings/', parking);
	}
};