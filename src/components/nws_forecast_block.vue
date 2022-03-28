<template>
  <div class="forecast_block">
    <div class="row">
      <div class="col-sm-12">
        <b>Forecast for {{forecast_for}}</b>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
      <div>
        <a @click="show_forecast_details_modal=true"><ins>{{forecast_short_forecast}}</ins></a>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        Temperature: {{forecast_temperature}}
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        Wind: {{forecast_wind}}
      </div>
    </div>
    <div v-show="show_forecast_details_modal" id="forecast_details_modal" class="modal nws-modal-active">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ forecast_for }}</h5>
              <button type="button" @click="show_forecast_details_modal=false" class="btn-close"><span >&times;</span></button>
            </div>
            <div class="modal-body montserat-font">
              <p>
                {{forecast_details}}
              </p>
            </div>
          </div>
        </div>
      </div>
  </div>

  </div>

</template>
<script>

export default {

  name: 'NWSForecastBlock',
  components: {
  },
  props: {
    'forecast': {default: undefined},
    'longitude': {type: Number, default: undefined},
    'latitude': {type: Number, default: undefined}
    },
  data() {
    return {
      show_forecast_details_modal: false
    }
  },
  mounted() {
    console.debug("NWSForecastBlock mounted.")
  },
  computed: {
    forecast_for: function() {
      if(this.forecast != undefined)
      {
        return(this.forecast.name);
      }
      return('');
    },
    forecast_temperature: function() {
      if(this.forecast != undefined)
      {
        return(this.forecast.temperature + ' ' + this.forecast.temperatureUnit);
      }
      return('');
    },
    forecast_wind: function() {
      if(this.forecast != undefined)
      {
        return(this.forecast.windSpeed + ' ' + this.forecast.windDirection);
      }
      return('');
    },
    forecast_short_forecast: function() {
      if(this.forecast != undefined)
      {
        return(this.forecast.shortForecast);
      }
      return('');
    },
    forecast_details: function() {
      if(this.forecast != undefined)
      {
        return(this.forecast.detailedForecast);
      }
      return('');
    }
  }
}

</script>
<style scoped>
  .forecast_block {
    background-color: #f5f5f5;
  }
</style>
