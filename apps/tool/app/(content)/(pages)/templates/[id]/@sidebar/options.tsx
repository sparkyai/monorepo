"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { TemplateData } from "@lib/actions/template";
import { updateTemplate } from "@lib/actions/template";
import SelectField from "@components/form/select-field";
import RangeField from "@components/form/range-field";
import FieldGroup from "@components/form/field-group";
import TemplateSidebarGroup from "./group";

type TemplateSidebarOptionsProps = {
  id: number;
  top_p: number;
  model: string;
  models: string[];
  temperature: number;
  present_penalty: number;
  frequency_penalty: number;
};

export default function TemplateSidebarOptions(props: TemplateSidebarOptionsProps) {
  const router = useRouter();

  const [topP, setTopP] = useState(props.top_p);
  const [model, setModel] = useState(props.model);
  const [temperature, setTemperature] = useState(props.temperature);
  const [presentPenalty, setPresentPenalty] = useState(props.present_penalty);
  const [frequencyPenalty, setFrequencyPenalty] = useState(props.frequency_penalty);

  useEffect(() => {
    const timer = setTimeout(() => {
      const data: TemplateData = {};

      if (topP !== props.top_p) {
        data.topP = topP;
      }

      if (model !== props.model && model) {
        data.model = model;
      }

      if (temperature !== props.temperature) {
        data.temperature = temperature;
      }

      if (presentPenalty !== props.present_penalty) {
        data.presentPenalty = presentPenalty;
      }

      if (frequencyPenalty !== props.frequency_penalty) {
        data.frequencyPenalty = frequencyPenalty;
      }

      if (Object.keys(data).length) {
        void updateTemplate(props.id, data).then(() => {
          router.refresh();
        });
      }
    }, 300);

    return function cancel() {
      clearTimeout(timer);
    };
  }, [router, props, topP, model, temperature, presentPenalty, frequencyPenalty]);

  return (
    <TemplateSidebarGroup name="Options">
      <FieldGroup label="Model">
        <SelectField onChange={setModel} options={props.models} placeholder="Model" value={model} />
      </FieldGroup>
      <FieldGroup label="Top P" value={topP}>
        <RangeField max={1} min={0} onChange={setTopP} step={0.01} value={topP} />
      </FieldGroup>
      <FieldGroup label="Temperature" value={temperature}>
        <RangeField max={2} min={0} onChange={setTemperature} step={0.01} value={temperature} />
      </FieldGroup>
      <FieldGroup label="Present Penalty" value={presentPenalty}>
        <RangeField max={2} min={0} onChange={setPresentPenalty} step={0.01} value={presentPenalty} />
      </FieldGroup>
      <FieldGroup label="Frequency Penalty" value={frequencyPenalty}>
        <RangeField max={2} min={0} onChange={setFrequencyPenalty} step={0.01} value={frequencyPenalty} />
      </FieldGroup>
    </TemplateSidebarGroup>
  );
}
