window.addEventListener("load", function() {
  $("#tabs").tabs({
    active: 0,
    activate: function(event, ui) {
      //Ugly hack to handle blockly editor toolbox visibility
      if(ui.oldPanel.attr("id") === "blockly-editor") {
        $(".blocklyToolboxDiv").hide()
      } else if(ui.newPanel.attr("id") === "blockly-editor") {
        $(".blocklyToolboxDiv").show()
      }
    }
  });

  var workspace = Blockly.inject(
    'blocklyDiv',
    {
      media: './media/',
      toolbox: document.getElementById('toolbox')
    }
  );

  function myUpdateFunction(event) {
    var code = Blockly.GDL.workspaceToCode(workspace);
    document.getElementById('textarea').value = code;
  }
  workspace.addChangeListener(myUpdateFunction);

});
