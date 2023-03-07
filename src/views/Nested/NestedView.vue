<template>
	<ul class="nav nav-pills">
		<li class="nav-item">
			<RouterLink
				class="nav-link"
				active-class="active"
				:to="{ name: 'NestedOne', replace: true }"
				>Nested One</RouterLink
			>

			<!-- <a class="nav-link active" aria-current="page" href="#">Nested One</a> -->
		</li>
		<li class="nav-item">
			<!-- <a class="nav-link" href="#">Nested Two</a> -->
			<RouterLink
				class="nav-link"
				active-class="active"
				:to="{ name: 'NestedTwo', replace: true }"
				>Nested Two</RouterLink
			>
		</li>
	</ul>
	<hr class="my-4" />
	<RouterView />
</template>

<script setup></script>

<style lang="scss" scoped></style>
