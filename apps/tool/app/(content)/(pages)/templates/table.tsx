"use client";

import { useState } from "react";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import CreateTemplate from "./create";
import TemplateRow from "./row";

type TemplatesTableProps = {
  languages: {
    id: number;
    name: string;
    code: string;
  }[];
  templates: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    };
    language: {
      name: string;
    };
  }[];
  categories: {
    id: number;
    name: string;
  }[];
};

export default function TemplatesTable(props: TemplatesTableProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <TextField className="w-60" onChange={setQuery} placeholder="Search" type="search" value={query} />
        <SelectField
          className="w-44"
          onChange={setCategory}
          options={props.categories.map((item) => item.name)}
          placeholder="Category"
          value={category}
        />
        <SelectField
          className="w-36"
          onChange={setLanguage}
          options={props.languages.map((item) => item.name)}
          placeholder="Language"
          value={language}
        />
        <CreateTemplate categories={props.categories} languages={props.languages} />
      </div>
      <div className="flex flex-col rounded-md border border-slate-700 bg-slate-800 tracking-wider">
        <TemplateRow className="font-bold" />
        {props.templates
          .filter((template) => template.name.toLowerCase().includes(query.toLowerCase()))
          .filter((template) => !category || template.category.name === category)
          .filter((item) => !language || item.language.name === language)
          .map((template) => (
            <TemplateRow className="text-sm" key={template.id} template={template} />
          ))}
      </div>
    </div>
  );
}
