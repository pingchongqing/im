<template>
    <div>
        <searchComponent :type="typeId"></searchComponent>
    </div>
</template>

<script>
    import searchComponent from"./SearchComponent.vue"
    export default {
        data() {
            return {
                typeId: 5,
                queryData: {}
            }
        },
        components: {
            searchComponent
        },
        // beforeRouteEnter (to, from, next) {
        //   let fromPlat = from.path === '/vue/search/searchPlatForm'
        //   let fromArea = from.path === '/vue/search/searchArea'
        //   if ( fromPlat || fromArea) {
        //     if (from.query.factionId) {
        //       next()
        //     } else {
        //       history.go(-1)
        //     }
        //   } else {
        //     next()
        //   }
        // },

    }
</script>
