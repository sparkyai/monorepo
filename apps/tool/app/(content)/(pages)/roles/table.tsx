"use client";

import { useState } from "react";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import CreateRole from "./create";
import TableRow from "./row";

type RolesTableProps = {
  languages: {
    id: number;
    name: string;
    code: string;
  }[];
  roles: {
    id: number;
    name: string;
    language: {
      name: string;
    };
  }[];
};

export default function RolesTable(props: RolesTableProps) {
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
        <CreateRole languages={props.languages} />
      </div>
      <div className="flex flex-col rounded-md border border-slate-700 bg-slate-800 tracking-wider">
        <TableRow className="font-bold" />
        {props.roles
          .filter((template) => template.name.toLowerCase().includes(query.toLowerCase()))
          .filter((item) => !language || item.language.name === language)
          .map((template) => (
            <TableRow
              className="text-sm"
              id={template.id}
              key={template.id}
              language={template.language.name}
              name={template.name}
            />
          ))}
      </div>
    </div>
  );
}
