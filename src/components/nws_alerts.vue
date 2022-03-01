<template>
  <div class="row">
    <div class="col-sm-3">
      <div>
        Rip Currents
      </div>
      <div class="ms-5" :class="text_color(rip_current_nws_event)">
        <a @click="show_rip_current_modal=true">{{rip_current_alert}} <i class="bi bi-info-circle info-icon"></i></a>
      </div>
      <NWSAlertPopup popup_id='ripcurrent_modal'
                     program_type='NWS Rip Current'
                     v-show="show_rip_current_modal"
                     @close-nws-modal="show_rip_current_modal = false"
                     :alert_description="rip_current_details" >
                     :alert_headline="" >

      </NWSAlertPopup>
    </div>
    <div class="col-sm-3">
      <div>
        Surf Alert
      </div>
      <div class="ms-5" :class="text_color(surf_alert)">
        <a @click="show_surf_alert_modal=true">{{surf_alert}} <i class="bi bi-info-circle info-icon"></i></a>
      </div>
      <NWSAlertPopup popup_id="surfalert_modal"
                              program_type="NWS Rip Current"
                              v-show="show_surf_alert_modal"
                             @close-nws-modal="show_surf_alert_modal = false"
                             :alert_description="surf_alert_details">

      </NWSAlertPopup>
    </div>

  </div>

</template>

<script>
  import NWSApi from "@/utilities/nws_rest_api";
  import NWSAlertPopup from "@/components/nws_alert_modal"
  import nws_alert from "@/utilities/nws_classes";

  export default {
    name: 'NWSAlertsPage',
      props: {
        'longitude': {type: Number, default: undefined},
        'latitude': {type: Number, default: undefined},
        'zone_code': {type: String, default: undefined},
        'county_code': {type: String, default: undefined}
      },
    components: {
      NWSAlertPopup
    },
    data() {
      return {
        rip_current_alert: "Data Unavailable",
        rip_current_nws_event: '',
        rip_current_details: "No current alerts",
        nws_rip_current_event: "",
        surf_alert: "Data Unavailable",
        surf_alert_details: "No current alerts",
        nws_surf_event: "",
        show_rip_current_modal: false,
        show_surf_alert_modal: false,
        rip_current_record: undefined,
        nws_alerts: []

      }
    },
    created() {
      this.rip_current_record = new nws_alert();
    },
    mounted() {
      let vm = this;
      console.debug("NWSAlertsPage mounted.");

      NWSApi.GetNWSZones({longitude: this.longitude, latitude: this.latitude}).then((zone_data)=>{
        zone_data;
        vm;
      });
      //{longitude: this.longitude, latitude: this.latitude, event: 'Rip Current Statement'}
      NWSApi.GetNWSActiveAlerts({longitude: this.longitude, latitude: this.latitude}).then(alerts => {
        vm.rip_current_alert =
        vm.surf_alert = 'No Alerts';
        vm.rip_current_details =
        vm.surf_alert_details = "No current alerts";

        let rip_current_found = false;
        for(var i = 0; i < alerts.length; i++) {
          let feature = alerts[i];
          let alert = new nws_alert();
          alert.parse_api_response(feature);
           vm.nws_alerts[feature.properties.event] = alert;
           if(feature.properties.event == 'Rip Current Statement')
           {
             //vm.rip_current_record.parse_api_response(feature);
             vm.rip_current_alert = 'Rip Currents Present'
             vm.rip_current_record = feature;
             vm.rip_current_nws_event = feature.properties.event;
             vm.rip_current_details = feature.properties.description;
             rip_current_found = true
           }
           else if(feature.properties.event.search(/surf/i))
          {
            vm.surf_alert = feature.properties.event;
            vm.surf_alert_details = feature.properties.description;
          }
        }
        if(!rip_current_found)
        {
          vm.rip_current_alert = "No Alerts"
        }
      })
      .catch(error => {
        vm.rip_current_alert =
        vm.surf_alert = 'Data Unavailable';
        vm.rip_current_details =
        vm.surf_alert_details = '';

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
      console.debug("NWSAlertsPage mounted finished.");
    },
    methods: {
      text_color: function(alert_message) {
        let text_color = 'no_alert';
        if(alert_message.match(/warning/i))
        {
          text_color = 'warning';
        }
        else if(alert_message.match(/advisory/i))
        {
          text_color = 'advisory';
        }
        else if(alert_message.match(/watch/i))
        {
          text_color = 'watch';
        }
        else if(alert_message.match(/statement/i))
        {
          text_color = 'warning';
        }
        return text_color;
      }
    },
    computed: {

      rip_currents_text_color: function () {
        if (this.rip_current_alert == "No Alerts") {
          return ("alert");
        } else {
          return ("no_alert");
        }
      },
      surf_text_color: function () {
        if (this.rip_current_alert == "No Alerts") {
          return ("alert");
        } else {
          return ("no_alert");
        }
      }
    }
  }
</script>
<style scoped>
  .info-icon {
    fill: red;
  }
</style>
