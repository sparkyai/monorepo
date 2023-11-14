"use client";

import type { Dispatch } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TypeOf } from "zod";
import { useDebouncedCallback } from "use-debounce";
import SelectField from "@components/form/select-field";
import RangeField from "@components/form/range-field";
import FieldGroup from "@components/form/field-group";
import SidebarGroup from "@components/sidebar/group";
import { updateTextTemplate } from "@lib/actions/text/template";
import type { GPTParametersSchema } from "@lib/utils/schema";

type OptionsProps = {
  template: {
    id: number;
    name: string;
    parameters: null | TypeOf<typeof GPTParametersSchema>;
  };
  models: string[];
};

export default function Options(props: OptionsProps) {
  const router = useRouter();

  const [topP, setTopP] = useState(props.template.parameters?.top_p || 1);
  const [model, setModel] = useState(props.template.parameters?.model || "gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(props.template.parameters?.temperature || 1);
  const [presentPenalty, setPresentPenalty] = useState(props.template.parameters?.present_penalty || 0);
  const [frequencyPenalty, setFrequencyPenalty] = useState(props.template.parameters?.frequency_penalty || 0);

  const mutate = useDebouncedCallback(() => {
    const parameters: TypeOf<typeof GPTParametersSchema> = {
      top_p: topP,
      model,
      temperature,
      present_penalty: presentPenalty,
      frequency_penalty: frequencyPenalty,
    };

    void updateTextTemplate(props.template.id, { parameters }).then((response) => {
      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      router.refresh();
    });
  }, 200);

  return (
    <SidebarGroup name="Options">
      <FieldGroup label="Model">
        <SelectField onChange={handler(setModel)} options={props.models} placeholder="Model" value={model} />
      </FieldGroup>
      <FieldGroup label="Top P" value={topP}>
        <RangeField max={1} min={0} onChange={handler(setTopP)} step={0.01} value={topP} />
      </FieldGroup>
      <FieldGroup label="Temperature" value={temperature}>
        <RangeField max={2} min={0} onChange={handler(setTemperature)} step={0.01} value={temperature} />
      </FieldGroup>
      <FieldGroup label="Present Penalty" value={presentPenalty}>
        <RangeField max={2} min={0} onChange={handler(setPresentPenalty)} step={0.01} value={presentPenalty} />
      </FieldGroup>
      <FieldGroup label="Frequency Penalty" value={frequencyPenalty}>
        <RangeField max={2} min={0} onChange={handler(setFrequencyPenalty)} step={0.01} value={frequencyPenalty} />
      </FieldGroup>
    </SidebarGroup>
  );

  function handler<T>(changer: Dispatch<T>) {
    return function onChange(value: T) {
      changer(value);
      mutate();
    };
  }
}
