<template>
	<form>
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>

			<input
				v-focus
				v-color="'red'"
				:value="title"
				@input="$emit('update:title', $event.target.value)"
				type="text"
				class="form-control"
				id="title"
			/>
		</div>
		<div class="mb-3">
			<label for="contents" class="form-label">내용</label>
			<textarea
				:value="contents"
				@input="$emit('update:contents', $event.target.value)"
				class="form-control"
				id="contents"
				rows="3"
			></textarea>
		</div>
		<div class="d-flex gap-2 pt-4">
			<slot name="actions"></slot>
		</div>
	</form>
</template>

<script setup>
	// const vFocus = {
	// 	mounted: el => {
	// 		el.focus();
	// 	},
	// };
	defineProps({
		title: String,
		contents: String,
	});
	defineEmits(['update:title', 'update:contents']);
	// <div class="pt-4">
	// 		<button
	// 			type="button"
	// 			class="btn btn-outline-dark me-2"
	// 			@click="goListPage"
	// 		>
	// 			목록
	// 		</button>
	// 		<button class="btn btn-primary">저장</button>
	// 	</div>
</script>

<style lang="scss" scoped></style>
