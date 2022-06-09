<template>
  <q-page class="window-height window-width row justify-center items-center">
    <q-dialog full-width v-model="editarPerfil" persistent>
      <q-card>
        <q-card-section v-for="menu in menus" :key="menu" :id="menu.id">
          <q-toggle :label="menu.title" class="helper" v-model="aux" > </q-toggle>
          <q-space></q-space>
          <div class="helper">
            <q-toggle
              v-for="item in temp"
              :key="item"
              :label="item.title"
              v-show="item.id_menu == menu.id"
              @click="cambiarEstado(item.id,item.visible)"
              v-model="item.visible"
            >
            </q-toggle>
          </div>
          <q-separator />
        </q-card-section>
        <q-card-section>
          <q-card-actions align="center" >
            <q-btn
            style="width:100px;"
              flat
              class="bg-blue"
              label="Salir"
              color="white"
              @click="cerrarDialogo"
            />

          </q-card-actions>
          <p>{{ datos}}</p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { mapState } from "vuex";
import { ref } from "vue";
export default defineComponent({
  emits: ["cerrarDialogo"],
  props: ["datos"],
  computed: {
    ...mapState(["baseurl"]),
  },
  data() {
    return {
      aux:true,
      editarPerfil: true,
      menus: [],
      menu_childrens: [],
      permisos: [],
      temp: [],
    };
  },
  created() {
    this.cargarMenus();
    this.cargarMenuChildrens();
    this.cargarPerfilesPermiso();

  },
  methods: {
    cerrarDialogo() {
      this.$emit("cerrarDialogo");
    },
    cambiarEstado(id,visible){
      let request={
        visible:visible
      }
      axios
      .put(this.baseurl+"/perfiles_permisos/"+id,request).then(response=>{

      })
      .catch(e=>{
        console.log(e);
      });
    },
    cargarMenus() {
      axios
        .get(this.baseurl + "/web/menu/permiso/" + sessionStorage.getItem("id"))
        .then((response) => {
          response.data.forEach((element) => {
            //console.log(element);
            this.menus.push(element);
          });
          console.log(this.menus);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cargarMenuChildrens() {
      axios
        .get(
          this.baseurl +
            "/web/menuchildrens/all/registeruser/" +
            sessionStorage.getItem("id")
        )
        .then((response) => {
          response.data.forEach((element) => {
            //console.log(element);
            this.menu_childrens.push(element);
          });
          console.log(this.menu_childrens);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cargarPerfilesPermiso() {
      axios
        .get(
          this.baseurl +
            "/perfiles_permisos/perfil/" +
            this.datos.codigo +
            "/registeruser/" +
            sessionStorage.getItem("id")
        )
        .then((response) => {
          response.data.forEach((element) => {
            this.permisos.push(element);
            console.log(element);

          });

          this.crearTemp();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    crearTemp() {

      this.permisos.forEach(element => {

        this.menu_childrens.forEach(element2 => {
          if(element.id_menuChildren==element2.id)
          element.title=element2.title;
        });
        this.temp.push(element);
      });

      console.log(this.temp);
    },
  },
});
</script>
<style scoped>
.inputs-signup {
  padding: 5px;
}
.helper {
  display: flex;
  justify-content: center;
}
</style>
