import {
  ComponentType,
} from "../../props";

export const setValuePropName = (type: ComponentType) => {
  if (type === "switch") {
    return "checked";
  }
  return "value";
};