Blockly.GDL.INDENT = '';
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
Blockly.GDL['guide_definition'] = function(block) {
  var archetype_bindings = Blockly.GDL.statementToCode(block, 'archetype_bindings');
  var rules = Blockly.GDL.statementToCode(block, 'rules');
  var generated = 'archetype_bindings = <\n' + archetype_bindings + '>\n'
  + 'rules = <\n' + rules + '>\n';
  return generated;
};
Blockly.Blocks['rule'] = {
  init: function() {
    this.appendStatementInput("when")
    .setCheck("binary_expression")
    .appendField("when");
    this.appendStatementInput("then")
    .setCheck("assignment_expression")
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
Blockly.GDL['rule'] = function(block) {
  var when = Blockly.GDL.statementToCode(block, 'when');
  var then = Blockly.GDL.statementToCode(block, 'then');
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
    ["bmi.value", "/data[at0001]/events[at0002]/data[at0003]/items[at0005]"],
    ["event.time", "/data/events/time"]
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
    .setCheck(["expression", "unary_expression"])
    .appendField("predicates");
    this.setPreviousStatement(true, 'archetype_binding');
    this.setNextStatement(true, 'archetype_binding');
    this.setColour(120);
    this.setTooltip('Define an archetype binding');
  }
};
Blockly.GDL['archetype_binding'] = function(block) {
  var code = nextGTCode(block);
  var domain = block.getFieldValue('domain');
  var id = block.getFieldValue('id');
  var elements = Blockly.GDL.statementToCode(block, 'elements')
  var predicates = Blockly.GDL.statementToCode(block, 'predicates')
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
    .appendField(element_dropdown, "element_path");
    this.setPreviousStatement(true, 'element_binding');
    this.setNextStatement(true, 'element_binding');
    this.setColour(210);
    this.setTooltip('Define elements of archetype binding');
  }
};
Blockly.GDL['element_binding'] = function(block) {
  var code = nextGTCode(block);
  var path = block.getFieldValue('element_path');
  var generated = '    ["' + code + '"] = (ELEMENT_BINDING) <\n'
  +'        path = <"' + path + '">\n'
  +'    >\n';
  return generated;
};
