<template>
<q-page class="window-height window-width row justify-center items-center">
  <q-dialog v-model="registrarUsuario" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="eva-edit-2-outline" color="primary" text-color="white" />
        </q-card-section>
        <q-card-section>
          <h4>Rellene los datos del formulario para registrarse</h4>
        </q-card-section>
        <q-card-section >
           <q-form  @submit="submitForm" class="q-gutter-md">
            <q-input class="inputs-signup" standout="bg-primary text-white" v-model="nombre" type="text" label="Nombre" />
            <q-input class="inputs-signup" standout="bg-primary text-white" v-model="last_name" type="text" label="Apellido" />
            <q-input class="inputs-signup" standout="bg-primary text-white" v-model="email" type="email" label="Email" />
            <q-input class="inputs-signup" standout="bg-primary text-white" v-model="password" type="password" label="Contraseña" />
            <q-input class="inputs-signup" standout="bg-primary text-white" v-model="company" type="text" label="Nombre de su compañia" />
            <q-input class="inputs-signup" standout="bg-primary text-white" v-model="rutcompany" type="text" label="Rut de la compañia" />
           <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" @click="cerrarDialogo" />
            <q-btn flat type="submit" label="Registrarse"  color="primary"  />
            </q-card-actions>
            </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import axios from "axios";
import { mapState } from 'vuex';
export default defineComponent({
  name: 'EssentialLink',
  emits: ['cerrarDialogo'],
  computed: {
    ...mapState(["baseurl"])
  },
  data () {
    return {
      registrarUsuario: true,
      nombre: '',
      last_name: '',
      email: '',
      password: '',
      company: '',
      rutcompany:''

    }
  },
  methods: {
    cerrarDialogo () {
      this.$emit('cerrarDialogo')
    },
    submitForm () {
      let registeruserDto = {
        name:this.nombre,
        last_name:this.last_name,
        email:this.email,
        password:this.password,
        company:this.company,
        rutcompany:this.rutcompany



      }
      axios
      .post(this.baseurl+"/web",registeruserDto).then(response=>{
        if(response.status==201){
        sessionStorage.setItem("id",response.data.id);
        sessionStorage.setItem("email",response.data.email);
        sessionStorage.setItem("nombre",response.data.name);
        sessionStorage.setItem("last_name",response.data.last_name);
        sessionStorage.setItem("company",response.data.company);
        sessionStorage.setItem("rutcompany",response.data.rutcompany);
        //this.$router.push({ path: "/index" });

        }
        else{
          alert("Error al crear usuario");
        }
      })
      .catch(e=>{
        console.log(e);
      });
    },

  }

})

</script>
<style scoped>
.inputs-signup{
  padding:5px;
}

</style>
