<template>
    <div id="wq-popup">
        <div id="wq_card"
             class="card wq-card"
        >
            <div class="card-header">
              Beach Conditions Reporting System
            </div>
            <div class="card-body">
              <p>
                Beach Ambassador Site: {{bcrs_site_name}}
              </p>
              Click <a :href="bcrs_site_link" target="_blank">here</a> to view the Beach Ambassador report.
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BCRSSPopup',
        props: {
          'feature': {default: undefined},
        },
        components: {
        },
        data() {
            return {}
        },
        mounted() {
            console.debug("BCRSSPopup mounted");
        },
        computed: {
          bcrs_site_link: function() {
            if(this.feature != undefined)
            {
              return(this.feature.properties[this.feature.properties.site_type].site_url);
            }
            return('');
          },
          bcrs_site_name: function() {
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
/style>
