"use client";

import { useState } from "react";
import SelectField from "@components/form/select-field";
import TextField from "@components/form/text-field";
import Create from "./create";
import Row from "./row";

type TableProps = {
  leonardo: {
    id: string;
    name: string;
  }[];
  languages: {
    id: number;
    name: string;
  }[];
  templates: {
    id: number;
    name: string;
    model: null | string;
    provider: string;
    language: {
      id: number;
      name: string;
    };
  }[];
};

export default function Table(props: TableProps) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <TextField className="w-60" onChange={setQuery} placeholder="Search" type="search" value={query} />
        <SelectField
          className="w-36"
          onChange={setLanguage}
          options={props.languages.map((item) => item.name)}
          placeholder="Language"
          value={language}
        />
        <Create languages={props.languages} leonardo={props.leonardo} />
      </div>
      <div className="flex flex-col rounded-md border border-slate-700 bg-slate-800 tracking-wider">
        <Row className="font-bold" />
        {props.templates
          .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
          .filter((item) => !language || item.language.name === language)
          .map((template) => (
            <Row
              className="text-sm"
              key={template.id}
              languages={props.languages}
              leonardo={props.leonardo}
              template={template}
            />
          ))}
      </div>
    </div>
  );
}
