import styles from '../../app/(auth)/Auth.module.css'

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordField({ label, value, onChange }: PasswordFieldProps) {
  return (
    <div className={styles.PasswordField}>
      <div className={styles.FieldLabel}>
        <i className="ri-lock-2-line"></i>
        <label>{label}</label>
      </div>
      <div className={styles.PasswordInput}>
        <input
          type="password"
          required
          placeholder="Enter your password"
          value={value}
          onChange={onChange}
        />
        <i className="ri-eye-off-line"></i>
      </div>
    </div>
  )
}
