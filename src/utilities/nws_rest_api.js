import axios from "axios";

let NWS_API_BASE_URL = "https://api.weather.gov";

export default {
    GetNWSActiveAlerts(params)
    {
        let url_params = [];
        if('latitude' in params && 'longitude' in params)
        {
            url_params.push("point=" + params.latitude + "," + params.longitude)
        }
        if('event' in params)
        {
            url_params.push("event=" + params.event);
        }
        console.log("GetNWSActiveAlerts started.");
        let url = NWS_API_BASE_URL + '/alerts/active?' +
            url_params.join('&')

        console.debug("GetNWSActiveAlerts POST url: " + url);
        let alerts = axios.get(url, {headers: {'Content-Type': 'application/json'}})
            .then(alerts=> {
                if('data' in alerts) {
                    return alerts.data.features;
                }
            })
        return(alerts);

    },
    GetNWSZones(params)
    {
        console.log("GetNWSAcGetNWSZonestiveAlerts started.");
        let url_params = [];
        if('latitude' in params && 'longitude' in params)
        {
            url_params.push("point=" + params.latitude + "," + params.longitude)
        }
        let url = NWS_API_BASE_URL + '/zones?' +
            url_params.join('&')

        console.debug("GetNWSZones POST url: " + url);
        let zones_promise = axios.get(url, {headers: {'Content-Type': 'application/json'}})
            .then(function(zones) {
                if('data' in zones) {
                    return zones.data.features;
                }
                else {
                    return [];
                }
                })
            .catch(error=> {
                console.error(error);
                return [];
            });
        return zones_promise;
    }

}
