import styles from '../../app/(auth)/Auth.module.css'

interface UsernameFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UsernameField({ value, onChange }: UsernameFieldProps) {
  return (
    <div className={styles.UsernameField}>
      <div className={styles.FieldLabel}>
        <i className="bx bx-at"></i>
        <label>Username</label>
      </div>
      <input
        type="text"
        required
        placeholder="Enter your username"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
