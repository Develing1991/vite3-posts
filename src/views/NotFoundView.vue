<template>
	<div class="text-center py-5">
		<h1>Oops!</h1>
		<h2>404 notfound</h2>
		<div class="text-muted">요청한 페이지를 찾을 수 없습니다.</div>
		<div class="mt-4">
			<!-- {{ $route.params.pathMatch }} -->
			<RouterLink to="/">
				<button class="btn btn-primary">Home</button>
			</RouterLink>
		</div>
	</div>
</template>

<script>
	export default {
		setup() {
			return {};
		},
	};
</script>

<style lang="scss" scoped></style>
