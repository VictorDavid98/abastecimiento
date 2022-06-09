<template>
  <div class="q-pa-md">
    <q-table
      title="Usuarios"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
    >
      <template v-slot:top-left>
        <q-btn
          color="blue"
          label="Agregar nuevo usuario"
          @click="newUsuarioDialog = true"
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
    <editarUsuario
      v-if="dialogo == true"
      @cerrarDialogo="aux"
      :datos="datos"
    ></editarUsuario>
    <q-dialog v-model="newUsuarioDialog">
      <q-card class="card">
        <q-card-section>
          <h4>Rellene los datos del formulario para registrarse</h4>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
             <q-input  filled class="inputs-signup" standout="bg-primary text-white" v-model="name" type="text" label="Nombre"
             lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"/>
            <q-input filled class="inputs-signup" standout="bg-primary text-white" v-model="last_name" type="text" label="Apellido"
            lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"/>
            <q-input filled class="inputs-signup" standout="bg-primary text-white" v-model="email" type="email" label="Email"
            lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"/>
            <q-input filled class="inputs-signup" standout="bg-primary text-white" v-model="password" type="password" label="Contraseña"
            lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"/>
            <q-input filled class="inputs-signup" standout="bg-primary text-white" v-model="company" type="text" label="Nombre de su compañia"
            lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"/>
            <q-input filled class="inputs-signup" standout="bg-primary text-white" v-model="rutcompany" type="text" label="Rut de la compañia"
            lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"/>

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Cancelar"
                @click="newUsuarioDialog=false"
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
import editarUsuario from "components/editarUsuario";

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
      name: '',
      last_name: '',
      email: '',
      password: '',
      company: '',
      rutcompany:'',
      newUsuarioDialog: false,
      dialogo: false,
      datos: {},
      columns: [
        {
          name: "id",
          required: true,
          label: "Id",
          align: "left",
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "name",
          align: "center",
          label: "Nombre",
          field: "name",
          sortable: true,
        },
        {
          name: "apellido",
          align: "center",
          label: "Apellido",
          field: "last_name",
          sortable: true,
        },
        { name: "email", label: "Email", field: "email" },
        { name: "password", label: "Password", field: "password" },
        { name: "compañia", label: "Compañia", field: "company" },
        { name: "rutcompañia", label: "Rut Compañia", field: "rutcompany" },
        { name: "actions", label: "detalles", align: "right" },
      ],
      rows: [],
    };
  },
  methods: {
    cargar_usuarios() {
      axios
        .get(
          this.baseurl + "/web/usuarios"
        )
        .then((response) => {
          console.log(response);
          response.data.users.forEach((element) => {
            this.rows.push(element);
          });
          this.ultimo=this.rows[this.rows.length-1].id

          console.log(this.rows);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onSubmit(){
       let registeruserDto={
          name:this.name,
          last_name:this.last_name,
          email:this.email,
          password:this.password,
          company:this.company,
          rutcompany:this.rutcompany,
          active:true
       }
       axios
       .post(this.baseurl+"/web",registeruserDto).then(response=>{
          if(response.status==201){
            location.reload
            this.newUsuarioDialog= false

          }
       })
       .catch(e=>{
        console.log(e);
      });
    },
    editar(usuario) {
      this.datos = usuario;
      this.dialogo = true;
    },
    aux() {
      this.dialogo = false;
    },
  },
  created() {
    this.cargar_usuarios();
  },
  components: {
    editarUsuario
  },
};
</script>
<style>
.card{
  width:500px;
  height: 300px;
}
</style>
