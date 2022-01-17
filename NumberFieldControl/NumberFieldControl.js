/*
 * Generated 10/5/2020 4:01:03 PM
 * Copyright (C) 2020
 */
var TcHmi;
(function (TcHmi) {
    let Controls;
    (function (Controls) {
        let NumberField;
        (function (NumberField) {
            class NumberFieldControl extends TcHmi.Controls.System.TcHmiControl {
                /*
                Attribute philosophy
                --------------------
                - Local variables are not set while definition in class, so they have the value 'undefined'.
                - On compile the Framework sets the value from HTML or from theme (possibly 'null') via normal setters
                - The "changed detection" in the setter will result in processing the value only once while compile
                - Attention: If we have a Server Binding on an Attribute the setter can be very late or never (leaving the value = undefined).
                */
                /**
                 * @description Constructor of the control
                 * @param {JQuery} element Element from HTML (internal, do not use)
                 * @param {JQuery} pcElement precompiled Element (internal, do not use)
                 * @param {TcHmi.Controls.ControlAttributeList} attrs Attributes defined in HTML in a special format (internal, do not use)
                 * @returns {void}
                 */
                constructor(element, pcElement, attrs) {
                    /** Call base class constructor */
                    super(element, pcElement, attrs);
                    //Member variables
                    this.__basePath = '/NumberField/NumberFieldControl/';
                }
                /**
                  * If raised, the control object exists in control cache and constructor of each inheritation level was called.
                  * Call attribute processor functions here to initialize default values!
                  */
                __previnit() {
                    // Fetch template root element
                    this.__elementTemplateRoot = this.__element.find('.numberfield-root');
                    if (this.__elementTemplateRoot.length === 0) {
                        throw new Error('Cant find root div in Template.html');
                    }
                    //Element value 
                    this.__elementValue = this.__elementTemplateRoot.find('.numberfield-value');
                    this.__elementValueP = this.__elementValue.find('.numberfield-value-p');
                    //Element minus
                    this.__elementMinus = this.__elementTemplateRoot.find('.numberfield-minus');
                    this.__elementMinusIcon = this.__elementMinus.find('.numberfield-minus-icon');
                    //Element plus
                    this.__elementPlus = this.__elementTemplateRoot.find('.numberfield-plus');
                    this.__elementPlusIcon = this.__elementPlus.find('.numberfield-plus-icon');
                    // Call __previnit of base class
                    super.__previnit();
                }
                /**
                 * @description Is called during control initialize phase after attribute setter have been called based on it's default or initial html dom values.
                 * @returns {void}
                 */
                __init() {
                    super.__init();
                }
                /**
                * @description Is called by tachcontrol() after the control instance gets part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __attach() {
                    super.__attach();
                    var $this = this;
                    //register click listener for the button
                    $(this.__elementMinus).on('click', function () {
                        $this.__substractValue();
                    });
                    $(this.__elementMinus).on('touchstart', function () {
                        $this.__substractValue();
                    });
                    $(this.__elementPlus).on('click', function () {
                        //@ts-ignore
                        // document.querySelector(".numberfield-plus-icon").getSVGDocument().getElementById("plus-solid-icon").setAttribute("fill", "red")
                        $this.__addValue();
                    });
                    $(this.__elementPlus).on('touchstart', function () {
                        $this.__addValue();
                    });
                    /**
                     * Initialize everything which is only available while the control is part of the active dom.
                     */
                }
                /**
                * @description Is called by tachcontrol() after the control instance is no longer part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __detach() {
                    super.__detach();
                    $(this.__elementMinus).off('mousedown');
                    $(this.__elementMinus).off('touchstart');
                    $(this.__elementPlus).off('mousedown');
                    $(this.__elementPlus).off('touchstart');
                    /**
                     * Disable everything which is not needed while the control is not part of the active dom.
                     * No need to listen to events for example!
                     */
                }
                /**
                * @description Destroy the current control instance.
                * Will be called automatically if system destroys control!
                */
                destroy() {
                    /**
                    * While __keepAlive is set to true control must not be destroyed.
                    */
                    if (this.__keepAlive) {
                        return;
                    }
                    super.destroy();
                    /**
                    * Free resources like child controls etc.
                    */
                }
                //Value
                setValue(valueNew) {
                    // convert the value with the value converter
                    var convertedValue = TcHmi.ValueConverter.toNumber(valueNew);
                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('Value');
                    }
                    if (tchmi_equal(convertedValue, this.__value)) {
                        // skip processing when the value has not changed
                        return;
                    }
                    // remember the new value
                    this.__value = convertedValue;
                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + ".onFunctionResultChanged", ["getValue"]);
                    // call process function to process the new value
                    this.__processValue();
                }
                getValue() {
                    return this.__value;
                }
                __processValue() {
                    //check if the element is valid
                    if (!this.__elementValueP || !this.__elementTemplateRoot)
                        return;
                    if (this.__value == null && this.__value == undefined)
                        return;
                    //Update value for data-label
                    $(this.__elementValueP).attr("data-label", Number(this.__value).toFixed(this.__decimals) + " " + this.__unit);
                    //Write back value                            
                    // @ts-ignore
                    if (this.__elementTemplateRoot[0].offsetParent != null && this.__elementTemplateRoot[0].offsetParent != undefined) {
                        // @ts-ignore
                        this.__symbolExpression = this.__elementTemplateRoot[0].offsetParent.dataset.tchmiValue;
                        TcHmi.Symbol.writeEx(String(this.__symbolExpression), this.__value, function (callback) {
                            //console.log(callback);
                        });
                    }
                    //Set disable class if needed
                    //Set class if needed
                    if (this.__value <= this.__min) {
                        $(this.__elementMinus).addClass('numberfield-disabled');
                    }
                    else {
                        $(this.__elementMinus).removeClass('numberfield-disabled');
                    }
                    if (this.__value >= this.__max) {
                        $(this.__elementPlus).addClass('numberfield-disabled');
                    }
                    else {
                        $(this.__elementPlus).removeClass('numberfield-disabled');
                    }
                }
                //Min value
                setMin(valueNew) {
                    // convert the value with the value converter
                    var convertedValue = TcHmi.ValueConverter.toNumber(valueNew);
                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('Min');
                    }
                    if (tchmi_equal(convertedValue, this.__min)) {
                        // skip processing when the value has not changed
                        return;
                    }
                    // remember the new value
                    this.__min = convertedValue;
                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + ".onFunctionResultChanged", ["getMin"]);
                }
                getMin() {
                    return this.__min;
                }
                //Max value
                setMax(valueNew) {
                    // convert the value with the value converter
                    var convertedValue = TcHmi.ValueConverter.toNumber(valueNew);
                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('Max');
                    }
                    if (tchmi_equal(convertedValue, this.__max)) {
                        // skip processing when the value has not changed
                        return;
                    }
                    // remember the new value
                    this.__max = convertedValue;
                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + ".onFunctionResultChanged", ["getMax"]);
                }
                getMax() {
                    return this.__max;
                }
                //Step value
                setStepSize(valueNew) {
                    // convert the value with the value converter
                    var convertedValue = TcHmi.ValueConverter.toNumber(valueNew);
                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('StepSize');
                    }
                    if (tchmi_equal(convertedValue, this.__stepSize)) {
                        // skip processing when the value has not changed
                        return;
                    }
                    // remember the new value
                    this.__stepSize = convertedValue;
                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + ".onFunctionResultChanged", ["getStepSize"]);
                }
                getStepSize() {
                    return this.__stepSize;
                }
                //Sub Value
                __substractValue() {
                    var value = this.__value - this.__stepSize;
                    this.__value = Math.min(Math.max(value, this.__min), this.__max);
                    this.__processValue();
                }
                //Add Value
                __addValue() {
                    var value = this.__value + this.__stepSize;
                    this.__value = Math.min(Math.max(value, this.__min), this.__max);
                    this.__processValue();
                }
                //Unit
                setUnit(valueNew) {
                    // convert the value with the value converter
                    var convertedValue = TcHmi.ValueConverter.toString(valueNew);
                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('Unit');
                    }
                    if (tchmi_equal(convertedValue, this.__unit)) {
                        // skip processing when the value has not changed
                        return;
                    }
                    // remember the new value
                    this.__unit = convertedValue;
                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + ".onFunctionResultChanged", ["getUnit"]);
                    //Update Unit in Value
                    this.__processValue();
                }
                getUnit() {
                    return this.__unit;
                }
                //FontSize
                setFontSize(valueNew) {
                    // convert the value with the value converter
                    var convertedValue = TcHmi.ValueConverter.toNumber(valueNew);
                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('FontSize');
                    }
                    if (tchmi_equal(convertedValue, this.__fontSize)) {
                        // skip processing when the value has not changed
                        return;
                    }
                    // remember the new value
                    this.__fontSize = convertedValue;
                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + ".onFunctionResultChanged", ["getFontSize"]);
                    this.__processFontSize();
                }
                getFontSize() {
                    return this.__fontSize;
                }
                __processFontSize() {
                    //check if the element is valid
                    if (!this.__elementValue)
                        return;
                    $(this.__elementValue).css("fontSize", this.__fontSize);
                }
                //Decimals
                //Min value
                setDecimals(valueNew) {
                    // convert the value with the value converter
                    var convertedValue = TcHmi.ValueConverter.toNumber(valueNew);
                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('Decimals');
                    }
                    if (tchmi_equal(convertedValue, this.__decimals)) {
                        // skip processing when the value has not changed
                        return;
                    }
                    // remember the new value
                    this.__decimals = convertedValue;
                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + ".onFunctionResultChanged", ["getDecimals"]);
                    //Process value if data changed
                    this.__processValue();
                }
                getDecimals() {
                    return this.__decimals;
                }
            }
            NumberField.NumberFieldControl = NumberFieldControl;
        })(NumberField = Controls.NumberField || (Controls.NumberField = {}));
        Controls.registerEx('NumberFieldControl', 'TcHmi.Controls.NumberField', NumberField.NumberFieldControl);
    })(Controls = TcHmi.Controls || (TcHmi.Controls = {}));
})(TcHmi || (TcHmi = {}));
//# sourceMappingURL=NumberFieldControl.js.map