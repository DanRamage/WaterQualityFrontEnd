import axios from "axios";

let NWS_API_BASE_URL = "https://api.weather.gov";

export default {
    GetNWSActiveAlerts(params)
    {
        //let url_params = [];
        let url = new URL(NWS_API_BASE_URL);
        if('latitude' in params && 'longitude' in params)
        {
            url.searchParams.append('point', params.latitude + "," + params.longitude)
            //url_params.push("point=" + params.latitude + "," + params.longitude)
        }
        if('event' in params)
        {
            url.searchParams.append('event', params.event)

            //url_params.push("event=" + params.event);
        }
        console.log("GetNWSActiveAlerts started.");
        //let url = NWS_API_BASE_URL + '/alerts/active?' +
        //    url_params.join('&')

        console.debug("GetNWSActiveAlerts POST url: " + url.href);
        let alerts = axios.get(url.href, {headers: {'Content-Type': 'application/json'}})
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
        let url = new URL(NWS_API_BASE_URL);
        if('latitude' in params && 'longitude' in params)
        {
            url.searchParams.append('point', params.latitude + "," + params.longitude)
        }

        /*
        let url_params = [];
        if('latitude' in params && 'longitude' in params)
        {
            url_params.push("point=" + params.latitude + "," + params.longitude)
        }
        let url = NWS_API_BASE_URL + '/zones?' +
            url_params.join('&')
        */
        console.debug("GetNWSZones POST url: " + url.href);
        let zones_promise = axios.get(url.href, {headers: {'Content-Type': 'application/json'}})
            .then(function(zones) {
                if('data' in zones) {
                    return zones.data.features;
                }
                else {
                    return [];
                }
                })
            .catch(error=> {
                let error_message = '';
                let status_code = 404;
                if('response' in error && error.response !== undefined) {
                    status_code = error.response.status;
                    if ('error' in error.response.data) {
                        if ('message' in error.response.data.error) {
                            error_message = error.response.data.error.message;
                        }
                    } else {
                        error_message = error.response.data;
                    }
                    console.error("Status code: " + status_code +". Error Msg: " + error_message);
                }
                else{
                    console.error(error);
                }
            });
        return zones_promise;
    }

}
