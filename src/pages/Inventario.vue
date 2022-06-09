<template>
  <q-page>
    <div class="q-pa-md">

      <!--                                  -->

      <Tabla></Tabla>
    </div>
  </q-page>
</template>
<script>
//import { defineComponent } from '@vue/composition-api'
import axios from "axios";
import { mapState } from 'vuex';

import Tabla from '../components/Tabla.vue'

export default{
    name: "Inventario",
    computed: {
        ...mapState(["baseurl"])
    },
    data() {
        return {
            data: {},
            nombre_inventario: null,
            tipo_inventario: null,
            ubicacion_inventario: null,
            nombre_usuario: sessionStorage.getItem("nombre"),
        };
    },
    methods: {
        activar() {
        },

    },
    created() {

    },
    components: { Tabla }
}
</script>

<style  scoped>
.btn{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px;
}
.btn .my-card{
  margin-left: 15px;
  width: 17%;
  text-align: center;
  margin-bottom: 18px;
}
.table .my-card{
  width: 100%;
  max-width: 100%;

}
</style>
