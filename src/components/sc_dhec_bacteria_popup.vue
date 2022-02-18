<template>
  <BacteriaDataModal popup_id="sc_bacteria_data_modal">
    <template v-slot:modal_header_slot>
      <h5 class="modal-title">SC Bacteria Data Info</h5>
      <button type="button" @click="$emit('close-bacteria-modal')" class="btn-close"><span >&times;</span></button>
    </template>
    <template v-slot:state_program_blurb>
      <p>
        South Carolina Department of Health and Environmental Control routinely collect water samples at more than 120 locations along South Carolina's beaches.
        If high numbers of bacteria are found, we issue an advisory for that portion of the beach.
        An advisory means that DHEC advises you NOT to swim in those areas.
        This is especially true for young children, the elderly, and those with compromised immune systems.
      </p>
      <p>
        For more information, go <a href="https://scdhec.gov/environment/your-water-coast/ocean-coastal-resource-management-ocrm/beach-management/beach-monitoring">here</a>
      </p>
    </template>
  </BacteriaDataModal>
</template>

<script>
import BacteriaDataModal from "@/components/bacteria_data_page";
export default {
  name: "SCDHECBacteriaPopup",
  components: {
    BacteriaDataModal
  },
  mounted() {
    console.debug("SCDHECBacteriaPopup mounted.")

  }
}
</script>

<style scoped>

</style>
