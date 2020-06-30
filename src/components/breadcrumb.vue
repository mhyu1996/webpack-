<template>
  <div>
    <div>{{titleA}}</div>
    <div>{{titleB}}</div>
  </div>
</template>
<script>
export default {
  props:{
    titleA:{
      type: String,
      require: false,
      default: ''
    },
    titleB:{
      type: String,
      require: false,
      default: ''
    }
  },
  data() {
    return {

    };
  },
  watch: {

  },
  created() {
  },
  methods: {

  }
};
</script>
