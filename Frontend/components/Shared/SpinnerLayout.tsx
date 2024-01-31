import Spinner from "./Spinner";

interface IProps {
  layoutCss?: string;
  spinnerCss? : string;
}

const SpinnerLayout = ({ layoutCss, spinnerCss }: IProps) => {
  return (
    <div className={`flex justify-center ${layoutCss}`}>
      <Spinner cssClass={`block text-blue-600 w-8 h-8 mt-5 ${spinnerCss}`} />
    </div>
  );
};

export default SpinnerLayout;
