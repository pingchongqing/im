<template>
    <div>
    </div>
</template>

<script>
    import searchComponent from"./SearchComponent.vue"
    export default {
        data() {
            return {
                typeId: 4,
            }
        },
        mounted: function () {
            this.setDefaultValues();
            this.getData();
        },
        methods: {
            getData: function () {

            },
            setDefaultValues: function () {
                var self = this;
                self.$bus.emit('headerText', self.$route.query.name);

            },

        },
    }
</script>