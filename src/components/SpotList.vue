<template lang="html">
	<div class="spot-list vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
		<h1 class="text-black mb-4"><b>Meu estacionamento</b></h1>
		<h1 class="exit mb-0 mt-3 mr-4" @click="close">
			X
		</h1>
    <div class="garage-info">
      <span>Total de vagas: {{ parking.amount_parking_spots }}</span><br> 
      <span>Vagas disponíveis: {{ parking.available_parking_spots }}</span><br>
      <span>Preço por hora: {{ parking.price_per_hour }}</span><br>
    </div>
    <hr>
		<form class="form-create w-50" @submit.prevent="update">
      <h5>Atualizar informações</h5>
			<div class="form-row add-spots">      
				<div class="form-group col-md-6">          
					<label for="amount">Quantidade total</label>          
					<input v-model="parking.amount_parking_spots" type="number" required class="form-control" id="amount" min="1">
				</div>
        <div class="form-group col-md-6">          
					<label for="price">Preço por hora</label>          
					<input v-model="parking.price_per_hour" type="number" class="form-control" id="price" min="1">
				</div>       	             
			</div>	
      <button type="submit" class="btn btn-info btn-block center">Atualizar</button>
		</form>
    <div>
      <b-table ref="selectableTable" selectable sticky-header :select-mode="selectMode"
        selected-variant="success" :items="spotsTable" @row-selected="onRowSelected"
        responsive="sm" class="table-size" >
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
      driverList: [],
			spot: {
        id: null,
        parking: null,
        status: null,
        driver: null,
      },
      parking: {
        amount_parking_spots: null,
        available_parking_spots: null,
        price_per_hour: null,
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
          Vaga: spot.id,
					Status: spot.status_title,
					Ocupante:  spot.driver_name ? spot.driver_name : "---",
				});
			}
			return table;
    },
  },
  mounted() {
    this.parking.amount_parking_spots = this.user.amount_parking_spots;
    this.parking.available_parking_spots = this.user.available_parking_spots;
    this.parking.price_per_hour = this.user.price_per_hour;
  },
  created() {
		this.refresh();
	},
	methods: {
		close() {
			this.$emit('close');
		},
		async refresh() {
			await axios.get('parking-spots/', {
        headers: { 'Authorization': 'Token '+ this.token }
      })
      .then(response => {
        this.spots = response.data;
      }).catch(console.log)
    },
		update() {
      let updated_user;
			axios.patch(`parkings/${this.user.id}/`, this.parking, {
          headers: { 'Authorization': 'Token '+ this.token }
        })
				.then(response => {
          this.parking.price_per_hour = response.data.price_per_hour;
          this.parking.amount_parking_spots = response.data.amount_parking_spots;
          this.parking.available_parking_spots = response.data.available_parking_spots;
          updated_user = response.data;					
				})
        .catch(console.log);     
      this.$emit('updated', updated_user);
      this.refresh();
    },
    onRowSelected(items) {
      this.selected = items.map(item =>
        this.spots.find(spot => item.Vaga == spot.id)
      );
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

.garage-info {
  width: 50%;
}

.table-size {
  margin-top: 4px;
  width: 32em;
  height: 12em;
  overflow-y: auto;
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
