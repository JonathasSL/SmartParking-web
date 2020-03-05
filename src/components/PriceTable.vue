<template lang="html">
	<div class="spot-list h-100 w-100 d-flex flex-column justify-content-center align-items-center">
		<h1 class="text-black mb-4"><b>Tabela de Preços</b></h1>
		<h1 class="exit mb-0 mt-3 mr-4" @click="close">
			X
		</h1>
		<form class="form-create w-50" @submit.prevent="create">
			<div class="form-row">
				<div class="form-group col-md-4">
					<label for="tempo">Intervalo de Tempo</label>
					<input v-model="price.timeInterval" type="time" required class="form-control" id="tempo" placeholder="-" min="1">
				</div>
				<div class="form-group col-md-5">
					<label for="type">Tipo de Veículo</label>
					<select v-model.number="price.idVehicleType" required class="custom-select" id="type">
						<option value="-1" selected disabled>Selecione um tipo</option>
						<option value="0">Carro</option>
						<option value="1">Moto</option>
					</select>
				</div>
				<div class="form-group col-md-3">
					<label for="type">Valor (R$)</label>
					<input v-model.number="price.value" type="number" required class="form-control" placeholder="-" min="1">
				</div>
			</div>
			<button type="submit" class="btn btn-info btn-block btn-lg">Cadastrar</button>
		</form>
		<b-table
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      selected-variant="success"
      :items="priceTable"
      @row-selected="onRowSelected"
      responsive="sm"
			class="mt-4 w-50"
			v-if="priceTable.length > 0"
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
		<p v-else class="text-muted mt-4">Não há preços cadastrados</p>
		<button :disabled="!selected.length > 0" @click="trash" type="button" name="button" class="btn btn-danger _rounded">Deletar</button>
	</div>
</template>

<script>
// TODO: verify if has a away to do this import as global
// Axiosspot
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
			prices: [],
			ids: [],
			price: {
				idParking: this.userId,
				idVehicleType: null,
				timeInterval: null,
				value: null
			},
		 selectMode: 'multi',
		 selected: []
		}
	},
	computed: {
		priceTable() {
			let table = [];
			for (let price of this.prices) {
				table.push({
					ID: price.idPrice,
					Tempo: price.timeInterval,
					'Tipo de Veículo': price.idVehicleType === 0 ? 'Carro' : 'Moto',
					Valor: `R$${price.value}`
				});
				this.ids.push(price.id)
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
			axios.get(`/api/price/${this.userId}`)
				.then(response => {
					this.prices = response.data;
					console.log("Preços:", this.prices);
				})
				.catch(console.log)
		},

		create() {
			console.log(this.price)

			this.refresh();

			axios.post('/api/price', this.price)
				.then(response => {
					console.log(response);
					this.price = {
						idParking: this.userId,
						idVehicleType: null,
						timeInterval: null,
						value: null
					};
					this.refresh();
				})
				.catch(console.log)
		},

		trash() {
			let trashList = [];

			console.log("Selecteds:", this.selected)

			for (let selected of this.selected) {
				trashList.push(this.prices.find(price => {
					return price.idPrice == selected.ID;
				}))
			}

			for (let trash of trashList) {
				axios.delete(`/api/price/${trash.idPrice}`)
					.then(response => {
						console.log("Delete:", response);
						this.selected = [];
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
