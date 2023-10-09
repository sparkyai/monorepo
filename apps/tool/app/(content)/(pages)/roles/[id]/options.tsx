"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SelectField from "@components/form/select-field";
import RangeField from "@components/form/range-field";
import FieldGroup from "@components/form/field-group";
import type { RoleData } from "@lib/actions/role";
import { updateRole } from "@lib/actions/role";

type OptionsProps = {
  id: number;
  topP: number;
  model: string;
  models: string[];
  temperature: number;
  presentPenalty: number;
  frequencyPenalty: number;
};

export default function Options(props: OptionsProps) {
  const router = useRouter();

  const [topP, setTopP] = useState(props.top_p);
  const [model, setModel] = useState(props.model);
  const [temperature, setTemperature] = useState(props.temperature);
  const [presentPenalty, setPresentPenalty] = useState(props.present_penalty);
  const [frequencyPenalty, setFrequencyPenalty] = useState(props.frequency_penalty);

  useEffect(() => {
    const timer = setTimeout(() => {
      const data: RoleData = {};

      if (topP !== props.top_p) {
        data.top_p = topP;
      }

      if (model !== props.model && model) {
        data.model = model;
      }

      if (temperature !== props.temperature) {
        data.temperature = temperature;
      }

      if (presentPenalty !== props.present_penalty) {
        data.present_penalty = presentPenalty;
      }

      if (frequencyPenalty !== props.frequency_penalty) {
        data.frequency_penalty = frequencyPenalty;
      }

      if (Object.keys(data).length) {
        void updateRole(props.id, data).then(() => {
          router.refresh();
        });
      }
    }, 300);

    return function cancel() {
      clearTimeout(timer);
    };
  }, [router, props, topP, model, temperature, presentPenalty, frequencyPenalty]);

  return (
    <>
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
    </>
  );
}
