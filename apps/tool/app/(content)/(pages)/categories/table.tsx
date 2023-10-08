"use client";

import { useState } from "react";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import CategoryRow from "./row";

type CategoriesTableProps = {
  languages: {
    name: string;
  }[];
  categories: {
    id: number;
    name: string;
    _count: {
      templates: number;
    };
    language: {
      name: string;
    };
  }[];
};

export default function CategoriesTable(props: CategoriesTableProps) {
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
      </div>
      <div className="flex flex-col rounded-md border border-slate-700 bg-slate-800 tracking-wider">
        <CategoryRow className="font-bold" />
        {props.categories
          .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
          .filter((item) => !language || item.language.name === language)
          .map((category) => (
            <CategoryRow
              className="text-sm"
              id={category.id}
              key={category.id}
              language={category.language.name}
              name={category.name}
              templates={category._count.templates}
            />
          ))}
      </div>
    </div>
  );
}
