<?php global $core; ?>

<a href="#" class="btn btn-primary" onclick="dima()">dima</a>
<button class="btn btn-danger" onclick="dima">Danger</button>

<a href="#myModal" data-backdrop="false" data-toggle="modal" class="btn-click1">Click Me</a>

<!-- test -->


<div id="myModal" class="modal fade xcenter" style="display:none" tabindex="-1" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">modal</h4>
			</div>
			<div class="modal-body">
				<p>modal</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
				<button id="loadpage" type="button" class="btn btn-primary">Сохранить</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->
<!-- //test -->

<script>
	// toastr['success']('ok!');

	$('#myModal .modal-body').html(function(){
		var st = '';

		var h = document.body.clientHeight;
		var w = document.body.clientWidth;
		
		var mf = $('#myModal');

		st+=w;
		st+=h;

		return st;
	})

	$(function () {

		// $('#myModal .modal-body')
		// 	.css({'padding':'0'})
			// .html('<iframe id="myIframe1" class="iframe_code" src="/monaco?ajax=true" frameborder="none"></iframe>');

		$('#myModal .modal-content').resizable({
			alsoResize: ".modal-dialog",
			minHeight: 150
		});

		$("#myModal").draggable({
			handle: ".modal-header"
		});

		$('.btn-click1').trigger('click');
	});

	function css_wh(){
		var h = document.body.clientHeight;
		var w = document.body.clientWidth;

		return {width: w, height: h}
	};

	function css_pos_center(dialog){
		var q = css_wh();
		var l = (q.width - $(dialog).width()) /2;
		var t = (q.height - $(dialog).height()) /2;
		console.log({left: l, top: t});		
		return {left: l, top: t};		
	};
</script>