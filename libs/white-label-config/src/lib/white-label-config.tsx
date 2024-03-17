import styles from './white-label-config.module.css';

/* eslint-disable-next-line */
export interface WhiteLabelConfigProps {}

export function WhiteLabelConfig(props: WhiteLabelConfigProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WhiteLabelConfig!</h1>
    </div>
  );
}

export default WhiteLabelConfig;
