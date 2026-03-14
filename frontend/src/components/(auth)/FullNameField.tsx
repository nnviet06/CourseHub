import styles from '../../app/(auth)/Auth.module.css'

interface FullNameFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FullNameField({ value, onChange }: FullNameFieldProps) {
  return (
    <div className={styles.FullNameField}>
      <div className={styles.FieldLabel}>
        <i className="bx bx-user"></i>
        <label>Full Name</label>
      </div>
      <input
        type="text"
        required
        placeholder="Enter your full name"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
