<template lang="html">
	<div class="spot-list h-100 w-100 d-flex flex-column justify-content-center align-items-center">
		<h1 class="text-black mb-4"><b>Lista de Vagas</b></h1>
		<h1 class="exit mb-0 mt-3 mr-4" @click="close">
			X
		</h1>
		<form class="form-create w-50" @submit.prevent="create">
			<div class="form-row">
				<div class="form-group col-md-2">
					<label for="plate">Quantidade</label>
					<input v-model="spot.ammount" type="number" required class="form-control" id="ammount" placeholder="-" min="1">
				</div>
				<div class="form-group col-md-5">
					<label for="type">Tipo de Vaga</label>
					<select v-model="spot.idVehicleType" required class="custom-select" id="type">
						<option value="-1" selected disabled>Selecione um tipo</option>
						<option value="0">Carro</option>
						<option value="1">Moto</option>
					</select>
				</div>
				<div class="form-group col-md-5">
					<label for="type">Status</label>
					<select v-model="spot.idStatus" required class="custom-select" id="type">
						<option value="-1" disabled>Selecione um status</option>
						<option v-for="(status, index) in statusList" :key="status.id" :value="status.id" :selected="status.name == 'Disponivel'">{{status.name}}</option>
					</select>
				</div>
			</div>
			<button type="submit" class="btn btn-info btn-block btn-lg">Cadastrar</button>
		</form>

		<b-table
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      selected-variant="success"
      :items="spotsTable"
      @row-selected="onRowSelected"
      responsive="sm"
			class="mt-4 w-50"
    >
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
		<button :disabled="!selected.length > 0" @click="trash" type="button" name="button" class="btn btn-danger _rounded">Deletar</button>
	</div>
</template>

<script>
// TODO: verify if has a away to do this import as global
// Axios
import axios from 'axios';
// BUGFIX: same Vue CLI Service URL for CORS with Cue CLI proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:4242';

export default {
	name: 'SpotList',
	props: {
		userId: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			spots: [],
			ids: [],
			statusList: [],
			spot: {
				idParking: this.userId,
				idVehicleType: null,
				idStatus: null,
				ammount: null
			},
		 selectMode: 'multi',
		 selected: []
		}
	},
	computed: {
		spotsTable() {
			let table = [];
			for (let spot of this.spots) {
				table.push({
					ID: spot.id,
					Nome: spot.name,
					'Tipo de Veículo': spot.idVehicleType === 0 ? 'Carro' : 'Moto',
					Status: this.statusList.find(status => status.id == spot.idStatus).name
				});
				this.ids.push(spot.id)
			}

			console.log(table)
			return table;
		}
	},
	methods: {
		close() {
			this.$emit('close');
		},

		refresh() {
			axios.get('/api/parking_spot')
				.then(response => {
					this.spots = response.data.filter(spot => {
						return spot.idParking == this.userId;
					});
					console.log("Spots:", this.spots)
				})
				.catch(console.log)
		},

		create() {
			console.log(this.spot)

			this.refresh();

			axios.post('/api/parking_spot', this.spot)
				.then(response => {
					console.log(response);
					this.spot = {
						idParking: this.userId,
						idVehicleType: null,
						idStatus: null,
						ammount: null
					};
					this.refresh();
				})
				.catch(console.log)
		},

		trash() {
			let trashList = [];

			console.log("Selecteds:", this.selected)

			for (let selected of this.selected) {
				trashList.push(this.spots.find(spot => {
					return spot.id == selected.ID;
				}))
			}

			for (let trash of trashList) {
				axios.delete(`/api/parking_spot/${trash.id}`)
					.then(response => {
						console.log("Delete:", response);
						this.refresh();
					})
					.catch(console.log)
			}



			// for (let id of this.ids) {
			// 	this.vehicles.find(vehicle => {
			// 		console.log("ID", id);
			// 		console.log("Vehicle", vehicle);
			// 		return vehicle.id = id;
			// 	})
			// }

			console.log("Lista de Lixo:", trashList);

			// axios.delete('/api/vehicle', this.vehicle)
			// 	.then(response => {
			// 		console.log(response);
			// 		this.refresh();
			// 		this.vehicle = {
			// 			plate: null,
			// 			vehicle_type: -1,
			// 			make: null,
			// 			model: null
			// 		}
			// 	})
			// 	.catch(console.log)
		},

		onRowSelected(items) {
      this.selected = items
    },
	},
	created() {
		// Status list
		axios.get('/api/status')
			.then(response => {
				this.statusList = response.data;
			})
			.catch(console.log)

		this.refresh();
	}
}
</script>

<style lang="css" scoped>
.spot-list {
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
