/* eslint-disable react/prop-types */

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <img src={imgSrc} alt="no-data" className="w-48" />

      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5 ">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
