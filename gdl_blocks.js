var gt_code_count = 1;
Blockly.Blocks['guide_definition'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("Guide Definition");
    this.appendStatementInput("archetype_bindings")
    .setCheck("archetype_binding")
    .appendField("bindings");
    this.appendStatementInput("rules")
    .setCheck("rule")
    .appendField("rules");
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setColour(90);
    this.setTooltip('Define a guide definition');
  }
};
Blockly.JavaScript['guide_definition'] = function(block) {
  var archetype_bindings = Blockly.JavaScript.statementToCode(block, 'archetype_bindings');
  var rules = Blockly.JavaScript.statementToCode(block, 'rules');
  var generated = 'archetype_bindings = <\n' + archetype_bindings + '>\n'
  + 'rules = <\n' + rules + '>\n';
  return generated;
};
Blockly.Blocks['rule'] = {
  init: function() {
    this.appendStatementInput("when")
    .setCheck("expression")
    .appendField("when");
    this.appendStatementInput("then")
    .setCheck("expression")
    .appendField("then");
    this.appendDummyInput()
    .appendField("priority")
    .appendField(new Blockly.FieldTextInput(""), "priority");
    this.setPreviousStatement(true, 'rule');
    this.setNextStatement(true, 'rule');
    this.setColour(180);
    this.setTooltip('Define a rule');
  }
};
Blockly.JavaScript['rule'] = function(block) {
  var when = Blockly.JavaScript.statementToCode(block, 'when');
  var then = Blockly.JavaScript.statementToCode(block, 'then');
  var priority = block.getFieldValue('priority');
  var code = nextGTCode(block);
  var generated = '["' + code + '"] = (RULE) <\n'
  +'    when = <' + when + '>\n'
  +'    then = <' + then + '>\n'
  +'    priority = <' + priority + '>\n'
  +'>\n';
  return generated;
};

function archetype_list() {
  // could be retrieved from a public CKM or a git repo
  var options = [
    ["body_weight", "openEHR-EHR-OBSERVATION.body_weight.v1"],
    ["height", "openEHR-EHR-OBSERVATION.height.v1"],
    ["body_mass_index", "openEHR-EHR-OBSERVATION.body_mass_index.v1"]
  ];
  return options;
}

function archetype_element_list() {
  var options = [
      ["weight.value", "/data[at0002]/events[at0003]/data[at0001]/items[at0004]"],
      ["height.value", "/data[at0001]/events[at0002]/data[at0003]/items[at0004]"],
      ["bmi.value", "/data[at0001]/events[at0002]/data[at0003]/items[at0005]"]
  ];
  return options
}

Blockly.Blocks['archetype_binding'] = {
  init: function() {
    var archetype_dropdown = new Blockly.FieldDropdown(archetype_list);
    this.appendDummyInput()
    .appendField("archetype")
    //.appendField(new Blockly.FieldTextInput(""), "id");
    .appendField(archetype_dropdown, 'id');

    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([["EHR", "EHR"], ["CDS", "CDS"]]), "domain");
    this.appendStatementInput("elements")
    .setCheck("element_binding")
    .appendField("elements");
    this.appendStatementInput("predicates")
    .setCheck("expression")
    .appendField("predicates");
    this.setPreviousStatement(true, 'archetype_binding');
    this.setNextStatement(true, 'archetype_binding');
    this.setColour(120);
    this.setTooltip('Define an archetype binding');
  }
};
Blockly.JavaScript['archetype_binding'] = function(block) {
  var code = nextGTCode(block);
  var domain = block.getFieldValue('domain');
  var id = block.getFieldValue('id');
  var elements = Blockly.JavaScript.statementToCode(block, 'elements')
  var predicates = Blockly.JavaScript.statementToCode(block, 'predicates')
  var generated = 'archetype_binding = <\n'
  +'    ["' + code + '"] = (ARCHETYPE_BINDING) <\n'
  +'    archetype_id = <"' + id + '">\n'
  +'    domain = <"' + domain + '">\n'
  +'    elements = <\n' + elements + '    >\n'
  +'    predicates = <' + predicates + '>\n'
  +'>\n';
  return generated;
};
Blockly.Blocks['element_binding'] = {
  init: function() {
    var element_dropdown = new Blockly.FieldDropdown(archetype_element_list);
    this.appendDummyInput()
    .appendField("element.path")
    .appendField(element_dropdown, "path");
    this.setPreviousStatement(true, 'element_binding');
    this.setNextStatement(true, 'element_binding');
    this.setColour(210);
    this.setTooltip('Define elements of archetype binding');
  }
};
Blockly.JavaScript['element_binding'] = function(block) {
  var code = nextGTCode(block);
  var path = block.getFieldValue('path');
  var generated = '    ["' + code + '"] = (ELEMENT_BINDING) <\n'
  +'        path = <"' + path + '">\n'
  +'    >\n';
  return generated;
};
Blockly.Blocks['expression'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("expression")
    .appendField(new Blockly.FieldTextInput(""), "expression");
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'expression');
    this.setNextStatement(true, 'expression');
    this.setColour(160);
    this.setTooltip('Define an expression');
  }
};
Blockly.JavaScript['expression'] = function(block) {
  var expression = block.getFieldValue('expression');
  var generated = '"' + expression + '",';
  return generated;
};
function nextGTCode(block) {
  if(block.data == null) {
    block.data = 'gt000' + gt_code_count;
    gt_code_count++;
  }
  return block.data;
}
