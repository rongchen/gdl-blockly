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
Blockly.GDL['unary_expression'] = function(block) {
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
Blockly.GDL['binary_expression'] = function(block) {
  var first_operand = Blockly.GDL.statementToCode(block, 'first_operand');
  var operator = block.getFieldValue('operator');
  var second_operand = Blockly.GDL.statementToCode(block, 'second_operand');
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
Blockly.GDL['function_expression'] = function(block) {
  var function_name = block.getFieldValue('function');
  var parameter = Blockly.GDL.statementToCode(block, 'parameter');
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
Blockly.GDL['assignment_expression'] = function(block) {
  var variable = Blockly.GDL.statementToCode(block, 'variable');
  var value = Blockly.GDL.statementToCode(block, 'value');
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
Blockly.GDL['numeric_constant'] = function(block) {
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
Blockly.GDL['boolean_constant'] = function(block) {
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
Blockly.GDL['string_constant'] = function(block) {
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
Blockly.GDL['variable'] = function(block) {
  var variable = block.getFieldValue('variable');
  var code = '$' + variable;
  return code;
};
Blockly.Blocks['variable_exists'] = {
  init: function() {
    this.appendValueInput("variable")
    .setCheck(null);
    this.appendDummyInput()
    .appendField(" ")
    .appendField(new Blockly.FieldDropdown([
      ["exists", "EXIST"], ["doesn't exist", "NOT_EXIST"]]), "exists");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "assignment_expression");
    this.setNextStatement(true, "assignment_expression");
    this.setOutput(true, "binary_expression");
    this.setColour(60);
    this.setTooltip('Variable exists');;
  }
};
Blockly.GDL['variable_exists'] = function(block) {
  var variable = Blockly.GDL.statementToCode(block, 'variable');
  var exists = block.getFieldValue('exists');
  var code = '"' + variable;
  console.log("exists: " + exists);
  if(exists == "EXIST") {
    code = code + "!=null";
  } else {
    code = code + "==null";
  }
  code = code + '"';
  return code;
};

function nextGTCode(block) {
  if(block.data == null) {
    block.data = 'gt000' + gt_code_count;
    gt_code_count++;
  }
  return block.data;
}
