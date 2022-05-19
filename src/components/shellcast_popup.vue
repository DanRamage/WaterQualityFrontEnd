<template>
  <div id="wq-popup">
    <div id="wq_card"
         class="card wq-card"
    >
      <div class="card-header mote-header">
        ShellCast Forecasts
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-4">
            <img class="shellcast-card" src="@/assets/images/shellcast_logo.png" alt="ShellCast forecasts">
          </div>
          <div class="col-sm-8">
            <p>
              Shellcast Growing Unit: {{ shellcast_site_name }}
            </p>
            <div>
              Click <a :href="shellcast_site_link" target="_blank">here</a> to view the ShellCast Growing Units.
            </div>
            <div>
              This will open the ShellCast website in a new tab.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'ShellcastPopup',
        props: {
          'feature': {default: undefined},
        },
        components: {
        },
        data() {
            return {}
        },
        mounted() {
            console.debug("ShellcastPopup mounted");
        },
        computed: {
          shellcast_site_link: function() {
            return('https://ncsu-shellcast.appspot.com/');
          },
          shellcast_site_name: function() {
            if(this.feature != undefined)
            {
              return(this.feature.properties.site_name);
            }
            return('');
          }
        }
    }
</script>
<style scoped>
    #wq-popup div .card-title
    {
        font-size: 1.0rem
    }
    #wq-popup div .card-subtitle
    {
        font-size: 1.0rem
    }
    .wq-card {
        /*font-family: 'Montserrat';*/
        color: rgba(0, 61, 126, .85);
        background-color: rgba(255, 255, 255, .85);
    }
    .shellcast-card {
      height: 50px;
      width: 195px;
    }
</style>
