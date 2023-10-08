type IconProps = {
  size: number;
  className?: string;
};

export default function En(props: IconProps) {
  return (
    <svg className={props.className} height={props.size} viewBox="0 0 16 16" width={props.size}>
      <path d="M0 0h16v16h-16v-16z" fill="#012169" />
      <path
        d="M16 0v2l-5.938 6 5.938 5.844v2.156h-2.094l-5.969-5.875-5.813 5.875h-2.125v-2.125l5.813-5.844-5.813-5.719v-2.313h1.938l6 5.875 5.813-5.875h2.25z"
        fill="#fff"
      />
      <path
        d="M5.75 10.125l0.344 1.063-4.781 4.812h-1.313v-0.094l5.75-5.781zM9.625 9.75l1.688 0.25 4.688 4.594v1.406l-6.375-6.25zM16 0l-6 6.125-0.125-1.375 4.687-4.75h1.438zM0 0.031l6.031 5.906-1.844-0.25-4.188-4.156v-1.5z"
        fill="#c8102e"
      />
      <path d="M5.5 0v16h5v-16h-5zM0 5.5v5h16v-5h-16z" fill="#fff" />
      <path d="M0 6.5v3h16v-3h-16zM6.5 0v16h3v-16h-3z" fill="#c8102e" />
    </svg>
  );
}
