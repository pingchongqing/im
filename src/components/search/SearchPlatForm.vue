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
                typeId: 1,
            }
        },
        components: {
            searchComponent
        }
    }
</script>