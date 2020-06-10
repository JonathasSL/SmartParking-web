<template lang="html">
	<div class="custom-container h-100 w-100 d-flex flex-column justify-content-center align-items-center">
    <h1>Gerenciamento de vagas</h1>
		<h1 class="exit mb-0 mt-3 mr-4" @click="close">
			X
		</h1>
    <div class="tables-container">
      <h3>Vagas reservadas</h3>
      <h5 v-if="this.bookings.length == 0">Não há reservas no momento.</h5>
      <b-table
        ref="selectableTable"
        selectable
        :select-mode="selectMode"
        selected-variant="success"
        :items="bookingsTable"
        @row-selected="onRowSelectedBookings"
        responsive="sm"
        class="table-size"
      >
        <!-- Example scoped slot for select state illustrative purposes -->
        <template v-slot:cell(selectedBookings)="{ rowSelected }">
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
      <button :disabled="!selectedBookings.length > 0" @click="confirmReservation" type="button" name="button" class="btn btn-primary _rounded">Confirmar reservas</button>
    </div>
    <div class="tables-container">
      <h3>Vagas ocupadas</h3>
      <h5 v-if="this.occupieds.length == 0">Não há vagas ocupadas no momento.</h5>
      <b-table
        ref="selectableTable"
        selectable
        :select-mode="selectMode"
        selected-variant="success"
        :items="occupiedsTable"
        @row-selected="onRowSelectedOccupieds"
        responsive="sm"
        class="table-size"
      >
        <!-- Example scoped slot for select state illustrative purposes -->
        <template v-slot:cell(selectedOccupieds)="{ rowSelected }">
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
      <button :disabled="!selectedOccupieds.length > 0" @click="confirmLeave" type="button" name="button" class="btn btn-primary _rounded">Confirmar saídas</button>
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
	name: 'ManageBooking',
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
			bookings: [],
      selectedBookings: [],
      selectMode: 'multi',
      occupieds: [],
      selectedOccupieds: [],
		}
	},
	computed: {    
		bookingsTable() {
      let table = [];
			for (let book of this.bookings) {
				table.push({
          Vaga: book.parking_spot,
          Ocupante:  book.driver.name ? book.driver.name : "---",
				});
			}
			return table;
    },
    occupiedsTable() {
      let table = [];
			for (let spot of this.occupieds) {
				table.push({
          Vaga: spot.parking_spot,
          Ocupante:  spot.driver.name ? spot.driver.name : "---",
				});
			}
			return table;
    },
  },
	methods: {
    close() {
			this.$emit('close');
		},
		async refresh() {
			const bookeds = await axios.get('/bookings/?booked=true', {
        headers: { 'Authorization': 'Token '+ this.token }
      })
      this.bookings = bookeds.data;

      const busy = await axios.get('/bookings/?busy=true', {
        headers: { 'Authorization': 'Token '+ this.token }
      })
      this.occupieds = busy.data;
    },
		confirmReservation() {
      const params = { its_coming_in: true };
      this.selectedBookings.forEach(item =>
        axios.patch(`/bookings/${item.id}/`, params, {
          headers: { 'Authorization': 'Token '+ this.token }
        })
      );
      alert("Vaga(s) ocupada(s) com sucesso!")
      this.refresh();
    },
    confirmLeave() {
      const params = { its_coming_out: true };
      this.selectedOccupieds.forEach(item =>
        axios.patch(`/bookings/${item.id}/`, params, {
          headers: { 'Authorization': 'Token '+ this.token }
        })
      );
      alert("Vaga(s) liberada(s) com sucesso!")
      this.refresh();
    },
		onRowSelectedBookings(items) {
      this.selectedBookings = items.map(item =>
        this.bookings.find(booking => item.Vaga == booking.parking_spot)
      );
    },
    onRowSelectedOccupieds(items) {
      this.selectedOccupieds = items.map(item =>
        this.occupieds.find(spot => item.Vaga == spot.parking_spot)
      );
    },
	},
	created() {
		this.refresh();
	}
}
</script>

<style lang="css" scoped>
.tables-container {
  margin: 10px;
}
.custom-container {
	background-color: #fff;
}

.table-size {
  margin-top: 4px;
  width: 32em;
  height: 8em;
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
