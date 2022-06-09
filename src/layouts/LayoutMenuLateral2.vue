quasar<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-orange">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title style="width: 100px"
          ><q-img src="../assets/loginsa.png" class="img-logo"></q-img
        ></q-toolbar-title>
      </q-toolbar>
    </q-header>
    <section class="navChildren">
      <q-tabs v-for="item in menu_childrens" :key="item" inline-label>
        <q-route-tab
          exact
          v-if="item.id_menu == menu_aux"
          :label="item.title"
          :icon="item.icon"
          @click="currentMenuChildren(item.path)"
          class="tab-menu"
        />
      </q-tabs>
    </section>
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="250"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit back-orange">
        <q-item clickable v-ripple class="spm perfil-d" style="height: 120px">
          <q-img
            src="../assets/img-perfil.png"
            style="width: 15%; margin-left: 10px"
          ></q-img>

          <q-list class="label-menu2">
            <q-item-label> Bienvenido: {{ nombre_perfil }}</q-item-label>
            <q-item-label> {{ email }}</q-item-label>
            <q-item-label> {{ perfil }}</q-item-label>
          </q-list>
          <q-icon></q-icon>
        </q-item>

        <q-tabs v-for="item in menus" :key="item">
          <q-item clickable v-ripple class="spm">
            <q-btn
              class="separacion"
              size="12px"
              flat
              :icon="item.icon"
              align="left"
              @click="currentMenu(item.id)"
            >
              <q-item-label style="padding-left: 40px">{{
                item.title
              }}</q-item-label></q-btn
            >
          </q-item>
        </q-tabs>

        <q-item clickable v-ripple class="spm separacion">
          <q-item-section avatar>
            <q-icon name="inbox" class="separacion2" />
          </q-item-section>

          <q-item-section class="label-menu"> VER ARCHIVOS </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="spm separacion">
          <q-item-section avatar>
            <q-icon name="today" class="separacion2" />
          </q-item-section>

          <q-item-section class="label-menu">
            CALENDARIO DE PEDIDOS
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple class="spm separacion">
          <q-item-section avatar>
            <q-icon name="send" class="separacion2" />
          </q-item-section>

          <q-item-section class="label-menu"> ENVIAR </q-item-section>
        </q-item>
        <q-separator></q-separator>

        <q-item
          clickable
          v-ripple
          class="separacion spm"
          style="margin-top: 30px"
        >
          <q-item-section avatar>
            <q-icon name="logout" class="separacion2" />
          </q-item-section>

          <q-item-section @click="cerrar_sesion" class="label-menu">
            CERRAR SESIÓN
          </q-item-section>
        </q-item>
      </q-scroll-area>

      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  setup() {
    const miniState = ref(false);

    return {
      drawer: ref(false),
      miniState,

      drawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false;

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation();
        }
      },
    };
  },
  computed: {
    ...mapState(["baseurl"]),
  },
  data() {
    return {
      id: sessionStorage.getItem("id"),
      nombre: sessionStorage.getItem("nombre"),
      last_name: sessionStorage.getItem("last_name"),
      email: sessionStorage.getItem("email"),
      company: sessionStorage.getItem("company"),
      rutcompany: sessionStorage.getItem("rutcompany"),
      menus: [],
      menu_childrens: [],
      menu_aux: "",
      nombre_perfil:
        sessionStorage.getItem("nombre") +
        " " +
        sessionStorage.getItem("last_name"),
      perfil: "Admin", //Solo para ejemplo(sacar)
    };
  },
  created() {
    this.cargar_menus();
    this.cargar_menuchildren();
    if (sessionStorage.email == null) {
      this.$router.push({ path: "/login" });
    }
    console.log(this.menus);
  },
  methods: {
    cerrar_sesion() {
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("nombre");
      sessionStorage.removeItem("company");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("rutcompany");

      this.$router.push({ path: "/login" });
    },
    cargar_menus() {
      axios
        .get(this.baseurl + "/web/menu/permiso/" + sessionStorage.getItem("id"))
        .then((response) => {
          response.data.forEach((element) => {
            //console.log(element);
            this.menus.push(element);
          });
          this.menu_aux = this.menus[0].id;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cargar_menuchildren() {
      axios
        .get(
          this.baseurl +
            "/web/menuchildrens/registeruser/" +
            sessionStorage.getItem("id")
        )
        .then((response) => {
          response.data.forEach((element) => {
            //console.log(element);
            this.menu_childrens.push(element);
          });
          //console.log(this.menus);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    currentMenu: function (idMenu) {
      this.menu_aux = idMenu;
      console.log(this.menu_aux);
    },
    currentMenuChildren: function (idMenuChildren) {
      this.$router.push({ path: idMenuChildren });
    },
  },
};
</script>
<style scoped>
.label-menu {
  display: flex;
  flex-direction: column;
  text-align: start;
  padding-left: 23px;
  font-size: 12px;
  font-weight: 500;
  width: 100%;
}
.label-menu2 {
  display: flex;
  flex-direction: column;
  text-align: center;

  padding: 0 4px;
  font-size: 13px;
  font-weight: 500;
  width: 100%;
}

.separacion {
  width: 250px;
  display: flex;
  justify-content: space-between !important;
}

.separacion2 {
  padding-left: 15px;
}
.perfil-d {
  display: flex;
  align-items: center;
  background: rgb(219, 176, 54);
  background: radial-gradient(
    circle,
    rgba(219, 176, 54, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
}
.img-logo {
  width: 100px;
}

.back-orange {
  background-color: #ff9800;
  align-items: center;
}
.spm {
  margin: 0;
  padding: 0;
}
.tab-menu {
  padding: 0 10px;
}
.navChildren {
  background-color: #ff9800;
  display: flex;
  color: black;
  padding-left: 220px;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  width: 100%;
}
</style>
