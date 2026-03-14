// PasswordField.tsx
import styles from '../../app/(auth)/Auth.module.css'

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordField({ label, value, onChange }: PasswordFieldProps) {
  return (
    <div className={styles.PasswordField}>
      <i className="ri-lock-2-line"></i>
      <div>
        <input
          type="password"
          required
          placeholder=""
          value={value}
          onChange={onChange}
        />
        <label>{label}</label>
        <i className="ri-eye-off-line"></i>
      </div>
    </div>
  )
}
