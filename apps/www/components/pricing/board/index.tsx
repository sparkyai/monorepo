import ButtonBlueFilled from "components/button/button-blue-filled";
import { app } from "lib/utils/url";
import ButtonGrayFilled from "components/button/button-gray-filled";
import DynamicPrice from "./dynamic-price";
import Limit from "./limit";
import { PeriodProvider, PeriodSwitch } from "./period";
import Price from "./price";
import { QualityProvider, QualityTrigger } from "./quality";
import Services from "./services";

type PricingBoardProps = {
  locale: string;
  models: {
    id: number;
    name: string;
  }[];
  products: {
    id: number;
    users: number;
    prices: Record<string, number> &
      {
        model: {
          id: number;
        };
      }[];
    credits: number;
  }[];
};

export default async function PricingBoard(props: PricingBoardProps) {
  const dictionary = await import(`lib/dictionaries/${props.locale}.json`).then((module) => module.default);
  const { offer } = await import(`./translation/${props.locale}.json`).then((module) => module.default);
  const currency = "USD";

  return (
    <PeriodProvider defaultPeriod="annualy">
      <QualityProvider defaultQuality={props.models[0].id.toString()}>
        <div className="flex w-full flex-col gap-7 lg:mx-auto lg:w-10/12">
          <div className="flex flex-col gap-5 rounded-sm border border-gray-400 bg-gray-600 p-5 md:flex-row md:justify-between">
            <div className="flex flex-col gap-5 py-px md:flex-row">
              <span className="text-md truncate py-px font-semibold leading-9">{dictionary["Choose quality"]}</span>
              <div className="flex w-full gap-5 md:w-auto">
                {props.models.map((model) => (
                  <QualityTrigger key={model.id} value={model.id.toString()}>
                    {model.name}
                  </QualityTrigger>
                ))}
              </div>
            </div>
            <div className="text-md flex gap-3 py-2 font-semibold leading-6">
              <div className="flex gap-3">
                <span>{dictionary.Monthly}</span>
                <PeriodSwitch
                  label={{ true: dictionary.Annual, false: dictionary.Monthly }}
                  value={{ true: "annualy", false: "monthly" }}
                />
                <span>{dictionary.Annual}</span>
              </div>
              <span className="truncate text-green-500">{dictionary.Save} 25%</span>
            </div>
          </div>
          <div className="flex flex-col text-center md:flex-row">
            <div className="flex flex-1 flex-col rounded-sm border border-gray-400 bg-gray-600 p-5 md:rounded-r-none">
              <p className="text-3xl font-semibold">{offer.trial.name}</p>
              <p className="text-md mt-7 font-semibold">{offer.trial.target}</p>
              <p className="mb-5 mt-2 text-sm text-gray-50">{offer.trial.summary}</p>
              <Price amount={0} currency={currency} label={{ period: `7 ${dictionary.days}` }} />
              <Limit users={{ count: 1, label: dictionary.users }} words={{ count: 5_000, label: dictionary.words }} />
              <ButtonGrayFilled className="mb-12 mt-7 self-center !border-gray-400" component="a" href={app()}>
                {dictionary["Start for free"]}
              </ButtonGrayFilled>
              <Services services={offer.trial.services} />
            </div>
            <div className="flex flex-1 flex-col rounded-sm border border-blue-500 bg-gray-800 p-5 md:rounded-none">
              <p className="text-3xl font-semibold">{offer.business.name}</p>
              <p className="text-md mt-7 font-semibold">{offer.business.target}</p>
              <p className="mb-5 mt-2 text-sm text-gray-50">{offer.business.summary}</p>
              <DynamicPrice
                currency={currency}
                label={{
                  price: dictionary.Price,
                  words: dictionary.words,
                  users: dictionary.users,
                  period: dictionary.month,
                }}
                products={props.products}
              />
              <ButtonBlueFilled className="mb-12 mt-7 self-center" component="a" href={app()}>
                {dictionary["Buy now"]}
              </ButtonBlueFilled>
              <p className="text-md mb-5 font-semibold">{offer.business.extra}</p>
              <Services services={offer.business.services} />
            </div>
            <div className="flex flex-1 flex-col rounded-sm border border-gray-400 bg-gray-600 p-5 md:rounded-l-none">
              <p className="text-3xl font-semibold">{offer.custom.name}</p>
              <p className="text-md mt-7 font-semibold">{offer.custom.target}</p>
              <p className="mb-5 mt-2 text-sm text-gray-50">{offer.custom.summary}</p>
              <div className="mt-5 flex justify-center">
                <div className="flex rounded-full bg-gray-400 p-5">
                  <svg fill="none" height="80" viewBox="0 0 200 145" width="80">
                    <path
                      d="M190.207 144.668H10.0329C6.33813 144.668 3.33423 141.664 3.33423 137.969V29.4681C3.33423 25.7733 6.33813 22.7694 10.0329 22.7694H190.207C193.902 22.7694 196.906 25.7733 196.906 29.4681V137.939C196.906 141.664 193.902 144.668 190.207 144.668Z"
                      fill="#5D5F66"
                    />
                    <path
                      d="M60.8887 5.37699V58.9366C60.8887 61.9105 63.8325 64.3136 67.4672 64.3136H132.802C136.437 64.3136 139.381 61.9105 139.381 58.9366V5.37699C139.381 2.40312 136.437 0 132.802 0H67.4372C63.8325 0 60.8887 2.40312 60.8887 5.37699ZM123.25 56.5034H76.9896C73.3549 56.5034 70.4111 54.1003 70.4111 51.1265V10.003C70.4111 8.80144 71.6126 7.81015 73.0845 7.81015H127.125C128.597 7.81015 129.798 8.80144 129.798 10.003V51.1265C129.828 54.1003 126.884 56.5034 123.25 56.5034Z"
                      fill="#5D5F66"
                    />
                    <path
                      d="M71.4929 22.7695H60.1682C58.9666 22.7695 57.9753 21.8082 57.9753 20.5766C57.9753 19.3751 58.9366 18.3838 60.1682 18.3838H71.4929C72.6945 18.3838 73.6858 19.345 73.6858 20.5766C73.6858 21.8082 72.6945 22.7695 71.4929 22.7695Z"
                      fill="#FFD345"
                    />
                    <path
                      d="M139.832 22.7695H128.507C127.306 22.7695 126.314 21.8082 126.314 20.5766C126.314 19.3751 127.275 18.3838 128.507 18.3838H139.832C141.033 18.3838 142.025 19.345 142.025 20.5766C142.025 21.8082 141.033 22.7695 139.832 22.7695Z"
                      fill="#FFD345"
                    />
                    <path
                      d="M197.447 59.7179L100 88.4352L2.55332 59.7179C1.02133 59.2673 0 57.8855 0 56.2935V28.7777C0 25.4734 2.67347 22.7999 5.97777 22.7999H194.022C197.327 22.7999 200 25.4734 200 28.7777V56.2935C200 57.8555 198.949 59.2673 197.447 59.7179Z"
                      fill="#7F8189"
                    />
                    <path
                      d="M105.437 97.1762H94.0825C93.2414 97.1762 92.5505 96.4853 92.5505 95.6442V82.8776C92.5505 82.0365 93.2414 81.3456 94.0825 81.3456H105.437C106.278 81.3456 106.969 82.0365 106.969 82.8776V95.6442C106.969 96.4853 106.308 97.1762 105.437 97.1762Z"
                      fill="#FFD345"
                    />
                    <path
                      d="M109.072 88.4345H90.4774C89.8766 88.4345 89.366 87.9539 89.366 87.323V78.9121C89.366 78.3113 89.8466 77.8007 90.4774 77.8007H109.072C109.672 77.8007 110.183 78.2813 110.183 78.9121V87.323C110.183 87.9539 109.672 88.4345 109.072 88.4345Z"
                      fill="#FFED6C"
                    />
                  </svg>
                </div>
              </div>
              <ButtonGrayFilled className="mb-12 mt-9 self-center !border-gray-400" component="a" href={app()}>
                {dictionary["Contact us"]}
              </ButtonGrayFilled>
              <p className="text-md mb-5 font-semibold">{offer.custom.extra}</p>
              <Services services={offer.custom.services} />
            </div>
          </div>
        </div>
      </QualityProvider>
    </PeriodProvider>
  );
}
