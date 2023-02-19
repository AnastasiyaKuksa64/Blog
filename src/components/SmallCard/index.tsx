import styles from "./smallCard.module.scss";
// import "../../index.css";

interface ISmallCardProps {
  date: string;
  title: string;
  discription: string;
  src: string;
  rating: number | any;
  id: string;
}

const SmallCard: React.FC<ISmallCardProps> = (props) => {
  return (
    <>
      <div className="wrap_hidden">
        <div className={styles.card_img}>
          <img src={props.src} alt={"src"} />
        </div>
        <div className="picture_hover"></div>
      </div>
      <div
        className="card_content"
        // className={styles.card_content}
      >
        <span
          className="date"
          // className={styles.card_dateDay}
        >
          {props.date}
        </span>
        <h3
          className="title"
          // className={styles.card_title}
        >
          {props.title}
        </h3>
      </div>
    </>
  );
};

export default SmallCard;
