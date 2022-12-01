import shortAnswerInputs from "./shortAnswerInputs";
import longAnswerInputs from "./longAnswerInputs";
import numberInputs from "./numberInputs";
import arrayInputs from "./arrayInputs";
import defaultInputs from "./defaultInputs";
import referenceInputs from "./referenceInputs";
import fileInsputs from "./fileInputs";

const DEFAULT_FORM_INPUTS = {
  ...defaultInputs,
  ...referenceInputs,
  ...shortAnswerInputs,
  ...longAnswerInputs,
  ...numberInputs,
  ...arrayInputs,
  ...fileInsputs,
};

export default DEFAULT_FORM_INPUTS;
