<template>
  <BacteriaDataModal popup_id="sc_bacteria_data_modal">
    <template v-slot:modal_header_slot>
      <h5 class="modal-title">NC Bacteria Data Info</h5>
      <button type="button" @click="$emit('close-bacteria-modal')" class="btn-close"><span >&times;</span></button>
    </template>
    <template v-slot:state_program_blurb>
      <p>
        The N.C. Recreational Water Quality Program tests 213 swimming sites, most of them on a weekly basis during the
        swimming season, which runs from April through September. All ocean beaches and high-use sound-side beaches are
        tested weekly from April though September; lower-use beaches are tested twice a month. All sites are tested
        twice a month in October and monthly from November through March. Water quality sampling results for all
        locations are posted on this site along with information about archived swimming advisories. In most cases
        swimming advisories will not be issued during the non-swimming season from Nov. 1 to March 31.
      </p>
      <p>
        For more information, go <a href="https://deq.nc.gov/about/divisions/marine-fisheries/shellfish-sanitation-and-recreational-water-quality/recreational-water-quality#about-the-program">here</a>
      </p>
    </template>
  </BacteriaDataModal>
</template>

<script>
import BacteriaDataModal from "@/components/bacteria_data_page";
export default {
  name: "NCBacteriaPopup",
  components: {
    BacteriaDataModal
  },
  mounted() {
    console.debug("NCBacteriaPopup mounted.")

  }
}
</script>

<style scoped>

</style>
