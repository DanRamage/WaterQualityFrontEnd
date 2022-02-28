<template>
  <div class="montserat-font container page-background">
    <div class="row">
      <div class="col">
        <div class="font-avenir fs-5">
          Site: {{ site_description }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <div v-if="feature !== undefined" style="height: 250px; width: 250px">
          <vl-map id="single_site_map"
                  ref="single_site_map"
                  :load-tiles-while-animating="true"
                  :load-tiles-while-interacting="true"
                  data-projection="EPSG:4326">
            <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
            <vl-layer-tile>
              <vl-source-xyz url="https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
                             attributions=""/>
            </vl-layer-tile>
            <vl-layer-vector id="site">
              <vl-source-vector ref="site_vector_layer" :features.sync="site_feature"></vl-source-vector>
              <vl-style-func :factory="styleFunction"></vl-style-func>
            </vl-layer-vector>
          </vl-map>

        </div>
      </div>
      <div class="col-sm-4 ml-4 fs-6">
        <p>
          {{ collection_program_description }}
        </p>
        <p>
          For more information, go <a :href="collection_program_url" target="new">here</a>
        </p>
      </div>
    </div>
    <div class="row gy-0">
      <div class="col-12">
        <hr>
        <div class="row">
        </div>
      </div>
    </div>
    <div class="row gy-0">
      <div class="col-sm-12">
        <hr>
        <div class="fs-6">Alerts</div>

        <div v-if="site_feature !== undefined">
          <NWSAlerts :latitude="site_latitude"
                     :longitude="site_longitude">

          </NWSAlerts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import FeatureUtils from "../utilities/feature_funcs";

import DataAPI from "../utilities/rest_api";

import NWSAlerts from "@/components/nws_alerts";



export default {
  name: 'ShellfishPage',
  props: {
    'feature': {type: Object, default: undefined},
    'site_name': {type: String, default: undefined},
    'site_id': {type: String, default: undefined}
    //'program_type': {type: String, default: ''},
  },
  components: {
    NWSAlerts
  },
  data() {
    return {
      collection_program_info: undefined,
      program_type: "Shellfish Monitoring",
      zoom: 15,
      center: [0, 0],
      rotation: 0

    }
  },
  mounted() {
    let vm = this;
    console.debug("ShellfishPage mounted.");
    DataAPI.GetWaterQualityProgramInfo(this.$store.state.site_name, this.program_type)
        .then(program_info_rec => {
          vm.collection_program_info = program_info_rec;
        })

    if (this.site_name === undefined) {
      this.site_name = this.$store.state.site_name;
      this.site_id = this.$store.state.station_name;
      DataAPI.GetSitesPromise(this.site_name, '').then(features => {
        console.debug("Retrieved: " + features.data.sites.features.length + " features");
        vm.features = features.data.sites.features;
        for (const ndx in vm.features) {
          let site = vm.features[ndx];
          if (vm.site_id == site.properties.site_name) {
            vm.feature = site;
            vm.center = vm.feature.geometry.coordinates;
            break;
          }
        }
      });

    }
  },
  methods: {
    isDataFresh: function (data_type) {
      data_type;
      /*if (this.feature) {
        let properties = this.feature.properties;
        let site_type = this.feature.properties.site_type;
      }*/
    },
    onClose() {
    }
  },
  watch: {},
  computed: {
    site_longitude: function () {
      if (this.feature !== undefined) {
        return (this.feature.geometry.coordinates[0])
      }
      return (-1.0);
    },
    site_latitude: function () {
      if (this.feature !== undefined) {
        return (this.feature.geometry.coordinates[1])
      }
      return (-1.0);
    },
    site_feature: function () {
      if (this.feature !== undefined) {
        return ([this.feature]);
      }
      return (undefined);
    },
    site_description: function () {
      if (this.feature !== undefined) {
        return (this.feature.properties.description);
      }
      return ("");
    },
    collection_program_name: function () {
      let name = '';
      if (this.collection_program_info !== undefined) {
        name = this.collection_program_info.program_name;
      }
      return(name);
    },
    collection_program_description: function() {
      let desc = '';
      if (this.collection_program_info !== undefined) {
        desc = this.collection_program_info.description;
      }
      return(desc);
    },
    collection_program_url: function() {
      let url = '';
      if (this.collection_program_info !== undefined) {
        url = this.collection_program_info.url;
      }
      return(url);
    }

  }
}
</script>
<style scoped>
.advisory_icon {
  height: 25px;
  width: 25px;
}

.page-background {
  background-color: #FFFFFF;
  /*background-color: #003D7ED8;*/
}
</style>
