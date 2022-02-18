<template>
  <NWSAlertPopup modal_id="rip_current_alert_popup" :alert_description="alert_description">
    <template v-slot:modal_header>
      <h5 class="modal-title">Rip Current Info</h5>
      <button type="button" @click="$emit('close-nws-modal')" class="btn-close"><span >&times;</span></button>
    </template>
    <template v-slot:description>
      <p>
        Rip currents are powerful, channeled currents of water flowing away from shore.
        They typically extend from the shoreline, through the surf zone, and past the line of breaking waves.
        Rip currents can occur at any beach with breaking waves.
      </p>
      <p>
        For more information, check <a href="https://www.weather.gov/safety/ripcurrent-forecasts"> here.</a>

      </p>
    </template>
  </NWSAlertPopup>
  <!---
  <div id="rip_current_alert_popup" class="modal rip-current-modal-active">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Rip Current Info</h5>
          <button type="button" @click="$emit('close-ripcurrent-modal')" class="btn-close"><span >&times;</span></button>
        </div>

        <div class="modal-body montserat-font">
          <p>
            Rip currents are powerful, channeled currents of water flowing away from shore.
            They typically extend from the shoreline, through the surf zone, and past the line of breaking waves.
            Rip currents can occur at any beach with breaking waves.
          </p>
          <div class="fs-4">Current Alert Description</div>
          <p>
            {{alert_description}}
          </p>
        </div>
      </div>
    </div>
  </div>
  --->
</template>

<script>
  import NWSAlertPopup from "@/components/nws_alert_modal"

  export default {
    name: 'RipCurrentPopup',
    props: {
      'alert_description': {type: String, default: 'No current alerts.'},
    },
    components: {
      NWSAlertPopup
    },

    data() {
      return {
      }
    },
    mounted() {
      console.debug("RipCurrentPopup mounted.");
    }
  }
</script>
<style>
.rip-current-modal-active{
  display:block;
}

</style>
