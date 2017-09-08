<template>
    <div>
        <browseHistoryModalComponent></browseHistoryModalComponent>
        <searchGameComponent></searchGameComponent>
    </div>
</template>

<script>
    import searchGameComponent from "../search/SearchGameComponent.vue"
    import browseHistoryModalComponent from "../common/BrowseHistoryModal.vue"
    export default {
        components: {
            searchGameComponent,
            browseHistoryModalComponent
        },
    }
</script>
