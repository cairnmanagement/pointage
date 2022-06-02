<template>
	<div v-if="$store.state.login">
		<div class="p-2">
			<Calendar />
		</div>

		<PebbleSpinner/>
	</div>
</template>

<style lang="scss" scoped>
.logo {
	max-width:360px;
	display:block;
	margin:20px auto;
}
</style>

<script>

import Calendar from "@/components/Calendar.vue"
import PebbleSpinner from "../components/PebbleSpinner.vue"


export default {
	name: 'Home',


	components : {
    Calendar,
    PebbleSpinner
},
	
}
</script>
