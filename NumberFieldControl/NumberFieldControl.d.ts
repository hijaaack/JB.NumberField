declare module TcHmi {
    module Controls {
        module NumberField {
            class NumberFieldControl extends TcHmi.Controls.System.TcHmiControl {
                /**
                 * @description Constructor of the control
                 * @param {JQuery} element Element from HTML (internal, do not use)
                 * @param {JQuery} pcElement precompiled Element (internal, do not use)
                 * @param {TcHmi.Controls.ControlAttributeList} attrs Attributes defined in HTML in a special format (internal, do not use)
                 * @returns {void}
                 */
                constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
                protected __elementTemplateRoot: JQuery;
                protected __elementValue: JQuery;
                protected __elementValueP: JQuery;
                protected __elementMinus: JQuery;
                protected __elementMinusIcon: JQuery;
                protected __elementPlus: JQuery;
                protected __elementPlusIcon: JQuery;
                protected __basePath: string;
                protected __value: number;
                protected __stepSize: number;
                protected __min: number;
                protected __max: number;
                protected __fontSize: number;
                protected __unit: string;
                protected __symbolExpression: string | null;
                protected __decimals: number;
                /**
                  * If raised, the control object exists in control cache and constructor of each inheritation level was called.
                  * Call attribute processor functions here to initialize default values!
                  */
                __previnit(): void;
                /**
                 * @description Is called during control initialize phase after attribute setter have been called based on it's default or initial html dom values.
                 * @returns {void}
                 */
                __init(): void;
                /**
                * @description Is called by tachcontrol() after the control instance gets part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __attach(): void;
                /**
                * @description Is called by tachcontrol() after the control instance is no longer part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __detach(): void;
                /**
                * @description Destroy the current control instance.
                * Will be called automatically if system destroys control!
                */
                destroy(): void;
                setValue(valueNew: number | null): void;
                getValue(): number;
                protected __processValue(): void;
                setMin(valueNew: number | null): void;
                getMin(): number;
                setMax(valueNew: number | null): void;
                getMax(): number;
                setStepSize(valueNew: number | null): void;
                getStepSize(): number;
                protected __substractValue(): void;
                protected __addValue(): void;
                setUnit(valueNew: string | null): void;
                getUnit(): string;
                setFontSize(valueNew: number | null): void;
                getFontSize(): number;
                protected __processFontSize(): void;
                setDecimals(valueNew: number | null): void;
                getDecimals(): number;
            }
        }
    }
}
