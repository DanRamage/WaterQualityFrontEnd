<template>
  <div :id="modal_id" class="modal nws-modal-active">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="modal_header"></slot>
        </div>

        <div class="modal-body montserat-font">
          <slot name="description"></slot>
          <div class="fs-4">Current Alert Description</div>
          <p>
            {{alert_description}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NWSAlertPopup',
  props: {
    'modal_id': {type: String, default: 'nws-alert-id'},
    'alert_description': {type: String, default: 'No current alerts.'}
  },
  components: {
    //BaseAlertPopup
  },

  data() {
    return {
    }
  },
  mounted() {
    console.debug("NWSAlertModal mounted.");
  }
}
</script>
<style>
.nws-modal-active{
  display:block;
}

</style>
