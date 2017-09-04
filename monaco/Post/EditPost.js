$(function () {

});

function js_admin_post_editor_delete(id) {
    var $TaskTableContainer = $('#TableContainer');
    var recordId = id;

    var f = confirm('Вы действительно хотите удалить эту запись?');
    if (!f) return false;

    

    $.post('/api/Posts/Delete', { PostId: id }, function (data) {
        if (data.Result === 'OK') {
            $TaskTableContainer.jtable('deleteRecord', {
                key: recordId,
                clientOnly: true
            });
        } else {
            toastr['error']('Ошибка удаления');
        }
    }, 'json');
}

function js_admin_post_editor_edit_path(id, show) {
    if (show.toLowerCase() == 'code')
        return "/Admin/Post/CodeEditor/?id=" + id;
    else
        return "/Admin/Post/Editor/?id=" + id;
}


function js_admin_post_editor_edit(id, show) {

    core.nav(js_admin_post_editor_edit_path(id, show));

    //if (show.toLowerCase() == 'code')
    //    document.location = "/Admin/Post/CodeEditor/?id=" + id;
    //else
    //    document.location = "/Admin/Post/Editor/?id=" + id;
}