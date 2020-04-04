import {
  ComponentType,
} from "../../interfaces";

export const setValuePropName = (type: ComponentType) => {
  if (type === "switch") {
    return "checked";
  }
  return "value";
};