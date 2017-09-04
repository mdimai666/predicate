<?php global $core; ?>

    <script src="/modules/monaco-editor/plugins/emmet/vendor/emmet-snippets.js"></script>
    <script src="/modules/monaco-editor/plugins/emmet/dist/emmet-monaco.js"></script>
    <script src="/modules/monaco-editor/min/vs/loader.js"></script>

    <script src="/pages/monaco.js"></script>


<script>
	var codeLang = "html,javascript,json,css,less,razor,csharp,typescript,xml,plaintext";
</script>

<div id="code_container" style="width:100%;min-height:100vh;border:1px solid grey"></div>
<textarea id="buffer" class="hidden">function dima() {}</textarea>
<textarea id="json-data" class="form-control">@(post?.json??"{}")</textarea>

<!-- 

@{
    int id = -1;
    bool tid = int.TryParse(Request.Params["id"], out id);
    id = tid ? id : -1;


    string text = "";
    string title = "";
    string json = "{}";

    Post post = null;

    //if is update post
    if (id > -1)
    {
        EE E = new EE(new Model1Container());

        post = E.Posts.Get(id);

        text = post.Text;
        title = post.Title;

        json = G.ToJson(post);
    } else
    {
        //if create new post
        post = new Post();

        int g_type = (int)EPost_Type.Post;
        EPost_Type e_type;

        if (Enum.TryParse(Request.Params["g_type"], out e_type))
        {
            g_type = (int)e_type;
        }

        post.PostType = g_type;


    }

    //string codeLang = "html,javascript,json,css,less,razor,csharp,bat,c,coffeescript,cpp,dockerfile,fsharp,go,handlebars,ini,java,lua,markdown,msdax,objective-c,php,plaintext,postiats,powershell,pug,python,r,ruby,scss,sol,sql,swift,typescript,vb,xml,yaml";
    string codeLang = "html,javascript,json,css,less,razor,csharp,typescript,xml,plaintext";

    List<SelectListItem> codeLangList = new List<SelectListItem>();

    //foreach(var s in codeLang.Split(','))
    //{
    //    codeLangList.
    //}

    codeLang.Split(',').ToList().ForEach(s =>
    {
        codeLangList.Add(new SelectListItem() { Text = s, Value = s });
    });



}

<h1>@Page.Title</h1>

<br><br>
<div class="u-admin-post-editor">

    <div class="editor-data1" data-id="@id">
        <script>
            var data1 = @Html.Raw(json);
        </script>
    </div>

    <div class="toolbar">
        <div class="pull-right">
            @if (id > -1)
            {
                string pp = "";
                if (post.UniqueName.IsEmpty())
                {
                    pp = @"id=" + id.ToString();
                }
                else
                {
                    pp = @"p=" + post.UniqueName;
                }
                string url1 = (post.PostType == 0) ? "/Blog/?id=" + id : "/Pages?" + pp;

                @*<a class="btn btn-default" target="_blank" href="@url1">Просмотр</a>*@
            }
            <a class="btn btn-default" href="~/Admin/Post/EditPost/?show=Code">Закрыть</a>
            <button class="btn btn-primary" onclick="admin_post_editor_save()">Сохранить</button>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-6">

            @BS.fg()
            @BS.TextBox("edit1", @title, placeholder: "Введите заголовок", attr: "required autocomplete=\"on\" autofocus")
            @BS.fge()

            @BS.fg()
            @BS.TextBox("edit_unique_name", @post?.UniqueName, placeholder: "post unique name")
            @BS.fge()

            <br />
        </div>

        @*<textarea id="memo1" name="content" contenteditable="true">@text</textarea>*@
    </div>
    <div class="row">
        <div class="col-xs-12">
            @BS.fg()
            @BS.Dropdown("edit_post_type", G.EnumToList(EPost_Type.Code, @post?.PostType.ToString()), label: "Type: ")

            @BS.Dropdown("editor_language", codeLangList, label: "Lang: " , attr:"save-json='code_language'")
            @BS.fge()

        <div id="code_container" style="width:100%;min-height:100vh;border:1px solid grey"></div>
        <textarea id="buffer" class="hidden">@text</textarea>
        <textarea id="json-data" class="form-control">@(post?.json??"{}")</textarea>
        </div>
    </div>
</div>


 -->
