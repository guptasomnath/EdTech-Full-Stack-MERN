import React from "react";

interface DescriptionProps {
  text : string | undefined;
}

const Description = (props : DescriptionProps) => {
  const purifyHtml = props.text?.replaceAll('<script>', '').replaceAll('</script>', '');

  return (
    <div className="mt-3 mb-5">
      <h1 className="font-semibold text-xl pb-1">Description</h1>
      <p dangerouslySetInnerHTML={{__html : purifyHtml || ""}} />
    </div>
  );
};

export default Description;
