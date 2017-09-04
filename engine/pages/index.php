<?php global $core; ?>

<a href="#" class="btn btn-primary" onclick="dima()">dima</a>
<button class="btn btn-danger" onclick="dima">Danger</button>

<a href="#myModal" data-backdrop="false" data-toggle="modal" class="btn-click1">Click Me</a>

<!-- test -->

<style>
	.modal {
		overflow: hidden;
	}

	.modal-dialog {
		margin-right: 0;
		margin-left: 0;
	}

	.modal-header {
		height: 30px;
		background-color: #444;
		color: #ddd;
	}

	.modal-title {
		margin-top: -10px;
		font-size: 16px;
	}

	.modal-header .close {
		margin-top: -10px;
		color: #fff;
	}

	.modal-body {
		color: #888;
	}

	.modal-body p {
		text-align: center;
		padding-top: 10px;
	}

	.iframe_code {
		width: 100%;
		min-height:100%;
	}
</style>


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
		// $("#myModal").css(css_pos_center($("#myModal"))).draggable({

		$('#myModal .modal-body')
			.css({'padding':'0'})
			.html('<iframe id="myIframe1" class="iframe_code" src="/monaco.php" frameborder="none"></iframe>');


		

		$('#myModal .modal-content').resizable({
			//alsoResize: ".modal-dialog",
			//minHeight: 150
		});

		$("#myModal").draggable({
			handle: ".modal-header"
		});

		// $('.modal-dialog').draggable();

		$('#myModal').on('show.bs.modal', function () {
			$(this).find('.modal-body').css({
				'max-height':'100%'
			});
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