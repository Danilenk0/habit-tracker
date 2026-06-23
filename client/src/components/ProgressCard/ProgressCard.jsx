import style from "./ProgressCard.module.css";

const ProgressCard = ({ name, progress, description, children }) => {
  return (
    <div className={style.card}>
      <div className={style.header}>
        <p>{name}</p>
        {children}
      </div>
      <div className={style.content}>
        <p>{progress}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProgressCard;
