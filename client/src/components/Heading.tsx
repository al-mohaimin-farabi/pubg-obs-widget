import { GradientText } from "./GradientText";

const Heading = () => {
  return (
    <div className="flex justify-end uppercase">
      <div className="w-max">
        <GradientText
          from="widget-secondary"
          to="widget-primary"
          direction="vertical"
          className="text-6xl font-bold"
        >
          Overall Ranking
        </GradientText>
        <div className="mt-1 flex justify-end font-semibold">
          <div className="flex items-center bg-widget-primary p-1 px-2 text-widget-muted">
            Grand Finals
          </div>
          <div className="flex items-center bg-widget-secondary p-1 px-2 text-widget-muted">
            Match 2/18
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
