var editor;
require.config({ paths: { 'vs': '/modules/monaco-editor/min/vs' } });

require.config({
    'vs/nls': {
        availableLanguages: {
            '*': 'ru'
        }
    }
});

require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('code_container'), {
        //value: [
        //    'function x() {',
        //    '\tconsole.log("Hello world!");',
        //    '}'
        //].join('\n'),
        value: $('#buffer').val(),
        language: 'javascript',
        wordWrap: 'off',
        wordWrapBreakAfterCharacters: 'off',
        //lineNumbers: 'off',


    });
    //editor.getAction('editor.action.formatDocument').run();
    //editor.getAction('editor.action.format').run()
    //editor.trigger('anyString', 'editor.action.formatDocument');
    //editor.format();
    //editor.action.formatDocument();
    //editor.call.('editor.action.formatDocument');
    //setTimeout(function () {
    //    editor.getAction('editor.action.formatDocument').run();
    //}, 1000);
    //editor.getAction('editor.action.formatDocument').run();
    //editor.getAction('editor.action.deleteLines').run();

    editor.ds = {};
    editor.ds.emmet = false;
    editor.ds.init = false;

    init_editor();

    editor.focus();
});

//READY

$(function () { return;
    //set change lang
    $('#editor_language').change(function () {
        var v = $(this).val();
        e_setLang(v);
    });

})

function init_editor() { 


    //ctrl + s  - save
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
        // admin_post_editor_save();
    });
    //ctrl + w  - wrap word
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.KEY_Z, function () {
        editor.wordWrapBreakAfterCharacters = 'on';
        editor.wordWrap = 'on';
    });

    //editor.action.formatDocument
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_F, function () {
        editor.getAction('editor.action.formatDocument').run();
    });

    //editor.action.deleteLines
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_D, function () {
        editor.getAction('editor.action.deleteLines').run();
    });

    //editor.action.copyLinesDownAction
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_D, function () {
        editor.getAction('editor.action.copyLinesDownAction').run();
    });
    
    //editor full screen
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.Enter, function () {
        $('#code_container').toggleClass('fullscreen');
        //$(window).trigger('resize');
        editor.layout();
    });

    //toggle emmet
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_E, function () {
        ds_toggle_emmet();
    });

    //editor.addAction({
    //    id: 'my_save',
    //    label: 'Save',
    //    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
    //    run: function (ed) {
    //        //var position = ed.getPosition();
    //        //var text = ed.getValue(position);
    //        //var splitedText = text.split("\n");
    //        //var line = splitedText[position.lineNumber - 1];

    //        // now you have current line
    //        // you can also get any other line
    //        // and do something with that line

    //        //splitedText[position.lineNumber - 1] = _newLineText_
    //        //ed.setValue(splitedText.join("\n"));
    //        //ed.setPosition(position); // to return the pointer to the a position before editing text

    //        alert('save');
    //        return null;
    //    },
    //    enablement: {
    //        //textFocus: true,
    //    }
    //});

    var l_enable_emmet_f = localStorage.getItem('monaco-editor-emmet') == "false";

    if (!l_enable_emmet_f) {
        ds_enable_emmet(true);
    }

    // editor_load_json();

    editor.ds.init = true;
}


function ds_toggle_emmet() {
    ds_enable_emmet(!editor.ds.emmet);
}
function ds_enable_emmet(enable) {

    var en = def(enable) ? enable : false;

    localStorage.setItem('monaco-editor-emmet', en);
    editor.ds.emmet = en;


    if (en) {
        window['emmet-monaco'].enableEmmet(editor, window.emmet);
        if (editor.ds.init)
            toastr['info']("ENABLE", "Emmet");
    } else {
        toastr['info']("DISABLE", "Emmet");
        editor.addCommand(monaco.KeyCode.Tab, function () {
            var word = "";
            var pos = editor.getPosition();
            var range = new monaco.Range(pos.lineNumber, pos.column - word.length, pos.lineNumber, pos.column);
            var id = { major: 1, minor: 1 };
            var op = { identifier: id, range: range, text: "\t", forceMoveMarkers: true };
            editor.executeEdits('', [op]);
        });
        //setTimeout(function () {
        //    location.reload();
        //}, 1000);
    }
    
}

//set editor language
function editor_get() {
    var value = window.editor.getValue();
    return value;

}

function e_setLang(v) {
    monaco.editor.setModelLanguage(editor.getModel(), v);
}



function inner_getdata() {
    if (!data1) data1 = {};
    var d = data1;

    //var text = tinyMCE.activeEditor.getContent({
    //    format: 'raw'
    //});

    var text = editor_get();

    d.Text = text;
    d.Title = $('#edit1').val();
    d.UniqueName = $('#edit_unique_name').val();
    d.PostType = $('#edit_post_type').val();
    d.DT_Updated = null;

    d = editor_get_saveDataElements_toJson(d);


    return d;
}



//id: "editor.action.selectAll",
//id: "editor.action.moveCarretLeftAction",
//id: "editor.action.moveCarretRightAction",
//id: "editor.action.transposeLetters",
//id: "editor.action.clipboardCutAction",
//id: "editor.action.clipboardCopyAction",
//id: "editor.action.clipboardPasteAction",
//id: "editor.action.clipboardCopyWithSyntaxHighlightingAction",
//id: "editor.action.commentLine",
//id: "editor.action.addCommentLine",
//id: "editor.action.removeCommentLine",
//id: "editor.action.blockComment",
//id: "editor.action.showContextMenu",
//id: "editor.action.selectHighlights",
//id: "editor.action.changeAll",
//id: "editor.action.formatDocument",
//id: "editor.action.formatSelection",
//id: "editor.action.copyLinesUpAction",
//id: "editor.action.copyLinesDownAction",
//id: "editor.action.moveLinesUpAction",
//id: "editor.action.moveLinesDownAction",
//id: "editor.action.sortLinesAscending",
//id: "editor.action.sortLinesDescending",
//id: "editor.action.deleteLines",
//id: "editor.action.indentLines",
//id: "editor.action.outdentLines",
//id: "editor.action.insertLineBefore",
//id: "editor.action.insertLineAfter",
//id: "editor.action.joinLines",
//id: "editor.action.transpose",
//id: "editor.action.transformToUppercase",
//id: "editor.action.transformToLowercase",
//id: "editor.action.insertCursorAbove",
//id: "editor.action.insertCursorBelow",
//id: "editor.action.insertCursorAtEndOfEachLineSelected",
//id: "editor.action.smartSelect.grow",
//id: "editor.action.smartSelect.shrink",
//id: "editor.action.toggleHighContrast",
//id: "editor.action.diffReview.next",
//id: "editor.action.diffReview.prev",
//id: "editor.action.jumpToBracket",
//id: "editor.action.marker.next",
//id: "editor.action.marker.prev",
//id: "editor.action.showHover",
//id: "editor.action.inPlaceReplace.up",
//id: "editor.action.inPlaceReplace.down",
//id: "editor.action.openLink",
//id: "editor.action.triggerParameterHints",
//id: "editor.action.rename",
//id: "editor.action.triggerSuggest",
//id: "editor.action.showAccessibilityHelp",
//id: "editor.action.inspectTokens",
//id: "editor.action.gotoLine",
//id: "editor.action.quickCommand",
//id: "editor.action.quickOutline",
//id: "editor.action.previewDeclaration",
//id: "editor.action.referenceSearch.trigger",





////////////////////////////////////////////////////
///////////PAGE SCRIPTS
////////////////////////////////////////////////////

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