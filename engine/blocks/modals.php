<?php global $core; ?>

<!-- Modal -->
<!--<div id="imgpreview" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body" data-dismiss="modal"></div>      
    </div>
  </div>
</div>-->

<div id="imgpreview" class="modal" onclick="$('#imgpreview').modal('hide');">
  <!-- The Close Button -->
  <!--myModal-->
  <span class="close" onclick="$('#imgpreview').modal('hide');">&times;</span>
  <!-- Modal Content (The Image) -->
  <img class="modal-content img01">
  <!-- Modal Caption (Image Text) -->
  <div class="caption"></div>
</div>