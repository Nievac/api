<div class="card w-full bg-base-100 shadow-xl min-h-fit">
    <div class="card-body">
        <div class="text-right">
            <button class="btn btn-accent">
                <span class="loading loading-spinner"></span>
                Add
            </button>
        </div>
        <h2 class="card-title">API List</h2>
        
        <div id="list-api-container"></div>
        <div id="add-api-container"></div>
    </div>
</div>

<script>
    window.onload = async function () {
        const appkey_listAPI = 'b0000f1479f34f77b037';
        const appkey_addAPI = 'b1f8adeb42ca4f999a15';
        const initialApiList = await deployDP('list-api-container', appkey_listAPI);
        const addApi = await deployDP('add-api-container', appkey_addAPI);
    }
</script>

<?php 
$additional_scripts = array_merge($additional_scripts ?? [], [
    ''
]);
?>