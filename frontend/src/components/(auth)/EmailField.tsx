import styles from '../../app/(auth)/Auth.module.css'

interface EmailFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EmailField({ value, onChange }: EmailFieldProps) {
  return (
    <div className={styles.EmailField}>
      <div className={styles.FieldLabel}>
        <i className="bx bx-envelope"></i>
        <label>Email</label>
      </div>
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
