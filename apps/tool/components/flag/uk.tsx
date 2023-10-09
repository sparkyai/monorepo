type IconProps = {
  size: number;
  className?: string;
};

export default function Uk(props: IconProps) {
  return (
    <svg className={props.className} height={props.size} viewBox="0 0 512 512" width={props.size}>
      <path d="M0 256h512v256h-512v-256z" fill="#ffd152" />
      <path d="M0 0h512v256h-512v-256z" fill="#216cb7" />
    </svg>
  );
}
