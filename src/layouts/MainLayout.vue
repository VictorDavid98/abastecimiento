<template>
  <q-layout  view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-black header">

        <q-toolbar class="bg-primary text-white q-my-md nab">
          <q-tabs>
            <q-btn to="/" flat round dense icon="home" class="q-mr-sm" />
            <q-separator dark vertical inset />
            <q-btn  flat > bienvenido {{nombre}}</q-btn>
            <!--<q-item v-for="n in 3" :key="`x.${n}`" clickable v-close-popup tabindex="0">
              <q-btn stretch flat label="Opcion" />

            </q-item>-->
            <q-btn stretch flat label="Mis inventarios" to="/inventario" />
          </q-tabs>
          <q-space />

          <!--<q-btn-dropdown stretch flat label="Opciones">
            <q-list>
              <q-item-label header>Acciones</q-item-label>
              <q-item v-for="n in 3" :key="`x.${n}`" clickable v-close-popup tabindex="0">

                <q-item-section avatar>
                  <q-avatar icon="home" color="secondary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>

              </q-item>
              <q-separator inset spaced />
              <q-item-label header>Files</q-item-label>
              <q-item v-for="n in 3" :key="`y.${n}`" clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar icon="task" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Vacation</q-item-label>
                </q-item-section>

              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-separator dark vertical inset />-->
          <q-btn-dropdown  flat round stretch dense icon="person" class="q-mr-sm datos">
            <q-list>
              <q-item-label header>Informacion:</q-item-label>
               <q-item-label header>Nombre: {{nombre}}</q-item-label>
               <q-item-label header>Email: {{email}}</q-item-label>
               <q-item-label header>Company: {{company}}</q-item-label>
               <q-item-label header>id: {{id}} SACAR </q-item-label>
               <q-item>
                <q-btn color="red" @click="cerrar_sesion" icon-right="logout" label="Cerrar sesion" />
               </q-item>
            </q-list>
          </q-btn-dropdown>
          <!--<q-separator dark vertical /> -->

        </q-toolbar>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Titledsa</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>

import { ref } from 'vue'
import axios from "axios";
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(["baseurl"])
  },
  data () {
    return {
      id:sessionStorage.getItem("id"),
      nombre: sessionStorage.getItem("nombre"),
      last_name:sessionStorage.getItem("last_name"),
      email: sessionStorage.getItem("email"),
      company:sessionStorage.getItem("company"),
      rutcompany:sessionStorage.getItem("rutcompany")
    }
  },

  created() {
        if(sessionStorage.email==null){

          this.$router.push({ path: "/login" });

        }
  },
  methods:{
    cerrar_sesion(){
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("nombre");
      sessionStorage.removeItem("company");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("rutcompany");

      this.$router.push({ path: "/login" });
    }
  }

}

</script>

<style scoped>

.center{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.header{
  height: 7.5%;

}
.nab{
  margin: 13px;
}




</style>
