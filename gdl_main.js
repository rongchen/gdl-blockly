Blockly.GDL.INDENT = '    ';
var gt_code_count = 1;
Blockly.Blocks['guide'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("id")
    .appendField(new Blockly.FieldTextInput(""), "id");
    this.appendDummyInput()
    .appendField("lang")
    .appendField(new Blockly.FieldTextInput("en"), "language");
    this.appendValueInput("description")
    .setCheck("description_item")
    .appendField("description");
    this.appendValueInput("definition")
    .setCheck("guide_definition")
    .appendField("definition");
    this.appendValueInput("ontology")
    .setCheck("guide_ontology")
    .appendField("ontology");
    this.setColour(330);
    this.setTooltip('Guide');
    this.setHelpUrl('http://www.openehr.org/releases/CDS/latest/docs/GDL/GDL.html');
  }
};
Blockly.GDL['guide'] = function(block) {
  var text_id = block.getFieldValue('id');
  var text_language = block.getFieldValue('language');
  var statements_description = Blockly.GDL.valueToCode(block, 'description', Blockly.GDL.ORDER_NONE);
  var statements_definition = Blockly.GDL.statementToCode(block, 'definition');
  var statements_ontology = Blockly.GDL.statementToCode(block, 'ontology');
  // TODO: Assemble JavaScript into code variable.
  var code = '(GUIDE) <\n'
  + '    gdl_version = <"0.1">\n'
  + '    id = <"' + text_id + '">\n'
  + '    concept = <"gt0000">\n'
  + '    language = (LANGUAGE) <\n'
  + '        original_language = <[ISO_639-1::en]>\n'
  + '    >\n'
  + '    description = (RESOURCE_DESCRIPTION) <\n'
  + '        details = <\n'
  + '            ' + statements_description
  + '        >\n'
  + '        lifecycle_state = <"Author draft">\n'
  + '        original_author = <\n'
  + '            ["date"] = <"author.date">\n'
  + '            ["email"] = <"author.email">\n'
  + '            ["name"] = <"author.name">\n'
  + '            ["organisation"] = <"author.organisation">\n'
  + '        >\n'
  + '    >\n'
  + '    definition = (GUIDE_DEFINITION) <\n' + statements_definition
  + '    >\n'
  + '    ontology = (GUIDE_ONTOLOGY) <\n'
  + '    >\n'
  + '>\n';
  return code;
};
Blockly.Blocks['description_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["en", "en"], ["sv", "sv"], ["da", "da"]]), "lang");
    this.appendDummyInput()
        .appendField("copyright")
        .appendField(new Blockly.FieldTextInput(""), "copyright");
    this.appendDummyInput()
        .appendField("keywords")
        .appendField(new Blockly.FieldTextInput(""), "keywords");
    this.appendDummyInput()
        .appendField("misuse")
        .appendField(new Blockly.FieldTextInput(""), "misuse");
    this.appendDummyInput()
        .appendField("purpose")
        .appendField(new Blockly.FieldTextInput(""), "purpose");
    this.appendDummyInput()
        .appendField("use")
        .appendField(new Blockly.FieldTextInput(""), "use");
    this.setOutput(true);
    this.setColour(285);
    this.setTooltip('Description item');
  }
};
Blockly.GDL['description_item'] = function(block) {
  var dropdown_lang = block.getFieldValue('lang');
  var text_copyright = block.getFieldValue('copyright');
  var text_keywords = block.getFieldValue('keywords');
  var text_misuse = block.getFieldValue('misuse');
  var text_purpose = block.getFieldValue('purpose');
  var text_use = block.getFieldValue('use');
  var code = '["' + dropdown_lang + '"] = (RESOURCE_DESCRIPTION_ITEM) <\n'
  + '                copyright = <"' + text_copyright + '">\n'
  + '                keywords = <"' + text_keywords + '">\n'
  + '                misuse = <"' + text_misuse + '">\n'
  + '                purpose = <"' + text_purpose + '">\n'
  + '                use = <"' + text_use + '">\n'
  + '            >\n';
  return [code, Blockly.GDL.ORDER_NONE];
};
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
    this.setOutput(true);
    this.setColour(90);
    this.setTooltip('Define a guide definition');
  }
};
Blockly.GDL['guide_definition'] = function(block) {
  var archetype_bindings = Blockly.GDL.statementToCode(block, 'archetype_bindings');
  var rules = Blockly.GDL.statementToCode(block, 'rules');
  var generated = '    archetype_bindings = <\n'
  + '    ' + archetype_bindings
  + '    >\n'
  + '    rules = <\n'
  + '    ' + rules
  + '    >\n';
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
    this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip('Define a rule');
  }
};
Blockly.GDL['rule'] = function(block) {
  var when = Blockly.GDL.valueToCode(block, 'when', Blockly.GDL.ORDER_NONE);
  var then = Blockly.GDL.valueToCode(block, 'then', Blockly.GDL.ORDER_NONE);
  var priority = block.getFieldValue('priority');
  var code = nextGTCode(block);
  var generated = '["' + code + '"] = (RULE) <\n'
  +'        when = <' + when + '>\n'
  +'        then = <' + then + '>\n'
  +'        priority = <' + priority + '>\n'
  +'    >\n';
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
    .appendField(archetype_dropdown, 'id');
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([["EHR", "EHR"], ["CDS", "CDS"]]), "domain");
    this.appendStatementInput("elements")
    .setCheck("element_binding")
    .appendField("elements");
    this.appendValueInput("predicates")
    .setCheck(["unary_expression"])
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
  var predicates = Blockly.GDL.valueToCode(block, 'predicates')
  var generated = '["' + code + '"] = (ARCHETYPE_BINDING) <\n'
  +'        archetype_id = <"' + id + '">\n'
  +'        domain = <"' + domain + '">\n'
  +'        elements = <\n' + elements
  +'        >\n'
  +'        predicates = <"' + predicates + '",...>\n'
  +'    >\n';
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
  var generated = '        ["' + code + '"] = (ELEMENT_BINDING) <\n'
  +'            path = <"' + path + '">\n'
  +'        >\n';
  return generated;
};
