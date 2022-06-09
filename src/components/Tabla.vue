<template>
  <div class="q-pa-md">
    <div class="opciones">
      <q-form @submit="seleccionar_inventario" class="q-gutter-md">
        <q-select
          outlined
          v-model="inventario_seleccionado"
          :options="options"
          label="Mis inventarios"
          options-value="id"
          option-label="nombre"
        />
        <!--<q-btn color="secondary" label="Ver productos" @click="cargar_productos"  type="submit"/>-->
      </q-form>
    </div>
    <div class="configuracion q-pa-md q-gutter-sm">
      <q-btn
        v-if="inventario_seleccionado != null"
        class="btn-config"
        to="/gestionar"
        color="primary"
        icon="inventory"
        >Gestionar {{ inventario_seleccionado.nombre }}</q-btn
      >
      <q-btn
        v-if="inventario_seleccionado != null"
        class="btn-config"
        to="/conteo"
        color="primary"
        icon="list"
        >Realizar conteo a {{ inventario_seleccionado.nombre }}
      </q-btn>
    </div>
    <q-table
      v-if="inventario_seleccionado != null"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              class="btn-tabla"
              size="sm"
              color="green"
              round
              dense
              icon="create"
            />
            <q-btn
              class="btn-tabla"
              size="sm"
              color="red"
              round
              dense
              icon="delete"
              @click="alguna_funcion"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { ref } from "vue";

export default {
  data() {
    return {
      inventarios: [],
      productos: [],
      cantInventarios: null,
      model: ref(null),
      options: [],
      columns: [
        {
          name: "name",
          required: true,
          label: "Productos",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "stock",
          align: "center",
          label: "Stock",
          field: "stock",
          sortable: true,
        },
        { name: "tipo", label: "Tipo", field: "tipo" },
        {
          name: "peso",
          label: "Peso",
          field: "peso",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        { name: "codigo", label: "Codigo", field: "codigo" },
        {
          name: "numerozona",
          label: "Zona N°",
          field: "numeroZona",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        { name: "nombrezona", label: "Nombre Zona", field: "nombreZona" },
      ],
      rows: [],
      inventario_seleccionado: null,
    };
  },
  name: "Tabla",
  computed: {
    ...mapState(["baseurl"]),
  },
  setup() {
    return {};
  },
  methods: {
    alguna_funcion() {},

    cargar_inventario() {
      axios
        .get(this.baseurl + "/inventarios/" + sessionStorage.getItem("id"))
        .then((response) => {
          response.data.forEach((element) => {
            this.inventarios.push(element);
          });
          console.log(this.inventarios);
          this.cantInventarios = this.inventarios.length;
          //encontrar otra manera y sacar
          for (let i = 0; i < this.inventarios.length; i++) {
            let opcion = {
              nombre: this.inventarios[i].nombre,
              id: this.inventarios[i].id,
            };
            this.options.push(opcion);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cargar_productos(x) {
      this.productos = [];
      let id_seleccionado;
      if (x == null) {
        alert("Para ver los productos debe elejir un inventario");
        return;
      }
      /*for(let i=0;i<this.inventarios.length;i++){
        if(this.inventarios[i].nombre==this.inventario_seleccionado){
          id_seleccionado=this.inventarios[i].id
          break
        }
      }*/

      axios
        .get(this.baseurl + "/productos/" + x.id)
        .then((response) => {
          response.data.forEach((element) => {
            this.productos.push(element);
          });
          function createRow(
            name,
            stock,
            tipo,
            peso,
            codigo,
            nombreZona,
            numeroZona
          ) {
            this.name = name;
            this.stock = stock;
            this.tipo = tipo;
            this.peso = peso;
            this.codigo = codigo;
            this.nombreZona = nombreZona;
            this.numeroZona = numeroZona;
          }
          //console.log(this.productos);
          for (let i = 0; i < this.productos.length; i++) {
            const name = this.productos[i].nombre;
            const tipo = this.productos[i].tipo;
            const peso = this.productos[i].peso;
            const codigo = this.productos[i].sku;
            let zonaproducto = [];

            axios
              .get(this.baseurl + "/zonaproducto/" + this.productos[i].id)
              .then((response) => {
                let zona_id = response.data.zona_id;
                console.log(zona_id);
                let stock = response.data.stock;
                zonaproducto.push(response.data);
                axios
                  .get(this.baseurl + "/zona/" + zona_id)
                  .then((response) => {
                    console.log(response.data);
                    let nombreZona = response.data.nombreZona;
                    let numeroZona = response.data.numeroZona;
                    let producto = new createRow(
                      name,
                      stock,
                      tipo,
                      peso,
                      codigo,
                      nombreZona,
                      numeroZona
                    );
                    this.rows.push(producto);
                    console.log(producto);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    seleccionar_inventario() {
      //console.log(this.inventario_seleccionado);
    },
  },
  created() {
    this.cargar_inventario();
  },
  watch: {
    inventario_seleccionado() {
      this.cargar_productos(this.inventario_seleccionado);
    },
  },
};
</script>
<style scoped>
.btn-tabla {
  margin: 3px;
}
.opciones {
  padding: 15px;
  text-align: center;
}
.opciones-btn {
  max-width: 25%;
  width: 25%;
}
.configuracion {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.btn-config {
  width: 40%;
}
</style>
