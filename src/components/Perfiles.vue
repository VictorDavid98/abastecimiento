<template>
  <div class="q-pa-md">
    <q-table
      title="Perfiles"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
    >
      <template v-slot:top-left>
        <q-btn
          color="blue"
          label="Agregar nuevo perfil"
          @click="newPerfilDialog = true"
        />
      </template>
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            color="blue"
            icon="mdi-pencil-outline"
            label="editar"
            @click="editar(props.row)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
    <editarPerfil
      v-if="dialogo == true"
      @cerrarDialogo="aux"
      :datos="datos"
    ></editarPerfil>
    <q-dialog v-model="newPerfilDialog">
      <q-card class="card">
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              v-model="nombre_perfil"
              label="Nombre del perfil"


              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              filled
              v-model="desc_perfil"
              label="Descripcion del perfil"

              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Cancelar"
                @click="newPerfilDialog=false"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState } from "vuex";
import axios from "axios";
import { QRouteTab } from "quasar";
import editarPerfil from "components/editarPerfil";

export default {
  setup() {
    const filter = ref("");
    const rowCount = ref(10);
    return {
      filter,
    };
  },
  computed: {
    ...mapState(["baseurl"]),
  },
  data() {
    return {
      ultimo:'',
      nombre_perfil:'',
      desc_perfil:'',
      newPerfilDialog: false,
      dialogo: false,
      datos: {},
      columns: [
        {
          name: "codigo",
          required: true,
          label: "Codigo",
          align: "left",
          field: (row) => row.codigo,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "perfiles",
          align: "center",
          label: "Perfiles",
          field: "nombre_perfil",
          sortable: true,
        },
        {
          name: "descripcion",
          align: "center",
          label: "Descripcion",
          field: "desc_perfil",
          sortable: true,
        },
        { name: "estado", label: "Estado", field: "estado" },
        { name: "actions", label: "detalles", align: "right" },
      ],
      rows: [],
    };
  },
  methods: {
    cargar_perfiles() {
      axios
        .get(
          this.baseurl +
            "/perfiles/registeruser/" +
            sessionStorage.getItem("id")
        )
        .then((response) => {
          response.data.forEach((element) => {
            this.rows.push(element);
          });
          this.ultimo=this.rows[this.rows.length-1].codigo + 1

          console.log(this.rows);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onSubmit(){
       let perfilDto={
         codigo:this.ultimo,
         nombre_perfil:this.nombre_perfil,
         desc_perfil:this.desc_perfil,
         estado:true,
         visible:true
       }
       axios
       .post(this.baseurl+"/web/perfil/"+sessionStorage.id,perfilDto).then(response=>{
          if(response.status==201){
            location.reload
            this.newPerfilDialog= false

          }
       })
       .catch(e=>{
        console.log(e);
      });
    },
    editar(perfil) {
      this.datos = perfil;
      this.dialogo = true;
    },
    aux() {
      this.dialogo = false;
    },
  },
  created() {
    this.cargar_perfiles();
  },
  components: {
    editarPerfil,
  },
};
</script>
<style>
.card{
  width:500px;
  height: 300px;
}
</style>
