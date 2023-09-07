"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { TemplateData } from "@lib/actions/template";
import { updateTemplate } from "@lib/actions/template";
import TemplateSidebarGroup from "./group";
import TemplateNavbarModelField from "./model-field";
import TemplateSidebarRangeFiled from "./range-field";

type TemplateSidebarOptionsProps = {
  id: number;
  topP: number;
  model: string;
  models: string[];
  temperature: number;
  presentPenalty: number;
  frequencyPenalty: number;
};

export default function TemplateSidebarOptions(props: TemplateSidebarOptionsProps) {
  const router = useRouter();

  const [topP, setTopP] = useState(props.topP);
  const [model, setModel] = useState(props.model);
  const [temperature, setTemperature] = useState(props.temperature);
  const [presentPenalty, setPresentPenalty] = useState(props.presentPenalty);
  const [frequencyPenalty, setFrequencyPenalty] = useState(props.frequencyPenalty);

  useEffect(() => {
    const timer = setTimeout(() => {
      const data: TemplateData = {};

      if (topP !== props.topP) {
        data.topP = topP;
      }

      if (model !== props.model && model) {
        data.model = model;
      }

      if (temperature !== props.temperature) {
        data.temperature = temperature;
      }

      if (presentPenalty !== props.presentPenalty) {
        data.presentPenalty = presentPenalty;
      }

      if (frequencyPenalty !== props.frequencyPenalty) {
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
      <TemplateNavbarModelField models={props.models} name="Model" onChange={setModel} value={model} />
      <TemplateSidebarRangeFiled max={1} min={0} name="Top P" onChange={setTopP} value={topP} />
      <TemplateSidebarRangeFiled max={2} min={0} name="Temperature" onChange={setTemperature} value={temperature} />
      <TemplateSidebarRangeFiled
        max={2}
        min={0}
        name="Present Penalty"
        onChange={setPresentPenalty}
        value={presentPenalty}
      />
      <TemplateSidebarRangeFiled
        max={2}
        min={0}
        name="Frequency Penalty"
        onChange={setFrequencyPenalty}
        value={frequencyPenalty}
      />
    </TemplateSidebarGroup>
  );
}
