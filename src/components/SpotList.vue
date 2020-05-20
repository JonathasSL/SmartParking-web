<template lang="html">
	<div class="spot-list h-100 w-100 d-flex flex-column justify-content-center align-items-center">
		<h1 class="text-black mb-4"><b>Lista de Vagas</b></h1>
		<h1 class="exit mb-0 mt-3 mr-4" @click="close">
			X
		</h1>
		<form class="form-create w-50" @submit.prevent="create">
      <h3>Adicionar vagas</h3>
			<div class="form-row add-spots">        
				<div class="form-group col-md-4">          
					<label for="plate">Quantidade</label>
					<input v-model="this.parking.amountParkingSpots" type="number" required class="form-control" id="ammount" placeholder="-" min="1">
				</div>
        <div class="form-group col-md-4">  
          <span>Quantidade atual: {{ this.user.amount_parking_spots }}</span>
        </div>        
			</div>	
      <div class="form-group col-md-4">  
        <button type="submit" class="btn btn-info btn-block btn-lg">Cadastrar</button>
      </div>		
		</form>
    <div>
    <b-table
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      selected-variant="success"
      :items="spotsTable"
      @row-selected="onRowSelected"
      responsive="sm"
			class="mt-4"
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
  </div>
		<button :disabled="!selected.length > 0" @click="trash" type="button" name="button" class="btn btn-danger _rounded">Deletar</button>
	</div>
</template>

<script>
// TODO: verify if has a away to do this import as global
// Axios
import axios from 'axios';
// BUGFIX: same Vue CLI Service URL for CORS with Cue CLI proxy (look at "vue.config.js" file)
// axios.defaults.baseURL = 'http://localhost:4242';

export default {
	name: 'SpotList',
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
			spots: [],
			statusList: [],
			spot: {
        id: null,
        parking: null,
        status: null,
        driver: null,
      },
      parking: {
        amountParkingSpots: null,
      },
      selectMode: 'multi',
      selected: [],
		}
	},
	computed: {
		spotsTable() {
      let table = [];
			for (let spot of this.spots) {
				table.push({
					Status: vehicle.plate,
					Ocupante: vehicle.type,
				});
			}
			return table;
		}
  },
  created() {
		axios.get('status/')
			.then(response => {
				this.statusList = response.data;
			})
			.catch(console.log);
		this.refresh();
	},
	methods: {
		close() {
			this.$emit('close');
		},
		refresh() {
			axios.get('parking-spots/', {
          headers: { 'Authorization': 'Token '+ this.token }
        })
				.then(response => {
					this.spots = response.data;
				})
				.catch(console.log)
    },    
		create() {
			axios.put(`parkings/${this.user.id}`, this.parking, {
          headers: { 'Authorization': 'Token '+ this.token }
        })
				.then(response => {
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
				axios.delete(`parking-spots/${trash.id}`,  {
          headers: { 'Authorization': 'Token '+ token }
        })
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
}
</script>

<style lang="css" scoped>
.spot-list {
	background-color: #fff;
}

.add-spots {
  align-items: baseline;
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
