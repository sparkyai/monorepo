"use client";

import { useState } from "react";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import CreateCategory from "./create";
import CategoryRow from "./row";

type CategoriesTableProps = {
  languages: {
    id: number;
    name: string;
  }[];
  categories: {
    id: number;
    name: string;
    _count: {
      templates: number;
    };
    language: {
      id: number;
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
        <CreateCategory languages={props.languages} />
      </div>
      <div className="flex flex-col rounded-md border border-slate-700 bg-slate-800 tracking-wider">
        <CategoryRow className="font-bold" languages={props.languages} />
        {props.categories
          .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
          .filter((item) => !language || item.language.name === language)
          .map((category) => (
            <CategoryRow
              category={{ ...category, templates: category._count.templates }}
              className="text-sm"
              key={category.id}
              languages={props.languages}
            />
          ))}
      </div>
    </div>
  );
}
