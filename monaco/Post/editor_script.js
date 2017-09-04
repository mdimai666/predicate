////////SAVE FUNC
function admin_post_editor_save() {
    var id = $('.editor-data1').attr('data-id');

    if (id > -1)
        admin_post_editor_save_update(id);
    else
        admin_post_editor_save_new();
}

function admin_post_editor_save_update(id) {

    var data1 = inner_getdata();

    $.post('/api/Posts/Update/', data1, function (data) {
        if (data.Result === "OK") {
            toastr['success']("Сохранено!");
        } else {
            toastr['error'](data.Message, "Ошибка сохранения");
        }

    }, 'json');
}

function admin_post_editor_save_new() {

    var data1 = inner_getdata();


    $.post('/api/Posts/Create/', data1, function (data) {
        if (data.Result === "OK") {
            toastr['success']("Добавлено!");
            setTimeout(function () {
                //document.location = "/Admin/Post/CodeEditor/?id=" + data.Record.PostId;
                document.location = "?id=" + data.Record.PostId;
            }, 1000)
        } else {
            toastr['error'](data.Message, "Ошибка сохранения");
        }

    }, 'json');

}

////LOAD

function editor_get_saveDataElements_toJson(d) {
    var $jsons = $('[save-json]', '.u-admin-post-editor');

    if ($jsons.length > 0) {
        //var t = JSON.parse(d.json);
        var t = JSON.parse($('#json-data').val());
        if (t === null) t = {};
        $jsons.each(function (i, e) {
            var v = $(this).attr('save-json');
            t[v] = $(this).val();
        });

        var json = JSON.stringify(t);
        $('#json-data').val(json);

        d.json = json;
    }

    return d;
}

function editor_load_json() {

    if (!def(data1, data1.json)) return;

    var json = JSON.parse(data1.json);
    var $jsons = $('[save-json]', '.u-admin-post-editor');
    $jsons.each(function (i, e) {
        var v = $(this).attr('save-json');
        if (!defkey(json, v)) return true;
        var val = json[v];
        $(this).val(val);
        if ($(this).hasClass('dropdown'))
            $(this).dropdownUpdate();
    });

}