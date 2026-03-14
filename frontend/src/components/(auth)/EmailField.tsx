// EmailField.tsx
import styles from '../../app/(auth)/Auth.module.css'

interface EmailFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EmailField({ value, onChange }: EmailFieldProps) {
  return (
    <div className={styles.EmailField}>
      <i className="bx bx-envelope"></i>
      <div>
        <input
          type="email"
          required
          placeholder=""
          value={value}
          onChange={onChange}
        />
        <label>Email</label>
      </div>
    </div>
  )
}
