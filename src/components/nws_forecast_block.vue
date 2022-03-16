<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        Forecast for {{forecast_for}}
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        {{forecast_short_forecast}}
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        Temperature: {{forecast_temperature}}
      </div>
      <div class="col-sm-3">
        Wind: {{forecast_wind}}
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'NWSForecastBlock',
  props: {
    'forecast': {default: undefined},
    'longitude': {type: Number, default: undefined},
    'latitude': {type: Number, default: undefined}
    },
  data() {
    return {}
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
