<script>
	import { onMount } from "svelte";
	import * as api from "../api.js";
	import NoteCard from "../lib/NoteCard.svelte";
	import Loader from "../lib/Loader.svelte";

	let showLoader = false;

	let isEdit = false;
	let data = {
		title: "",
		category: "",
		content: "",
		id: null,
	};
	let notes = [];

	onMount(async () => {
		showLoader = true;
		await getNotes();
		showLoader = false;
	});

	async function getNotes() {
		notes = await api.get();
	}

	async function clearInputs() {
		data = {
			id: null,
			title: "",
			category: "",
			content: "",
		};
	}

	async function addNote() {
		showLoader = true;
		await api.post("", data);
		clearInputs();
		await getNotes();
		showLoader = false;
	}

	async function deleteNote(id) {
		showLoader = true;
		await api.del(id);
		await getNotes();
		showLoader = false;
	}

	function startEditingNote(note) {
		data = note;
		isEdit = true;
	}

	async function editNote() {
		showLoader = true;
		await api.put(data.id, data);
		isEdit = !isEdit;
		clearInputs();
		await getNotes();
		showLoader = false;
	}
</script>

{#if showLoader}
	<Loader size="60" unit="px" duration="1s" />
{/if}
<section>
	<div class="container">
		<div class="row mt-5">
			<div class="col-md-6">
				<div class="card p-2 shadow">
					<div class="card-body">
						<h5 class="card-title mb-4">Add New Note</h5>
						<form>
							<div class="form-group">
								<label for="title">Title</label>
								<input
									bind:value={data.title}
									type="text"
									class="form-control"
									id="text"
									placeholder="Note Title"
								/>
							</div>
							<div class="form-group">
								<label for="category">Category</label>
								<select
									bind:value={data.category}
									class="form-control"
									id="category"
								>
									<option selected disaabled
										>Selecet a category</option
									>
									<option>Church</option>
									<option>School</option>
									<option>Other</option>
								</select>
							</div>
							<div class="form-group">
								<label for="content">Content</label>
								<textarea
									bind:value={data.content}
									class="form-control"
									id="content"
									rows="3"
									placeholder="Note Content"
								/>
							</div>
							{#if isEdit === false}
								<button
									on:click|preventDefault={addNote}
									type="submit"
									class="btn btn-primary">+ Add Note</button
								>
							{:else}
								<button
									on:click|preventDefault={editNote}
									type="submit"
									class="btn btn-info">Edit Note</button
								>
							{/if}
						</form>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				{#each notes as note}
					<NoteCard {note}>
						<button
							class="btn btn-info"
							on:click={startEditingNote(note)}
						>
							Edit
						</button>
						<button
							class="btn btn-danger"
							on:click={deleteNote(note.id)}
						>
							Delete
						</button>
					</NoteCard>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	@import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");
	* {
		font-family: "Nunito", sans-serif;
	}
</style>
