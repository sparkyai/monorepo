import IcomoonIcon from "components/common/icomoon-icon";

type SocialLinkProps = {
  url: string;
  name: string;
};

export default function SocialLink(props: SocialLinkProps) {
  return (
    <a
      aria-label={props.name}
      className="transition-colors hover:text-blue-200 active:text-blue-200"
      href={props.url}
      rel="noreferrer"
      target="_blank"
    >
      <IcomoonIcon className="text-[1.5rem]" name={props.name.toLowerCase()} />
    </a>
  );
}
