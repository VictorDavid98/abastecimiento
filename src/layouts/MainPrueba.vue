<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-orange-4 shadow-1 text-white" height-hint="200">
      <q-toolbar
        class="q-toolbar"
      >
        <q-toolbar-title >

             <q-icon name="home" color="accent" size="50px"  />
              INVENTARIO loginsa
        </q-toolbar-title>
        <q-space />
        <q-btn-dropdown  size="20px" flat round stretch dense icon="person" class="q-mr-sm datos">
            <q-list>
              <q-item-label header>Informacion:</q-item-label>
               <q-item-label header>Nombre: {{nombre}}</q-item-label>
               <q-item-label header>Email: {{email}}</q-item-label>
               <q-item-label header>Company: {{company}}</q-item-label>
               <q-item-label header>id: {{id}} SACAR </q-item-label>
               <q-item class="options-dropdown">
                <q-btn  class="btn-dropdown" color="primary" to="/inventario" icon-right="list" label="Mis inventarios" />
                <q-btn  class="btn-dropdown" color="red" @click="cerrar_sesion" icon-right="logout" label="Cerrar sesion" />
               </q-item>
            </q-list>
          </q-btn-dropdown>
      </q-toolbar>
      <!--------------------------------------------------------------------------------->
      <section class="helper">
        <q-tabs
        v-for="item in menus" :key="item"

        inline-label
        class="bg-orange-4  qtabs1"
        >
          <q-route-tab exact :label="item.title" :icon="item.icon"  @click="currentMenu(item.id)" />

        </q-tabs>
      </section>
      <!---------------------------------------------------------------------------------->
      <section class=" navChildren">

        <q-tabs
          v-for="item in menu_childrens" :key="item"
          inline-label
          class="bg-orange  qtabs1"
         >
          <q-route-tab exact v-if="item.id_menu==menu_aux" :label="item.title" :icon="item.icon" @click="currentMenuChildren(item.path)" />

        </q-tabs>
      </section>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
<!--
    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    -->

  </q-layout>
</template>
<script>
import { ref } from 'vue'
import axios from "axios";
import { mapState } from 'vuex';

export default ({
  computed: {
    ...mapState(["baseurl"])
  },
  setup() {

  },
  data(){
     return{
      id:sessionStorage.getItem("id"),
      nombre: sessionStorage.getItem("nombre"),
      last_name:sessionStorage.getItem("last_name"),
      email: sessionStorage.getItem("email"),
      company:sessionStorage.getItem("company"),
      rutcompany:sessionStorage.getItem("rutcompany"),
      menus:[],
      menu_childrens:[],
      menu_aux:'',
    }

  },
  created() {
        this.cargar_menus();
        this.cargar_menuchildren();
        if(sessionStorage.email==null){
          this.$router.push({ path: "/login" });
        }
        console.log(this.menus);
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
    },
    cargar_menus(){
      axios
      .get(this.baseurl+"/web/menu/permiso/"+sessionStorage.getItem("id")).then(response => {
        response.data.forEach(element => {
           //console.log(element);
           this.menus.push(element);
        });
        this.menu_aux=this.menus[0].id;


      })
      .catch(e => {
            console.log(e);
        });
    },
    cargar_menuchildren(){
      axios
      .get(this.baseurl+"/web/menuchildrens/registeruser/"+sessionStorage.getItem("id")).then(response => {
        response.data.forEach(element => {
           //console.log(element);
          this.menu_childrens.push(element);
        });
        //console.log(this.menus);

      })
      .catch(e => {
            console.log(e);
        });
    },
    currentMenu: function (idMenu){
      this.menu_aux=idMenu;
      console.log(this.menu_aux);

    },
    currentMenuChildren: function (idMenuChildren){

      this.$router.push({ path: idMenuChildren });

    }


  }
})
</script>


<style scoped>
.qtabs1{
  background-color: #ff9800;
  height: 50px;
}
.q-toolbar{
  height: 90px;
}
.options-dropdown{
  display: flex;
  flex-direction: column;
}
.btn-dropdown{
  padding: 5px;
}
.helper{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.navChildren{
  background-color: #ff9800;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
