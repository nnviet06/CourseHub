import styles from '../../app/(auth)/Auth.module.css'

interface FullNameFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FullNameField({ value, onChange }: FullNameFieldProps) {
  return (
    <div className={styles.FullNameField}>
      <i className="bx bx-user"></i>
      <div>
        <input
          type="text"
          required
          placeholder=""
          value={value}
          onChange={onChange}
        />
        <label>Full Name</label>
      </div>
    </div>
  )
}
