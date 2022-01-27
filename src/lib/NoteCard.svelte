<script>
    export let note = null;
</script>

<div class="card mb-3">
    <div class="card-header">{note.category}</div>
    <div class="card-body">
        <h5 class="card-title">{note.title}</h5>
        <p class="card-text">{note.content}</p>
        <slot></slot>       
    </div>
</div>