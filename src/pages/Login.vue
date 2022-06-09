<template>
  <q-layout>
    <q-page-container>
      <q-page class=" row items-center justify-center">
        <div
          id="fondo"
          :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"
        ></div>
        <q-btn
          :color="!$q.dark.isActive ? 'black' : 'white'"
          class="absolute-top-right"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <!-- <q-icon name="assignment_ind" :color="$q.dark.isActive ? 'dark' : 'white'" style="font-size: 44em;" >
        </q-icon> -->
        <q-card flat bordered class="login-form q-pa-xl  ">
          <q-img
            src="~assets/images/loginsa.png"
            sizes="(max-width: 100px) 80px,
            200px"
          ></q-img>
          <q-card-section>
            <q-item-label
              class="text-h7 text-center"
              style="font-weight: 500;color:#124677 "
              >ABASTECIMIENTO</q-item-label
            >
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit="iniciarsesion()">
              <q-input
                v-model="usuario.email"
                :state="validationemail"
                required
                type="email"
                label="Correo Electrónico"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" color="primary" style="font-size: 1em" />
                </template>
              </q-input>
              <q-input
                v-model="usuario.password"
                label="Contraseña"
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:prepend>
                  <q-icon
                    name="password"
                    color="primary"
                    style="font-size: 1em"
                  />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    color="secondary"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <div class="row justify-center">
                <q-btn
                  class="text-capitalize items-center"
                  rounded
                  outlined
                  color="accent"
                  size="md"
                  type="submit"
                  label="Iniciar sesión"
                />
              </div>
              <div class="row justify-end">
                <q-btn
                  flat
                  class="text-capitalize"
                  color="accent"
                  size="md"
                  label="Registrarme"
                  @click="registrar = true"
                />
                <q-btn
                  class="text-capitalize"
                  flat
                  color="accent"
                  size="md"
                  label="Olvidé mi contraseña"
                  @click="card = true"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>

        <q-dialog v-model="card">
          <q-card class="my-card">
            <q-card-section>
              <q-item-label
                class="text-h5 text-center"
                style="font-weight: 500;color:#e97304 "
                >Restablecer contraseña</q-item-label
              >
            </q-card-section>
            <q-card-section>
              <q-item-label
                class="text-h7"
                style="font-weight: 500;color:#004E89 "
                >Ingrese su correo electrónico:
              </q-item-label>
              <q-input
                ref="emailrecuperar"
                v-model="emailrecuperar"
                label="Correo electrónico"
                dense
                type="email"
                class="my-form"
                :rules="[val => (val !== null && val !== '') || '']"
              />
            </q-card-section>

            <q-separator />
            <q-card-actions align="right">
              <q-btn
                @click="recuperarcontraseña()"
                label="Ok"
                color="secondary"
                filled
              />
              <q-btn v-close-popup label="Cancelar" color="secondary" filled />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="registrar">
          <q-card class="my-card">
            <q-card-section>
              <q-item-label
                class="text-h5 text-center"
                style="font-weight: 500;color:#e97304 "
                >Registrarme</q-item-label
              >
            </q-card-section>
            <q-separator color="orange" inset />
            <q-card-section>
              <q-item-section>
                <q-item-label
                  class="text-h7 "
                  :style="
                    !$q.dark.isActive
                      ? 'font-weight: 500;color:#004E89'
                      : 'font-weight: 500;color:#749ED1'
                  "
                  >Datos personales:</q-item-label
                >
                <q-input
                  ref="nombre"
                  v-model="nombre"
                  label="Nombre"
                  dense
                  class="my-form"
                  :rules="[val => (val !== null && val !== '') || '']"
                />
                <q-input
                  ref="apellido"
                  v-model="apellido"
                  label="Apellido"
                  class="my-form"
                  dense
                  :rules="[val => (val !== null && val !== '') || '']"
                />
              </q-item-section>
            </q-card-section>

            <q-card-section>
              <q-item-section>
                <q-item-label
                  class="text-h7 "
                  :style="
                    !$q.dark.isActive
                      ? 'font-weight: 500;color:#004E89'
                      : 'font-weight: 500;color:#749ED1'
                  "
                  >Datos de la empresa:</q-item-label
                >
                <q-input
                  ref="nombreEmpresa"
                  v-model="nombreEmpresa"
                  label="Nombre de la empresa"
                  class="my-form"
                  dense
                  :rules="[val => (val !== null && val !== '') || '']"
                />
                <q-input
                  ref="rutEmpresa"
                  v-model="rutEmpresa"
                  label="Rut de la empresa"
                  class="my-form"
                  dense
                  :rules="[val => (val !== null && val !== '') || '']"
                />
              </q-item-section>
            </q-card-section>

            <q-card-section>
              <q-item-section>
                <q-item-label
                  class="text-h7 "
                  :style="
                    !$q.dark.isActive
                      ? 'font-weight: 500;color:#004E89'
                      : 'font-weight: 500;color:#749ED1'
                  "
                  >Cuenta:</q-item-label
                >
                <q-input
                  ref="email"
                  v-model="email"
                  label="Correo electrónico"
                  dense
                  type="email"
                  class="my-form"
                  :rules="[val => (val !== null && val !== '') || '']"
                />
                <q-input
                  ref="passwordNewUser"
                  v-model="passwordNewUser"
                  label="Contraseña"
                  dense
                  :type="isPwd1 ? 'password' : 'text'"
                  class="my-form"
                  :rules="[val => (val !== null && val !== '') || '']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd1 ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      color="secondary"
                      @click="isPwd1 = !isPwd1"
                    />
                  </template>
                </q-input>
                <q-input
                  ref="passwordNewUser2"
                  v-model="passwordNewUser2"
                  label="Repita su contraseña"
                  dense
                  :type="isPwd2 ? 'password' : 'text'"
                  class="my-form"
                  :rules="[
                    val =>
                      (val !== null && val !== '') ||
                      'Por favor, confirme la contraseña.'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd2 ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      color="secondary"
                      @click="isPwd2 = !isPwd2"
                    />
                  </template>
                </q-input>
              </q-item-section>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn
                v-close-popup
                label="Cancelar"
                flat
                color="secondary"
                filled
              />
              <q-btn
                @click="registrarCuenta()"
                label="Listo"
                color="secondary"
                filled
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import { sha256 } from "js-sha256";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapState(["baseurl"]),
    validationemail() {
      var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      //Se muestra un texto a modo de ejemplo, luego va a ser un icono
      if (this.usuario.email == null) {
        return null;
      } else {
        if (emailRegex.test(this.usuario.email)) {
          return true;
        } else {
          return false;
        }
      }
    },
    validationcontraseña() {
      if (this.usuario.password == null) {
        return null;
      } else {
        return (
          this.usuario.password.length >= 1 && this.usuario.password.length < 50
        );
      }
    }
  },

  data() {
    return {
      card: false,
      registrar: false,
      usuario: {
        email: null,
        password: null
      },
      isPwd: true,
      isPwd1: true,
      isPwd2: true,
      licencia: null,
      notif: null,
      typenot: null,
      nombre: null,
      apellido: null,
      nombreEmpresa: null,
      rutEmpresa: null,
      email: null,
      passwordNewUser: null,
      passwordNewUser2: null,
      emailrecuperar: null
    };
  },
  methods: {
    getAbsolutePath: function() {
      var loc = window.location;
      var pathName = loc.pathname.substring(
        0,
        loc.pathname.lastIndexOf("/todologinsa") + 1
      );
      return loc.href.substring(
        0,
        loc.href.length -
          ((loc.pathname + loc.search + loc.hash).length - pathName.length)
      );
    },
    notifyalert() {
      this.$q.notify({
        message: this.notif,
        type: this.typenot
      });
    },
    recuperarcontraseña: function() {
      this.$refs.emailrecuperar.validate();
      if (this.$refs.emailrecuperar.hasError) {
        this.formHasError = true;
      } else {
        var usuario = {
          email: this.emailrecuperar,
          password: sha256("")
        };
        axios
          .post(this.baseurl + "web/login", usuario)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            if (e.response.data.Message == "Contraseña incorrecta.") {
              var pass = {
                servidor: this.getAbsolutePath(),
                correo: this.emailrecuperar
              };
              axios
                .post(this.baseurl + "web/emailpass", pass)
                .then(response => {
                  this.notif = "Correo de recuperación enviado.";
                  this.typenot = "positive";
                  this.notifyalert();
                  console.log(response.status);
                })
                .catch(e => {
                  this.notif = "Error al enviar correo.";
                  this.typenot = "negative";
                  this.notifyalert();
                  console.log(e);
                });
            } else {
              this.notif =
                e.response.data.Message +
                " Por favor, ingrese el correo electronico correcto.";
              this.typenot = "negative";
              this.notifyalert();
            }
          });
      }
    },
    registrarCuenta: function() {
      this.$refs.nombre.validate();
      this.$refs.apellido.validate();
      this.$refs.nombreEmpresa.validate();
      this.$refs.rutEmpresa.validate();
      this.$refs.email.validate();
      this.$refs.passwordNewUser.validate();
      this.$refs.passwordNewUser2.validate();

      if (
        this.$refs.nombre.hasError ||
        this.$refs.apellido.hasError ||
        this.$refs.nombreEmpresa.hasError ||
        this.$refs.rutEmpresa.hasError ||
        this.$refs.email.hasError ||
        this.$refs.passwordNewUser.hasError ||
        this.$refs.passwordNewUser2.hasError
      ) {
        this.formHasError = true;
      } else {
        if (this.passwordNewUser == this.passwordNewUser2) {
          var user = {
            name: this.nombre,
            lastName: this.apellido,
            email: this.email,
            company: this.nombreEmpresa,
            rutCompany: this.rutEmpresa,
            password: sha256(this.passwordNewUser)
            // typelicense: 1,
            // active: 1,
            // dateexpiration: null,
            // numberaccount: null
          };
          axios
            .post(this.baseurl + "/v1/registration", user)
            .then(response => {
              console.log(response.data);
              this.registrar = false;
              this.nombre = null;
              this.apellido = null;
              this.nombreEmpresa = null;
              this.rutEmpresa = null;
              this.email = null;
              this.passwordNewUser = null;
              this.passwordNewUser2 = null;

              this.$q.notify({
                message: "Se ha registrado correctamente su cuenta.",
                type: "positive",
                position: "center"
              });
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          this.$q.notify({
            message: "Las contraseñas no coinciden.",
            type: "negative",
            position: "center"
          });
        }
      }
    },
    iniciarsesion: function() {
      if (this.validationemail == true && this.validationcontraseña == true) {
        var usuario = {
          email: this.usuario.email,
          password: sha256(this.usuario.password)
        };
        axios
          .post(this.baseurl + "/login", usuario)

          .then(response => {
            var username = null;
            if (response.data[0].numberaccount == 1) {

              username =
                response.data[0].name + " " + response.data[0].last_name;
              sessionStorage.setItem("token", response.data[0].idkey);
              // sessionStorage.setItem("id", response.data[0].id_registeruser);
              sessionStorage.setItem("idadm", response.data[0].id);
              // sessionStorage.setItem("perfil", response.data[0].perfil);
              // sessionStorage.setItem(
              //   "tipousuario",
              //   response.data[0].tipousuario
              // );
              sessionStorage.setItem("username", username);
              console.log(sessionStorage);
              this.showLoading();
            }
            if (response.data[0].tipousuario == 2) {
              username =
                response.data[0].name + " " + response.data[0].last_name;
              sessionStorage.setItem("token", response.data[0].idkey);
              sessionStorage.setItem("id", response.data[0].id_registeruser);

              sessionStorage.setItem("idadm", response.data[0].id);
              sessionStorage.setItem("perfil", response.data[0].perfil);
              sessionStorage.setItem(
                "tipousuario",
                response.data[0].tipousuario
              );
              sessionStorage.setItem("username", username);

              this.showLoading();
            }
            if (response.data[0].tipousuario == 3) {
              username =
                response.data[0].name + " " + response.data[0].last_name;
              sessionStorage.setItem("token", response.data[0].idkey);
              sessionStorage.setItem(
                "tipousuario",
                response.data[0].tipousuario
              );
              sessionStorage.setItem("username", username);
              sessionStorage.setItem("id", response.data[0].id_registeruser);
              sessionStorage.setItem("perfil", response.data[0].perfil);

              this.showLoading();
            }
            this.notif = "Bienvenid@";
            this.typenot = "positive";
          })
          .catch(e => {
            this.errormensaje = e.response.data.Message;
            this.notif = " " + this.errormensaje;
            this.typenot = "negative";
            this.notifyalert();
          });
      } else {
        this.notif = "Complete correctamente todos los campos, por favor.";
        this.typenot = "negative";
        this.notifyalert();
      }
    },
    showLoading() {
      this.$q.loading.show({
        message:
          'Comprobando credenciales. <br/><span class="text-orange text-weight-bold">Espere...</span>'
      });
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.notifyalert();
        this.$router.push({ path: "/inicio" });
        this.timer = void 0;
      }, 4000);
    },

    validaRut: function(rutCompleto) {
      rutCompleto = rutCompleto.replace("‐", "-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) {
        return false;
      }

      var tmp = rutCompleto.split("-");
      var digv = tmp[1];
      var rut = tmp[0];
      if (digv == "K") digv = "k";

      return this.dv(rut) == digv;
    },
    dv: function(T) {
      var M = 0,
        S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      return S ? S - 1 : "k";
    }
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  }
};
</script>

<style>
.q-card {
  width: 400px;
}
#fondo {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.normal_gradient {
  background-image: url("~assets/images/santiago1.jpg");
  background-repeat: no-repeat;
  opacity: 0.85;
}
.dark_gradient {
  background-image: url("~assets/images/santiago1.jpg");
  background-repeat: no-repeat;
  opacity: 0.5;
  background-color: Black;
}

.login-form {
  position: absolute;
  color: #e97304;
  letter-spacing: 1px;
  border-radius: 25px;
}
.my-form {
  width: 90%;
  text-align: center;
  margin: 0 auto;
}
.my-card {
  width: 100%;
}
</style>
