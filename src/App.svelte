<script>
	import NoteCard from "./components/NoteCard.svelte";

	let isEdit = false;
	let data = {
		title: "",
		category: "",
		content: "",
		id: null,
	};

	let notes = [
		{
			id: 1,
			title: "Sweetest framework ever",
			category: "Church",
			content: "This is the content of this note",
		},
		{
			id: 2,
			title: "Intro to svelte",
			category: "School",
			content:
				"This could be an intro to svelt,so you need to keep calm and see the magic",
		},
	];

	function addNote() {
		const newNote = {
			id: notes.length + 1,
			title: data.title,
			category: data.category,
			content: data.content,
		};
		notes = notes.concat(newNote);
		data = {
			id: null,
			title: "",
			category: "",
			content: "",
		};
		console.log(notes);
	}

	function deleteNote(id) {
		console.log(id);
		notes = notes.filter((note) => note.id !== id);
	}

	function startEditingNote(note) {
		console.log(note);
		data = note;
		isEdit = true;
	}

	function editNote() {
		isEdit = !isEdit;
		let noteDB = {
			title: data.title,
			category: data.category,
			content: data.content,
			id: data.id,
		};
		let objIndex = notes.findIndex((obj) => obj.id == noteDB.id);
		console.log("Before update: ", notes[objIndex]);
		notes[objIndex] = noteDB;
		data = {
			id: null,
			title: "",
			category: "",
			content: "",
		};
	}
</script>

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
									bind:value={data.value}
									class="form-control"
									id="category"
								>
									<option selected disaabled
										>Selecet a category</option
									>
									<option>School</option>
									<option>School</option>
									<option>School</option>
								</select>
							</div>
							<div class="form-group">
								<label for="content">Content</label>
								<textarea
									bind:value={data.value}
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
									class="btn btn-primary">Add Note</button
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
						<button class="btn btn-info" on:click={editNote(note)}>
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
