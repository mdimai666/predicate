function start() {
    var CI = { base_url: "" };

    tinymce.init({
        selector: "#memo1",
        // theme : "advanced",
        plugins: [
            "advlist autolink save link image lists charmap print preview hr pagebreak spellchecker",
            "searchreplace wordcount visualblocks visualchars code fullscreen media nonbreaking",
            "responsivefilemanager table template textcolor paste textcolor colorpicker textpattern directionality",
        ],
        //contextmenu fullpage 

        toolbar1: "save | undo redo | preview code | print fullscreen | searchreplace | bullist numlist | outdent indent blockquote | link unlink image media ",
        toolbar2: "insert | fontselect | fontsizeselect | forecolor | backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | subscript superscript",
        toolbar3: "responsivefilemanager | table | hr removeformat |  charmap | ltr rtl | visualchars visualblocks | styleselect formatselect",

        save_onsavecallback: function(){js_zmysave()},
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
        force_br_newlines: true,
        force_p_newlines: false,
        relative_urls: true,
        
        // responsive file manager
        
        external_filemanager_path:"/filemanager/",
        filemanager_title:"Filemanager" ,
        external_plugins: { "filemanager" : "/filemanager/plugin.min.js"},

    });
}


start();
$(document).ready(function () {
    start();
});