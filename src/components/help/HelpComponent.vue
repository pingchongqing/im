<template id="help-template">
  <div>
      <goTopComponent></goTopComponent>
  </div>
</template>

<script>
    import navigationModalComponent from "../common/NavigationModal.vue"
    import goTopComponent from "../common/GoTop.vue"
    export default {
        template: '#help-template',
        components: {
          goTopComponent,
        },
    }
</script>
