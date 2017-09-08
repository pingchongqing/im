<template>
    <div>
        <storeHeaderComponent :showAmount="false"></storeHeaderComponent>
        <goodsListComponent ></goodsListComponent>
        <!-- :fixed="true" -->
    </div>
</template>

<script>
    import storeHeaderComponent from './RechargeStoreHeader.vue'
    import goodsListComponent from '../goodsList/GoodsList.vue'
    export default {
        data() {
            return {}
        },
        components: {
            storeHeaderComponent,
            goodsListComponent
        },
        mounted: function mounted() {
          this.$bus.emit('busShareUrl', window.location.href)
        },
    }
</script>
