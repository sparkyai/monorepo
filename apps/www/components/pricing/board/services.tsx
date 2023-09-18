import IcomoonIcon from "components/common/icomoon-icon";

type ServicesProps = {
  services: string[];
};

export default function Services({ services }: ServicesProps) {
  return (
    <div className="flex flex-col gap-4">
      {services.map((service) => (
        <div className="flex items-center gap-3" key={service}>
          <IcomoonIcon className="text-green-500 " name="check2" />
          <span className="text-left text-lg text-gray-50">{service}</span>
        </div>
      ))}
    </div>
  );
}
