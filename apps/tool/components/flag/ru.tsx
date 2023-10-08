type IconProps = {
  size: number;
  className?: string;
};

export default function Ru(props: IconProps) {
  return (
    <svg className={props.className} height={props.size} viewBox="0 0 16 16" width={props.size}>
      <path d="M16 0h-16v5.481h16v-5.481zM0 10.519v5.481h16v-5.481h-16z" fill="#fff" />
      <path d="M16 5.6h-16v-0.12h16v0.12zM16 10.52h-16v-0.12h16v0.12z" fill="#548ad1" />
      <path d="M16 5.6h-16v4.8h16v-4.8z" fill="#0051ba" />
    </svg>
  );
}
