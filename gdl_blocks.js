Blockly.JavaScript.INDENT = '';
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
    .appendField(element_dropdown, "element_path");
    this.setPreviousStatement(true, 'element_binding');
    this.setNextStatement(true, 'element_binding');
    this.setColour(210);
    this.setTooltip('Define elements of archetype binding');
  }
};
Blockly.JavaScript['element_binding'] = function(block) {
  var code = nextGTCode(block);
  var path = block.getFieldValue('element_path');
  var generated = '    ["' + code + '"] = (ELEMENT_BINDING) <\n'
  +'        path = <"' + path + '">\n'
  +'    >\n';
  return generated;
};

Blockly.Blocks['unary_expression'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown(
      [["++", "++"], ["--", "--"], ["+", "+"], ["-", "-"], ["!", "!"]]),
      "unary_operator");
    var element_dropdown = new Blockly.FieldDropdown(archetype_element_list);
    this.appendDummyInput()
    .appendField("(")
    .appendField(element_dropdown, "unary_operand")
    .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, ["expression", "unary_expression"]);
    this.setNextStatement(true, ["expression", "unary_expression"]);
    this.setColour(160);
    this.setTooltip('Define an expression');
  }
};
Blockly.JavaScript['unary_expression'] = function(block) {
  var unary_operator = block.getFieldValue('unary_operator');
  var unary_operand = block.getFieldValue('unary_operand');
  var generated = '"' + unary_operator + '(' + unary_operand + ')",';
  return generated;
};
Blockly.Blocks['binary_expression'] = {
  init: function() {
    this.appendValueInput("first_operand")
    .setCheck(["unary_expression", "binary_expression"]);
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([
      // relational
      ["==", "=="], ["!=", "!="], ["<", "<"], ["<=", "<="], [">", ">"], [">=", ">="],
      // arithmetic
      ["+", "+"], ["-", "-"], ["/", "/"], ["*", "*"], ["^", "^"],
      // logcal
      ["&&", "&&"], ["||", "||"], ["!", "!"],
      // terminological
      ["is_a", "is_a"]
    ]), "operator");
    this.appendValueInput("second_operand")
    .setCheck(["unary_expression", "binary_expression", "numeric_constant"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, "binary_expression");
    this.setNextStatement(true, "binary_expression");
    this.setOutput(true, ["binary_expression", "rule"]);
    this.setColour(140);
    this.setTooltip('Binary expression');;
  }
};
Blockly.JavaScript['binary_expression'] = function(block) {
  var first_operand = Blockly.JavaScript.statementToCode(block, 'first_operand');
  var operator = block.getFieldValue('operator');
  var second_operand = Blockly.JavaScript.statementToCode(block, 'second_operand');
  var code = '(' + first_operand + operator + second_operand + ')';
  return code;
};
Blockly.Blocks['function_expression'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([
      ["max", "max"], ["min", "min"], ["log10", "log"], ["ln", "ln"]
    ]), "function")
    .appendField("(");
    this.appendValueInput("parameter")
    .setCheck(["unary_expression", "binary_expression", "function_expression", "variable"]);
    this.appendDummyInput()
    .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setOutput(true, ["binary_expression", "unary_expression"]);
    this.setColour(40);
    this.setTooltip('Function expression');;
  }
};
Blockly.JavaScript['function_expression'] = function(block) {
  var function_name = block.getFieldValue('function');
  var parameter = Blockly.JavaScript.statementToCode(block, 'parameter');
  var code = function_name + '(' + parameter + ')';
  return code;
};
Blockly.Blocks['assignment_expression'] = {
  init: function() {
    this.appendValueInput("variable")
    .setCheck(null);
    this.appendDummyInput()
    .appendField("=");
    this.appendValueInput("value")
    .setCheck(["unary_expression", "binary_expression", "numeric_constant", "string_constant"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, "assignment_expression");
    this.setNextStatement(true, "assignment_expression");
    this.setOutput(true, "binary_expression");
    this.setColour(60);
    this.setTooltip('Assigment expression');;
  }
};
Blockly.JavaScript['assignment_expression'] = function(block) {
  var variable = Blockly.JavaScript.statementToCode(block, 'variable');
  var value = Blockly.JavaScript.statementToCode(block, 'value');
  var code = '"' + variable + '=' + value + '", ';
  return code;
};

Blockly.Blocks['numeric_constant'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldTextInput("1"), "constant");
    this.setInputsInline(false);
    this.setOutput(true, "binary_expression");
    this.setColour(120);
    this.setTooltip('Numeric constant');
  }
};
Blockly.JavaScript['numeric_constant'] = function(block) {
  return block.getFieldValue('constant');
};
Blockly.Blocks['boolean_constant'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([
      ["true", "true"], ["false", "false"]
    ]), "boolean")
    this.setOutput(true, "binary_expression");
    this.setColour(50);
    this.setTooltip('Boolean constant');
  }
};
Blockly.JavaScript['boolean_constant'] = function(block) {
  return block.getFieldValue('boolean');
};
Blockly.Blocks['string_constant'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("'")
    .appendField(new Blockly.FieldTextInput("abc"), "constant")
    .appendField("'");
    this.setInputsInline(true);
    this.setOutput(true, "binary_expression");
    this.setColour(100);
    this.setTooltip('String constant');
  }
};
Blockly.JavaScript['string_constant'] = function(block) {
  var constant = block.getFieldValue('constant');
  return "'" + constant + "'" ;
};
Blockly.Blocks['variable'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldTextInput("gt0001"), "variable");
    this.setInputsInline(true);
    this.setOutput(true, ["binary_expression", "assignment_expression"]);
    this.setColour(80);
    this.setTooltip('Variable');
  }
};
Blockly.JavaScript['variable'] = function(block) {
  var variable = block.getFieldValue('variable');
  var code = '$' + variable;
  return code;
};
function nextGTCode(block) {
  if(block.data == null) {
    block.data = 'gt000' + gt_code_count;
    gt_code_count++;
  }
  return block.data;
}
