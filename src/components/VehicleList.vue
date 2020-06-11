<template lang="html">
	<div class="vehicle-list h-100 w-100 d-flex flex-column justify-content-center align-items-center">
		<h1 class="exit mb-0 mt-3 mr-4" @click="close">
			X
		</h1>
    <h1>Meus veículos</h1>
		<form class="form-create" @submit.prevent="create">
			<div class="form-row">
				<div class="form-group col-md-6">
					<label for="plate">Placa</label>
					<input v-model="vehicle.plate" type="text" required class="form-control" id="plate" placeholder="ABC-1234">
				</div>
				<div class="form-group col-md-6">
					<label for="type">Tipo de Veículo</label>
					<select v-model="vehicle.type" required class="custom-select" id="type">
						<option value="-1" selected disabled>Selecione um tipo</option>
						<option value="Carro">Carro</option>
						<option value="Moto">Moto</option>
					</select>
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-4">
					<label for="make">Fabricante</label>
					<input v-model="vehicle.brand" type="text" required class="form-control" id="brand" placeholder="Tabajara">
				</div>
				<div class="form-group col-md-4">
					<label for="vehicle_model">Modelo</label>
					<input v-model="vehicle.vehicle_model" type="text" required class="form-control" id="vehicle_model" placeholder="Monster 1.0 2016">
				</div>
				<div class="form-group col-md-4">
					<label for="color">Cor</label>
					<input v-model="vehicle.color" type="text" required class="form-control" id="color" placeholder="Azul">
				</div>
			</div>
			<button type="submit" class="btn btn-info btn-block btn-lg">Cadastrar</button>
		</form>

		<b-table
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      selected-variant="success"
      :items="vehiclesTable"
      @row-selected="onRowSelected"
      responsive="sm"
			class="mt-4"
    >
      <!-- Example scoped slot for select state illustrative purposes -->
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
		<!-- <button :disabled="!selected.length > 0" @click="trash" type="button" name="button" class="btn btn-danger _rounded">Deletar</button> -->
	</div>
</template>

<script>
// TODO: verify if has a away to do this import as global
// Axios
import axios from 'axios';
// BUGFIX: same Vue CLI Service URL for CORS with Cue CLI proxy (look at "vue.config.js" file)
// axios.defaults.baseURL = 'http://localhost:4242';

export default {
	name: 'login',
	props: {
		user: {
			type: Object,
			required: true
    },
    token: {
      type: String,
      required: true
    }
	},
	data() {
		return {
			vehicles: [],
			vehicle: {
				plate: "",
				type: "",
				brand: "",
				vehicle_model: "",
        color: "",
        driver: {
          id: null,
        },
			},
		 selectMode: 'multi',
		 selected: []
		}
	},
	computed: {
		vehiclesTable() {
			let table = [];
			for (let vehicle of this.vehicles) {
				table.push({
					Placa: vehicle.plate,
					'Tipo de Veículo': vehicle.type,
					Fabricante: vehicle.brand,
					Modelo: vehicle.vehicle_model,
				});
			}
			return table;
		}
	},
	methods: {
		close() {
			this.$emit('close');
		},
		refresh() {
			axios.get('vehicles/', {
          headers: { 'Authorization': 'Token '+ this.token }
        })
				.then(response => {
					this.vehicles = response.data;
				})
				.catch(console.log)
		},
		create() {
      this.vehicle.driver = this.user.id;
			axios.post('vehicles/', this.vehicle, {
          headers: { 'Authorization': 'Token '+ this.token }
        })
				.then(response => {
					this.refresh();
					this.vehicle = {
						plate: null,
						type: -1,
						brand: null,
            vehicle_model: null,
            color: null,
            driver: {
              id: this.user.id,
              userId: this.user.user,
              cpf: this.user.cpf,
            }
					}
				})
				.catch(console.log)
		},
		// trash() {
		// 	let trashList = [];
		// 	console.log("Selecteds:", this.selected)
		// 	for (let selected of this.selected) {
		// 		trashList.push(this.vehicles.find(vehicle => {
		// 			console.log("vehicle", vehicle);
		// 			console.log("selected", selected);
		// 			return vehicle.plate == selected.placa;
		// 		}))
		// 	}
		// 	for (let id of this.ids) {
		// 		this.vehicles.find(vehicle => {
		// 			console.log("ID", id);
		// 			console.log("Vehicle", vehicle);
		// 			return vehicle.id = id;
		// 		})
		// 	}
		// 	console.log("Lista de Lixo:", trashList);
		// 	axios.delete('/api/vehicle', this.vehicle)
		// 		.then(response => {
		// 			console.log(response);
		// 			this.refresh();
		// 			this.vehicle = {
		// 				plate: null,
		// 				vehicle_type: -1,
		// 				make: null,
		// 				model: null
		// 			}
		// 		})
		// 		.catch(console.log)
		// },
		onRowSelected(items) {
      this.selected = items
    },
	},
	created() {
		this.refresh();
	}
}
</script>

<style lang="css" scoped>
.vehicle-list {
	background-color: #fff;
}

.exit {
	position: absolute;
	right: 0;
	top: 0;
	font-weight: 900;
	transition: .3s;
	cursor: pointer;
}

.exit:hover {
	color: indianred
}
</style>
