<script src="/admin/blocks/editor.js"></script>

<style>
.input_place, .input_place label, .input_place input, .input_place select, #memo1 { font-size:1em;}
.input_place .one_field {border-bottom:2px solid rgba(0,0,0,0.7);margin-bottom:15px;}
.input_place label {color:rgb(0,0,0);margin-right:20px;}
.input_place input[type=text] {background-color:inherit; border:none; width:70%; clear:both;}
.input_place input:focus { outline:none;}
.input_place input[type=text]:-webkit-autofill {color:red; !important;}

.input_place select{background-color:inherit; width:50%;border:0;}
.input_place select:focus { outline:none;}

.input_place input[type=checkbox],.input_place input[type=radio] { width:20px; height:20px; border:1px solid black;position:relative; top:4px;}

#memo1 {/*resize: none;*/min-height: 500px; width:100%;box-sizing: border-box; border:1px solid rgba(32,188,255,0.7); padding:10px;vertical-align:top; text-align: left;font-size:1em; overflow:auto;}

</style>

<br><br>
<div class="input_place">
    <div class="one_field"><label for="edit1">Заголовок: </label>
        <input type="text" id="edit1" autofocus placeholder=" Введите заголовок" required autocomplete="on"
                value="" oldvalue=""></div>

    <textarea id="memo1" name="content" contenteditable="true"></textarea>
</div>
