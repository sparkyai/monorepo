"use client";

import { useRouter } from "next/navigation";
import IcomoonIcon from "components/common/icomoon-icon";
import ButtonBlueFilled from "components/button/button-blue-filled";
import ButtonGrayFilled from "components/button/button-gray-filled";

type ActionsProps = {
  label: {
    home: string;
    back: string;
  };
};

export default function Actions({ label }: ActionsProps) {
  const router = useRouter();

  return (
    <div className="mt-8 flex flex-col justify-end gap-3 sm:flex-row-reverse">
      <ButtonBlueFilled onClick={home}>{label.home}</ButtonBlueFilled>
      <ButtonGrayFilled className="items-center" onClick={back}>
        <IcomoonIcon className="mr-3" name="arrow-left-short" />
        {label.back}
      </ButtonGrayFilled>
    </div>
  );

  function home() {
    router.replace("/");
    router.refresh();
  }

  function back() {
    router.back();
  }
}
