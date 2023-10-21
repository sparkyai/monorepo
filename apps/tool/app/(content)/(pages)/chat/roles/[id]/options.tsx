"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SelectField from "@components/form/select-field";
import RangeField from "@components/form/range-field";
import FieldGroup from "@components/form/field-group";
import type { ChatRole } from "@lib/actions/chat";
import { updateChatRole } from "@lib/actions/chat";

type OptionsProps = {
  role: {
    id: number;
    name: string;
    parameters: {
      model: string;
      top_p: number;
      temperature: number;
      present_penalty: number;
      frequency_penalty: number;
    };
  };
  models: string[];
};

export default function Options(props: OptionsProps) {
  const router = useRouter();

  const [topP, setTopP] = useState(props.role.parameters.top_p);
  const [model, setModel] = useState(props.role.parameters.model);
  const [temperature, setTemperature] = useState(props.role.parameters.temperature);
  const [presentPenalty, setPresentPenalty] = useState(props.role.parameters.present_penalty);
  const [frequencyPenalty, setFrequencyPenalty] = useState(props.role.parameters.frequency_penalty);

  useEffect(() => {
    const timer = setTimeout(() => {
      const data: Partial<ChatRole> = {};

      if (topP !== props.role.parameters.top_p) {
        if (!data.parameters) {
          data.parameters = {};
        }

        data.parameters.top_p = topP;
      }

      if (model !== props.role.parameters.model && model) {
        if (!data.parameters) {
          data.parameters = {};
        }

        data.parameters.model = model;
      }

      if (temperature !== props.role.parameters.temperature) {
        if (!data.parameters) {
          data.parameters = {};
        }

        data.parameters.temperature = temperature;
      }

      if (presentPenalty !== props.role.parameters.present_penalty) {
        if (!data.parameters) {
          data.parameters = {};
        }

        data.parameters.present_penalty = presentPenalty;
      }

      if (frequencyPenalty !== props.role.parameters.frequency_penalty) {
        if (!data.parameters) {
          data.parameters = {};
        }

        data.parameters.frequency_penalty = frequencyPenalty;
      }

      if (Object.keys(data).length) {
        void updateChatRole(props.role.id, data).then(() => {
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
