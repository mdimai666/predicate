function start(p_style) {
    var CI = { base_url: "" };

    tinymce.init({
        selector: "#memo1",
        // theme : "advanced",
        plugins: [
            "advlist autolink save link image lists charmap print preview hr pagebreak spellchecker",
            "searchreplace wordcount visualblocks visualchars code fullscreen media nonbreaking",
            " table template textcolor paste textcolor colorpicker textpattern directionality",
        ],
        //contextmenu fullpage  responsivefilemanager

        toolbar1: "save | undo redo | preview code | print fullscreen | searchreplace | bullist numlist | outdent indent blockquote | link unlink image media ",
        toolbar2: "insert | fontselect | fontsizeselect | forecolor | backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | subscript superscript",
        toolbar3: " | table | hr removeformat |  charmap | ltr rtl | visualchars visualblocks | styleselect formatselect | pagebreak",

        //responsivefilemanager 

        save_onsavecallback: function(){admin_post_editor_save()},
        menubar: false,
        image_advtab: true,
        toolbar_items_size: 'small',

        contextmenu: "link image | cut copy paste | cell row column deletetable",

        /*style_formats: [
        		{title: 'Bold text', inline: 'b'},
        		{title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
        		{title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
        		{title: 'Example 1', inline: 'span', classes: 'example1'},
        		{title: 'Example 2', inline: 'span', classes: 'example2'},
        		{title: 'Table styles'},
        		{title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
        ],*/

        // templates: [
        //     { title: 'Test template 1', content: 'Test 1' },
        //     { title: 'Test template 2', content: 'Test 2' }
        // ],
        height: 600,
        language: 'ru',
        skin: 'lightgray',
        //force_br_newlines: true,
        //force_p_newlines: false,
        relative_urls: true,

        //code format seve--
        force_br_newlines: false,
        force_p_newlines: true,
        forced_root_block: '',
        //valid_elements: "b,u,i,font[color|size]",
        //valid_children: "b,u,i,font[color|size}",
        convert_fonts_to_spans: "false",
        //extended_valid_elements: "span[!class],script[language|type|src]",
        extended_valid_elements: "script[language|type|src],hr[class|width|size|noshade],font[face|size|color|style],span[class|align|style],img[href|src|name|title|onclick|align|alt|title|width|height|vspace|hspace],iframe[id|class|width|size|noshade|src|height|frameborder|border|marginwidth|marginheight|target|scrolling|allowtransparency],style[type]",
        valid_elements: "*[*]",
        valid_children: "*[*],+body[style]",

        verify_html: false,
        //convert_fonts_to_spans: false,
        //extended_valid_elements: "script[language|type|src],hr[class|width|size|noshade],font[face|size|color|style],span[class|align|style],img[href|src|name|title|onclick|align|alt|title|width|height|vspace|hspace],iframe[id|class|width|size|noshade|src|height|frameborder|border|marginwidth|marginheight|target|scrolling|allowtransparency],style[type],a[alt,title,href,onclick,class]",
        //valid_styles: {'*':'*'},

        cleanup_on_startup: false,
        cleanup: false,
        content_css: ['/styles/bootstrap.min.css', p_style /*'/styles/style.css',*//*'/Content/Main.css'*/],

        //code format save end--
        
        // responsive file manager
        
        //external_filemanager_path:"/filemanager/",
        //filemanager_title:"Filemanager" ,
        //external_plugins: { "filemanager" : "/filemanager/plugin.min.js"},

        //pagebreak_separator: "<!-- my page break -->",

        //CDATE turn off
        init_instance_callback: function (editor) {
            // jw: this code is heavily borrowed from tinymce.jquery.js:12231 but modified so that it will
            //     just remove the escaping and not add it back.
            editor.serializer.addNodeFilter('script,style', function (nodes, name) {
                var i = nodes.length, node, value, type;

                function trim(value) {
                    /*jshint maxlen:255 */
                    /*eslint max-len:0 */
                    return value.replace(/(<!--\[CDATA\[|\]\]-->)/g, '\n')
                        .replace(/^[\r\n]*|[\r\n]*$/g, '')
                        .replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi, '')
                        .replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g, '');
                }
                while (i--) {
                    node = nodes[i];
                    value = node.firstChild ? node.firstChild.value : '';

                    if (value.length > 0) {
                        node.firstChild.value = trim(value);
                    }
                }
            });
        }
        //end

    });
}



$(document).ready(function () {

    editor_load_json();

    start($('#edit_post_style').val());

    $('#edit_post_style').change(function () {
        //tinyMCE.activeEditor.settings.content_css = [];

        tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'memo1');
        tinymce.EditorManager.execCommand('mceAddEditor', true, 'memo1');

        //tinymce.init({
        //    mode: "specific_textareas",
        //    selector: "#memo1",
        //    theme: "modern",
        //});
        var val = $(this).val();
        //alert(val);
        start(val);
    });
});



function inner_getdata() {
    if (!data1) data1 = {};
    var d = data1;

    var text = tinyMCE.activeEditor.getContent({
        format: 'raw'
    });

    d.Text = text;
    d.Title = $('#edit1').val();
    d.UniqueName = $('#edit_unique_name').val();
    d.PostType = $('#edit_post_type').val();

    d = editor_get_saveDataElements_toJson(d);


    return d;
}