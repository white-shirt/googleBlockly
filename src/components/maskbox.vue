<template>
    <div id="maskbox" v-if="maskStatus">
        
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';

export default {
    name: "maskbox",
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters("mask", {
            maskStatus: "getmaskStatus"
        })
    }
}
</script>

<style scoped>
    #maskbox {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 100;
    }
</style>