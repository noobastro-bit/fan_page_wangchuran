import styles from './SectionHead.module.css';

export default function SectionHead({ index, label }) {
  return (
    <div className={styles.head}>
      <span className={styles.index}>{index}</span>
      <span className={styles.label}>{label}</span>
      <span className={styles.rule} aria-hidden="true" />
    </div>
  );
}
