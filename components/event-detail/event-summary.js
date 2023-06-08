import classes from "./event-summary.module.css";

function EventSummary(props) {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1 className={classes.heading}>{title}</h1>
    </section>
  );
}

export default EventSummary;
