import React from 'react'

interface IProps {
  errorTxt : string | undefined | null;
  cssText? : string;
}

const ShowErrorText = ({errorTxt, cssText} : IProps) => {
  return (
    <div className={`w-full h-full text-center font-semibold text-2xl text-slate-700 mt-10 ${cssText}`}>
      <h1>{errorTxt}</h1>
    </div>
  )
}

export default ShowErrorText