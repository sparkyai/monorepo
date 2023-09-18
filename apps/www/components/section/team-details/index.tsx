import Section from "components/layout/section";
import HeaderContainer from "components/layout/header-container";
import members from "lib/team/members";
import Member from "./member";

type TeamDetailsProps = {
  title: string;
  locale: string;
};

export default function TeamDetails(props: TeamDetailsProps) {
  return (
    <Section>
      <HeaderContainer title={props.title} />
      <div className="container flex gap-5">
        <div className="hidden grow items-center justify-center rounded-md bg-blue-300 p-5 lg:flex">
          <svg height="245" viewBox="0 0 277 245" width="277">
            <g filter="url(#filter0_d_210_3)">
              <path
                d="M132.024 150.01V163.022C130.879 163.372 129.724 163.703 128.561 164.014L84.7087 175.72V47.3156H10V9.0003e-06L204.243 0V14.3638C239.87 22.314 266.5 54.1174 266.5 92.1406C266.5 136.152 230.821 171.83 186.81 171.83C177.912 171.83 169.355 170.372 161.364 167.681C180.569 156.987 196.802 141.554 208.454 122.836C217.109 116.492 222.728 106.252 222.728 94.6991C222.728 93.6305 222.68 92.573 222.586 91.5289C222.667 91.2579 222.748 90.9865 222.827 90.7148L222.501 90.7005C220.518 73.3288 205.767 59.8351 187.864 59.8351C168.609 59.8351 153 75.4442 153 94.6991C153 111.823 165.346 126.064 181.622 129.006C171.545 141.847 158.394 152.158 143.216 158.859C139.222 156.244 135.477 153.28 132.024 150.01ZM122.085 181.856C125.444 181.228 128.759 180.471 132.024 179.591V189.665H147.752C147.882 189.665 147.947 189.746 147.947 189.908V195.477C147.947 195.607 147.882 195.672 147.752 195.672H137.538V203.454H147.752C147.882 203.454 147.947 203.519 147.947 203.648L147.995 209.291C147.995 209.42 147.931 209.485 147.801 209.485H137.538V218.191H147.801C147.931 218.191 147.995 218.272 147.995 218.435V224.125C147.995 224.255 147.931 224.32 147.801 224.32H131.702C131.586 224.32 131.522 224.255 131.509 224.126H84.7087V182.477L115.78 183.036L122.085 181.856ZM175.847 189.859L169.67 224.077C169.67 224.239 169.735 224.32 169.864 224.32H175.409C175.555 224.32 175.636 224.239 175.652 224.077L176.187 220.429H182.972L183.507 224.077C183.524 224.239 183.613 224.32 183.775 224.32H189.295C189.441 224.32 189.506 224.239 189.49 224.077L183.556 189.859C183.524 189.73 183.443 189.665 183.313 189.665H176.09C175.96 189.665 175.879 189.73 175.847 189.859ZM177.184 215.103L179.422 201.119L179.641 199.271L179.932 201.119L181.975 215.103H177.184ZM211.724 224.32H217.366C217.495 224.32 217.56 224.239 217.56 224.077L217.609 198.663L222.789 206.251L228.017 198.663L228.066 224.077C228.066 224.239 228.131 224.32 228.261 224.32H233.903C234.032 224.32 234.097 224.239 234.097 224.077L234 189.859C234 189.73 233.927 189.665 233.781 189.665H227.677C227.531 189.665 227.409 189.73 227.312 189.859L222.789 196.426L218.241 189.859C218.144 189.73 218.03 189.665 217.901 189.665H211.821C211.691 189.665 211.626 189.73 211.626 189.859L211.529 224.077C211.529 224.239 211.594 224.32 211.724 224.32Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="244.242"
                id="filter0_d_210_3"
                width="276.422"
                x="0.0388403"
                y="0"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="9.96117" />
                <feGaussianBlur stdDeviation="4.98058" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_210_3" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_210_3" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="-m-2.5 flex grow flex-wrap lg:w-2/3">
          <Member {...members[props.locale][2]} className="w-full xl:order-1 xl:w-2/3" />
          <Member {...members[props.locale][0]} className="w-full sm:w-1/2 xl:order-3 xl:w-1/3" />
          <Member {...members[props.locale][1]} className="w-full sm:w-1/2 xl:order-4 xl:w-1/3" />
          <Member {...members[props.locale][3]} className="w-full sm:w-1/2 xl:order-2 xl:w-1/3" />
          <Member {...members[props.locale][4]} className="w-full sm:w-1/2 xl:order-5 xl:w-1/3" />
        </div>
      </div>
    </Section>
  );
}
